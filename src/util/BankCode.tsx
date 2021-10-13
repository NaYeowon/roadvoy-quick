/* eslint-disable */
import { Tag } from "antd";
import { RiderSignUpRequest } from "src/components/shop/types";
import styled from "styled-components";

interface BankCodeProps {
  ucBankCode: number;
  acBankAccount: number;
  rider?: RiderSignUpRequest;
}
const BankCode = (props: BankCodeProps) => {
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
  }

  return (
    <>
      <BankCodeTag color={bankCodeColor}>{bankcodeText}</BankCodeTag>
      <span>{BankAccount}</span>
    </>
  );
};

export default BankCode;

const BankCodeTag = styled(Tag)`
  margin-right: 4px;
`;
