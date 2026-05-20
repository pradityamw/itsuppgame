/**
 * PC Repair Simulation configurations & diagnostic feedback engine.
 */

export const HARDWARE_SLOTS = {
  cpu: { id: 'cpu', label: 'CPU Socket (LGA 1200)', required: true },
  cooler: { id: 'cooler', label: 'CPU Cooler Mount', required: true },
  ram1: { id: 'ram1', label: 'DIMM Slot A1', required: true },
  ram2: { id: 'ram2', label: 'DIMM Slot B1', required: false },
  gpu: { id: 'gpu', label: 'PCIe x16 Slot', required: true },
  ssd: { id: 'ssd', label: 'SATA Drive Bay', required: true },
};

export const CABLE_IDS = {
  atx24pin: 'atx24pin',     // Motherboard main power
  cpu8pin: 'cpu8pin',       // CPU auxiliary power
  gpu6pin: 'gpu6pin',       // Graphics card power
  sataPower: 'sataPower',   // Storage drive power from PSU
  sataData: 'sataData',     // Storage drive data to Motherboard
  frontPanel: 'frontPanel', // Power button to motherboard header
  fanHeader: 'fanHeader',   // CPU fan cable to CPU_FAN header
};

export const CABLE_DETAILS = {
  [CABLE_IDS.atx24pin]:   { label: 'ATX 24-Pin Motherboard Power', color: '#ffcc00' },
  [CABLE_IDS.cpu8pin]:    { label: 'CPU 8-Pin Power', color: '#ff6600' },
  [CABLE_IDS.gpu6pin]:    { label: 'PCIe 6-Pin GPU Power', color: '#cc00ff' },
  [CABLE_IDS.sataPower]:  { label: 'SATA Power Cable', color: '#00f5ff' },
  [CABLE_IDS.sataData]:   { label: 'SATA Data Cable', color: '#39ff14' },
  [CABLE_IDS.frontPanel]: { label: 'Front Panel Connector', color: '#ffffff' },
  [CABLE_IDS.fanHeader]:  { label: 'CPU Fan Power Cable', color: '#ff2d78' },
};

/**
 * Runs diagnostics on the current PC state to simulate realistic boot output.
 * 
 * @param {object} slots - Component statuses in each slot
 * @param {object} cables - Connection status of each cable
 * @param {boolean} psuOn - Power Supply back toggle switch
 * @param {boolean} pcButtonOn - Case front panel power button press state
 * @returns {object} telemetry - Current telemetry (power, fan, temp, beep, monitor display)
 */
export function diagnosePC(slots, cables, psuOn, pcButtonOn) {
  const telemetry = {
    powered: false,
    fansSpinning: false,
    cpuTemp: 35, // starting temperature
    beepCode: 'none',
    bootState: 'off',
    displayMsg: 'No signal',
    success: false,
  };

  // 1. Front Panel button can only turn the system on if the front panel cable is plugged in
  const canTriggerPower = cables[CABLE_IDS.frontPanel]?.connected;
  const isButtonActive = pcButtonOn && canTriggerPower;

  // 2. Main power is supplied only if PSU back switch is ON and both 24-pin and 8-pin cables are connected
  const hasAtxPower = cables[CABLE_IDS.atx24pin]?.connected;
  const hasCpuPower = cables[CABLE_IDS.cpu8pin]?.connected;

  if (psuOn && hasAtxPower && hasCpuPower) {
    telemetry.powered = true;
  }

  // If power button is active and we have power, the system boots up into pre-POST state
  if (telemetry.powered && isButtonActive) {
    telemetry.fansSpinning = true;

    // Check RAM status
    const ram1 = slots.ram1 || { state: 'unplugged' };
    const ram2 = slots.ram2 || { state: 'unplugged' };

    // If either RAM is loose, we trigger a memory POST failure beep
    const ramLoose = ram1.state === 'loose' || ram2.state === 'loose';
    const noRam = ram1.state === 'unplugged' && ram2.state === 'unplugged';

    if (noRam || ramLoose) {
      telemetry.beepCode = 'three_beeps'; // RAM error beep code (continuous beeps)
      telemetry.bootState = 'ram_error';
      telemetry.displayMsg = 'No signal (Motherboard diagnostic: 3 short beeps — Memory failure)';
      return telemetry;
    }

    // Check Graphics card connection
    const gpu = slots.gpu || { state: 'unplugged' };
    if (gpu.state === 'unplugged') {
      telemetry.beepCode = 'single_long_two_short'; // GPU missing beep code
      telemetry.bootState = 'no_display';
      telemetry.displayMsg = 'No signal (Graphics card missing or unseated)';
      return telemetry;
    }

    // Check GPU Power
    const isGpuPowerConnected = cables[CABLE_IDS.gpu6pin]?.connected;
    if (!isGpuPowerConnected) {
      telemetry.bootState = 'no_gpu_power';
      telemetry.displayMsg = 'Please power down and connect PCIe power cable(s) for this graphics card.';
      return telemetry;
    }

    // Check CPU Fan & Cooler connection
    const fanConnected = cables[CABLE_IDS.fanHeader]?.connected;
    const cpuState = slots.cpu?.state || 'connected';
    
    // Compute telemetry temperature based on cooling
    if (!fanConnected || cpuState === 'thermal_paste_dried') {
      telemetry.cpuTemp = 85; // extremely hot immediately
    } else {
      telemetry.cpuTemp = 42; // normal operating idle temp
    }

    // Check Storage connection
    const isSataPowerConnected = cables[CABLE_IDS.sataPower]?.connected;
    const isSataDataConnected = cables[CABLE_IDS.sataData]?.connected;
    const ssd = slots.ssd || { state: 'unplugged' };

    if (ssd.state === 'unplugged' || !isSataPowerConnected || !isSataDataConnected) {
      telemetry.beepCode = 'single_short';
      telemetry.bootState = 'no_bootable_device';
      telemetry.displayMsg = 'POST successful. \n\nNo bootable device detected. Insert boot media and restart.';
      return telemetry;
    }

    // If CPU is overheating (due to dry paste or unplugged fan), it does a thermal shutdown
    if (telemetry.cpuTemp >= 80) {
      telemetry.beepCode = 'single_short';
      telemetry.bootState = 'thermal_shutdown';
      telemetry.displayMsg = 'POST successful. \n\nERROR: CPU Temperature critical! Shutting down to prevent hardware damage...';
      return telemetry;
    }

    // Everything is correct!
    telemetry.beepCode = 'single_short';
    telemetry.bootState = 'success';
    const totalRam = (slots.ram1?.state === 'properly_seated' ? 8 : 0) + (slots.ram2?.state === 'properly_seated' ? 8 : 0);
    telemetry.displayMsg = `POST successful. \nMemory detected: ${totalRam}GB RAM\nLoading OS... \n\nSystem boot sequence completed successfully.`;
    telemetry.success = true;
  }

  return telemetry;
}
