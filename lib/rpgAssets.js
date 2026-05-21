// Procedural Retro Pixel-Art Asset Generator
// Pre-renders raw pixel sprites onto canvases for immediate, scale-invariant rendering

export function createOffscreenCanvas(width, height) {
  if (typeof window === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { canvas, ctx };
}

// 1. Draw Player (WASD movement, 4 directions, walk cycle frames)
export function drawPlayer(ctx, dir, frame) {
  ctx.clearRect(0, 0, 32, 32);

  // Body Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(8, 28, 16, 4);

  // Face Skin
  ctx.fillStyle = '#ffdeb9';
  ctx.fillRect(10, 6, 12, 10);

  // Hair (Spiky neon yellow)
  ctx.fillStyle = '#ffe600';
  ctx.fillRect(10, 2, 12, 4);
  ctx.fillRect(8, 4, 16, 3);
  if (dir === 'left') {
    ctx.fillRect(6, 6, 4, 5);
  } else if (dir === 'right') {
    ctx.fillRect(22, 6, 4, 5);
  } else if (dir === 'down') {
    ctx.fillRect(8, 5, 2, 6);
    ctx.fillRect(22, 5, 2, 6);
  }

  // Eyes (Blinking tech visor or glasses)
  ctx.fillStyle = '#00f5ff'; // neon cyan visor
  if (dir === 'down') {
    ctx.fillRect(11, 9, 10, 3);
    ctx.fillStyle = '#ff2d78'; // center scanner
    ctx.fillRect(15, 9, 2, 3);
  } else if (dir === 'left') {
    ctx.fillRect(8, 9, 6, 3);
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(9, 9, 2, 3);
  } else if (dir === 'right') {
    ctx.fillRect(18, 9, 6, 3);
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(21, 9, 2, 3);
  } else {
    // Back of head, no eyes
    ctx.fillStyle = '#ffe600'; // hair covers back of head
    ctx.fillRect(10, 6, 12, 8);
  }

  // Shirt / Torso (Neon pink cyberpunk jacket)
  ctx.fillStyle = '#ff2d78';
  ctx.fillRect(9, 16, 14, 9);
  ctx.fillStyle = '#070b14'; // collar/inner shirt
  ctx.fillRect(14, 16, 4, 3);

  // Arms
  ctx.fillStyle = '#ff2d78';
  if (dir === 'left') {
    ctx.fillRect(7, 17, 3, 6);
    ctx.fillStyle = '#ffdeb9'; // hand
    ctx.fillRect(7, 23, 3, 2);
  } else if (dir === 'right') {
    ctx.fillRect(22, 17, 3, 6);
    ctx.fillStyle = '#ffdeb9'; // hand
    ctx.fillRect(22, 23, 3, 2);
  } else {
    // Walk bobbing arms
    const bob = frame > 0 ? (frame % 2 === 0 ? 1 : -1) : 0;
    ctx.fillRect(6, 17, 3, 6 + bob);
    ctx.fillRect(23, 17, 3, 6 - bob);
    ctx.fillStyle = '#ffdeb9'; // hands
    ctx.fillRect(6, 23 + bob, 3, 2);
    ctx.fillRect(23, 23 - bob, 3, 2);
  }

  // Pants (Dark cyber jeans)
  ctx.fillStyle = '#1e2d45';
  ctx.fillRect(10, 25, 12, 4);

  // Legs / Feet
  ctx.fillStyle = '#00f5ff'; // glowing cyan boots
  let legBobY = 0;
  if (frame === 1) {
    ctx.fillRect(10, 29, 3, 3);
    ctx.fillRect(19, 28, 3, 3);
  } else if (frame === 2) {
    ctx.fillRect(10, 28, 3, 3);
    ctx.fillRect(19, 29, 3, 3);
  } else {
    ctx.fillRect(10, 29, 3, 3);
    ctx.fillRect(19, 29, 3, 3);
  }
}

// 2. Draw NPCs (Sarah, Kevin, Ahmad, Tech Support)
export function drawNPC(ctx, npcType, dir, frame) {
  ctx.clearRect(0, 0, 32, 32);

  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(8, 28, 16, 4);

  // Base Skin
  ctx.fillStyle = '#ffdeb9';
  ctx.fillRect(10, 6, 12, 10);

  // Custom Character Designs
  if (npcType === 'Sarah') {
    // Sarah: Pink hair, yellow jacket
    ctx.fillStyle = '#ff2d78'; // hot pink hair
    ctx.fillRect(8, 3, 16, 4);
    ctx.fillRect(7, 7, 3, 9);  // side strands
    ctx.fillRect(22, 7, 3, 9);
    
    // Eyes / Glasses
    ctx.fillStyle = '#070b14';
    ctx.fillRect(12, 9, 2, 2);
    ctx.fillRect(18, 9, 2, 2);

    // Clothes
    ctx.fillStyle = '#ffe600'; // yellow jacket
    ctx.fillRect(9, 16, 14, 9);
    ctx.fillStyle = '#ffdeb9'; // hands
    ctx.fillRect(6, 21, 3, 2);
    ctx.fillRect(23, 21, 3, 2);
    
    // Pants & shoes
    ctx.fillStyle = '#1a2238';
    ctx.fillRect(10, 25, 12, 4);
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(10, 29, 3, 3);
    ctx.fillRect(19, 29, 3, 3);

  } else if (npcType === 'Kevin') {
    // Kevin: Green cap, blue hoodie
    ctx.fillStyle = '#39ff14'; // green cap
    ctx.fillRect(9, 2, 14, 4);
    ctx.fillRect(12, 1, 8, 1); // cap top
    ctx.fillRect(16, 4, 9, 2); // cap visor
    
    // Back hair
    ctx.fillStyle = '#4a2511'; // brown hair
    ctx.fillRect(8, 6, 16, 4);

    // Eyes
    ctx.fillStyle = '#070b14';
    ctx.fillRect(11, 9, 2, 2);
    ctx.fillRect(17, 9, 2, 2);

    // Blue hoodie
    ctx.fillStyle = '#00f5ff';
    ctx.fillRect(9, 16, 14, 9);
    ctx.fillStyle = '#070b14'; // dark hood shadow
    ctx.fillRect(13, 16, 6, 2);

    // Pants & shoes
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(10, 25, 12, 4);
    ctx.fillStyle = '#ffe600';
    ctx.fillRect(10, 29, 3, 3);
    ctx.fillRect(19, 29, 3, 3);

  } else if (npcType === 'Ahmad') {
    // Ahmad: Orange overalls, brown beard, mechanic style
    ctx.fillStyle = '#4a2511'; // dark brown hair + beard
    ctx.fillRect(10, 3, 12, 4);
    ctx.fillRect(8, 7, 2, 8); // beard sides
    ctx.fillRect(22, 7, 2, 8);
    ctx.fillRect(10, 13, 12, 3); // beard chin

    // Eyes
    ctx.fillStyle = '#070b14';
    ctx.fillRect(12, 8, 2, 2);
    ctx.fillRect(18, 8, 2, 2);

    // Orange overalls
    ctx.fillStyle = '#ff6b00';
    ctx.fillRect(9, 16, 14, 10);
    ctx.fillStyle = '#111827'; // gray strap buttons
    ctx.fillRect(11, 16, 2, 3);
    ctx.fillRect(19, 16, 2, 3);

    // Boots
    ctx.fillStyle = '#4a6080';
    ctx.fillRect(10, 26, 12, 3);
    ctx.fillStyle = '#111827';
    ctx.fillRect(9, 29, 4, 3);
    ctx.fillRect(19, 29, 4, 3);

  } else {
    // Generic Support Staff: Tech blue polo, gray hair
    ctx.fillStyle = '#8ba3c7'; // gray hair
    ctx.fillRect(10, 3, 12, 4);
    ctx.fillRect(8, 6, 16, 3);

    // Eyes
    ctx.fillStyle = '#070b14';
    ctx.fillRect(12, 9, 2, 2);
    ctx.fillRect(18, 9, 2, 2);

    // Blue Polo shirt
    ctx.fillStyle = '#0f3460';
    ctx.fillRect(9, 16, 14, 9);
    ctx.fillStyle = '#ffe600'; // yellow ID badge on lanyard
    ctx.fillRect(11, 18, 2, 3);

    // Pants & shoes
    ctx.fillStyle = '#1a2238';
    ctx.fillRect(10, 25, 12, 4);
    ctx.fillStyle = '#e8f4fd';
    ctx.fillRect(10, 29, 3, 3);
    ctx.fillRect(19, 29, 3, 3);
  }
}

// 3. Draw Cyber Wall (Dark panel with neon border glow)
export function drawWall(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  // Background dark block
  ctx.fillStyle = '#0d1117';
  ctx.fillRect(0, 0, width, height);

  // Circuit patterns
  ctx.strokeStyle = 'rgba(0, 245, 255, 0.04)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(10, 0); ctx.lineTo(10, height);
  ctx.moveTo(30, 0); ctx.lineTo(30, height - 12); ctx.lineTo(40, height);
  ctx.moveTo(0, 20); ctx.lineTo(width, 20);
  ctx.stroke();

  // Top Neon border
  ctx.fillStyle = '#bf00ff'; // Neon purple top border
  ctx.fillRect(0, 0, width, 4);
  
  // Neon Cyber Glow line
  ctx.fillStyle = '#00f5ff'; // neon cyan
  ctx.fillRect(0, height - 4, width, 4);
  
  // Subtle glowing dots
  ctx.fillStyle = '#39ff14'; // blinking green node
  ctx.fillRect(8, 12, 3, 3);
  ctx.fillStyle = '#ff2d78'; // pink node
  ctx.fillRect(width - 12, 8, 3, 3);
}

// 4. Draw Floor Tile (Metal/Carbon Cyber tiles)
export function drawFloor(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  // Core base tile
  ctx.fillStyle = '#070b14';
  ctx.fillRect(0, 0, width, height);

  // Grid bevel lines
  ctx.strokeStyle = 'rgba(255,255,255,0.03)';
  ctx.lineWidth = 1;
  ctx.strokeRect(0, 0, width, height);
  
  // Subtle tech lines
  ctx.fillStyle = 'rgba(0, 245, 255, 0.05)';
  ctx.fillRect(width - 6, 2, 4, 4);
}

// 5. Draw Cyber Carpet (Neon green circuit design rug)
export function drawCarpet(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  // Rug base
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, width, height);

  // Pattern borders
  ctx.strokeStyle = 'rgba(57, 255, 20, 0.25)'; // Neon green border
  ctx.lineWidth = 2;
  ctx.strokeRect(4, 4, width - 8, height - 8);

  // Grid circuit logic lines inside rug
  ctx.strokeStyle = 'rgba(57, 255, 20, 0.15)';
  ctx.beginPath();
  ctx.moveTo(8, 8); ctx.lineTo(width - 8, height - 8);
  ctx.moveTo(8, height - 8); ctx.lineTo(width - 8, 8);
  ctx.stroke();

  // Central glowing core node
  ctx.fillStyle = '#39ff14';
  ctx.fillRect(width/2 - 3, height/2 - 3, 6, 6);
  ctx.fillStyle = '#ffe600';
  ctx.fillRect(width/2 - 1, height/2 - 1, 2, 2);
}

