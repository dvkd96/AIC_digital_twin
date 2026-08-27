export function inferMissingSignals(signals, graph) {
  const byId = Object.fromEntries(signals.map((signal) => [signal.stationId, signal]));
  return signals.map((signal) => {
    if (signal.measured) return signal;
    const station = graph.find((item) => item.id === signal.stationId);
    const neighbors = station.neighbors.map((id) => byId[id]).filter(Boolean);
    const average = (key, fallback) => neighbors.length ? neighbors.reduce((sum, item) => sum + item[key], 0) / neighbors.length : fallback;
    const confidence = station.instrumentationTier === 'partial' ? 0.68 : 0.42;
    return { ...signal, cycleTime: average('cycleTime', signal.cycleTime), queueDepth: average('queueDepth', signal.queueDepth), qualitySignal: average('qualitySignal', signal.qualitySignal), confidenceOfSignal: confidence };
  });
}
