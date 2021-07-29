/* eslint-disable */
import * as React from "react";
import { useState, useEffect, FC } from "react";
import { Row, Col, Button, Popconfirm, message } from "antd";
import styled from "styled-components";
import Modal from "antd/lib/modal/Modal";
import "./CallListModal.css";
import { CallDetailShopTitle } from "./index";
import { CallInfo } from "./CallListComponent";

interface Props {
  visible: boolean | undefined;
  onOk: any;
  onCancel: any;
  callInfo: any;
}
const CallListModal: FC<Props> = props => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log(props.callInfo);
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    props.onCancel(isModalVisible);
  };
  const handleOk = () => {
    setIsModalVisible(false);
    props.onOk(isModalVisible);
  };

  const handleClickCancelErrand = () => {
    // if (props.callInfo.ucDeliStatus !== 64) {
    // }
    console.log(props.callInfo.ucDeliStatus);

    props.onCancel(isModalVisible);
    message.success("배차가 취소되었습니다.");
  };

  return (
    <>
      <Modal title="콜 상세" visible={props.visible} onCancel={handleCancel} onOk={handleOk}>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <CallDetailModalShopName>{props.callInfo.acDestCompany}</CallDetailModalShopName>
            <p>주문시간: {}</p>
            <p>조리시간: </p>
            <p>상점연락처: </p>
          </div>
          <CallDetailShopTitle title="기사" value="" />
          <CallDetailShopTitle title="배달비" value="ㅁㄴㅇㅁㄴㅇ" />
          <CallDetailShopTitle title="결제정보" value="ㅁㄴㅇㅁㅇ" />
          <CallDetailShopTitle title="고객연락처" value="123131" />
          <CallDetailShopTitle title="고객요청사항" value="123131321" />
          <CallDetailShopTitle title="배달주소" value="1231312" />
        </div>
        <Button>콜 수정</Button>
        <Popconfirm
          title="정말 콜을 취소하시겠습니까?"
          onConfirm={handleClickCancelErrand}
          okText="네"
          cancelText="아니요"
        >
          <Button type="ghost">콜 취소 </Button>
        </Popconfirm>
      </Modal>
    </>
  );
};

export default CallListModal;
const CallDetailModalShopName = styled.h2`
  color: black;
  margin: 0;
  font-weight: bold;
`;
