import { stationGraph } from '../twin-core/stationGraph';
import { createSimulationState, tickSimulation } from '../twin-core/simulationEngine';
import { normalizeSignals } from '../understand/signalIngestion';
import { inferMissingSignals } from '../understand/softSensing';
import { buildPredictions } from '../assess/predictors';
import { rankPredictions } from '../assess/priorityQueue';
import { learningMetrics } from '../learn/metricsTracker';

export function createTwinStore(tick = 0) {
  return { simulation: createSimulationState(tick), eventLog: ['Simulation initialized.'] };
}

export function advanceTwin(store, tick) {
  const simulation = tickSimulation(store.simulation, tick);
  const events = [...store.eventLog];
  if (tick === 1) events.unshift('[T1] Scripted deterioration started: S2, S11 and S7.');
  if (tick === 8) events.unshift('[T8] Priority inversion: S2 outranks higher-risk S11 because its signal is measured.');
  if (tick === 16) events.unshift('[T16] Maintenance window: torque-angle retrofit scheduled for S11.');
  if (tick === 20) events.unshift('[T20] Quality event detected downstream at S13; genealogy trace available.');
  return { simulation, eventLog: events.slice(0, 8) };
}

export function createTwinSnapshot(store, tick = 0) {
  const simulation = store?.simulation ?? tickSimulation(createSimulationState(), tick);
  const signals = inferMissingSignals(normalizeSignals(simulation, stationGraph), stationGraph);
  return { tick, simulation, signals, predictions: rankPredictions(buildPredictions(signals, stationGraph)), metrics: learningMetrics, eventLog: store?.eventLog ?? ['Simulation initialized.'] };
}
