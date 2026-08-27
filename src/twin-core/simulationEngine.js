import { stationGraph } from './stationGraph';

const seedFor = (id) => id.split('').reduce((sum, character) => sum + character.charCodeAt(0), 0);

export function createSimulationState(tick = 0) {
  return Object.fromEntries(stationGraph.map((station, index) => {
    const baseCycleTime = 44 + ((seedFor(station.id) + index * 3) % 20);
    const isS2 = station.id === 'S2';
    const isS11 = station.id === 'S11';
    return [station.id, {
      stationId: station.id,
      baseCycleTime,
      cycleTime: baseCycleTime + (isS2 ? 4 : isS11 ? 7 : 0),
      queueDepth: isS2 ? 12 : isS11 ? 18 : 2 + (index % 5),
      qualitySignal: isS2 ? 0.96 : isS11 ? 0.72 : 0.91,
      temperature: 62 + (index % 6) * 3,
      status: isS2 ? 'watch' : isS11 ? 'degraded' : 'nominal',
      tick,
      history: [],
    }];
  }));
}

export function tickSimulation(state, tick) {
  return Object.fromEntries(Object.entries(state).map(([id, station]) => {
    const phase = (tick + seedFor(id)) / 5;
    const ambientDrift = Math.sin(phase) * 0.9;
    const isS2 = id === 'S2';
    const isS11 = id === 'S11';
    const isS7 = id === 'S7';
    const scriptedRamp = tick >= 1 && tick <= 12;
    const cycleIncrease = scriptedRamp && isS2 ? 1.8 : scriptedRamp && isS11 ? 2.2 : scriptedRamp && isS7 ? 0.8 : 0;
    const nextCycleTime = Math.max(station.baseCycleTime * 0.9, station.cycleTime + ambientDrift * 0.18 + cycleIncrease);
    const nextQueueDepth = Math.max(0, station.queueDepth + Math.round((ambientDrift * 0.3) + (scriptedRamp && isS2 ? 1 : 0) + (scriptedRamp && isS11 ? 1 : 0)));
    const nextQualitySignal = Math.max(0.35, Math.min(1, station.qualitySignal - (scriptedRamp && isS7 ? 0.012 : isS11 ? 0.003 : 0) + ambientDrift / 900));
    const status = nextQueueDepth >= 20 || nextCycleTime / station.baseCycleTime > 1.3 ? 'critical' : nextQueueDepth >= 12 || nextCycleTime / station.baseCycleTime > 1.16 ? 'watch' : 'nominal';
    const history = [...station.history, { tick, cycleTime: Math.round(nextCycleTime), queueDepth: nextQueueDepth, qualitySignal: nextQualitySignal }].slice(-24);
    return [id, { ...station, tick, cycleTime: Math.round(nextCycleTime), queueDepth: nextQueueDepth, qualitySignal: nextQualitySignal, status, history }];
  }));
}
