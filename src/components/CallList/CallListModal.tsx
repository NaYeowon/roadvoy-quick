/* eslint-disable */
import { useState, useEffect, FC } from "react";
import { Button, Popconfirm, message, Steps, Tag } from "antd";
import styled from "styled-components";
import Modal from "antd/lib/modal/Modal";
import "./CallListModal.css";
import { CallDetailShopTitle } from "./index";
import { CallInfo } from "./CallListComponent";
import { costFormat, getCellNoFormat, getDateFormat } from "src/util/FormatUtil";
import axios, { AxiosError } from "axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import AddressDaumMapComponent from "src/util/AddressDaumMapComponent";
import CallTimeLine from "./CallTimeLine";
import CallModify from "./CallModify";
import PaymentModeAndAmount from "src/util/PaymentModeAndAmount";
import FlatFixedRateSystem from "src/util/FlatFixedRateSystem";

const { Step } = Steps;
interface Props {
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  callInfo: CallInfo | undefined;
}
const CallListModal: FC<Props> = (props: Props) => {
  const { visible, onOk, onCancel, callInfo } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [callModalInfo, setCallModalInfo] = useState<CallInfo | undefined>(undefined);

  const handleCancel = () => {
    onCancel();
  };
  const handleOk = () => {
    onOk();
  };

  const CallOk = () => {
    setIsModalVisible(false);
  };

  const CallCancel = () => {
    setIsModalVisible(false);
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
      message.success("콜이 취소되었습니다.");
    } catch (e) {
      const error = e as AxiosError
      message.error(error.message);
    }
  };

  if (!callInfo) {
    return <></>;
  }

  const handleClickDispatchCancel = async () => {
    const form = new FormData();

    form.append("ucAreaNo", String(props.callInfo?.ucAreaNo));
    form.append("ucDistribId", String(props.callInfo?.ucDistribId));
    form.append("ucAgencyId", String(props.callInfo?.ucAgencyId));
    form.append("ucMemCourId", String(props.callInfo?.ucMemCourId));
    form.append("acErrandDate", callInfo.acErrandDate);
    form.append("ulErrandSeqNo", String(props.callInfo?.ulErrandSeqNo));
    try {
      const response = await axios({
        method: "post",
        url: "https://api.roadvoy.net/agency/errand/dispatch/cancel.php",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });
      console.log(response);
      message.success("배차가 취소되었습니다.");
    } catch (e) {
      const error = e as AxiosError
      message.error(error.message);
    }
  };

    // 배차 대행 수수료
    let calcErrandFeeAgency
    if(callInfo.ucErrandFeeType === 1) {
      calcErrandFeeAgency = callInfo.ulErrandFeeAmount
    } else {
      calcErrandFeeAgency = (callInfo.ulErrandCharge * ((callInfo.ucErrandFeeRate!) / 100));
    }

     // 배달기사 수수료
    let riderFee
    if(callInfo.ucErrandType == 1) {
      riderFee = callInfo.ulErrandCharge - calcErrandFeeAgency
    } else {
      riderFee = callInfo.ulErrandCharge - calcErrandFeeAgency
    }
  return (
    <>
      <Modal title="콜 상세" visible={visible} onCancel={handleCancel} onOk={handleOk}>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <CallDetailModalShopName>{callInfo.acOriginCompany}</CallDetailModalShopName>
            <p>접수번호: {callInfo.ulErrandSeqNo}</p>
            <p>주문시간: {callInfo.acOrderDateTime}</p>
            <p>픽업제한시간: {callInfo.ucLimitTime}분</p>

          </div>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ paddingBottom: '10px'}}>
              <CallDetailShopTitle title="기사" value={callInfo.acCourPresident} />
              <CallDetailShopTitle 
                title="기사연락처"
                value={getCellNoFormat(callInfo.acCourCellNo)}
              />
              <CallDetailShopTitle title="배달비용" value={costFormat(callInfo.ulErrandCharge)} />
              <CallDetailShopTitle
                title="배차대행 수수료"
                value={<FlatFixedRateSystem callInfo={callInfo}/>}
              />
              <CallDetailShopTitle
                title="배달기사 수수료"
                value={costFormat(riderFee)}
              />
            </div>
            <div style={{ paddingBottom: '10px'}}>
              <CallDetailShopTitle 
                title="타사 지급 수수료"
                value={costFormat(callInfo.ulErrandDispatchAgencyFee)}
              />
              <CallDetailShopTitle
                title="물건가격"
                value={<PaymentModeAndAmount callInfo={callInfo} />}
              />
              <CallDetailShopTitle 
                title="선지급액(분할)"
                value={costFormat(callInfo.ulSplitPrePayment)}
              />
              <CallDetailShopTitle 
                title="잔여금액(분할)"
                value={costFormat(callInfo.ulSplitPostPayment)}
              />
            </div>
            {/* <CallDetailShopTitle title="물건가격" value={costFormat(callInfo.ulGoodsPrice)} /> */}
            <CallDetailShopTitle
              title="픽업지연락처"
              value={getCellNoFormat(callInfo.acOriginCellNo)}
            />
            <CallDetailShopTitle title="픽업지업체명" value={callInfo.acOriginCompany} />
            <CallDetailShopTitle title="픽업지요청사항" value={callInfo.acOriginMemo} />
            <CallDetailShopTitle
              title="픽업지주소"
              value={`${callInfo.acOriginOldAddr} ${callInfo.acOriginAddrDesc}`}
            />
          </div>
          <div style={{ backgroundColor: "#fff280" }}>
            <CallDetailShopTitle title="목적지연락처" value={getCellNoFormat(callInfo.acDestCellNo)} />
            <CallDetailShopTitle title="목적지업체명" value={callInfo.acDestCompany} />
            <CallDetailShopTitle title="목적지요청사항" value={callInfo.acDestMemo} />
            <CallDetailShopTitle
              title="목적지주소"
              value={`${callInfo.acDestOldAddr} ${callInfo.acDestAddrDesc}`}
            />
          </div>
          <AddressDaumMapComponent callInfo={callInfo} />
        </div>
        <CallTimeLine callInfo={callInfo} />
        <Button
          onClick={() => {
            setIsModalVisible(true);
            setCallModalInfo(callInfo);
          }}
        >
          콜 수정
        </Button>
        <Popconfirm
          title="정말 배차를 취소 하시겠습니까?"
          onConfirm={handleClickDispatchCancel}
          okText="네"
          cancelText="아니요"
        >
          <Button type="ghost">배차 취소 </Button>
        </Popconfirm>

        <Popconfirm
          title="정말 콜을 취소 하시겠습니까?"
          onConfirm={handleClickCancelErrand}
          okText="네"
          cancelText="아니요"
        >
          <Button type="primary" danger>
            콜 취소
          </Button>
        </Popconfirm>
      </Modal>
      <CallModify
        visible={isModalVisible}
        onOk={CallOk}
        onCancel={CallCancel}
        callInfo={callModalInfo}
      />
    </>
  );
};

export default CallListModal;
const CallDetailModalShopName = styled.h2`
  color: black;
  margin: 0;
  font-weight: bold;
`;
