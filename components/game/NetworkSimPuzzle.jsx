'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/lib/audio';
import { useLanguage } from '@/context/LanguageContext';
import { DEVICE_TEMPLATES, CABLE_TYPES, PORT_TYPES, traceNetwork } from '@/lib/networkSimDevices';

const DEVICE_GLOSSARY = {
  internet: {
    title: { en: "Internet Source (ISP)", id: "Sumber Internet (ISP)" },
    desc: {
      en: "The provider's feed entry point. Connects to the Cable Modem using a Coaxial cable (blue). Without this connected, the modem has no signal to translate.",
      id: "Titik masuk kabel dari provider. Terhubung ke Cable Modem menggunakan kabel Koaksial (biru). Tanpa ini terhubung, modem tidak punya sinyal untuk diterjemahkan."
    },
    realWorldLook: {
      en: "A metal wall outlet with a brass threaded cylinder connector, or a fiber optical box mounted inside/outside the building.",
      id: "Soket dinding logam dengan ulir silinder kuningan di tengahnya, atau kotak fiber optik hitam/putih yang terpasang di dinding."
    },
    videoUrl: "https://www.youtube.com/watch?v=Fpqm2sTjQos"
  },
  power_outlet: {
    title: { en: "Power Strip (Colokan Listrik)", id: "Sumber Listrik (Power Strip)" },
    desc: {
      en: "Supplies 220V electricity to device power plugs. Every network device needs a power cable (orange) connected to the outlet to turn on.",
      id: "Menyuplai listrik 220V ke colokan perangkat. Setiap perangkat jaringan membutuhkan kabel daya (oranye) terhubung ke outlet ini agar dapat menyala."
    },
    realWorldLook: {
      en: "A standard white or black power strip with multiple circular socket inputs pluggable to the main wall outlet.",
      id: "Terminal colokan listrik (stop kontak cabang) berwarna putih atau hitam untuk mencabangkan colokan listrik utama."
    }
  },
  modem: {
    title: { en: "Cable Modem (Modem)", id: "Modem Kabel (Modem)" },
    desc: {
      en: "Bridges the ISP coax signal and your local ethernet network. Connect Coax port to ISP, and Ethernet port to the Router's WAN port.",
      id: "Menhubungkan sinyal koaksial ISP dengan jaringan ethernet lokal Anda. Hubungkan port Coax ke ISP, dan port Ethernet ke port WAN Router."
    },
    realWorldLook: {
      en: "A standing vertical plastic box with glowing LED status indicators at the front and a brass threaded Coaxial input + RJ45 Ethernet port on the back.",
      id: "Kotak plastik vertikal dengan lampu indikator hijau/biru di depan, serta ulir koaksial kuningan dan port ethernet RJ45 di belakang."
    },
    videoUrl: "https://www.youtube.com/watch?v=kYJv1_dpe6Q"
  },
  router: {
    title: { en: "WiFi Router (Router)", id: "WiFi Router (Router)" },
    desc: {
      en: "Creates your local network and Wi-Fi. IMPORTANT: Cable from Modem MUST go to the WAN (Internet) port. Local PCs or Printers connect to LAN ports.",
      id: "Membuat jaringan lokal dan memancarkan Wi-Fi. PENTING: Kabel dari Modem HARUS dicolok ke port WAN (Internet). PC atau Printer lokal dicolok ke port LAN."
    },
    realWorldLook: {
      en: "A flat device with 2-4 tall antennas, featuring one distinct blue/yellow WAN/Internet port and 4 LAN ports side-by-side on the back.",
      id: "Alat ceper dengan 2-4 antena pemancar tegak, memiliki 1 port WAN/Internet terpisah (warna biru/kuning) dan 4 port LAN sejajar di belakang."
    },
    videoUrl: "https://www.youtube.com/watch?v=Fpqm2sTjQos"
  },
  switch: {
    title: { en: "Network Switch (Switch)", id: "Switch Jaringan (Switch)" },
    desc: {
      en: "Acts like an ethernet power strip. Expands a single LAN port from the router into many ports so you can connect multiple wired PCs and printers.",
      id: "Bertindak seperti colokan cabang ethernet. Memperbanyak port LAN dari router agar Anda dapat menghubungkan banyak PC dan printer lewat kabel."
    },
    realWorldLook: {
      en: "A long, flat metal/plastic box with a dense row of identical RJ45 Ethernet ports (ranging from 5 to 48 ports) with flashing green LEDs.",
      id: "Kotak logam datar panjang dengan deretan lubang colokan ethernet (RJ45) yang banyak dan identik, lengkap dengan lampu kedip hijau."
    },
    videoUrl: "https://www.youtube.com/watch?v=S016d7WJzII"
  },
  pc: {
    title: { en: "Workstation PC (Komputer)", id: "Komputer Klien (PC)" },
    desc: {
      en: "The endpoint computer. Needs power to run, and an ethernet cable to a router LAN port or switch port to access the local network and internet.",
      id: "Komputer akhir. Membutuhkan daya untuk menyala, dan kabel ethernet ke port LAN router atau port switch untuk mengakses jaringan lokal & internet."
    },
    realWorldLook: {
      en: "Standard computer chassis tower with a motherboard rear IO panel housing USB ports, audio jacks, and an RJ45 LAN network adapter port.",
      id: "Komputer desktop kotak besar dengan tombol daya di depan dan lubang ethernet RJ45 di belakang untuk koneksi jaringan."
    }
  },
  printer: {
    title: { en: "Network Printer (Printer)", id: "Printer Jaringan (Printer)" },
    desc: {
      en: "A shared printer. Connects to the local network via Ethernet so any PC connected to the same router can send documents to it.",
      id: "Printer bersama. Terhubung ke jaringan lokal via Ethernet agar PC mana pun yang terhubung ke router yang sama dapat mengirim dokumen cetak."
    },
    realWorldLook: {
      en: "An office printer machine with scanning glass, paper loading tray, and a built-in Ethernet network port next to its USB interface.",
      id: "Mesin pencetak kertas kantor dengan kaca pemindai, laci kertas, dan lubang colokan kabel LAN di sebelah colokan USB-nya."
    }
  }
};

function getMappedNetworkPuzzleData(puzzleData) {
  if (puzzleData.nodes && puzzleData.nodes.some(n => n.ports)) {
    return puzzleData;
  }

  const mappedNodes = puzzleData.nodes.map(n => {
    let ports = [];
    if (n.type === 'internet') {
      ports = [{ id: 'coax', label: 'Coax Link', type: 'coax' }, { id: 'eth', label: 'Ethernet', type: 'rj45' }];
    } else if (n.type === 'router') {
      ports = [
        { id: 'wan', label: 'WAN', type: 'rj45' },
        { id: 'lan1', label: 'LAN 1', type: 'rj45' },
        { id: 'lan2', label: 'LAN 2', type: 'rj45' },
        { id: 'lan3', label: 'LAN 3', type: 'rj45' },
        { id: 'power', label: 'Power', type: 'power' }
      ];
    } else if (n.type === 'modem') {
      ports = [
        { id: 'coax', label: 'Coax', type: 'coax' },
        { id: 'eth', label: 'Ethernet', type: 'rj45' },
        { id: 'power', label: 'Power', type: 'power' }
      ];
    } else if (n.type === 'pc' || n.type === 'pc1') {
      ports = [
        { id: 'eth', label: 'Ethernet', type: 'rj45' },
        { id: 'power', label: 'Power', type: 'power' }
      ];
    } else if (n.type === 'printer') {
      ports = [
        { id: 'eth', label: 'Ethernet', type: 'rj45' },
        { id: 'power', label: 'Power', type: 'power' }
      ];
    } else {
      ports = [{ id: 'eth', label: 'Ethernet', type: 'rj45' }];
    }

    return {
      ...n,
      powerOn: n.powerOn !== false,
      ports
    };
  });

  const needsPowerStrip = mappedNodes.some(n => n.type === 'router' || n.type === 'modem' || n.type === 'pc' || n.type === 'pc1' || n.type === 'printer');
  if (needsPowerStrip && !mappedNodes.some(n => n.type === 'power_outlet')) {
    mappedNodes.push({ id: 'outlet', type: 'power_outlet', label: 'Power Strip', x: 300, y: 320 });
  }

  const mappedConnections = [];

  if (puzzleData.connections) {
    puzzleData.connections.forEach(c => {
      const fromNode = mappedNodes.find(n => n.id === c.from);
      const toNode = mappedNodes.find(n => n.id === c.to);
      
      let fromPort = 'eth';
      let toPort = 'eth';
      let cableType = 'ethernet';

      if (c.label?.toLowerCase().includes('power') || c.id?.toLowerCase().includes('pwr') || c.id?.toLowerCase().includes('power')) {
        cableType = 'power';
        fromPort = 'p1';
        toPort = 'power';
        if (fromNode && fromNode.type !== 'power_outlet') {
          fromPort = 'power';
        }
      } else if (c.label?.toLowerCase().includes('coax') || c.id?.toLowerCase().includes('coax')) {
        cableType = 'coaxial';
        fromPort = 'coax';
        toPort = 'coax';
      } else {
        if (fromNode?.type === 'router') {
          const isWanTarget = toNode?.type === 'internet' || toNode?.type === 'modem';
          fromPort = isWanTarget ? 'wan' : (c.to === 'pc1' || c.to === 'pc' ? 'lan2' : 'lan1');
        } else if (toNode?.type === 'router') {
          const isWanSource = fromNode?.type === 'internet' || fromNode?.type === 'modem';
          toPort = isWanSource ? 'wan' : (c.from === 'pc1' || c.from === 'pc' ? 'lan2' : 'lan1');
        }
      }

      mappedConnections.push({
        id: c.id || `c_${Math.random().toString(36).substr(2, 9)}`,
        from: c.from,
        fromPort,
        to: c.to,
        toPort,
        cableType,
        damaged: c.broken || false
      });
    });
  }

  mappedNodes.forEach(node => {
    if (node.type === 'power_outlet' || node.type === 'internet') return;
    const hasPower = mappedConnections.some(c => (c.from === node.id || c.to === node.id) && c.cableType === 'power');
    if (!hasPower) {
      const outletConns = mappedConnections.filter(c => c.from === 'outlet' || c.to === 'outlet');
      const nextPort = `p${outletConns.length + 1}`;
      mappedConnections.push({
        id: `c_auto_pwr_${node.id}`,
        from: 'outlet',
        fromPort: nextPort,
        to: node.id,
        toPort: 'power',
        cableType: 'power',
        damaged: false
      });
    }
  });

  return {
    ...puzzleData,
    nodes: mappedNodes,
    connections: mappedConnections
  };
}

