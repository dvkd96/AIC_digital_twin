export function explain(prediction) {
  const isS2 = prediction.stationId === 'S2';
  return [{ label: 'Risk signal', value: prediction.risk, note: isS2 ? 'Cycle time rising across 3 ticks' : 'Queue depth elevated' }, { label: 'Evidence confidence', value: prediction.confidence, note: isS2 ? 'Full PLC coverage' : 'Inferred from neighboring stations' }, { label: 'Downstream impact', value: prediction.impact, note: 'Touches final assembly throughput' }];
}

export function compareActions(prediction) {
  return [{ id: 'A', label: 'Rebalance feeder timing', estimatedEffectPct: 11, estimatedCost: 'low', riskReduction: 'high', recommended: true }, { id: 'B', label: 'Hold and inspect material', estimatedEffectPct: -4, estimatedCost: 'medium', riskReduction: 'medium', recommended: false }, { id: 'C', label: 'Add second operator', estimatedEffectPct: 6, estimatedCost: 'high', riskReduction: 'low', recommended: false }].map((action) => ({ ...action, recommended: prediction.stationId === 'S2' ? action.id === 'A' : action.id === 'B' }));
}

export function projectAction(action, currentThroughput = 91) { return { before: currentThroughput, after: Math.round(currentThroughput * (1 + action.estimatedEffectPct / 100)), delta: action.estimatedEffectPct }; }
