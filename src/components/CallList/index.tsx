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
      <Col span={8} style={{ textAlign: "left" }}>
        <Title>{props.title}</Title>
      </Col>
      <Col span={16} style={{ textAlign: "left" }}>{props.value}</Col>
    </Row>
  );
};
