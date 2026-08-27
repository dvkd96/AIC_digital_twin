import { createSignal } from '../shared/types';

export function normalizeSignals(simulation, graph, timestamp = Date.now()) {
  return graph.map((station) => {
    const raw = simulation[station.id] ?? { cycleTime: 39, queueDepth: 2, qualitySignal: 0.98 };
    const measured = station.instrumentationTier === 'full';
    return createSignal(station.id, measured, { cycleTime: raw.cycleTime, queueDepth: raw.queueDepth, qualitySignal: raw.qualitySignal }, timestamp);
  });
}
