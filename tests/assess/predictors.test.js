import { describe, expect, it } from 'vitest';
import { buildPredictions } from '../../src/assess/predictors';

describe('prediction evidence', () => {
  it('keeps measured S2 ahead of the higher raw-risk inferred S11', () => {
    const predictions = buildPredictions([
      { stationId: 'S2', measured: true, cycleTime: 70, baselineCycleTime: 50, queueDepth: 18, qualitySignal: 0.9, confidenceOfSignal: 1 },
      { stationId: 'S11', measured: false, cycleTime: 72, baselineCycleTime: 50, queueDepth: 22, qualitySignal: 0.7, confidenceOfSignal: 0.42 },
    ], [{ id: 'S2' }, { id: 'S11' }]);
    expect(predictions.find((prediction) => prediction.stationId === 'S11').risk).toBeGreaterThan(predictions.find((prediction) => prediction.stationId === 'S2').risk);
    expect(predictions.find((prediction) => prediction.stationId === 'S2').priorityScore).toBeGreaterThan(predictions.find((prediction) => prediction.stationId === 'S11').priorityScore);
    expect(predictions[0].evidence).toHaveLength(3);
  });
});