import { Button, Modal, Popconfirm } from "antd";
import MemberHelper from "src/helpers/MemberHelper";
import { AddressDaumMapComponent } from "src/util/AddressDaumMapComponent";
import { BankCode } from "src/util/BankCode";
import { getCellNoFormat } from "src/util/FormatUtil";
import { CallDetailShopTitle } from "../CallList/Modal/CallDetailShopTitle";
import { CallDetailModalShopName } from "../CallList/Modal/styles";
import { DistributorDto } from "../shop/types";

interface Props {
  onOk: () => void;
  onCancel: () => void;
  distributor: DistributorDto | undefined;
  visible: boolean | undefined;
}
function DistributorDetail(props: Props) {
  const { onOk, onCancel, distributor, visible } = props;

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };
  return (
    <>
      <Modal title="총판상세" onCancel={handleCancel} onOk={handleOk} visible={visible}>
        <div>
          <div>
            <CallDetailModalShopName>{distributor?.acCompany}</CallDetailModalShopName>
            <CallDetailShopTitle
              title="회원번호"
              value={`${MemberHelper.formatMemberId(distributor ?? "")}`}
            />
            <CallDetailShopTitle title="회원 ID" value={distributor?.acUserId ?? ""} />
            <CallDetailShopTitle title="대표자명" value={distributor?.acPresident ?? ""} />
            <CallDetailShopTitle
              title="휴대폰번호"
              value={getCellNoFormat(distributor?.acCellNo ?? "")}
            />
            <CallDetailShopTitle
              title="전화번호"
              value={getCellNoFormat(distributor?.acPhoneNo ?? "")}
            />
            <CallDetailShopTitle
              title="사업자 등록번호"
              value={(distributor?.acBizRegNo ?? "")
                .replace(/[^0-9]/g, "")
                .replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, "$1-$2-$3")
                .replace("--", "-")}
            />
            <CallDetailShopTitle
              title="법인 등록번호"
              value={(distributor?.acCorpNo ?? "")
                .replace(/[^0-9]/g, "")
                .replace(/([0-9]{6})([0-9]{7})/, "$1-$2")
                .replace("--", "-")}
            />
            <CallDetailShopTitle title="주소" value={distributor?.acOldAddress ?? ""} />
            {distributor && <AddressDaumMapComponent acAddress={distributor.acOldAddress} />}
            <CallDetailShopTitle
              title="주거래은행 계좌번호"
              value={
                <BankCode
                  ucBankCode={Number(distributor?.usBankCode)}
                  acBankAccount={distributor?.acBankAccount ?? ""}
                />
              }
            />
            <CallDetailShopTitle
              title="가상계좌번호"
              value={
                <BankCode
                  //usBankCode={Number(rider?.usVirtualBank)}
                  ucBankCode={20}
                  acBankAccount={distributor?.acVirtualAccount ?? ""}
                />
              }
            />
            <CallDetailShopTitle title="총판 특이사항" value={distributor?.acAllocRemark ?? ""} />
            <CallDetailShopTitle title="총판 추가특이사항" value={distributor?.acRemark ?? ""} />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              window.open(
                `/distributorRegister?ucAreaNo=${distributor?.ucAreaNo}&ucDistribId=${distributor?.ucDistribId}&ucAgencyId=${distributor?.ucAgencyId}&ucMemCourId=${distributor?.ucMemCourId}`,
                "_blank",
                "top=100, left=500, width=1200, height=800"
              );
            }}
          >
            총판 수정
          </Button>
          <Popconfirm
            title="탈퇴하시겠습니까?"
            //onConfirm={handleClickCancelErrand}
            okText="네"
            cancelText="아니요"
          >
            <Button type="primary" danger>
              총판 탈퇴
            </Button>
          </Popconfirm>
        </div>
      </Modal>
    </>
  );
}

export default DistributorDetail;
