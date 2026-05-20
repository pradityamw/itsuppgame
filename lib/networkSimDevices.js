/**
 * Network Simulation Devices configuration & path-tracing logic.
 */

export const PORT_TYPES = {
  RJ45: 'rj45',     // Ethernet
  COAX: 'coax',     // Coaxial cable (cable internet)
  POWER: 'power',   // Power cord
};

export const CABLE_TYPES = {
  ETHERNET: { id: 'ethernet', label: 'Ethernet Cable (RJ45)', color: '#39ff14', portType: PORT_TYPES.RJ45 },
  COAXIAL:  { id: 'coaxial',  label: 'Coaxial Cable',         color: '#00f5ff', portType: PORT_TYPES.COAX },
  POWER:    { id: 'power',    label: 'Power Cable',           color: '#ff6b00', portType: PORT_TYPES.POWER },
};

export const DEVICE_TEMPLATES = {
  internet: {
    name: 'Internet Backbone',
    emoji: '🌐',
    ports: [
      { id: 'coax', label: 'Coaxial Out', type: PORT_TYPES.COAX }
    ],
    needsPower: false,
  },
  power_outlet: {
    name: 'Wall Power Outlet',
    emoji: '🔌',
    ports: [
      { id: 'p1', label: 'Outlet 1', type: PORT_TYPES.POWER },
      { id: 'p2', label: 'Outlet 2', type: PORT_TYPES.POWER },
      { id: 'p3', label: 'Outlet 3', type: PORT_TYPES.POWER }
    ],
    needsPower: false,
    alwaysPowered: true,
  },
  modem: {
    name: 'Cable Modem',
    emoji: '📡',
    ports: [
      { id: 'coax', label: 'Coax In', type: PORT_TYPES.COAX },
      { id: 'eth', label: 'Ethernet Port', type: PORT_TYPES.RJ45 },
      { id: 'power', label: 'Power Jack', type: PORT_TYPES.POWER }
    ],
    needsPower: true,
  },
  router: {
    name: 'WiFi Router',
    emoji: '📶',
    ports: [
      { id: 'wan', label: 'WAN (Internet)', type: PORT_TYPES.RJ45 },
      { id: 'lan1', label: 'LAN Port 1', type: PORT_TYPES.RJ45 },
      { id: 'lan2', label: 'LAN Port 2', type: PORT_TYPES.RJ45 },
      { id: 'lan3', label: 'LAN Port 3', type: PORT_TYPES.RJ45 },
      { id: 'power', label: 'Power Jack', type: PORT_TYPES.POWER }
    ],
    needsPower: true,
  },
  switch: {
    name: 'Network Switch',
    emoji: '🔀',
    ports: [
      { id: 'p1', label: 'Port 1', type: PORT_TYPES.RJ45 },
      { id: 'p2', label: 'Port 2', type: PORT_TYPES.RJ45 },
      { id: 'p3', label: 'Port 3', type: PORT_TYPES.RJ45 },
      { id: 'p4', label: 'Port 4', type: PORT_TYPES.RJ45 },
      { id: 'p5', label: 'Port 5', type: PORT_TYPES.RJ45 },
      { id: 'power', label: 'Power Jack', type: PORT_TYPES.POWER }
    ],
    needsPower: true,
  },
  pc: {
    name: 'Workstation PC',
    emoji: '🖥️',
    ports: [
      { id: 'eth', label: 'Ethernet Port', type: PORT_TYPES.RJ45 },
      { id: 'power', label: 'Power Socket', type: PORT_TYPES.POWER }
    ],
    needsPower: true,
  },
  printer: {
    name: 'Network Printer',
    emoji: '🖨️',
    ports: [
      { id: 'eth', label: 'Ethernet Port', type: PORT_TYPES.RJ45 },
      { id: 'power', label: 'Power Socket', type: PORT_TYPES.POWER }
    ],
    needsPower: true,
  }
};

