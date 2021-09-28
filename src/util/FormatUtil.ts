/* eslint-disable */
export const getDateFormat = (date: string) => {
  const dateFormat = date.split(" ");

  return dateFormat[1];
};

export const getCellNoFormat = phone => {
  if (!phone || phone.length === 0) {
    return "";
  }
  return phone
    .replace(/[^0-9]/g, "")
    .replace(/(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, "$1-$2-$3")
    .replace("--", "-");
};

export const costFormat = (cost: number) => {
  if(!cost) cost = 0
  const format = Number(cost);
  return `${format.toLocaleString()} 원`;
};

export const callFormat = (call: number) => {
  const format = Number(call);
  return `${format.toLocaleString()} 콜`;
};
