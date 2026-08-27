export function predictQuality(signal) { return Math.max(0, Math.min(1, 1 - (1 - signal.qualitySignal) * 2)); }
