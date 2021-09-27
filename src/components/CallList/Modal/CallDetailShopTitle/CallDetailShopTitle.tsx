import { Col, Row } from "antd";
import { Title } from "./styles";

interface CallDetailShopTitleProps {
  title: string;
  value: string | number | JSX.Element;
}

export default function CallDetailShopTitle(props: CallDetailShopTitleProps) {
  return (
    <Row>
      <Col span={8} style={{ textAlign: "left" }}>
        <Title>{props.title}</Title>
      </Col>
      <Col span={16} style={{ textAlign: "left" }}>
        {props.value}
      </Col>
    </Row>
  );
}
