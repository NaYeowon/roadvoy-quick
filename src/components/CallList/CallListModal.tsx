/* eslint-disable */
import { useState, useEffect, FC } from "react";
import { Button, Popconfirm, message, Steps } from "antd";
import styled from "styled-components";
import Modal from "antd/lib/modal/Modal";
import "./CallListModal.css";
import { CallDetailShopTitle } from "./index";
import { CallInfo } from "./CallListComponent";
import { costFormat, getCellNoFormat, getDateFormat } from "src/util/FormatUtil";
import axios from "axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import AddressDaumMapComponent from "src/util/AddressDaumMapComponent";
import CallTimeLine from "./CallTimeLine";

const { Step } = Steps;
interface Props {
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  callInfo: CallInfo | undefined;
}
const CallListModal: FC<Props> = (props: Props) => {
  const { visible, onOk, onCancel, callInfo } = props;

  const handleCancel = () => {
    onCancel();
  };
  const handleOk = () => {
    onOk();
  };

  const handleClickCancelErrand = async () => {
    const form = new FormData();

    form.append("ulErrandSeqNo", String(props.callInfo!!.ulErrandSeqNo));
    try {
      const response = await axios({
        method: "post",
        url: "https://api.roadvoy.net/agency/errand/cancel.php",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });
      console.log(response);
      message.success("배차가 취소되었습니다.");
    } catch (e) {
      message.error(e.message);
    }
  };

  if (!callInfo) {
    return <></>;
  }

  return (
    <>
      <Modal title="콜 상세" visible={visible} onCancel={handleCancel} onOk={handleOk}>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <CallDetailModalShopName>{callInfo.acDestCompany}</CallDetailModalShopName>
            <p>주문시간: {callInfo.acOrderDateTime}</p>
            <p>상점연락처: {getCellNoFormat(callInfo.acOriginCellNo)}</p>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <CallDetailShopTitle title="기사" value={callInfo.acCourPresident} />
            <CallDetailShopTitle title="배달비" value={costFormat(callInfo.ulErrandCharge)} />
            <CallDetailShopTitle title="결제정보" value={costFormat(callInfo.ulGoodsPrice)} />
            <CallDetailShopTitle
              title="고객연락처"
              value={getCellNoFormat(callInfo.acDestCellNo)}
            />
            <CallDetailShopTitle title="고객요청사항" value={callInfo.acOriginMemo} />
            <CallDetailShopTitle
              title="배달주소"
              value={`${callInfo.acDestOldAddr} ${callInfo.acDestAddrDesc}`}
            />
            <AddressDaumMapComponent callInfo={callInfo} />
          </div>
        </div>
        <CallTimeLine callInfo={callInfo} />
        <Button>콜 수정</Button>
        <Button type="ghost">배차 취소 </Button>
        <Popconfirm
          title="정말 콜을 취소하시겠습니까?"
          onConfirm={handleClickCancelErrand}
          okText="네"
          cancelText="아니요"
        >
          <Button type="primary" danger>
            콜 취소
          </Button>
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
