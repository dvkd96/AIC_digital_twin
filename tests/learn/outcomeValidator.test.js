import { describe, expect, it } from 'vitest';
import { validateOutcome } from '../../src/learn/outcomeValidator';

describe('outcome validator', () => {
  it('records a resolved actual outcome', () => {
    const result = validateOutcome({ stationId: 'S2' }, 'S2');
    expect(result).toMatchObject({ resolved: true, actual: true });
  });
});