// 6. Draw Computer / Workbench
export function drawPC(ctx, width, height, isBroken, animationTimer) {
  ctx.clearRect(0, 0, width, height);

  // 1. Draw Table Base
  ctx.fillStyle = '#1e293b'; // slate wood
  ctx.fillRect(4, 20, width - 8, 20); // tabletop
  ctx.fillStyle = '#0f172a'; // legs
  ctx.fillRect(8, 40, 6, 8);
  ctx.fillRect(width - 14, 40, 6, 8);

  // 2. Keyboard & Mouse
  ctx.fillStyle = '#475569';
  ctx.fillRect(16, 24, 14, 3); // keyboard
  ctx.fillStyle = '#00f5ff';
  ctx.fillRect(32, 24, 2, 2);  // mouse

  // 3. Monitor
  ctx.fillStyle = '#0f172a'; // frame
  ctx.fillRect(10, 4, 28, 16);
  ctx.fillStyle = '#1e293b'; // stand
  ctx.fillRect(22, 20, 4, 3);
  ctx.fillRect(18, 22, 12, 1);

  // Screen Content (Glowing display)
  if (isBroken) {
    // Glowing warning screen
    ctx.fillStyle = '#7f1d1d'; // dark red
    ctx.fillRect(12, 6, 24, 12);
    
    // Warning blinker
    if (animationTimer % 30 < 15) {
      ctx.fillStyle = '#ff2d78'; // flashing pink alerts
      ctx.fillRect(21, 9, 6, 6);
    }
  } else {
    // Normal active screen (cyan cmd lines)
    ctx.fillStyle = '#020617'; // matrix black
    ctx.fillRect(12, 6, 24, 12);

    // Blinking grid/data lines
    ctx.fillStyle = '#39ff14'; // neon green text simulation
    ctx.fillRect(14, 8, 8, 1.5);
    ctx.fillRect(14, 11, 12, 1.5);
    ctx.fillStyle = '#00f5ff'; // cyan progress bar
    ctx.fillRect(14, 14, (animationTimer % 40) / 40 * 18 + 2, 2);
  }
}

