import { Button, Popconfirm } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./_styles.css";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
import PaymentModeAndAmount from "src/util/PaymentModeAndAmount";
import FlatFixedRateSystem from "src/util/FlatFixedRateSystem";
import { CallDetailModalShopName } from "./styles";
import { CallDetailShopTitle } from "./CallDetailShopTitle";
import { ErrandDto, ErrandFeeType } from "../../../domain/Errand/model";
import CallTimeLine from "../CallTimeLine";
import AddressDaumMapComponent from "../../../util/AddressDaumMapComponent";

interface CallModalProps {
  onOk: () => void;
  onCancel: () => void;
  errand: ErrandDto | undefined;
}

function CallModal(props: CallModalProps) {
  const { onOk, onCancel, errand } = props;

  const handleCancel = () => {
    onCancel();
  };
  const handleOk = () => {
    onOk();
  };

  const handleClickCancelErrand = async () => {
    /*const form = new FormData();

    form.append("ulErrandSeqNo", String(props.callInfo!!.ulErrandSeqNo));
    try {
      const response = await axios({
        method: "post",
        url: "https://api.roadvoy.net/agency/errand/cancel.php",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });
      console.log(response);
      message.success("콜이 취소되었습니다.");
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }*/
  };

  const handleClickDispatchCancel = async () => {
    /*const form = new FormData();

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
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });
      console.log(response);
      message.success("배차가 취소되었습니다.");
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }*/
  };

  if (!errand) {
    return <></>;
  }

  // 배차 대행 수수료
  let calcErrandFeeAgency;
  if (errand.ucErrandFeeType === ErrandFeeType.AMOUNT) {
    calcErrandFeeAgency = errand.ulErrandFeeAmount;
  } else {
    calcErrandFeeAgency = errand.ulErrandCharge * (errand.ucErrandFeeRate / 100);
  }

  // 배달기사 수수료
  const riderFee = errand.ulErrandCharge - calcErrandFeeAgency;

  return (
    <>
      <Modal title="콜 상세" visible={true} onCancel={handleCancel} onOk={handleOk}>
        <div>
          <div style={{ marginBottom: "10px" }}>
            <CallDetailModalShopName>{errand.acOriginCompany}</CallDetailModalShopName>
            <p>접수번호: {errand.ulErrandSeqNo}</p>
            <p>주문시간: {errand.acOrderDateTime}</p>
            <p>픽업제한시간: {errand.ucLimitTime}분</p>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <div style={{ paddingBottom: "10px" }}>
              <CallDetailShopTitle title="기사" value={errand.acCourPresident} />
              <CallDetailShopTitle
                title="기사연락처"
                value={getCellNoFormat(errand.acCourCellNo)}
              />
              <CallDetailShopTitle title="배달비용" value={costFormat(errand.ulErrandCharge)} />
              <CallDetailShopTitle
                title="배차대행 수수료"
                value={
                  <FlatFixedRateSystem
                    ucErrandFeeType={errand.ucErrandFeeType}
                    ulErrandFeeAgency={errand.ulErrandFeeAgency}
                  />
                }
              />
              <CallDetailShopTitle title="배달기사 수수료" value={costFormat(riderFee)} />
            </div>
            <div style={{ paddingBottom: "10px" }}>
              <CallDetailShopTitle
                title="타사 지급 수수료"
                value={costFormat(errand.ulErrandDispatchAgencyFee)}
              />
              <CallDetailShopTitle
                title="물건가격"
                value={
                  <PaymentModeAndAmount
                    ucPaymentMode={errand.ucPaymentMode}
                    ulGoodsPrice={errand.ulGoodsPrice}
                  />
                }
              />
              <CallDetailShopTitle
                title="선지급액(분할)"
                value={costFormat(errand.ulSplitPrePayment)}
              />
              <CallDetailShopTitle
                title="잔여금액(분할)"
                value={costFormat(errand.ulSplitPostPayment)}
              />
            </div>
            <CallDetailShopTitle
              title="픽업지연락처"
              value={getCellNoFormat(errand.acOriginCellNo)}
            />
            <CallDetailShopTitle title="픽업지업체명" value={errand.acOriginCompany} />
            <CallDetailShopTitle title="픽업지요청사항" value={errand.acOriginMemo} />
            <CallDetailShopTitle
              title="픽업지주소"
              value={`${errand.acOriginOldAddr} ${errand.acOriginAddrDesc}`}
            />
          </div>
          <div style={{ backgroundColor: "#fff280" }}>
            <CallDetailShopTitle
              title="목적지연락처"
              value={getCellNoFormat(errand.acDestCellNo)}
            />
            <CallDetailShopTitle title="목적지업체명" value={errand.acDestCompany} />
            <CallDetailShopTitle title="목적지요청사항" value={errand.acDestMemo} />
            <CallDetailShopTitle
              title="목적지주소"
              value={`${errand.acDestOldAddr} ${errand.acDestAddrDesc}`}
            />
          </div>
          <AddressDaumMapComponent errand={errand} />
        </div>
        <CallTimeLine errand={errand} />
        <Button
          onClick={() => {
            // setIsModalVisible(true);
            // setCallModalInfo(callInfo);
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
      {/*
      <CallModify
        visible={isModalVisible}
        onOk={CallOk}
        onCancel={CallCancel}
        callInfo={callModalInfo}
      />*/}
    </>
  );
}

export default CallModal;
