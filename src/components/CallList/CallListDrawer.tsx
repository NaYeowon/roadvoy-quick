/* eslint-disable */
import * as React from "react";
import { useState, useEffect, FC } from "react";
import { Drawer, Row } from "antd";
import styled from "styled-components";

interface Props {
  visible: boolean;
  onClose: any;
  callDrawer: string;
}

const CallListDrawer: FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <Drawer
        title="콜 상세"
        placement="right"
        width={480}
        visible={props.visible}
        style={{ zIndex: 999 }}
        closable={false}
        onClose={onClose}
      >
        <div>
          <Row>
            <CallDetailDrawerShopName>상점명</CallDetailDrawerShopName>
            <span>주문시간: </span>
            <p>픽업제한시간: </p>
          </Row>
        </div>
      </Drawer>
    </>
  );
};

export default CallListDrawer;
const CallDetailDrawerShopName = styled.h2`
  color: black;
  margin: 0;
  font-weight: bold;
`;