// 7. Draw Router / Switch (blinking amber/green LED lights)
export function drawRouter(ctx, width, height, hasFault, animationTimer) {
  ctx.clearRect(0, 0, width, height);

  // Table
  ctx.fillStyle = '#111827';
  ctx.fillRect(4, 24, width - 8, 24);
  
  // Router body (Sleek horizontal rack chassis)
  ctx.fillStyle = '#374151'; // dark metal
  ctx.fillRect(8, 12, 32, 12);
  ctx.fillStyle = '#1f2937'; // rack ear/bevel
  ctx.fillRect(6, 12, 2, 12);
  ctx.fillRect(40, 12, 2, 12);

  // Blinking LEDs
  if (hasFault) {
    // Red error light
    ctx.fillStyle = '#ff2d78';
    ctx.fillRect(10, 17, 3, 3);
    // Dark other LEDs
    ctx.fillStyle = '#111827';
    ctx.fillRect(16, 18, 2, 2);
    ctx.fillRect(21, 18, 2, 2);
    ctx.fillRect(26, 18, 2, 2);
  } else {
    // Power indicator (Solid Cyan)
    ctx.fillStyle = '#00f5ff';
    ctx.fillRect(10, 17, 3, 3);

    // Blinking green traffic lights
    ctx.fillStyle = (animationTimer % 20 < 10) ? '#39ff14' : 'rgba(57,255,20,0.1)';
    ctx.fillRect(16, 17, 2, 2);
    ctx.fillStyle = (animationTimer % 30 < 15) ? '#39ff14' : 'rgba(57,255,20,0.1)';
    ctx.fillRect(21, 17, 2, 2);
    ctx.fillStyle = (animationTimer % 15 < 7) ? '#39ff14' : 'rgba(57,255,20,0.1)';
    ctx.fillRect(26, 17, 2, 2);
  }

  // Antennas (Classic desktop router spikes)
  ctx.strokeStyle = '#374151';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(12, 12); ctx.lineTo(8, 4);
  ctx.moveTo(36, 12); ctx.lineTo(40, 4);
  ctx.stroke();
}

