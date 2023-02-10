export const idAsKey = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item.recipe }), {});
