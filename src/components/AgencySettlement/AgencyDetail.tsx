import { Button, message, Modal, Popconfirm } from "antd";
import { AxiosError } from "axios";
import api from "src/config/axios";
import MemberHelper from "src/helpers/MemberHelper";
import { AddressDaumMapComponent } from "src/util/AddressDaumMapComponent";
import { BankCode } from "src/util/BankCode";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
import { CallDetailShopTitle } from "../CallList/Modal/CallDetailShopTitle";
import { CallDetailModalShopName } from "../CallList/Modal/styles";
import { AgencyDTO } from "../shop/types";

interface AgnecyProps {
  onOk: () => void;
  onCancel: () => void;
  agency: AgencyDTO | undefined;
  visible: boolean | undefined;
}
const AgencyDetail = (props: AgnecyProps) => {
  const { onOk, onCancel, agency, visible } = props;
  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };

  const handleClickCancelErrand = async () => {
    try {
      if (!agency) return;

      await api({
        method: "post",
        url: "/distrib/agency/execute-command/leave.php",
        data: {
          ucAreaNo: agency.ucAreaNo,
          ucDistribId: agency.ucDistribId,
          ucAgencyId: agency.ucAgencyId,
          ucMemCourId: agency.ucMemCourId,
        },
      });

      message.success("탈퇴했습니다.");
      onOk();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  return (
    <>
      <Modal title="대행상세" onCancel={handleCancel} onOk={handleOk} visible={visible}>
        <div>
          <div>
            <CallDetailModalShopName>{agency?.acCompany}</CallDetailModalShopName>
            <CallDetailShopTitle
              title="회원번호"
              value={`${MemberHelper.formatMemberId(agency ?? "")}`}
            />
            <CallDetailShopTitle title="회원 ID" value={agency?.ucMemCourId ?? ""} />
            <CallDetailShopTitle
              title="휴대폰번호"
              value={getCellNoFormat(agency?.acCellNo ?? "")}
            />
            <CallDetailShopTitle title="대표자명" value={agency?.acPresident ?? ""} />
            <CallDetailShopTitle
              title="사업자 등록번호"
              value={(agency?.acBizRegNo ?? "")
                .replace(/[^0-9]/g, "")
                .replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, "$1-$2-$3")
                .replace("--", "-")}
            />
            <CallDetailShopTitle title="법인 등록번호" value={agency?.acCorpNo ?? ""} />
            <CallDetailShopTitle title="주소" value={agency?.acOldAddress ?? ""} />
            {agency && <AddressDaumMapComponent acAddress={agency.acOldAddress} />}
            <CallDetailShopTitle
              title="휴대폰번호"
              value={getCellNoFormat(agency?.acCellNo ?? "")}
            />
            <CallDetailShopTitle
              title="주거래은행 계좌번호"
              value={
                <BankCode
                  ucBankCode={Number(agency?.usBankCode)}
                  acBankAccount={agency?.acBankAccount ?? ""}
                />
              }
            />
            <CallDetailShopTitle
              title="가상계좌번호"
              value={
                <BankCode
                  //usBankCode={Number(rider?.usVirtualBank)}
                  ucBankCode={20}
                  acBankAccount={agency?.acVirtualAccount ?? ""}
                />
              }
            />
            <CallDetailShopTitle title="대행 특이사항" value={agency?.allocRemark ?? ""} />
            <CallDetailShopTitle title="대행 추가특이사항" value={agency?.acRemark ?? ""} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          {/* <Button
            onClick={() => {
              window.open(
                `/RiderRegister?ucAreaNo=${agency?.ucAreaNo}&ucDistribId=${agency?.ucDistribId}&ucAgencyId=${agency?.ucAgencyId}&ucMemCourId=${agency?.ucMemCourId}`,
                "_blank",
                "top=100, left=500, width=1200, height=800"
              );
            }}
          >
            대행 수정
          </Button> */}
          <Popconfirm
            title="탈퇴하시겠습니까?"
            onConfirm={handleClickCancelErrand}
            okText="네"
            cancelText="아니요"
          >
            <Button type="primary" danger>
              대행 탈퇴
            </Button>
          </Popconfirm>
        </div>
      </Modal>
    </>
  );
};

export default AgencyDetail;