// 8. Draw Server Rack (Tower cabinet with stacked blade servers)
export function drawServer(ctx, width, height, animationTimer) {
  ctx.clearRect(0, 0, width, height);

  // Shadows
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.fillRect(0, height - 6, width, 6);

  // Server Cabinet Chassis (Tall skyscraper metallic container)
  ctx.fillStyle = '#0f172a'; // slate deep black
  ctx.fillRect(2, 0, width - 4, height - 2);
  ctx.strokeStyle = '#38bdf8'; // glowing blue outline
  ctx.lineWidth = 1;
  ctx.strokeRect(3, 1, width - 6, height - 4);

  // Stacked Server Blades
  const blades = 7;
  const bladeHeight = 5;
  const padding = 1.5;

  for (let i = 0; i < blades; i++) {
    const y = 4 + i * (bladeHeight + padding);
    ctx.fillStyle = '#1e293b'; // blade metal
    ctx.fillRect(6, y, width - 12, bladeHeight);

    // Glowing network status ports (cyber blue/green/pink dots)
    // Dynamic blink logic per port to represent actual live traffic data
    const blink1 = (animationTimer + i * 12) % 24 < 12;
    const blink2 = (animationTimer + i * 8) % 36 < 18;

    ctx.fillStyle = '#00f5ff'; // Power/Link (Solid blue)
    ctx.fillRect(9, y + 1.5, 2, 2);

    ctx.fillStyle = blink1 ? '#39ff14' : '#042f1a'; // Active traffic (Blinking green)
    ctx.fillRect(14, y + 1.5, 2, 2);

    ctx.fillStyle = blink2 ? '#ff2d78' : '#4c0519'; // Temp or warning status (Blinking orange/pink)
    ctx.fillRect(20, y + 1.5, 2, 2);
    
    // CD-ROM or USB slots
    ctx.fillStyle = '#070b14';
    ctx.fillRect(26, y + 1.5, 12, 1.5);
  }
}

