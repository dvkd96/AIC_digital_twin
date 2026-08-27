export function detectAnomaly(signal, baseline = { cycleTime: 45, queueDepth: 5 }) { return Math.abs(signal.cycleTime - baseline.cycleTime) > 18 || signal.queueDepth - baseline.queueDepth > 8; }
