/* eslint-disable */
import { Tag } from "antd";
import { RiderSignUpRequest } from "src/components/shop/types";
import styled from "styled-components";
import { bankAccount } from "./FormatUtil";

interface BankCodeProps {
  ucBankCode: number;
  acBankAccount: string;
  rider?: RiderSignUpRequest;
}
export const BankCode = (props: BankCodeProps) => {
  const { ucBankCode, acBankAccount } = props;
  const BankAccount = acBankAccount;

  let bankcodeText;
  let bankCodeColor;
  switch (Number(ucBankCode)) {
    case 34:
      bankcodeText = "광주은행";
      bankCodeColor = "blue";
      break;
    case 39:
      bankcodeText = "경남은행";
      bankCodeColor = "blue";
      break;
    case 4:
      bankcodeText = "국민은행";
      bankCodeColor = "blue";
      break;
    case 3:
      bankcodeText = "기업은행";
      bankCodeColor = "blue";
      break;
    case 11:
      bankcodeText = "농협";
      bankCodeColor = "blue";
      break;
    case 31:
      bankcodeText = "대구은행";
      bankCodeColor = "blue";
      break;
    case 32:
      bankcodeText = "부산은행";
      bankCodeColor = "blue";
      break;
    case 88:
      bankcodeText = "신한은행";
      bankCodeColor = "blue";
      break;
    case 23:
      bankcodeText = "SC은행";
      bankCodeColor = "blue";
      break;
    case 20:
      bankcodeText = "우리은행";
      bankCodeColor = "blue";
      break;
    case 71:
      bankcodeText = "우체국";
      bankCodeColor = "blue";
      break;
    case 5:
      bankcodeText = "외환은행";
      bankCodeColor = "blue";
      break;
    case 37:
      bankcodeText = "전북은행";
      bankCodeColor = "blue";
      break;
    case 81:
      bankcodeText = "하나은행";
      bankCodeColor = "blue";
      break;
    case 89:
      bankcodeText = "케이뱅크";
      bankCodeColor = "blue";
      break;
  }

  return (
    <>
      <BankCodeTag color={bankCodeColor}>{bankcodeText}</BankCodeTag>
      <span>{BankAccount}</span>
    </>
  );
};

const BankCodeTag = styled(Tag)`
  margin-right: 4px;
`;

interface Props {
  usVirtualBank: number;
  acVirtualAccount: string;
}

export const VirtualBankCode = (props: Props) => {
  const { usVirtualBank, acVirtualAccount } = props;

  let virtualBankText;
  let virtualBankColor;

  switch (Number(usVirtualBank)) {
    case 34:
      virtualBankText = "광주은행";
      virtualBankColor = "blue";
      break;
    case 39:
      virtualBankText = "경남은행";
      virtualBankColor = "blue";
      break;
    case 4:
      virtualBankText = "국민은행";
      virtualBankColor = "blue";
      break;
    case 3:
      virtualBankText = "기업은행";
      virtualBankColor = "blue";
      break;
    case 11:
      virtualBankText = "농협";
      virtualBankColor = "blue";
      break;
    case 31:
      virtualBankText = "대구은행";
      virtualBankColor = "blue";
      break;
    case 32:
      virtualBankText = "부산은행";
      virtualBankColor = "blue";
      break;
    case 88:
      virtualBankText = "신한은행";
      virtualBankColor = "blue";
      break;
    case 23:
      virtualBankText = "SC은행";
      virtualBankColor = "blue";
      break;
    case 20:
      virtualBankText = "우리은행";
      virtualBankColor = "blue";
      break;
    case 71:
      virtualBankText = "우체국";
      virtualBankColor = "blue";
      break;
    case 5:
      virtualBankText = "외환은행";
      virtualBankColor = "blue";
      break;
    case 37:
      virtualBankText = "전북은행";
      virtualBankColor = "blue";
      break;
    case 81:
      virtualBankText = "하나은행";
      virtualBankColor = "blue";
      break;
  }

  return (
    <>
      <BankCodeTag color={virtualBankColor}>{virtualBankText}</BankCodeTag>
      <span>{bankAccount(acVirtualAccount)}</span>
    </>
  );
};