// 9. Draw Printer
export function drawPrinter(ctx, width, height) {
  ctx.clearRect(0, 0, width, height);

  // Desk/Stool
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(6, 26, width - 12, 22);

  // Printer main body
  ctx.fillStyle = '#e2e8f0'; // light gray chassis
  ctx.fillRect(8, 12, 32, 16);
  ctx.fillStyle = '#94a3b8'; // gray accents
  ctx.fillRect(8, 22, 32, 6);

  // Paper Tray & Output
  ctx.fillStyle = '#ffffff'; // paper entering top
  ctx.fillRect(16, 6, 16, 8);
  ctx.fillStyle = '#ffffff'; // printed paper exiting front
  ctx.fillRect(16, 20, 16, 4);

  // Glowing status lights
  ctx.fillStyle = '#39ff14'; // ready LED
  ctx.fillRect(34, 15, 2, 2);
}

// 10. Draw Door (Gateway portal gate)
export function drawDoor(ctx, width, height, open, animationTimer) {
  ctx.clearRect(0, 0, width, height);

  // Metallic Bevel Arch Frame
  ctx.fillStyle = '#1e293b'; // slate dark steel
  ctx.fillRect(2, 0, width - 4, height);

  // Neon Arch Light
  ctx.strokeStyle = '#bf00ff'; // glowing purple neon arch
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(6, height);
  ctx.lineTo(6, 6);
  ctx.lineTo(width - 6, 6);
  ctx.lineTo(width - 6, height);
  ctx.stroke();

  // Door Panel
  if (open) {
    // Open door reveals glowing infinite blue matrix hallway
    ctx.fillStyle = '#040815';
    ctx.fillRect(8, 6, width - 16, height - 6);

    // Glowing warp scanline
    const lineY = 6 + (animationTimer % 35) / 35 * (height - 12);
    ctx.fillStyle = 'rgba(0, 245, 255, 0.4)';
    ctx.fillRect(8, lineY, width - 16, 3);
  } else {
    // Closed metal garage security gate
    ctx.fillStyle = '#475569';
    ctx.fillRect(8, 6, width - 16, height - 6);

    // Horizontal mechanical grooves
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(8, 14); ctx.lineTo(width - 8, 14);
    ctx.moveTo(8, 24); ctx.lineTo(width - 8, 24);
    ctx.moveTo(8, 34); ctx.lineTo(width - 8, 34);
    ctx.stroke();

    // Lock panel
    ctx.fillStyle = '#ff2d78'; // solid red lock
    ctx.fillRect(width/2 - 2, 20, 4, 4);
  }
}
