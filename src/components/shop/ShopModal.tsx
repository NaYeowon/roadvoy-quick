import { Button, message, Modal, Popconfirm, Row } from "antd";
import { AxiosError } from "axios";
import { useState } from "react";
import api from "src/config/axios";
import { MemberId } from "src/domain/Member/model";
import MemberHelper from "src/helpers/MemberHelper";
import { AddressDaumMapComponent } from "src/util/AddressDaumMapComponent";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
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
            <CallDetailShopTitle title="회원번호" value={`${MemberHelper.formatMemberId(shop)}`} />
            <CallDetailShopTitle title="회원 ID" value={shop?.acUserId ?? ""} />
            <CallDetailShopTitle title="사업자 등록번호" value={shop?.acBizRegNo ?? ""} />
            <CallDetailShopTitle title="법인 등록번호" value={shop?.acCorpNo ?? ""} />
            <CallDetailShopTitle title="E-mail 주소" value={shop?.acEmailAddress ?? ""} />
            <CallDetailShopTitle title="업태/업종" value={shop?.acBizType ?? ""} />
            <CallDetailShopTitle title="상점주소" value={shop?.acOldAddress ?? ""} />
            {shop && <AddressDaumMapComponent acAddress={shop.acOldAddress} />}
            <CallDetailShopTitle title="대표자명" value={shop?.acPresident ?? ""} />
            <CallDetailShopTitle
              title="휴대폰번호"
              value={getCellNoFormat(shop?.acPhoneNo ?? "")}
            />
            <CallDetailShopTitle
              title="사업장 전화번호"
              value={getCellNoFormat(shop?.acCellNo ?? "")}
            />
            <CallDetailShopTitle title="주거래은행" value={shop?.ucBankCode ?? ""} />
            <CallDetailShopTitle title="주거래 계좌번호" value={shop?.acBankAccount ?? ""} />
            <CallDetailShopTitle
              title="기본료"
              value={costFormat(Number(shop?.ulBaseDist ?? ""))}
            />
            <CallDetailShopTitle
              title="거리할증"
              value={costFormat(Number(shop?.ulExtraDist ?? ""))}
            />
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
