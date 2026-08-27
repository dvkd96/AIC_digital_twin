export function predictBottleneck(signal) { return Math.min(1, signal.queueDepth / 20 + signal.cycleTime / 180); }
