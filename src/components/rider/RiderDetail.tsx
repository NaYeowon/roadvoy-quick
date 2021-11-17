import { Button, message, Modal, Popconfirm, Row } from "antd";
import api from "src/config/axios";
import MemberHelper from "src/helpers/MemberHelper";
import { AddressDaumMapComponent } from "src/util/AddressDaumMapComponent";
import { BankCode } from "src/util/BankCode";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
import { MemberId } from "src/domain/Member/model";

import { CallDetailShopTitle } from "../CallList/Modal/CallDetailShopTitle";
import { CallDetailModalShopName } from "../CallList/Modal/styles";
import { RiderSignUpRequest } from "../shop/types";
import { AxiosError } from "axios";
import ManagerStatus from "./ManagerStatus";
import { ManagerFlag } from "src/domain/Errand/model";

interface RiderModalProps {
  onOk: () => void;
  onCancel: () => void;
  rider: RiderSignUpRequest | undefined;
  visible: boolean | undefined;
  riderHistory: boolean;
}
function riderDetail(props: RiderModalProps) {
  const { onOk, onCancel, rider, visible } = props;

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };

  const handleClickCancelErrand = async () => {
    try {
      if (!rider) return;

      await api({
        method: "post",
        url: "/agency/rider/execute-command/leave.php",
        data: {
          ucAreaNo: rider.ucAreaNo,
          ucDistribId: rider.ucDistribId,
          ucAgencyId: rider.ucAgencyId,
          ucMemCourId: rider.ucMemCourId,
        },
      });

      message.success("탈퇴되었습니다.");
      onOk();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const isRiderHistory = () => {
    return props.riderHistory ? false : true;
  };

  const managerflag = () => {
    return props.rider?.cManagerFlag === ManagerFlag.YES ? true : false;
  };

  return (
    <>
      <Modal title="기사상세" onCancel={handleCancel} onOk={handleOk} visible={visible}>
        <div>
          <div>
            <CallDetailModalShopName>
              {rider?.acPresident}&nbsp;
              {managerflag() ? <ManagerStatus cManagerFlag={rider?.cManagerFlag ?? ""} /> : ""}
            </CallDetailModalShopName>
            <CallDetailShopTitle
              title="회원번호"
              value={`${MemberHelper.formatMemberId(rider ?? "")}`}
            />
            <CallDetailShopTitle title="회원 ID" value={rider?.acUserId ?? ""} />
            <CallDetailShopTitle title="이름" value={rider?.acPresident ?? ""} />
            <CallDetailShopTitle
              title="휴대폰번호"
              value={getCellNoFormat(rider?.acCellNo ?? "")}
            />
            <CallDetailShopTitle title="주소" value={rider?.acOldAddress ?? ""} />
            {rider && <AddressDaumMapComponent acAddress={rider.acOldAddress} />}
            <CallDetailShopTitle
              title="주거래은행 계좌번호"
              value={
                <BankCode
                  ucBankCode={Number(rider?.usBankCode)}
                  acBankAccount={rider?.acBankAccount ?? ""}
                />
              }
            />
            <CallDetailShopTitle
              title="가상계좌번호"
              value={
                <BankCode
                  //usBankCode={Number(rider?.usVirtualBank)}
                  ucBankCode={20}
                  acBankAccount={rider?.acVirtualAccount ?? ""}
                />
              }
            />
            <CallDetailShopTitle
              title="1일 리스료"
              value={costFormat(Number(rider?.lCourierLease ?? ""))}
            />
            <CallDetailShopTitle
              title="보증금"
              value={costFormat(Number(rider?.lCourierDeposit ?? ""))}
            />
            <CallDetailShopTitle
              title="콜수수료"
              value={costFormat(Number(rider?.lCallUnitPrice ?? ""))}
            />
            <CallDetailShopTitle title="기사 특이사항" value={rider?.acAllocRemark ?? ""} />
          </div>
        </div>
        {isRiderHistory() ? (
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={() => {
                window.open(
                  `/RiderRegister?ucAreaNo=${rider?.ucAreaNo}&ucDistribId=${rider?.ucDistribId}&ucAgencyId=${rider?.ucAgencyId}&ucMemCourId=${rider?.ucMemCourId}`,
                  "_blank",
                  "top=100, left=500, width=1200, height=800"
                );
              }}
            >
              기사 수정
            </Button>
            <Popconfirm
              title="탈퇴하시겠습니까?"
              onConfirm={handleClickCancelErrand}
              okText="네"
              cancelText="아니요"
            >
              <Button type="primary" danger>
                기사 탈퇴
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <></>
        )}
      </Modal>
    </>
  );
}

export default riderDetail;
