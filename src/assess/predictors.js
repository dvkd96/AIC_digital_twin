export function buildPredictions(signals, graph, now = Date.now()) {
  return signals.filter((signal) => ['S2', 'S11', 'S6'].includes(signal.stationId)).map((signal) => {
    const station = graph.find((item) => item.id === signal.stationId);
    const baselineCycleTime = signal.baselineCycleTime ?? station?.baselineCycleTime ?? 50;
    const cycleDrift = Math.max(0, Math.min(1, (signal.cycleTime / baselineCycleTime - 1) * 2.5));
    const queuePressure = Math.max(0, Math.min(1, signal.queueDepth / 24));
    const qualityDrift = Math.max(0, Math.min(1, 1 - signal.qualitySignal));
    const scriptedRisk = signal.stationId === 'S11' ? 0.86 : signal.stationId === 'S2' ? 0.73 : 0.42;
    const rawRisk = Math.min(0.99, Math.max(scriptedRisk, scriptedRisk * 0.55 + cycleDrift * 0.28 + queuePressure * 0.17 + qualityDrift * 0.2));
    const type = signal.stationId === 'S6' ? 'quality' : 'bottleneck';
    const impact = signal.stationId === 'S2' ? 0.94 : signal.stationId === 'S11' ? 0.78 : 0.55;
    const confidence = signal.stationId === 'S2' ? 0.91 : signal.stationId === 'S11' ? 0.38 : signal.confidenceOfSignal;
    const evidence = [
      { label: 'Cycle time drift', value: cycleDrift, note: `${Math.round(signal.cycleTime)}s observed at ${signal.stationId}` },
      { label: 'Queue pressure', value: queuePressure, note: `${Math.round(signal.queueDepth)} units waiting` },
      { label: 'Process / quality drift', value: qualityDrift, note: signal.measured ? 'Direct measurement' : 'Inferred from neighboring stations' },
    ];
    return { id: `${type}-${signal.stationId}`, stationId: signal.stationId, type, risk: rawRisk, confidence, impact, evidence, priorityScore: rawRisk * confidence * impact, createdAt: now, resolved: false };
  }).sort((a, b) => b.priorityScore - a.priorityScore);
}
