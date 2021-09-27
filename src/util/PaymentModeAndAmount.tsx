import { Tag } from "antd";
import styled from "styled-components";
import { costFormat } from "./FormatUtil";

interface Props {
  ucPaymentMode: number;
  ulGoodsPrice: number;
}

const PaymentModeAndAmount = (props: Props) => {
  const { ucPaymentMode, ulGoodsPrice } = props;

  let paymentModeText;
  let paymentColor;

  switch (Number(ucPaymentMode)) {
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
      <span>{costFormat(Number(ulGoodsPrice))}</span>
    </>
  );
};

export default PaymentModeAndAmount;

const PaymentModeTag = styled(Tag)`
  margin-right: 4px;
`;
