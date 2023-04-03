export const idAsKey = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item.id]: item.recipe }), {});

export const idAsKeyForUser = (arr) =>
  arr.reduce((acc, item) => ({ ...acc, [item._id]: item }), {});
