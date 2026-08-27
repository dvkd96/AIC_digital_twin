export function recommend(actions) { return actions.find((action) => action.recommended) ?? actions[0]; }
