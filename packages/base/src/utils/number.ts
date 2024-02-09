export const roundFractionDigits = (number: number, places: number) => {
  return Number(Math.round(Number(number + 'e+' + places)) + 'e-' + places);
};

export const isNumeric = (n: string) => {
  return !isNaN(parseFloat(n)) && isFinite(+n);
};
