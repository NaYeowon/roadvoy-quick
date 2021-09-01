/* eslint-disable */
import { Tag } from "antd";
import React from "react";
import { CallInfo } from "src/components/CallList/CallListComponent";
import styled from "styled-components";

interface Props {
  callInfo: CallInfo;
}

const PaymentModeAndAmount = (props: Props) => {
  const { callInfo } = props;

  const ucPaymentMode: number = Number(callInfo.ucPaymentMode);
  const charge = Number(callInfo.ulGoodsPrice).toLocaleString();

  let paymentModeText;
  let paymentColor;

  switch (ucPaymentMode) {
    case 2:
      paymentModeText = "카드";
      paymentColor = "#2db7f5";
      break;
    case 3:
      paymentModeText = "현금";
      paymentColor = "#87d068";
      break;
    case 4:
      paymentModeText = "선결";
      paymentColor = "#f50";
      break;
  }

  return (
    <>
      <PaymentModeTag color={paymentColor}>{paymentModeText}</PaymentModeTag>
      <span>{charge}원</span>
    </>
  );
};

export default PaymentModeAndAmount;

const PaymentModeTag = styled(Tag)`
  margin-right: 4px;
`;
