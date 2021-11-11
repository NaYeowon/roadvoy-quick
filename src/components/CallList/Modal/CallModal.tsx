import { Button, message, Popconfirm } from "antd";
import Modal from "antd/lib/modal/Modal";
import "./_styles.css";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
import PaymentModeAndAmount from "src/util/PaymentModeAndAmount";
import FlatFixedRateSystem from "src/util/FlatFixedRateSystem";
import { CallDetailModalShopName } from "./styles";
import { CallDetailShopTitle } from "./CallDetailShopTitle";
import { ErrandDto, ErrandFeeType, ErrandType } from "../../../domain/Errand/model";
import CallTimeLine from "../CallTimeLine";
import { AddressDaumMapComponent } from "../../../util/AddressDaumMapComponent";
import api from "../../../config/axios";
import { AxiosError } from "axios";

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
    try {
      if (!errand) return;

      await api({
        method: "post",
        url: "agency/errand/execute-command/cancel-order.php",
        data: {
          ulErrandSeqNo: errand.ulErrandSeqNo,
        },
      });

      message.success("콜을 취소했습니다.");
      onOk();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const handleClickDispatchCancel = async () => {
    try {
      if (!errand) return;

      await api({
        method: "post",
        url: "agency/errand/execute-command/dispatch-cancel.php",
        data: {
          ulErrandSeqNo: errand.ulErrandSeqNo,
        },
      });

      message.success("배차를 취소했습니다.");
      onOk();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
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

  const isStop1 = () => {
    return props.errand?.acStop1Company ? true : false;
  };
  const isStop2 = () => {
    return props.errand?.acStop2Company ? true : false;
  };

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
          <div>
            {isStop1() ? (
              <>
                <CallDetailShopTitle title="경유지업체명1" value={errand.acStop1Company} />
                <CallDetailShopTitle title="경유지요청사항1" value={errand.acStop1Memo} />
                <CallDetailShopTitle
                  title="경유지주소1"
                  value={`${errand.acStop1OldAddr} ${errand.acStop1AddrDesc}`}
                />
              </>
            ) : (
              ""
            )}
          </div>
          <div>
            {isStop2() ? (
              <>
                <CallDetailShopTitle title="경유지업체명2" value={errand.acStop2Company} />
                <CallDetailShopTitle title="경유지요청사항2" value={errand.acStop2Memo} />
                <CallDetailShopTitle
                  title="경유지주소2"
                  value={`${errand.acStop2OldAddr} ${errand.acStop2AddrDesc}`}
                />
              </>
            ) : (
              ""
            )}
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
          <AddressDaumMapComponent acAddress={errand.acDestOldAddr} />
        </div>
        <CallTimeLine errand={errand} />
        <Button
          onClick={() => {
            window.open(
              `/order/update/popup/${errand.ulErrandSeqNo}`,
              "_blank",
              "top=100, left=500, width=1200, height=800"
            );
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
    </>
  );
}

export default CallModal;
