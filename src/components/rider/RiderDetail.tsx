import { Button, Modal, Popconfirm, Row } from "antd";

import { CallDetailShopTitle } from "../CallList/Modal/CallDetailShopTitle";
import { CallDetailModalShopName } from "../CallList/Modal/styles";
import { RiderInfo } from "../shop/types";

interface RiderModalProps {
  onOk: () => void;
  onCancel: () => void;
  rider: RiderInfo | undefined;
  visible: boolean | undefined;
}
function riderDetail(props: RiderModalProps) {
  const { onOk, onCancel, rider, visible } = props;

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };

  return (
    <>
      <Modal title="기사상세" onCancel={handleCancel} onOk={handleOk} visible={visible}>
        <div>
          <div>
            <CallDetailModalShopName>{rider?.acPresident}</CallDetailModalShopName>
            <CallDetailShopTitle title="회원번호" value="" />
            <CallDetailShopTitle title="회원 ID" value="" />
            <CallDetailShopTitle title="이름" value="" />
            <CallDetailShopTitle title="생년월일" value="" />
            <CallDetailShopTitle title="휴대폰번호" value="" />
            <CallDetailShopTitle title="주소" value="" />
            <CallDetailShopTitle title="주거래은행" value="" />
            <CallDetailShopTitle title="주거래 계좌번호" value="" />
            <CallDetailShopTitle title="가상계좌은행" value="" />
            <CallDetailShopTitle title="가상계좌번호" value="" />
            <CallDetailShopTitle title="1일 리스료" value="" />
            <CallDetailShopTitle title="보증금" value="" />
            <CallDetailShopTitle title="콜수수료" value="" />
            <CallDetailShopTitle title="기사 특이사항" value="" />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              window.open(
                `/RiderRegister?ucAreaNo=${rider?.ucAreaNo}&
            ucDistribId=${rider?.ucDistribId}&
            ucAgencyId=${rider?.ucAgencyId}&
            ucMemCourId=${rider?.ucMemCourId}`,
                "_blank",
                "top=100, left=500, width=1200, height=800"
              );
            }}
          >
            기사 수정
          </Button>
          <Popconfirm
            title="기사를 삭제하시겠습니까?"
            //onConfirm={handleClickCancelErrand}
            okText="네"
            cancelText="아니요"
          >
            <Button type="primary" danger>
              기사 삭제
            </Button>
          </Popconfirm>
        </div>
      </Modal>
    </>
  );
}

export default riderDetail;
