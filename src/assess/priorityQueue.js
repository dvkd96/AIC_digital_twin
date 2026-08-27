export function rankPredictions(predictions) {
  return [...predictions].sort((a, b) => b.risk * b.confidence * b.impact - a.risk * a.confidence * a.impact).map((prediction, index) => ({ ...prediction, rank: index + 1, priorityScore: prediction.risk * prediction.confidence * prediction.impact }));
}
