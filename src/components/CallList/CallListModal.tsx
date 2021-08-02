/* eslint-disable */
import { useState, useEffect, FC } from "react";
import { Button, Popconfirm, message, Steps } from "antd";
import styled from "styled-components";
import Modal from "antd/lib/modal/Modal";
import "./CallListModal.css";
import { CallDetailShopTitle } from "./index";
import { CallInfo } from "./CallListComponent";
import { costFormat, getCellNoFormat, getDateFormat } from "src/util/FormatUtil";

const { Step } = Steps;
interface Props {
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  callInfo: CallInfo | undefined;
}
const CallListModal: FC<Props> = (props: Props) => {
  const { visible, onOk, onCancel, callInfo } = props;
  const [cancelBtn, setCancelBtn] = useState();

  const handleCancel = () => {
    onCancel();
  };
  const handleOk = () => {
    onOk();
  };

  const handleClickCancelErrand = () => {
    onCancel();
    message.success("배차가 취소되었습니다.");
    console.log(cancelBtn);
    // return (
    //   <div>
    //     {callInfo?.ucDeliStatus !== 64
    //       ? message.success("배차가 취소되었습니다.")
    //       : message.success("이미 취소된 콜입니다.")}
    //   </div>
    // );
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
            <CallDetailShopTitle title="배달비" value={costFormat(callInfo.ucErrandType)} />
            <CallDetailShopTitle title="결제정보" value={costFormat(callInfo.ulGoodsPrice)} />
            <CallDetailShopTitle
              title="고객연락처"
              value={getCellNoFormat(callInfo.acDestCellNo)}
            />
            <CallDetailShopTitle title="고객요청사항" value={callInfo.acClientMemo} />
            <CallDetailShopTitle
              title="배달주소"
              value={`${callInfo.acOriginOldAddr} ${callInfo.acDestOldAddr} ${callInfo.acDestAddrDesc}`}
            />
          </div>
        </div>
        <Steps size="small" current={1} style={{ marginBottom: "20px" }}>
          <Step title="주문" description={getDateFormat(callInfo.acOrderDateTime)} />

          <Step title="배차" />
          <Step title="완료" />
        </Steps>
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
