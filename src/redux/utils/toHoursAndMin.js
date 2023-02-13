export const toHoursAndMin = (time) => {
  const h = Math.floor(time / 60);
  const min = time % 60;

  return h > 0 ? `${h} h ${min} min` : `${min} min`;
};
