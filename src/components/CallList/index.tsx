/* eslint-disable */
import { Col, Row, Tag } from "antd";
import styled from "styled-components";
import { CallInfo } from "./CallListComponent";

const Title = styled.span`
  color: #000;
  font-weight: 500;
`;

interface Props {
  title: string;
  value: any;
}

export const CallDetailShopTitle = (props: Props) => {
  return (
    <Row>
      <Col span={6} style={{ textAlign: "left" }}>
        <Title>{props.title}</Title>
      </Col>
      <Col>{props.value}</Col>
    </Row>
  );
};

interface Call {
  callInfo: CallInfo;
}

// export const PaymentModeAndAmount = (props: Call) => {
//   const { callInfo } = props;

//   // eslint-disable-next-line radix
//   const ucPaymentMode: number = callInfo.ucPaymentMode;
//   const charge = Number(callInfo.ulGoodsPrice).toLocaleString();

//   let PaymentModeText;
//   let paymentColor;

//   switch (ucPaymentMode) {
//     case 2:
//       PaymentModeText = "카드";
//       paymentColor = "#2db7f5";
//       break;
//     case 3:
//       PaymentModeText = "현금";
//       paymentColor = "#87d068";
//       break;
//     case 4:
//       PaymentModeText = "선결";
//       paymentColor = "#f50";
//       break;
//   }
//   return (
//     <>
//       <Tag color={paymentColor}>{PaymentModeText}</Tag>
//       <span>{charge}원</span>
//     </>
//   );
// };