export default function NetworkSimPuzzle({ mission, onComplete, onFail, activeHighlightId }) {
  const { t, lang } = useLanguage();
  const rawPuzzleData = mission.puzzleData;
  const puzzleData = getMappedNetworkPuzzleData(rawPuzzleData);

  // Simulator state
  const [nodes, setNodes] = useState(() => 
    puzzleData.nodes.map(n => ({
      ...n,
      powerOn: n.powerOn !== false,
    }))
  );
  
  const [connections, setConnections] = useState(() => 
    puzzleData.connections.map(c => ({
      ...c,
      id: c.id || `c_${Math.random().toString(36).substr(2, 9)}`,
    }))
  );

  const [activeTool, setActiveTool] = useState('pointer'); // pointer, ethernet, coaxial, power, scissors
  const [activeLinkSource, setActiveLinkSource] = useState(null); // { nodeId, portId }
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  
  // Port menu overlay state
  const [portMenu, setPortMenu] = useState(null); // { nodeId, x, y, portType, action: 'source'|'target' }

  // Ping test state
  const [pingStatus, setPingStatus] = useState('idle'); // idle, pinging, success, fail
  const [pingLog, setPingLog] = useState([]);
  
  // Onboarding Tutorial & Glossary state
  const [showTutorial, setShowTutorial] = useState(false);
  const [showGuidebook, setShowGuidebook] = useState(false);
  const [currentTutorialSlide, setCurrentTutorialSlide] = useState(0);

  useEffect(() => {
    // Show tutorial automatically for the first play
    const hasSeenTutorial = localStorage.getItem('hasSeenNetTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
      localStorage.setItem('hasSeenNetTutorial', 'true');
    }
  }, []);

  const svgRef = useRef(null);

  // Trace the network on any state change
  const [networkState, setNetworkState] = useState({});
  useEffect(() => {
    const state = traceNetwork(nodes, connections);
    setNetworkState(state);
  }, [nodes, connections]);

  const advice = getNetworkDiagnosticAdvice(pingLog, nodes, connections, networkState, lang);

  // Drag and Drop States & Handlers
  const [dragOverNodeId, setDragOverNodeId] = useState(null);
  const [dragOverPortId, setDragOverPortId] = useState(null); // { nodeId, portId }
  const [activePortActionMenu, setActivePortActionMenu] = useState(null); // { nodeId, portId }

  const handleUnplug = (nodeId, portId) => {
    sound.wrong();
    setConnections(prev => prev.filter(c => 
      !((c.from === nodeId && c.fromPort === portId) ||
        (c.to === nodeId && c.toPort === portId))
    ));
  };

  const handleMoveCable = (nodeId, portId) => {
    const existing = connections.find(c => 
      (c.from === nodeId && c.fromPort === portId) ||
      (c.to === nodeId && c.toPort === portId)
    );
    if (!existing) return;

    sound.click();
    const otherNodeId = existing.from === nodeId ? existing.to : existing.from;
    const otherPortId = existing.from === nodeId ? existing.toPort : existing.fromPort;
    
    // Remove current connection
    setConnections(prev => prev.filter(c => c.id !== existing.id));
    
    // Put other end in hand
    setActiveLinkSource({ nodeId: otherNodeId, portId: otherPortId });

    // Set correct active tool based on cable type
    setActiveTool(existing.cableType);
  };

  const handleStartConnection = (nodeId, portId) => {
    sound.click();
    setActiveLinkSource({ nodeId, portId });

    const node = nodes.find(n => n.id === nodeId);
    const template = DEVICE_TEMPLATES[node.type];
    const port = template.ports.find(p => p.id === portId);
    if (port) {
      if (port.type === PORT_TYPES.POWER) setActiveTool('power');
      else if (port.type === PORT_TYPES.COAX) setActiveTool('coaxial');
      else setActiveTool('ethernet');
    }
  };

  const handlePortClickToConnect = (targetNodeId, targetPortId) => {
    if (!activeLinkSource) return;
    const { nodeId: sourceNodeId, portId: sourcePortId } = activeLinkSource;
    if (sourceNodeId === targetNodeId) {
      sound.wrong();
      setActiveLinkSource(null);
      return;
    }

    const sourceNode = nodes.find(n => n.id === sourceNodeId);
    const sourceTemplate = DEVICE_TEMPLATES[sourceNode.type];
    const sourcePort = sourceTemplate.ports.find(p => p.id === sourcePortId);

    const targetNode = nodes.find(n => n.id === targetNodeId);
    const targetTemplate = DEVICE_TEMPLATES[targetNode.type];
    const targetPort = targetTemplate.ports.find(p => p.id === targetPortId);

    if (!sourcePort || !targetPort) {
      setActiveLinkSource(null);
      return;
    }

    if (sourcePort.type !== targetPort.type) {
      sound.wrong();
      setActiveLinkSource(null);
      return;
    }

    // Remove existing connections on target port
    setConnections(prev => prev.filter(c => 
      !((c.from === targetNodeId && c.fromPort === targetPortId) ||
        (c.to === targetNodeId && c.toPort === targetPortId))
    ));

    const newConn = {
      id: `c_${Date.now()}`,
      from: sourceNodeId,
      fromPort: sourcePortId,
      to: targetNodeId,
      toPort: targetPortId,
      cableType: sourcePort.type === PORT_TYPES.POWER ? 'power' : sourcePort.type === PORT_TYPES.COAX ? 'coaxial' : 'ethernet',
      damaged: false
    };

    setConnections(prev => [...prev, newConn]);
    setActiveLinkSource(null);
    sound.cablePlug();
  };

  const handlePortDragStart = (nodeId, portId, e) => {
    e.dataTransfer.setData('nodeId', nodeId);
    e.dataTransfer.setData('portId', portId);
    
    // Check if port is already connected
    const existing = connections.find(c => 
      (c.from === nodeId && c.fromPort === portId) ||
      (c.to === nodeId && c.toPort === portId)
    );

    if (existing) {
      e.dataTransfer.setData('action', 'move');
      // Set the active link source as the OTHER end of the cable so they feel they are moving it!
      const otherNodeId = existing.from === nodeId ? existing.to : existing.from;
      const otherPortId = existing.from === nodeId ? existing.toPort : existing.fromPort;
      setActiveLinkSource({ nodeId: otherNodeId, portId: otherPortId });
    } else {
      e.dataTransfer.setData('action', 'new');
      setActiveLinkSource({ nodeId, portId });
      
      // Auto-set the activeTool based on port type to draw the right line type
      const node = nodes.find(n => n.id === nodeId);
      const template = DEVICE_TEMPLATES[node.type];
      const port = template.ports.find(p => p.id === portId);
      if (port) {
        if (port.type === PORT_TYPES.POWER) setActiveTool('power');
        else if (port.type === PORT_TYPES.COAX) setActiveTool('coaxial');
        else setActiveTool('ethernet');
      }
    }
    sound.click();
  };

  const handlePortDrop = (targetNodeId, targetPortId, e) => {
    e.preventDefault();
    const sourceNodeId = e.dataTransfer.getData('nodeId');
    const sourcePortId = e.dataTransfer.getData('portId');
    const action = e.dataTransfer.getData('action');

    if (!sourceNodeId || !sourcePortId) return;

    // Verify types
    const sourceNode = nodes.find(n => n.id === sourceNodeId);
    const sourceTemplate = DEVICE_TEMPLATES[sourceNode.type];
    const sourcePort = sourceTemplate.ports.find(p => p.id === sourcePortId);

    const targetNode = nodes.find(n => n.id === targetNodeId);
    const targetTemplate = DEVICE_TEMPLATES[targetNode.type];
    const targetPort = targetTemplate.ports.find(p => p.id === targetPortId);

    if (!sourcePort || !targetPort) return;
    if (sourcePort.type !== targetPort.type) {
      sound.wrong();
      setActiveLinkSource(null);
      return;
    }

    let connectionId = `c_${Date.now()}`;
    let isDamaged = false;

    if (action === 'move') {
      const existing = connections.find(c => 
        (c.from === sourceNodeId && c.fromPort === sourcePortId) ||
        (c.to === sourceNodeId && c.toPort === sourcePortId)
      );
      if (existing) {
        connectionId = existing.id;
        isDamaged = existing.damaged;
        setConnections(prev => prev.filter(c => c.id !== existing.id));
      }
    }

    // Remove existing connections on target port
    setConnections(prev => prev.filter(c => 
      !((c.from === targetNodeId && c.fromPort === targetPortId) ||
        (c.to === targetNodeId && c.toPort === targetPortId))
    ));

    const newConn = {
      id: connectionId,
      from: sourceNodeId,
      fromPort: sourcePortId,
      to: targetNodeId,
      toPort: targetPortId,
      cableType: sourcePort.type === PORT_TYPES.POWER ? 'power' : sourcePort.type === PORT_TYPES.COAX ? 'coaxial' : 'ethernet',
      damaged: isDamaged
    };

    setConnections(prev => [...prev, newConn]);
    setActiveLinkSource(null);
    sound.cablePlug();
  };

  const handleNodeDrop = (targetNodeId, e) => {
    e.preventDefault();
    const sourceNodeId = e.dataTransfer.getData('nodeId');
    const sourcePortId = e.dataTransfer.getData('portId');
    const action = e.dataTransfer.getData('action');

    if (!sourceNodeId || !sourcePortId) return;
    if (sourceNodeId === targetNodeId) {
      setActiveLinkSource(null);
      return; // prevent self connection
    }

    const targetNode = nodes.find(n => n.id === targetNodeId);
    const targetTemplate = DEVICE_TEMPLATES[targetNode.type];
    
    const sourceNode = nodes.find(n => n.id === sourceNodeId);
    const sourceTemplate = DEVICE_TEMPLATES[sourceNode.type];
    const sourcePort = sourceTemplate.ports.find(p => p.id === sourcePortId);
    if (!sourcePort) {
      setActiveLinkSource(null);
      return;
    }

    // Find compatible ports
    const matchingPorts = targetTemplate.ports.filter(p => p.type === sourcePort.type);
    if (matchingPorts.length === 0) {
      sound.wrong();
      setActiveLinkSource(null);
      return;
    }

    // Find first empty matching port, or fallback to the first port
    const emptyPort = matchingPorts.find(tp => {
      const isBusy = connections.some(c => 
        (c.from === targetNodeId && c.fromPort === tp.id) ||
        (c.to === targetNodeId && c.toPort === tp.id)
      );
      return !isBusy;
    });

    const selectedPortId = emptyPort ? emptyPort.id : matchingPorts[0].id;

    let connectionId = `c_${Date.now()}`;
    let isDamaged = false;
    if (action === 'move') {
      const existing = connections.find(c => 
        (c.from === sourceNodeId && c.fromPort === sourcePortId) ||
        (c.to === sourceNodeId && c.toPort === sourcePortId)
      );
      if (existing) {
        connectionId = existing.id;
        isDamaged = existing.damaged;
        setConnections(prev => prev.filter(c => c.id !== existing.id));
      }
    }

    // Remove existing connections on target port
    setConnections(prev => prev.filter(c => 
      !((c.from === targetNodeId && c.fromPort === selectedPortId) ||
        (c.to === targetNodeId && c.toPort === selectedPortId))
    ));

    const newConn = {
      id: connectionId,
      from: sourceNodeId,
      fromPort: sourcePortId,
      to: targetNodeId,
      toPort: selectedPortId,
      cableType: sourcePort.type === PORT_TYPES.POWER ? 'power' : sourcePort.type === PORT_TYPES.COAX ? 'coaxial' : 'ethernet',
      damaged: isDamaged
    };

    setConnections(prev => [...prev, newConn]);
    setActiveLinkSource(null);
    sound.cablePlug();
  };

  // Check if mission goal is met
  const isGoalMet = () => {
    // A mission is won if all target connections are correct and all devices are powered/connected.
    // The specific test is typically: Can the PC ping the internet?
    // Let's look at puzzleData.winCondition (e.g. pc has internet, or all cables in correct ports)
    // By default: all endpoints (like PC/Printer) that were broken or disconnected are now verified online.
    const pcNode = nodes.find(n => n.type === 'pc');
    const pcState = pcNode ? networkState[pcNode.id] : null;
    
    // Check if any expected connections are wrong
    const hasWrongConnections = connections.some(conn => {
      // Find if there is a wrongPort rule in the mission's connection list
      const original = puzzleData.connections.find(orig => orig.id === conn.id || (orig.from === conn.from && orig.to === conn.to));
      if (original && original.correctPort) {
        if (conn.fromPort !== original.correctPort && conn.toPort !== original.correctPort) {
          return true;
        }
      }
      return false;
    });

    if (puzzleData.winCondition === 'all_cables_correct') {
      return !hasWrongConnections && connections.length === puzzleData.connections.length && connections.every(c => !c.damaged);
    }

    // Default: PC and Printer (if exists) must have internet signal, and no damaged cables
    const endpoints = nodes.filter(n => n.type === 'pc' || n.type === 'printer');
    const allEndpointsOnline = endpoints.every(ep => networkState[ep.id]?.hasInternet);
    const noDamagedCables = connections.every(c => !c.damaged);

    return allEndpointsOnline && noDamagedCables;
  };

  // Node Dragging Logic
  const handleDrag = (nodeId, info) => {
    setNodes(prev => prev.map(n => {
      if (n.id === nodeId) {
        // SVG coordinates conversion: viewBox is 600 x 400
        const bounds = svgRef.current?.getBoundingClientRect();
        if (!bounds) return n;
        
        const scaleX = 600 / bounds.width;
        const scaleY = 400 / bounds.height;
        
        const newX = n.x + info.delta.x * scaleX;
        const newY = n.y + info.delta.y * scaleY;
        
        // Clamp inside bounds
        return {
          ...n,
          x: Math.max(40, Math.min(560, newX)),
          y: Math.max(40, Math.min(360, newY))
        };
      }
      return n;
    }));
  };

  // Port connection click handler
  const handleDeviceClick = (nodeId, e) => {
    e.stopPropagation();
    
    if (activeTool === 'pointer') {
      setSelectedNodeId(nodeId);
      sound.click();
      return;
    }

    if (activeTool === 'scissors') {
      // Disconnect all cables connected to this node
      sound.wrong();
      setConnections(prev => prev.filter(c => c.from !== nodeId && c.to !== nodeId));
      return;
    }

    // Cable Drawing Mode
    const bounds = svgRef.current.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    const node = nodes.find(n => n.id === nodeId);
    const template = DEVICE_TEMPLATES[node.type];
    
    // Find cable tool properties
    const toolCableInfo = Object.values(CABLE_TYPES).find(c => c.id === activeTool);
    if (!toolCableInfo) return;

    // Filter ports matching this cable type
    const matchingPorts = template.ports.filter(p => p.type === toolCableInfo.portType);

    if (matchingPorts.length === 0) {
      sound.wrong();
      return;
    }

    // Open port selection menu
    setPortMenu({
      nodeId,
      x: (node.x / 600) * bounds.width,
      y: (node.y / 400) * bounds.height - 20,
      ports: matchingPorts,
      action: activeLinkSource ? 'target' : 'source'
    });
    sound.click();
  };

  // Handle port selection in the popup menu
  const selectPort = (portId) => {
    const nodeId = portMenu.nodeId;
    setPortMenu(null);

    // Get current connection state of this port
    const isPortBusy = connections.some(c => 
      (c.from === nodeId && c.fromPort === portId) || 
      (c.to === nodeId && c.toPort === portId)
    );

    if (isPortBusy && !activeLinkSource) {
      // Unplug existing connection on this port
      const connToDisconnect = connections.find(c => 
        (c.from === nodeId && c.fromPort === portId) || 
        (c.to === nodeId && c.toPort === portId)
      );
      if (connToDisconnect) {
        sound.wrong();
        setConnections(prev => prev.filter(c => c.id !== connToDisconnect.id));
        
        // Put the unplugged cable end back in hand to move it
        const remainingNodeId = connToDisconnect.from === nodeId ? connToDisconnect.to : connToDisconnect.from;
        const remainingPortId = connToDisconnect.from === nodeId ? connToDisconnect.toPort : connToDisconnect.fromPort;
        setActiveLinkSource({ nodeId: remainingNodeId, portId: remainingPortId });
      }
      return;
    }

    if (!activeLinkSource) {
      // Start connection
      setActiveLinkSource({ nodeId, portId });
      sound.click();
    } else {
      // Complete connection
      const source = activeLinkSource;
      
      // Prevent connecting to same device
      if (source.nodeId === nodeId) {
        sound.wrong();
        setActiveLinkSource(null);
        return;
      }

      // Add connection
      const newConn = {
        id: `c_${Date.now()}`,
        from: source.nodeId,
        fromPort: source.portId,
        to: nodeId,
        toPort: portId,
        cableType: activeTool,
        damaged: false
      };
      
      setConnections(prev => [...prev, newConn]);
      setActiveLinkSource(null);
      sound.cablePlug();
    }
  };

  // Click on a cable to unplug/delete it
  const handleCableClick = (connId, e) => {
    e.stopPropagation();
    if (activeTool === 'scissors' || activeTool === 'pointer') {
      sound.wrong();
      setConnections(prev => prev.filter(c => c.id !== connId));
    }
  };

  // Track mouse coordinates on SVG to draw the cursor cable
  const handleMouseMove = (e) => {
    if (!activeLinkSource || !svgRef.current) return;
    const bounds = svgRef.current.getBoundingClientRect();
    
    // Convert client coordinates to SVG coordinates (0-600, 0-400)
    const x = ((e.clientX - bounds.left) / bounds.width) * 600;
    const y = ((e.clientY - bounds.top) / bounds.height) * 400;
    setMousePos({ x, y });
  };

  // Cancel cable drawing if clicking on empty workspace space
  const handleWorkspaceClick = () => {
    setActiveLinkSource(null);
    setPortMenu(null);
    setSelectedNodeId(null);
    setActivePortActionMenu(null);
  };

  // Toggle Power on inspected device
  const toggleDevicePower = (nodeId) => {
    setNodes(prev => prev.map(n => 
      n.id === nodeId ? { ...n, powerOn: !n.powerOn } : n
    ));
    sound.click();
    if (nodes.find(n => n.id === nodeId).powerOn) {
      setTimeout(() => sound.powerOn(), 100);
    }
  };

  // Run ping test
  const handlePingTest = async () => {
    if (pingStatus === 'pinging') return;
    
    setPingStatus('pinging');
    setPingLog(['Initiating diagnostic ping to Gateway...', 'Tracing network path...']);
    sound.routerBeep();

    await new Promise(r => setTimeout(r, 800));

    // Determine path from PC to Internet
    const pcNode = nodes.find(n => n.type === 'pc');
    const pcState = pcNode ? networkState[pcNode.id] : null;

    if (!pcNode) {
      setPingLog(prev => [...prev, 'ERROR: Host PC not found.']);
      setPingStatus('fail');
      sound.wrong();
      return;
    }

    if (!pcState?.powered) {
      setPingLog(prev => [...prev, 'PING FAILED: Host PC has no power!']);
      setPingStatus('fail');
      sound.wrong();
      return;
    }

    // Trace path
    const pathNodes = [];
    let currentId = pcNode.id;
    let success = true;
    let failReason = '';

    // A simple trace path logic to explain connectivity issues to the player:
    const checked = new Set();
    
    const findNextHop = (id) => {
      if (checked.has(id)) return null;
      checked.add(id);

      const node = nodes.find(n => n.id === id);
      const state = networkState[id];

      // Find connections linked to this node's active ethernet ports
      const conns = connections.filter(c => !c.damaged && (c.from === id || c.to === id));
      for (let c of conns) {
        const nextId = c.from === id ? c.to : c.from;
        const nextNode = nodes.find(n => n.id === nextId);
        
        // If it's internet node, we reached the destination!
        if (nextNode.type === 'internet') {
          return nextNode;
        }

        // If the next node is powered and has internet signal, it's a valid hop
        if (networkState[nextId]?.powered) {
          return nextNode;
        }
      }
      return null;
    };

    // Build trace log
    setPingLog(prev => [...prev, `[HOP 1] Requesting reply from Local PC (${pcNode.label || 'PC'})`]);
    await new Promise(r => setTimeout(r, 600));

    // Find if PC's port is connected
    const pcConn = connections.find(c => c.from === pcNode.id || c.to === pcNode.id);
    if (!pcConn) {
      setPingLog(prev => [...prev, 'PING FAILED: Ethernet cable is unplugged from the PC.']);
      setPingStatus('fail');
      sound.wrong();
      return;
    }

    if (pcConn.damaged) {
      setPingLog(prev => [...prev, 'PING FAILED: Hardware Error — Ethernet cable is damaged!']);
      setPingStatus('fail');
      sound.wrong();
      return;
    }

    // Check Router WAN connection specifically if it's the router misconfiguration mission
    const routerNode = nodes.find(n => n.type === 'router');
    if (routerNode) {
      const routerState = networkState[routerNode.id];
      setPingLog(prev => [...prev, `[HOP 2] Ping Gateway (${routerNode.label || 'Router'})`]);
      await new Promise(r => setTimeout(r, 600));

      if (!routerState?.powered) {
        setPingLog(prev => [...prev, 'PING FAILED: Router has no power!']);
        setPingStatus('fail');
        sound.wrong();
        return;
      }

      // Check if PC is connected to Router's WAN port by mistake
      const pcToRouterWan = connections.some(c => 
        (c.from === pcNode.id && c.to === routerNode.id && c.toPort === 'wan') ||
        (c.to === pcNode.id && c.from === routerNode.id && c.fromPort === 'wan')
      );

      if (pcToRouterWan) {
        setPingLog(prev => [...prev, 'PING FAILED: Local PC connected directly to Router\'s WAN port. Host unreachable.']);
        setPingStatus('fail');
        sound.wrong();
        return;
      }

      // Check if Router's WAN port is connected to modem correctly
      const routerWanConn = connections.find(c => 
        (c.from === routerNode.id && c.fromPort === 'wan') || 
        (c.to === routerNode.id && c.toPort === 'wan')
      );

      if (!routerWanConn) {
        setPingLog(prev => [...prev, 'PING FAILED: Gateway WAN port disconnected. DNS resolve failed.']);
        setPingStatus('fail');
        sound.wrong();
        return;
      }

      // Check if Router WAN is connected to modem's LAN port or somewhere else (or Internet source if no modem is present)
      const wanTargetId = routerWanConn.from === routerNode.id ? routerWanConn.to : routerWanConn.from;
      const wanTargetNode = nodes.find(n => n.id === wanTargetId);
      
      const hasModem = nodes.some(n => n.type === 'modem');
      const expectedType = hasModem ? 'modem' : 'internet';
      
      if (wanTargetNode.type !== expectedType) {
        setPingLog(prev => [...prev, `PING FAILED: WAN port connected to wrong device. Expected connection to ${expectedType === 'modem' ? 'Modem' : 'Internet'}.`]);
        setPingStatus('fail');
        sound.wrong();
        return;
      }
    }

    const goalMet = isGoalMet();
    if (goalMet) {
      setPingLog(prev => [
        ...prev,
        'Reply from 8.8.8.8: bytes=32 time=12ms TTL=54',
        'Reply from 8.8.8.8: bytes=32 time=10ms TTL=54',
        'PING SUCCESS: Connection fully verified!'
      ]);
      setPingStatus('success');
      sound.correct();
      setTimeout(() => onComplete?.(), 2000);
    } else {
      setPingLog(prev => [
        ...prev,
        'Request timed out.',
        'Request timed out.',
        'PING FAILED: Internet unreachable. Verify physical topology cabling.'
      ]);
      setPingStatus('fail');
      sound.wrong();
    }
  };

  const selectedNode = nodes.find(n => n.id === selectedNodeId);
  const selectedNodeTemplate = selectedNode ? DEVICE_TEMPLATES[selectedNode.type] : null;
  const selectedNodeState = selectedNode ? networkState[selectedNodeId] : null;

  const tutorialSlides = [
    {
      titleEn: "Welcome to Network Sim! 🌐",
      titleId: "Selamat Datang di Simulasi Jaringan! 🌐",
      bodyEn: "Your goal is to route the internet signal from the ISP source to the client workstation PC. Signal path is indicated by glowing green animated dots flow.",
      bodyId: "Tujuan Anda adalah mengalirkan sinyal internet dari sumber ISP ke komputer PC klien. Jalur sinyal ditunjukkan oleh aliran titik hijau menyala yang bergerak.",
      tipEn: "Tip: Connect devices in sequence: ISP ➔ Modem ➔ Router WAN ➔ LAN ➔ PC.",
      tipId: "Tips: Hubungkan perangkat berurutan: ISP ➔ Modem ➔ Router WAN ➔ LAN ➔ PC."
    },
    {
      titleEn: "Connecting Cables 🔌",
      titleId: "Menghubungkan Kabel 🔌",
      bodyEn: "Select a cable tool (Ethernet, Coax, or Power) from the bottom tray. Click the source device, choose a port, then click the destination device and port to plug it in!",
      bodyId: "Pilih jenis kabel (Ethernet, Koaksial, atau Daya) dari baki di bawah. Klik perangkat asal, pilih port, lalu klik perangkat tujuan dan port tujuan untuk mencolokkannya!",
      tipEn: "Tip: Click a free port inside the ports pop-up menu to plug the wire.",
      tipId: "Tips: Klik port yang kosong pada menu pop-up port untuk mencolokkan kabel."
    },
    {
      titleEn: "Managing Power ⚡",
      titleId: "Mengelola Daya Listrik ⚡",
      bodyEn: "Devices need electricity to run! Connect their Power port to the Wall Power Outlet (Power Strip) using a Power Cable (orange). Once powered physically, click the device with the Pointer tool and toggle its Power button to ON.",
      bodyId: "Perangkat butuh listrik untuk menyala! Hubungkan port Power ke Sumber Listrik (Power Strip) menggunakan Kabel Daya (oranye). Setelah terhubung fisik, klik perangkat dengan alat Pointer lalu ubah tombol Power ke ON.",
      tipEn: "Tip: Check the green/red LED on the top-left of each device to see power state.",
      tipId: "Tips: Lihat lampu LED hijau/merah di kiri atas perangkat untuk melihat status daya."
    },
    {
      titleEn: "WAN vs LAN Rule 📶",
      titleId: "Aturan Penting: WAN vs LAN 📶",
      bodyEn: "The cable from the Modem must plug into the Router's WAN (Internet) port. Local client devices (PCs, Printers, Switches) must connect to the Router's LAN ports (LAN1, LAN2, LAN3). Mixing them up will break the internet routing!",
      bodyId: "Kabel dari Modem harus dicolokkan ke port WAN (Internet) Router. Perangkat klien lokal (PC, Printer, Switch) harus dicolokkan ke port LAN Router (LAN1, LAN2, LAN3). Jika tertukar, rute internet tidak akan berfungsi!",
      tipEn: "Tip: WAN port receives internet. LAN ports share internet.",
      tipId: "Tips: Port WAN menerima internet. Port LAN membagikan internet."
    },
    {
      titleEn: "ICMP Diagnostics & Verification 💻",
      titleId: "Verifikasi & Tes Ping 💻",
      bodyEn: "Ready to test? Press 'RUN DIAGNOSTIC PING TEST' at the bottom right. The terminal will trace the hop-by-hop ping path. If all devices are powered and connected properly, the ping test completes successfully!",
      bodyId: "Siap menguji? Tekan 'RUN DIAGNOSTIC PING TEST' di kanan bawah. Terminal akan melacak jalur ping hop demi hop. Jika seluruh perangkat terhubung & menyala dengan benar, tes ping akan sukses!",
      tipEn: "Tip: Click 'Ask IT Mentor' at the top if you need specific step directions!",
      tipId: "Tips: Klik 'Ask IT Mentor' di atas jika Anda butuh petunjuk langkah spesifik!"
    }
  ];

  return (
    <div className="space-y-4">
      {/* Topology Header Info */}
      <div className="glass rounded-xl p-4 border border-white/10 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">Cabling & Port Diagnostics</p>
          <p className="text-sm text-[var(--neon-green)] font-bold">{puzzleData.symptom || 'Fix the physical network topology to restore connectivity!'}</p>
        </div>

        {/* Action Buttons for Beginners */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => { sound.click(); setCurrentTutorialSlide(0); setShowTutorial(true); }}
            className="px-3 py-1.5 rounded-lg border border-[var(--neon-yellow)]/30 bg-[rgba(255,230,0,0.08)] text-[var(--neon-yellow)] hover:bg-[rgba(255,230,0,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(255,230,0,0.1)]"
          >
            <span>🎓</span>
            <span>{lang === 'id' ? 'Tutorial Jaringan' : 'Network Tutorial'}</span>
          </button>
          
          <button
            onClick={() => { sound.click(); setShowGuidebook(true); }}
            className="px-3 py-1.5 rounded-lg border border-[var(--neon-cyan)]/30 bg-[rgba(0,245,255,0.08)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-[0_0_8px_rgba(0,245,255,0.1)]"
          >
            <span>📖</span>
            <span>{lang === 'id' ? 'Kamus Perangkat' : 'Device Glossary'}</span>
          </button>
        </div>

        <div className="flex gap-4 text-xs font-mono text-white/40">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--neon-green)] animate-pulse" />
            <span>Active Link</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--neon-pink)]" />
            <span>Fault / Damaged</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            <span>Unplugged</span>
          </div>
        </div>
      </div>

      {/* Main Workspace Frame */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10" style={{ background: '#03070e' }}>
        {/* Workspace Canvas (SVG) */}
        <svg
          ref={svgRef}
          width="100%"
          viewBox="0 0 600 400"
          className="block select-none touch-none"
          style={{ height: 360 }}
          onMouseMove={handleMouseMove}
          onClick={handleWorkspaceClick}
        >
          {/* Cyber grid background */}
          <defs>
            <pattern id="simGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(0, 245, 255, 0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#simGrid)" />

          {/* Render Connections (Cables) */}
          {connections.map(conn => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            const isDataActive = networkState[conn.from]?.activePorts[conn.fromPort] && 
                                 networkState[conn.to]?.activePorts[conn.toPort];

            // Define Bezier curve paths between nodes for natural cable sag
            const dx = toNode.x - fromNode.x;
            const dy = toNode.y - fromNode.y;
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2 + Math.abs(dx) * 0.08; // curve downwards

            const cableColor = CABLE_TYPES[conn.cableType]?.color || '#ffffff';
            const isDamaged = conn.damaged;
            const isHighlighted = activeHighlightId === conn.id ||
                                  activeHighlightId === `c_${conn.from}_to_${conn.to}` ||
                                  activeHighlightId === `c_${conn.to}_to_${conn.from}`;

            return (
              <g key={conn.id} onClick={(e) => handleCableClick(conn.id, e)} className="cursor-pointer group">
                {/* Thick hover/click boundary */}
                <path
                  d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke="transparent"
                  strokeWidth="15"
                />
                {/* Cable outer glow */}
                <path
                  d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke={isDamaged ? '#ff2d78' : isHighlighted ? '[var(--neon-pink)]' : isDataActive ? '#39ff14' : cableColor}
                  strokeWidth={isHighlighted ? 8 : isDamaged ? 3.5 : 2}
                  strokeOpacity={isHighlighted ? 0.95 : isDataActive ? 0.35 : 0.2}
                  className={`transition-all duration-300 ${isHighlighted ? 'animate-pulse' : ''}`}
                  style={isHighlighted ? { filter: 'drop-shadow(0 0 8px [var(--neon-pink)])' } : {}}
                />
                {/* Cable center wire */}
                <path
                  d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                  fill="none"
                  stroke={isDamaged ? '#ff2d78' : isHighlighted ? '[var(--neon-pink)]' : cableColor}
                  strokeWidth={isHighlighted ? 3 : 1.5}
                  strokeDasharray={isDamaged ? '5,3' : '0'}
                  className="transition-all duration-300"
                />
                
                {/* Animated packets flow inside ethernet/data cables */}
                {isDataActive && conn.cableType !== 'power' && (
                  <path
                    d={`M ${fromNode.x} ${fromNode.y} Q ${midX} ${midY} ${toNode.x} ${toNode.y}`}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth={1.5}
                    strokeDasharray="5,20"
                    strokeDashoffset="100"
                    style={{
                      animation: 'dash 2s linear infinite',
                    }}
                  />
                )}

                {/* Cable Labels (Ports connected) */}
                <text
                  x={midX}
                  y={midY - 8}
                  fill="rgba(255,255,255,0.4)"
                  fontSize="7"
                  fontFamily="monospace"
                  textAnchor="middle"
                  className="opacity-0 group-hover:opacity-100 transition-opacity bg-black pointer-events-none"
                >
                  {`${fromNode.label || fromNode.id} [${conn.fromPort}] ── [${conn.toPort}] ${toNode.label || toNode.id}`}
                </text>
              </g>
            );
          })}

          {/* Active drawing connection line (leads from source port to cursor) */}
          {activeLinkSource && (
            (() => {
              const srcNode = nodes.find(n => n.id === activeLinkSource.nodeId);
              if (!srcNode) return null;
              
              const toolInfo = Object.values(CABLE_TYPES).find(c => c.id === activeTool);
              const cableColor = toolInfo?.color || '#ffffff';
              
              return (
                <line
                  x1={srcNode.x}
                  y1={srcNode.y}
                  x2={mousePos.x}
                  y2={mousePos.y}
                  stroke={cableColor}
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                  className="pointer-events-none"
                />
              );
            })()
          )}

          {/* Render Nodes (Devices) */}
          {nodes.map(node => {
            const isSelected = selectedNodeId === node.id;
            const state = networkState[node.id] || {};
            const template = DEVICE_TEMPLATES[node.type] || {};

            return (
              <g
                key={node.id}
                transform={`translate(0, 0)`}
                onClick={(e) => handleDeviceClick(node.id, e)}
                style={{ cursor: activeTool === 'pointer' ? 'move' : 'pointer' }}
                className="group"
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverNodeId(node.id);
                }}
                onDragLeave={() => setDragOverNodeId(null)}
                onDrop={(e) => {
                  setDragOverNodeId(null);
                  handleNodeDrop(node.id, e);
                }}
              >
                {/* Visual Glow when dragover */}
                {dragOverNodeId === node.id && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={34}
                    fill="none"
                    stroke="var(--neon-cyan)"
                    strokeWidth="2.5"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 10px var(--neon-cyan))' }}
                  />
                )}

                {/* Visual Glow behind selected device */}
                {isSelected && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={32}
                    fill="none"
                    stroke="rgba(0, 245, 255, 0.4)"
                    strokeWidth="1.5"
                    strokeDasharray="4,2"
                    className="animate-spin"
                    style={{ transformOrigin: `${node.x}px ${node.y}px`, animationDuration: '8s' }}
                  />
                )}

                {/* Highlight ring for guided steps */}
                {activeHighlightId === node.id && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={36}
                    fill="none"
                    stroke="var(--neon-pink)"
                    strokeWidth="3"
                    className="animate-pulse"
                    style={{ filter: 'drop-shadow(0 0 8px var(--neon-pink))' }}
                  />
                )}

                {/* Device physical outer ring */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={26}
                  fill={isSelected ? '#0c1a2e' : '#080d16'}
                  stroke={isSelected ? '[var(--neon-cyan)]' : state.powered ? '#39ff14' : 'rgba(255,255,255,0.15)'}
                  strokeWidth="1.5"
                  className="transition-all duration-300"
                />

                {/* Device Emoji Icon */}
                <text
                  x={node.x}
                  y={node.y + 6}
                  textAnchor="middle"
                  fontSize="20"
                  className="select-none pointer-events-none"
                >
                  {template.emoji || '❓'}
                </text>

                {/* LED indicators for Power & Network */}
                {template.needsPower && (
                  <circle
                    cx={node.x - 14}
                    cy={node.y - 14}
                    r={3}
                    fill={state.powered ? '#39ff14' : '#ff2d78'}
                    stroke="#000"
                    strokeWidth="0.5"
                  />
                )}
                <circle
                  cx={node.x + 14}
                  cy={node.y - 14}
                  r={3}
                  fill={state.hasInternet ? '#00f5ff' : 'rgba(255,255,255,0.15)'}
                  stroke="#000"
                  strokeWidth="0.5"
                />

                {/* Device Label Text */}
                <text
                  x={node.x}
                  y={node.y + 36}
                  textAnchor="middle"
                  fill="white"
                  fillOpacity={isSelected ? 1 : 0.65}
                  fontSize="9"
                  fontFamily="monospace"
                  className="pointer-events-none select-none"
                >
                  {node.label || template.name}
                </text>

                {/* Node Drag Area (hidden, makes dragging smooth) */}
                {activeTool === 'pointer' && (
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={26}
                    fill="transparent"
                    className="cursor-move"
                    // HTML native drag mapping using delta math
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      setSelectedNodeId(node.id);
                      
                      let lastX = e.clientX;
                      let lastY = e.clientY;
                      
                      const handleMouseMoveDrag = (moveEvent) => {
                        const deltaX = moveEvent.clientX - lastX;
                        const deltaY = moveEvent.clientY - lastY;
                        
                        lastX = moveEvent.clientX;
                        lastY = moveEvent.clientY;
                        
                        handleDrag(node.id, { delta: { x: deltaX, y: deltaY } });
                      };
                      
                      const handleMouseUpDrag = () => {
                        window.removeEventListener('mousemove', handleMouseMoveDrag);
                        window.removeEventListener('mouseup', handleMouseUpDrag);
                      };
                      
                      window.addEventListener('mousemove', handleMouseMoveDrag);
                      window.addEventListener('mouseup', handleMouseUpDrag);
                    }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Floating Port Selection Popup (when connecting cables) */}
        {portMenu && (
          <div
            className="absolute z-30 bg-black/90 border border-white/20 rounded-xl p-2.5 shadow-2xl flex flex-col gap-1 text-xs"
            style={{
              left: portMenu.x - 70,
              top: portMenu.y - 50,
              width: 140,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="font-bold text-white/50 text-[10px] uppercase border-b border-white/10 pb-1 mb-1 text-center">
              {portMenu.action === 'source' ? 'Plug Cable Source' : 'Connect Destination'}
            </p>
            {portMenu.ports.map(port => {
              // Check if port is currently connected
              const activeConn = connections.find(c => 
                (c.from === portMenu.nodeId && c.fromPort === port.id) || 
                (c.to === portMenu.nodeId && c.toPort === port.id)
              );

              return (
                <button
                  key={port.id}
                  onClick={() => selectPort(port.id)}
                  className={`w-full text-left px-2 py-1.5 rounded-lg flex items-center justify-between text-xs transition-all ${
                    activeConn 
                      ? 'bg-[rgba(255,45,120,0.1)] text-[var(--neon-pink)] hover:bg-[rgba(255,45,120,0.2)]'
                      : 'text-white/80 hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-[11px]">{port.label || port.id}</span>
                  <span className="text-[10px]">{activeConn ? '🔌 Unplug' : '🟢 Free'}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Cable Tool Tray */}
      <div className="glass rounded-xl p-3 border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => { sound.click(); setActiveTool('pointer'); setActiveLinkSource(null); }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'pointer'
                ? 'border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.12)] text-[var(--neon-cyan)]'
                : 'border-white/10 text-white/60 hover:border-white/20'
            }`}
          >
            🖐️ Move & Inspect
          </button>
          
          <div className="w-px h-6 bg-white/10 mx-1" />

          {Object.entries(CABLE_TYPES).map(([key, value]) => (
            <button
              key={key}
              onClick={() => { sound.click(); setActiveTool(value.id); setActiveLinkSource(null); }}
              className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activeTool === value.id
                  ? 'border-white bg-white/10 text-white shadow-md'
                  : 'border-white/10 text-white/60 hover:border-white/20'
              }`}
              style={{
                borderColor: activeTool === value.id ? value.color : 'rgba(255,255,255,0.1)',
                boxShadow: activeTool === value.id ? `0 0 10px ${value.color}40` : 'none'
              }}
            >
              🔌 {value.label.split(' ')[0]}
            </button>
          ))}

          <div className="w-px h-6 bg-white/10 mx-1" />

          <button
            onClick={() => { sound.click(); setActiveTool('scissors'); setActiveLinkSource(null); }}
            className={`px-3 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTool === 'scissors'
                ? 'border-[var(--neon-pink)] bg-[rgba(255,45,120,0.12)] text-[var(--neon-pink)]'
                : 'border-white/10 text-white/60 hover:border-white/20'
            }`}
          >
            ✂️ Disconnect Tool
          </button>
        </div>

        {activeLinkSource && (
          <div className="text-xs text-[var(--neon-cyan)] font-bold animate-pulse">
            ⚡ Dragging cable: click another device to plug in...
          </div>
        )}
      </div>

      {/* Main Bottom Section: Device Inspector and Diagnostic Ping Terminal */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Device Inspector Panel */}
        <div className="glass rounded-2xl border border-white/10 p-4 flex flex-col min-h-[220px]">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3">
            📁 Device Properties Inspector
          </h3>

          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{selectedNodeTemplate.emoji}</span>
                      <div>
                        <h4 className="font-bold text-white text-sm">{selectedNode.label || selectedNodeTemplate.name}</h4>
                        <p className="text-[10px] text-white/40 uppercase tracking-wider font-mono">ID: {selectedNode.id}</p>
                      </div>
                    </div>
                    {/* Power Switch */}
                    {selectedNodeTemplate.needsPower && (
                      <button
                        onClick={() => toggleDevicePower(selectedNode.id)}
                        className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-all ${
                          selectedNode.powerOn
                            ? 'bg-[rgba(57,255,20,0.1)] border-[var(--neon-green)] text-[var(--neon-green)]'
                            : 'bg-white/5 border-white/10 text-white/40'
                        }`}
                      >
                        ⚡ Power: {selectedNode.powerOn ? 'ON' : 'OFF'}
                      </button>
                    )}
                  </div>

                  {/* Device properties list */}
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs font-mono">
                    <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                      <p className="text-[10px] text-white/30">IP Address</p>
                      <p className="text-white font-bold">{selectedNode.ipAddress || '192.168.1.1'}</p>
                    </div>
                    <div className="bg-white/[0.02] border border-white/5 p-2 rounded-lg">
                      <p className="text-[10px] text-white/30">Subnet Mask</p>
                      <p className="text-white/60">255.255.255.0</p>
                    </div>
                  </div>

                  {/* Device Glossary Description Card */}
                  {DEVICE_GLOSSARY[selectedNode.type] && (
                    <div className="mt-3 bg-[rgba(0,245,255,0.03)] border border-[rgba(0,245,255,0.12)] p-2.5 rounded-xl text-xs">
                      <div className="flex items-center gap-1.5 mb-1 text-[var(--neon-cyan)] font-bold font-mono text-[10px] uppercase">
                        <span>💡</span>
                        <span>{DEVICE_GLOSSARY[selectedNode.type].title[lang] || DEVICE_GLOSSARY[selectedNode.type].title['en']}</span>
                      </div>
                      <p className="text-white/70 leading-relaxed text-[10px] font-sans">
                        {DEVICE_GLOSSARY[selectedNode.type].desc[lang] || DEVICE_GLOSSARY[selectedNode.type].desc['en']}
                      </p>
                    </div>
                  )}

                  {/* Physical back ports panel representation */}
                  <div className="mt-4">
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span>{lang === 'id' ? 'Konektor Panel Belakang' : 'Back Panel Ports & Jacks'}</span>
                      <span className="text-[8px] text-[var(--neon-cyan)] normal-case animate-pulse-slow">
                        ✨ {lang === 'id' ? 'Drag & Drop atau Klik untuk Pindah' : 'Drag & Drop or Click to Move'}
                      </span>
                    </p>
                    <div className="flex gap-2.5 flex-wrap bg-black/60 p-2.5 rounded-xl border border-white/5">
                      {selectedNodeTemplate.ports.map(port => {
                        const isPortConnected = connections.some(c => 
                          (c.from === selectedNode.id && c.fromPort === port.id) ||
                          (c.to === selectedNode.id && c.toPort === port.id)
                        );
                        const isPortActive = selectedNodeState?.activePorts[port.id];

                        let portBg = 'bg-zinc-800 border-zinc-700';
                        if (port.type === PORT_TYPES.POWER) portBg = 'bg-zinc-900 border-zinc-950 rounded-full';
                        if (port.type === PORT_TYPES.COAX) portBg = 'bg-slate-700 border-slate-600 rounded-full';

                        // Check if this port is drag-hovered
                        const isDragHovered = dragOverPortId?.nodeId === selectedNode.id && dragOverPortId?.portId === port.id;

                        // Check if port is compatible with cable in hand
                        const isCompatibleDrag = activeLinkSource && (() => {
                          const srcNode = nodes.find(n => n.id === activeLinkSource.nodeId);
                          const srcPort = DEVICE_TEMPLATES[srcNode.type]?.ports.find(p => p.id === activeLinkSource.portId);
                          return srcPort?.type === port.type && srcNode.id !== selectedNode.id;
                        })();

                        // Determine border style
                        let borderStyle = 'border-white/5';
                        let glowStyle = {};
                        if (isDragHovered) {
                          borderStyle = 'border-[var(--neon-cyan)] scale-105';
                          glowStyle = { boxShadow: '0 0 10px var(--neon-cyan)', transition: 'all 0.2s' };
                        } else if (isCompatibleDrag) {
                          borderStyle = 'border-[var(--neon-green)] animate-pulse';
                          glowStyle = { boxShadow: '0 0 6px rgba(57,255,20,0.3)' };
                        } else if (isPortConnected) {
                          borderStyle = isPortActive ? 'border-[var(--neon-green)]' : 'border-white/30';
                        }

                        return (
                          <div
                            key={port.id}
                            draggable="true"
                            onDragStart={(e) => handlePortDragStart(selectedNode.id, port.id, e)}
                            onDragEnd={() => setActiveLinkSource(null)}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOverPortId({ nodeId: selectedNode.id, portId: port.id });
                            }}
                            onDragLeave={() => setDragOverPortId(null)}
                            onDrop={(e) => {
                              setDragOverPortId(null);
                              handlePortDrop(selectedNode.id, port.id, e);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (activeLinkSource) {
                                handlePortClickToConnect(selectedNode.id, port.id);
                              } else {
                                setActivePortActionMenu(prev => 
                                  prev?.portId === port.id ? null : { nodeId: selectedNode.id, portId: port.id }
                                );
                              }
                            }}
                            className={`flex flex-col items-center gap-1 min-w-[50px] p-2 rounded-lg border bg-zinc-950/40 relative cursor-grab active:cursor-grabbing hover:bg-zinc-800/50 transition-all ${borderStyle}`}
                            style={glowStyle}
                          >
                            <span className="text-[7px] font-mono text-white/40 block truncate max-w-[45px] select-none">{port.label || port.id}</span>
                            
                            {/* Port receptacle shape */}
                            <div className={`w-6 h-4 border flex items-center justify-center text-[10px] select-none ${portBg}`}>
                              {isPortConnected ? '🔌' : ''}
                            </div>
                            
                            {/* Small Link LED indicator */}
                            <span
                              className={`w-1.5 h-1.5 rounded-full absolute -top-0.5 -right-0.5 ${
                                isPortConnected 
                                  ? isPortActive ? 'bg-[var(--neon-green)] animate-pulse' : 'bg-[var(--neon-yellow)]'
                                  : 'bg-zinc-800'
                              }`}
                            />

                            {/* Floating Action Menu context popover */}
                            {activePortActionMenu?.portId === port.id && (
                              <div 
                                className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 border border-white/15 rounded-xl p-1.5 shadow-2xl flex flex-col gap-1 text-[10px] min-w-[100px] backdrop-blur-md"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {isPortConnected ? (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnplug(selectedNode.id, port.id);
                                        setActivePortActionMenu(null);
                                      }}
                                      className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded-lg text-[var(--neon-pink)] flex items-center gap-1.5 font-sans font-bold transition-all"
                                    >
                                      <span>🔌</span>
                                      <span>{lang === 'id' ? 'Cabut Kabel' : 'Unplug'}</span>
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleMoveCable(selectedNode.id, port.id);
                                        setActivePortActionMenu(null);
                                      }}
                                      className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded-lg text-[var(--neon-cyan)] flex items-center gap-1.5 font-sans font-bold transition-all"
                                    >
                                      <span>🔄</span>
                                      <span>{lang === 'id' ? 'Pindah' : 'Relocate'}</span>
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleStartConnection(selectedNode.id, port.id);
                                      setActivePortActionMenu(null);
                                    }}
                                    className="w-full text-left px-2 py-1.5 hover:bg-white/10 rounded-lg text-[var(--neon-green)] flex items-center gap-1.5 font-sans font-bold transition-all"
                                  >
                                    <span>⚡</span>
                                    <span>{lang === 'id' ? 'Pasang Kabel' : 'Connect'}</span>
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center text-white/30 text-xs">
                <span className="text-3xl mb-2">📁</span>
                <p>Click any device node on the map to inspect its physical ports and power switches.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Diagnostic Terminal Panel */}
        <div className="glass rounded-2xl border border-white/10 p-4 flex flex-col min-h-[220px] bg-black/80">
          <h3 className="text-xs font-black text-white/40 uppercase tracking-widest border-b border-white/10 pb-2 mb-3 flex items-center justify-between">
            <span>💻 Command-Line Diagnostic Ping</span>
            {pingStatus === 'success' && <span className="text-[var(--neon-green)] font-bold text-[10px] border border-[var(--neon-green)]/30 px-2 py-0.5 rounded-full">CONNECTED</span>}
            {pingStatus === 'fail' && <span className="text-[var(--neon-pink)] font-bold text-[10px] border border-[var(--neon-pink)]/30 px-2 py-0.5 rounded-full">TIMEOUT</span>}
          </h3>

          <div className="flex-1 bg-black/90 rounded-xl p-3 border border-white/5 font-mono text-xs text-white/70 overflow-y-auto space-y-1 h-32 select-text">
            {pingLog.length === 0 ? (
              <div className="text-white/20 italic">No diagnostic run yet. Press "RUN PING TEST" below...</div>
            ) : (
              pingLog.map((line, i) => {
                let col = 'text-white/60';
                if (line.includes('SUCCESS')) col = 'text-[var(--neon-green)] font-bold';
                if (line.includes('FAILED') || line.includes('ERROR')) col = 'text-[var(--neon-pink)] font-bold';
                return <p key={i} className={col}>{line}</p>;
              })
            )}
          </div>

          <button
            onClick={handlePingTest}
            disabled={pingStatus === 'pinging'}
            className={`w-full mt-3 py-2.5 rounded-xl font-mono font-bold text-xs border transition-all ${
              pingStatus === 'pinging'
                ? 'bg-zinc-800 border-zinc-700 text-zinc-500 cursor-not-allowed'
                : 'bg-[rgba(0,245,255,0.08)] border-[rgba(0,245,255,0.3)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.15)] shadow-glow-cyan'
            }`}
          >
            {pingStatus === 'pinging' ? '⌛ RUNNING ICMP PING...' : '📡 RUN DIAGNOSTIC PING TEST'}
          </button>

          {/* Troubleshooting Advisor */}
          {advice && (
            <div className="mt-4 border border-[var(--neon-orange)]/30 bg-[rgba(255,107,0,0.03)] rounded-xl p-3.5 space-y-2 animate-pulse-slow">
              <div className="flex items-center gap-1.5 text-[var(--neon-orange)] text-[10.5px] uppercase font-orbitron font-black tracking-wider">
                <span>⚠️</span>
                <span>{lang === 'id' ? 'Asisten Diagnostik' : 'Diagnostic Assistant'}</span>
              </div>
              <div className="text-xs font-sans">
                <p className="font-bold text-white mb-0.5">{advice.title}</p>
                <p className="text-white/60 mb-2 leading-relaxed text-[11px]">
                  <strong className="text-white">{lang === 'id' ? 'Penyebab:' : 'Why:'} </strong>
                  {advice.why}
                </p>
                <div className="bg-black/45 border border-white/5 p-2.5 rounded-lg text-[11px] text-[var(--neon-cyan)] leading-relaxed font-mono">
                  <strong className="text-white font-sans">{lang === 'id' ? 'Solusi:' : 'How to Fix:'} </strong>
                  {advice.todo}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Onboarding Tutorial Modal */}
      <AnimatePresence>
        {showTutorial && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-yellow)] max-w-lg w-full rounded-2xl overflow-hidden shadow-2xl relative"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-4 flex items-center justify-between bg-[rgba(255,230,0,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎓</span>
                  <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-yellow)]">
                    {lang === 'id' ? 'Tutorial Onboarding Jaringan' : 'Network Simulator Onboarding'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowTutorial(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Slide content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-center py-6 bg-black/40 rounded-xl border border-white/5 text-4xl">
                  {currentTutorialSlide === 0 && '🌐'}
                  {currentTutorialSlide === 1 && '🔌'}
                  {currentTutorialSlide === 2 && '⚡'}
                  {currentTutorialSlide === 3 && '📶'}
                  {currentTutorialSlide === 4 && '💻'}
                </div>
                <h4 className="font-bold text-white text-base">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].titleId : tutorialSlides[currentTutorialSlide].titleEn}
                </h4>
                <p className="text-white/70 text-xs leading-relaxed">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].bodyId : tutorialSlides[currentTutorialSlide].bodyEn}
                </p>
                <div className="bg-[rgba(255,230,0,0.05)] border border-[rgba(255,230,0,0.15)] p-2.5 rounded-lg text-[11px] text-[var(--neon-yellow)] font-medium">
                  {lang === 'id' ? tutorialSlides[currentTutorialSlide].tipId : tutorialSlides[currentTutorialSlide].tipEn}
                </div>
              </div>

              {/* Bottom navigation */}
              <div className="border-t border-white/10 p-4 flex items-center justify-between bg-black/20">
                <div className="flex gap-1.5">
                  {tutorialSlides.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentTutorialSlide ? 'bg-[var(--neon-yellow)] w-4' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  {currentTutorialSlide > 0 && (
                    <button
                      onClick={() => { sound.click(); setCurrentTutorialSlide(prev => prev - 1); }}
                      className="px-3 py-1.5 border border-white/10 hover:border-white/20 text-white text-xs font-semibold rounded-lg transition-all"
                    >
                      {lang === 'id' ? 'Kembali' : 'Back'}
                    </button>
                  )}
                  {currentTutorialSlide < tutorialSlides.length - 1 ? (
                    <button
                      onClick={() => { sound.click(); setCurrentTutorialSlide(prev => prev + 1); }}
                      className="btn-game px-4 py-1.5 text-xs font-bold font-mono"
                      style={{ '--neon-color': 'var(--neon-yellow)' }}
                    >
                      {lang === 'id' ? 'Lanjut ➔' : 'Next ➔'}
                    </button>
                  ) : (
                    <button
                      onClick={() => { sound.click(); setShowTutorial(false); }}
                      className="bg-[var(--neon-green)] border border-[var(--neon-green)] text-black hover:opacity-90 font-bold px-4 py-1.5 text-xs rounded-lg transition-all"
                    >
                      {lang === 'id' ? 'Mulai Bermain!' : 'Let\'s Play!'}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Device Glossary Guidebook Modal */}
      <AnimatePresence>
        {showGuidebook && (
          <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass border border-[var(--neon-cyan)] max-w-2xl w-full rounded-2xl overflow-hidden shadow-2xl relative flex flex-col max-h-[80vh]"
              style={{ background: '#070b15' }}
            >
              {/* Top title */}
              <div className="border-b border-white/10 p-4 flex items-center justify-between bg-[rgba(0,245,255,0.03)]">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📖</span>
                  <h3 className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[var(--neon-cyan)]">
                    {lang === 'id' ? 'Kamus Glosarium Perangkat Jaringan' : 'Network Device Glossary'}
                  </h3>
                </div>
                <button
                  onClick={() => { sound.click(); setShowGuidebook(false); }}
                  className="text-white/40 hover:text-white transition-colors font-bold text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Glossary list */}
              <div className="p-6 space-y-4 overflow-y-auto flex-1">
                <p className="text-xs text-white/50 leading-relaxed mb-2">
                  {lang === 'id'
                    ? 'Berikut adalah penjelasan perangkat jaringan yang akan Anda temui dalam simulasi. Klik salah satu untuk membaca perannya.'
                    : 'Here is an overview of the network devices you will configure in the simulator. Learn how they behave.'}
                </p>

                <div className="space-y-3.5">
                  {Object.entries(DEVICE_GLOSSARY).map(([key, item]) => {
                    const devTemplate = DEVICE_TEMPLATES[key] || {};
                    return (
                      <div key={key} className="bg-white/[0.02] border border-white/5 hover:border-white/10 p-3.5 rounded-xl transition-all">
                        <div className="flex items-center gap-2.5 mb-1.5">
                          <span className="text-2xl bg-black/45 w-10 h-10 rounded-lg flex items-center justify-center border border-white/5">
                            {devTemplate.emoji || '🌐'}
                          </span>
                          <div>
                            <h4 className="font-bold text-white text-sm">{item.title[lang] || item.title['en']}</h4>
                            <span className="text-[9px] uppercase tracking-wider font-mono text-[var(--neon-cyan)] font-bold">Type ID: {key}</span>
                          </div>
                        </div>
                        <p className="text-white/70 text-xs leading-relaxed font-sans">
                          {item.desc[lang] || item.desc['en']}
                        </p>
                        {item.realWorldLook && (
                          <div className="mt-2 text-[11px] text-white/50 bg-black/25 p-2 rounded-lg border border-white/5 font-sans leading-relaxed">
                            <strong className="text-white">{lang === 'id' ? '🔍 Bentuk Asli:' : '🔍 Real-World Look:'} </strong>
                            {item.realWorldLook[lang] || item.realWorldLook['en']}
                          </div>
                        )}
                        {item.videoUrl && (
                          <div className="mt-2.5">
                            <a
                              href={item.videoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-[11px] text-[var(--neon-cyan)] hover:underline font-mono"
                            >
                              <span>🎥</span>
                              <span className="font-bold">{lang === 'id' ? 'Tonton Video Tutorial Youtube' : 'Watch Youtube Video Tutorial'}</span>
                            </a>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom close */}
              <div className="border-t border-white/10 p-4 bg-black/20 text-right">
                <button
                  onClick={() => { sound.click(); setShowGuidebook(false); }}
                  className="btn-game px-5 py-2 text-xs font-bold font-mono"
                  style={{ '--neon-color': 'var(--neon-cyan)' }}
                >
                  {lang === 'id' ? 'Tutup Glosarium' : 'Close Glossary'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getNetworkDiagnosticAdvice(pingLog, nodes, connections, networkState, lang) {
  const isId = lang === 'id';
  
  const lastFail = [...pingLog].reverse().find(line => line.includes('FAILED'));
  if (!lastFail) return null;

  if (lastFail.includes('Host PC has no power')) {
    return {
      title: isId ? "Komputer Klien Mati" : "Host PC Lacks Power",
      why: isId ? "Komputer yang digunakan untuk melakukan ping tidak dinyalakan atau tidak mendapat daya." : "The workstation PC running the diagnostic ping has no electrical power.",
      todo: isId 
        ? "Sambungkan kabel daya (oranye) dari PC ke Colokan Listrik (Power Strip), lalu pastikan sakelar dayanya menyala."
        : "Connect the orange power cable from the PC to the Power Strip and ensure its power button is pressed."
    };
  }

  if (lastFail.includes('Ethernet cable is unplugged from the PC')) {
    return {
      title: isId ? "Kabel Ethernet PC Terputus" : "PC Ethernet Cable Disconnected",
      why: isId ? "Komputer tidak terhubung ke perangkat jaringan apa pun melalui kabel LAN." : "The workstation PC is not plugged into any networking equipment.",
      todo: isId 
        ? "Pasang kabel Ethernet (RJ45) dari port ethernet PC ke salah satu port LAN di Router atau port di Switch." 
        : "Connect an Ethernet cable from the PC's ethernet port to a LAN port on the Router or any port on the Switch."
    };
  }

  if (lastFail.includes('cable is damaged')) {
    return {
      title: isId ? "Kabel Rusak / Cacat Fisik" : "Damaged Network Cable",
      why: isId ? "Kabel ethernet yang digunakan berwarna merah menyala, menandakan adanya kerusakan internal kawat kabel." : "The highlighted red cable in the topology has internal copper damage.",
      todo: isId 
        ? "Klik kabel yang rusak (merah), hapus kabel tersebut, lalu pasang kabel ethernet baru yang sehat." 
        : "Select the damaged cable (red), delete it, and connect a brand new, functional Ethernet cable."
    };
  }

  if (lastFail.includes('Router has no power')) {
    return {
      title: isId ? "WiFi Router Mati" : "WiFi Router Lacks Power",
      why: isId ? "Perangkat Router tidak menyala karena tidak terhubung ke sumber listrik." : "The main WiFi Router is powered OFF because it has no power input.",
      todo: isId 
        ? "Sambungkan kabel daya (oranye) dari Router ke Colokan Listrik (Power Strip)." 
        : "Plug the orange power cable from the Router into the Power Strip."
    };
  }

  if (lastFail.includes('directly to Router\'s WAN port')) {
    return {
      title: isId ? "Komputer Klien Salah Colok Port" : "Client PC Connected to WAN Port",
      why: isId ? "Kabel Ethernet dari PC dicolok ke port WAN (Internet) milik Router. Port WAN khusus untuk menerima internet dari modem, bukan untuk PC klien." : "The PC's Ethernet cable is plugged into the Router's WAN port. The WAN port is reserved for external internet feed from the modem.",
      todo: isId 
        ? "Pindahkan kabel Ethernet di Router dari port WAN ke salah satu port LAN (LAN 1, LAN 2, atau LAN 3)." 
        : "Move the Ethernet cable on the Router from the WAN port to a local LAN port (LAN1, LAN2, or LAN3)."
    };
  }

  if (lastFail.includes('Gateway WAN port disconnected')) {
    return {
      title: isId ? "Port WAN Router Kosong" : "Router WAN Port Empty",
      why: isId ? "Router tidak menerima sinyal internet eksternal karena port WAN (Internet)-nya tidak memiliki kabel terhubung." : "The Router's WAN (Internet) port is empty, so it cannot forward internet packets to local LAN clients.",
      todo: isId 
        ? "Tarik kabel Ethernet (RJ45) dari port Ethernet Modem ke port WAN Router." 
        : "Connect an Ethernet cable from the Modem's Ethernet port to the Router's WAN port."
    };
  }

  if (lastFail.includes('WAN port connected to wrong device')) {
    return {
      title: isId ? "Konfigurasi Kabel WAN Salah" : "Invalid WAN Connection",
      why: isId ? "Port WAN Router harus terhubung ke Modem (jika ada) atau langsung ke Sumber Internet (ISP) jika tidak ada modem." : "The Router's WAN port is connected to an invalid device. It must link directly to the Modem (or Internet Source if no modem).",
      todo: isId 
        ? "Cabut kabel yang salah pada port WAN Router, lalu hubungkan port WAN ke port Ethernet Modem." 
        : "Remove the incorrect cable from the Router's WAN port and connect the WAN port to the Modem's Ethernet port."
    };
  }

  if (lastFail.includes('Internet unreachable')) {
    // General check why internet is unreachable:
    // Maybe modem lacks power, or ISP coax unplugged.
    const modemNode = nodes.find(n => n.type === 'modem');
    if (modemNode) {
      const modemState = networkState[modemNode.id];
      if (!modemState?.powered) {
        return {
          title: isId ? "Modem Kabel Mati" : "Cable Modem Lacks Power",
          why: isId ? "Modem kabel tidak menyala karena belum tersambung ke sumber listrik." : "The Cable Modem is powered OFF because it has no electrical input.",
          todo: isId 
            ? "Hubungkan kabel daya (oranye) dari Modem ke Colokan Listrik (Power Strip)." 
            : "Connect the Modem's orange power cable to the Power Strip."
        };
      }

      // Check modem coax
      const modemCoax = connections.find(c => 
        (c.from === modemNode.id && c.fromPort === 'coax') ||
        (c.to === modemNode.id && c.toPort === 'coax')
      );
      if (!modemCoax) {
        return {
          title: isId ? "Kabel Koaksial Modem Terputus" : "Modem Coaxial Disconnected",
          why: isId ? "Modem tidak menerima sinyal provider karena kabel Koaksial (biru) dari ISP belum dicolok." : "The Modem has no signal source because the Coaxial cable (blue) from the ISP is unplugged.",
          todo: isId 
            ? "Hubungkan kabel Koaksial (biru) dari Sumber Internet (ISP) ke port Coax di bagian belakang Modem." 
            : "Run a blue Coaxial cable from the Internet Source (ISP) to the Modem's Coaxial port."
        };
      }
    }

    return {
      title: isId ? "Koneksi Jaringan Terputus" : "Network Loop or Disconnect",
      why: isId ? "Sinyal internet dari ISP tidak dapat mengalir sampai ke PC tujuan. Jalur koneksi terputus di tengah jalan." : "The internet packets from the ISP cannot route to the host PC due to missing or incorrect cabling.",
      todo: isId 
        ? "Periksa kembali setiap sambungan kabel: ISP → Coax → Modem → Ethernet → Router WAN → Router LAN → PC / Switch → PC." 
        : "Double-check your end-to-end topology path: ISP → Coax → Modem → Ethernet → Router WAN → Router LAN → PC / Switch → PC."
    };
  }

  return null;
}
