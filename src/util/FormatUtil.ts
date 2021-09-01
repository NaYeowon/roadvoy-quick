/* eslint-disable */
export const getDateFormat = (date: string) => {
  const dateFormat = date.split(" ");

  return dateFormat[1];
};

export const getCellNoFormat = phone => {
  if (!phone || phone.length === 0) {
    return null;
  }
  return phone
    .replace(/[^0-9]/g, "")
    .replace(/(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, "$1-$2-$3")
    .replace("--", "-");
};
// export const getCellNoFormat = (phone: string) => {
//   const one = phone.substring(0, 3);
//   const two = phone.substring(3, 7);
//   const three = phone.substring(7, 11);
//   return `${one}-${two}-${three}`;
// };

export const costFormat = (cost: number) => {
  const format = Number(cost);
  return `${format.toLocaleString()} 원`;
};

export const callFormat = (call: number) => {
  const format = Number(call);
  return `${format.toLocaleString()} 콜`;
};
