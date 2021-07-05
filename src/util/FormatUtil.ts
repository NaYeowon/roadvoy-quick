/* eslint-disable */
export const getDateFormat = (date: string) => {
  const dateFormat = date.split(" ");

  return dateFormat[1];
};

export const getCellNoFormat = (phone: string) => {
  const one = phone.substring(0, 3);
  const two = phone.substring(3, 7);
  const three = phone.substring(7, 11);
  return `${one}-${two}-${three}`;
};

export const costFormat = (cost: number) => {
  const format = Number(cost);
  return `${format.toLocaleString()} 원`;
};
