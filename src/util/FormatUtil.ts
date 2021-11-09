import { AgencyDTO } from "src/components/shop/types";

/* eslint-disable */
export const getDateFormat = (date: string) => {
  const dateFormat = date.split(" ");

  return dateFormat[1];
};

export const DateFormat = (date: string) => {
  const dateFormat = date.split(" ");

  return dateFormat[0];
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

export const bizNumber = data => {
  if (!data || data.length === 0) {
    return "";
  }
  return data
    .replace(/[^0-9]/g, "")
    .replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, "$1-$2-$3")
    .replace("--", "-");
};

export const costFormat = (cost: number) => {
  if (!cost) cost = 0;
  const format = Number(cost);
  return `${format.toLocaleString()} 원`;
};

export const callFormat = (call: number) => {
  const format = Number(call);
  return `${format.toLocaleString()} 콜`;
};

export const bankCode = (bankcode: number) => {
  switch (Number(bankcode)) {
    case 88:
      return "신한은행";
    case 4:
      return "국민은행";
    case 3:
      return "기업은행";
    case 20:
      return "우리은행";
    case 90:
      return "카카오뱅크";
    case 89:
      return "케이뱅크";
    case 11:
      return "농협중앙회";
    case 2:
      return "산업은행";
    case 23:
      return "SC제일은행";
    case 81:
      return "KEB하나은행";
    case 27:
      return "씨티뱅크";
    case 7:
      return "수협은행";
    case 31:
      return "대구은행";
    case 32:
      return "부산은행";
    case 34:
      return "광주은행";
    case 35:
      return "제주은행";
    case 37:
      return "전북은행";
    case 39:
      return "경남은행";
  }
};
export const bankAccount = (bank: string) => {
  if (!bank || bank.length === 0) {
    return "";
  }
  if (bankCode(20))
    return bank
      .replace(/[^0-9]/g, "")
      .replace(/([0-9]{6})([0-9]{2})([0-9]{6})/, "$1-$2-$3")
      .replace("--", "-");
};
