/* eslint-disable */
import { Col, Row } from "antd";
import styled from "styled-components";

const Title = styled.span`
  color: #000;
  font-weight: 500;
`;

interface Props {
  title: string;
  value: string;
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
