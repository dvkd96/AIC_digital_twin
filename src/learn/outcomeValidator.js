export function validateOutcome(prediction, groundTruth) { return { ...prediction, resolved: true, actual: groundTruth === prediction.stationId }; }
