import { Button, message, Modal, Popconfirm, Row } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import api from "src/config/axios";
import { MemberId } from "src/domain/Member/model";
import { ShopAddressComponent } from "src/util/AddressDaumMapComponent";
import { CallDetailShopTitle } from "../CallList/Modal/CallDetailShopTitle";
import { CallDetailModalShopName } from "../CallList/Modal/styles";
import { ShopDTO } from "./types";

interface ShopModalProps {
  onOk: () => void;
  onCancel: () => void;
  shop: ShopDTO | undefined;
  visible: boolean | undefined;
}
function ShopModal(props: ShopModalProps) {
  const { onOk, onCancel, shop, visible } = props;

  const handleCancel = () => {
    onCancel();
  };

  const handleOk = () => {
    onOk();
  };

  return (
    <>
      <Modal title="상점상세" onCancel={handleCancel} onOk={handleOk} visible={visible}>
        <div>
          <div>
            <CallDetailModalShopName>{shop?.acCompany}</CallDetailModalShopName>
            <CallDetailShopTitle title="회원번호" value="" />
            <CallDetailShopTitle title="회원 ID" value="" />
            <CallDetailShopTitle title="사업자 등록번호" value="" />
            <CallDetailShopTitle title="법인 등록번호" value="" />
            <CallDetailShopTitle title="E-mail 주소" value="" />
            <CallDetailShopTitle title="업태/업종" value="" />
            <CallDetailShopTitle title="상점주소" value="" />
            <ShopAddressComponent shop={shop!} />
            <CallDetailShopTitle title="대표자명" value="" />
            <CallDetailShopTitle title="휴대폰번호" value="" />
            <CallDetailShopTitle title="사업장 전화번호" value="" />
            <CallDetailShopTitle title="주거래은행" value="" />
            <CallDetailShopTitle title="주거래 계좌번호" value="" />
            <CallDetailShopTitle title="기본료" value="" />
            <CallDetailShopTitle title="거리할증" value="" />
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <Button
            onClick={() => {
              window.open(
                `/shopSignupModal?ucAreaNo=${shop?.ucAreaNo}&
            ucDistribId=${shop?.ucDistribId}&
            ucAgencyId=${shop?.ucAgencyId}&
            ucMemCourId=${shop?.ucMemCourId}`,
                "_blank",
                "top=100, left=500, width=1200, height=800"
              );
            }}
          >
            상점 수정
          </Button>
          <Popconfirm
            title="상점을 삭제하시겠습니까?"
            //onConfirm={handleClickCancelErrand}
            okText="네"
            cancelText="아니요"
          >
            <Button type="primary" danger>
              상점 삭제
            </Button>
          </Popconfirm>
        </div>
      </Modal>
    </>
  );
}

export default ShopModal;
