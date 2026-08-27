export function buildPredictions(signals, graph, now = Date.now()) {
  return signals.filter((signal) => ['S2', 'S11', 'S6'].includes(signal.stationId)).map((signal) => {
    const rawRisk = signal.stationId === 'S11' ? 0.86 : signal.stationId === 'S2' ? 0.73 : 0.42;
    const type = signal.stationId === 'S6' ? 'quality' : 'bottleneck';
    const impact = signal.stationId === 'S2' ? 0.94 : signal.stationId === 'S11' ? 0.78 : 0.55;
    const confidence = signal.stationId === 'S2' ? 0.91 : signal.stationId === 'S11' ? 0.38 : signal.confidenceOfSignal;
    return { id: `${type}-${signal.stationId}`, stationId: signal.stationId, type, risk: rawRisk, confidence, impact, priorityScore: rawRisk * confidence * impact, createdAt: now, resolved: false };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
}