/**
 * Traces connectivity and power across the network nodes based on active connections.
 * 
 * Rules:
 * 1. An outlet (power_outlet) is always powered.
 * 2. If a device has needsPower: true, it is powered ONLY if:
 *    - it is connected to a powered node's power port via a POWER cable AND
 *    - its internal powerState is true (if it has a power switch).
 * 3. Internet signal starts at any node of type 'internet'.
 * 4. Signal propagates:
 *    - From internet coax to modem coax.
 *    - Through modem: if powered, from coax to ethernet (eth).
 *    - Through router: if powered, internet MUST enter through 'wan' to propagate to 'lan1'-'lan3' and WiFi.
 *      If signal enters a 'lan' port, it only bridges to other 'lan' ports (like a switch) but does not route to WAN.
 *    - Through switch: if powered, bridges all RJ45 ports.
 *    - Endpoints (pc, printer): if powered, receive internet signal when their 'eth' port gets the signal.
 */
export function traceNetwork(nodes, connections) {
  // 1. Initialize power and internet states
  const powerMap = {};
  const internetMap = {};
  const deviceState = {};

  nodes.forEach(n => {
    const template = DEVICE_TEMPLATES[n.type] || {};
    powerMap[n.id] = !template.needsPower;
    internetMap[n.id] = n.type === 'internet';
    deviceState[n.id] = {
      powered: !template.needsPower,
      hasInternet: n.type === 'internet',
      activePorts: {}
    };
  });

  // Power outlets are always powered
  nodes.filter(n => n.type === 'power_outlet').forEach(n => {
    powerMap[n.id] = true;
    deviceState[n.id].powered = true;
  });

  // 2. Resolve power recursively (modem, router, switch, pc, printer, etc.)
  // Since power networks are simple trees from outlets, we can run a quick propagation loop.
  let powerChanged = true;
  let iterations = 0;
  while (powerChanged && iterations < 10) {
    powerChanged = false;
    connections.forEach(conn => {
      if (conn.cableType !== 'power' || conn.damaged) return;
      
      const nodeA = nodes.find(n => n.id === conn.from);
      const nodeB = nodes.find(n => n.id === conn.to);
      if (!nodeA || !nodeB) return;

      // Check if one node is powered and connects to the other
      if (powerMap[nodeA.id] && !powerMap[nodeB.id]) {
        // Does nodeB have its internal power toggle on?
        const bPowerToggle = nodeB.powerOn !== false;
        if (bPowerToggle) {
          powerMap[nodeB.id] = true;
          deviceState[nodeB.id].powered = true;
          powerChanged = true;
        }
      }
      if (powerMap[nodeB.id] && !powerMap[nodeA.id]) {
        const aPowerToggle = nodeA.powerOn !== false;
        if (aPowerToggle) {
          powerMap[nodeA.id] = true;
          deviceState[nodeA.id].powered = true;
          powerChanged = true;
        }
      }
    });
    iterations++;
  }

  // 3. Trace internet signal through RJ45 and Coax cables
  // We do BFS/DFS propagation starting from internet nodes.
  const queue = nodes.filter(n => n.type === 'internet').map(n => n.id);
  const visited = new Set(queue);

  // We need to track which port on which device has signal.
  const portSignalMap = {}; // key: "deviceId:portId" -> boolean
  nodes.filter(n => n.type === 'internet').forEach(n => {
    portSignalMap[`${n.id}:coax`] = true;
    portSignalMap[`${n.id}:eth`] = true;
  });

  // Adjacency graph based on connections
  const getPortConnections = (deviceId, portId) => {
    const results = [];
    connections.forEach(c => {
      if (c.damaged) return;
      if (c.from === deviceId && c.fromPort === portId) {
        results.push({ deviceId: c.to, portId: c.toPort });
      }
      if (c.to === deviceId && c.toPort === portId) {
        results.push({ deviceId: c.from, portId: c.fromPort });
      }
    });
    return results;
  };

  let signalChanged = true;
  let signalIterations = 0;
  while (signalChanged && signalIterations < 50) {
    signalChanged = false;

    // Propagate signals ACROSS cables
    connections.forEach(conn => {
      if (conn.damaged) return;
      const keyFrom = `${conn.from}:${conn.fromPort}`;
      const keyTo = `${conn.to}:${conn.toPort}`;

      if (portSignalMap[keyFrom] && !portSignalMap[keyTo]) {
        portSignalMap[keyTo] = true;
        signalChanged = true;
      }
      if (portSignalMap[keyTo] && !portSignalMap[keyFrom]) {
        portSignalMap[keyFrom] = true;
        signalChanged = true;
      }
    });

    // Propagate signals WITHIN devices (device logic)
    nodes.forEach(node => {
      const isPowered = powerMap[node.id];
      if (!isPowered && node.type !== 'internet') return;

      if (node.type === 'modem') {
        // Modem bridges coax and eth if powered
        const coaxHasSignal = portSignalMap[`${node.id}:coax`];
        const ethHasSignal = portSignalMap[`${node.id}:eth`];
        if (coaxHasSignal && !portSignalMap[`${node.id}:eth`]) {
          portSignalMap[`${node.id}:eth`] = true;
          signalChanged = true;
        }
        if (ethHasSignal && !portSignalMap[`${node.id}:coax`]) {
          portSignalMap[`${node.id}:coax`] = true;
          signalChanged = true;
        }
      } 
      else if (node.type === 'router') {
        // Router: WAN distributes to LAN ports.
        // If WAN has signal, all LAN ports (lan1, lan2, lan3) get signal.
        if (portSignalMap[`${node.id}:wan`]) {
          ['lan1', 'lan2', 'lan3'].forEach(lan => {
            if (!portSignalMap[`${node.id}:${lan}`]) {
              portSignalMap[`${node.id}:${lan}`] = true;
              signalChanged = true;
            }
          });
        }
        // LAN ports act as a switch, bridging with each other (but NOT going up to WAN).
        const lanPorts = ['lan1', 'lan2', 'lan3'];
        const anyLanHasSignal = lanPorts.some(lan => portSignalMap[`${node.id}:${lan}`]);
        if (anyLanHasSignal) {
          lanPorts.forEach(lan => {
            if (!portSignalMap[`${node.id}:${lan}`]) {
              portSignalMap[`${node.id}:${lan}`] = true;
              signalChanged = true;
            }
          });
        }
      } 
      else if (node.type === 'switch') {
        // Switch bridges all active RJ45 ports
        const rjPorts = ['p1', 'p2', 'p3', 'p4', 'p5'];
        const anyPortHasSignal = rjPorts.some(p => portSignalMap[`${node.id}:${p}`]);
        if (anyPortHasSignal) {
          rjPorts.forEach(p => {
            if (!portSignalMap[`${node.id}:${p}`]) {
              portSignalMap[`${node.id}:${p}`] = true;
              signalChanged = true;
            }
          });
        }
      }
    });

    signalIterations++;
  }

  // Update final internet mapping based on whether endpoints have signal on their eth port
  nodes.forEach(node => {
    const isPowered = powerMap[node.id];
    let hasInternet = false;

    if (node.type === 'internet') {
      hasInternet = true;
    } else if (node.type === 'modem') {
      hasInternet = isPowered && (portSignalMap[`${node.id}:eth`] || portSignalMap[`${node.id}:coax`]);
    } else if (node.type === 'router') {
      hasInternet = isPowered && portSignalMap[`${node.id}:wan`];
    } else if (node.type === 'switch') {
      hasInternet = isPowered && ['p1', 'p2', 'p3', 'p4', 'p5'].some(p => portSignalMap[`${node.id}:${p}`]);
    } else if (node.type === 'pc' || node.type === 'printer') {
      hasInternet = isPowered && portSignalMap[`${node.id}:eth`];
    }

    internetMap[node.id] = hasInternet;
    deviceState[node.id].hasInternet = hasInternet;

    // Fill activePorts status for visual display (e.g. green LED lights)
    const template = DEVICE_TEMPLATES[node.type] || {};
    template.ports?.forEach(port => {
      deviceState[node.id].activePorts[port.id] = !!portSignalMap[`${node.id}:${port.id}`] || 
        (port.type === PORT_TYPES.POWER && isPowered);
    });
  });

  return deviceState;
}
