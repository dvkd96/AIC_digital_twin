import { describe, expect, it } from 'vitest';
import { compareActions, projectAction } from '../../src/decide/decisionEngine';

describe('decision layer', () => {
  it('always provides three actions and projects throughput', () => {
    const actions = compareActions({ stationId: 'S2' });
    expect(actions).toHaveLength(3);
    expect(projectAction(actions[0], 91).after).toBeGreaterThan(91);
  });
});
