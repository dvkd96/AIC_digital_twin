export function explain(prediction) {
  return [...(prediction.evidence ?? []), { label: 'Evidence confidence', value: prediction.confidence, note: prediction.confidence < 0.5 ? 'Inferred from neighboring stations' : 'Full PLC coverage' }, { label: 'Downstream impact', value: prediction.impact, note: 'Touches final assembly throughput' }];
}

export function compareActions(prediction) {
  return [{ id: 'A', label: 'Rebalance feeder timing', estimatedEffectPct: 11, estimatedCost: 'low', riskReduction: 'high', recommended: true }, { id: 'B', label: 'Hold and inspect material', estimatedEffectPct: -4, estimatedCost: 'medium', riskReduction: 'medium', recommended: false }, { id: 'C', label: 'Add second operator', estimatedEffectPct: 6, estimatedCost: 'high', riskReduction: 'low', recommended: false }].map((action) => ({ ...action, recommended: prediction.stationId === 'S2' ? action.id === 'A' : action.id === 'B' }));
}

export function projectAction(action, currentThroughput = 91) { return { before: currentThroughput, after: Math.round(currentThroughput * (1 + action.estimatedEffectPct / 100)), delta: action.estimatedEffectPct }; }
