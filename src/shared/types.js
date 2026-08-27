export const instrumentationTiers = ['full', 'partial', 'none'];

export const createSignal = (stationId, measured, values, timestamp = Date.now()) => ({
  stationId, timestamp, measured, ...values,
  confidenceOfSignal: measured ? 1 : values.confidenceOfSignal ?? 0.5,
});
