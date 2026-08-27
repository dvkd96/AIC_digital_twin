import { describe, expect, it } from 'vitest';
import { rankPredictions } from '../../src/assess/priorityQueue';

describe('priority queue', () => {
  it('ranks measured S2 above higher-risk inferred S11', () => {
    const ranked = rankPredictions([
      { id: 's11', stationId: 'S11', risk: 0.86, confidence: 0.38, impact: 0.78 },
      { id: 's2', stationId: 'S2', risk: 0.73, confidence: 0.91, impact: 0.94 },
    ]);
    expect(ranked[0].stationId).toBe('S2');
    expect(ranked[0].priorityScore).toBeGreaterThan(ranked[1].priorityScore);
  });
});
