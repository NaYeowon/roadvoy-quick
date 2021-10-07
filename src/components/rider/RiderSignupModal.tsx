/* eslint-disable */
import * as React from "react";
import { useState } from "react";
import { Modal, Input, Row, Col, Select, Button, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import axios from "axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import "./RiderSettlementList.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { RiderSignUpRequest } from "../shop/types";
import api from "src/config/axios";

const { Option } = Select;

interface Props {
  visible: boolean | undefined;
  onOk: any;
  onCancel: any;
  //riderInfo: RiderInfo | undefined
}

const RiderSignupModal = (props: Props) => {
  const { visible, onCancel, onOk } = props;
  const [isModalVisible, setIsModalVisible] = useState(true);

  const [form, setForm] = useState<RiderSignUpRequest>({
    acUserId: "",
    ucAreaNo: 0,
    ucDistribId: 0,
    ucAgencyId: 0,
    ucMemCourId: 0,
    acPresident: "",
    acPassword: "",
    acResRegNo: "",
    acCellNo: "",
    acNewAddress: "",
    acOldAddress: "",
    acAddressDesc: "",
    ulLatiPos: 0,
    ulLongPos: 0,
    ucTaxInvoType: 0,
    ucBankCode: 0,
    acBankAccount: "",
    acAccHoldName: "",
    usVirtualBank: 0,
    acVirtualAccount: "",
    ucCourierTag: 0,
    lCourierLease: 0,
    lCourierDeposit: 0,
    lCallUnitPrice: 0,
    conCallLimit: 0,
    cManagerFlag: 0,
    cReClaimFlag: 0,
    acAllocRemark: "",
    acRemark: "",
  });

  const handleOk = e => {
    setIsModalVisible(false);
    e.preventDefault();
    props.onOk();
  };

  const handleCancel = e => {
    setIsModalVisible(false);
    e.preventDefault();
    props.onOk();
  };

  const ensureValidData = () => {
    if (!form) {
      throw new Error("데이터를 찾지 못했습니다.");
    }
    if (!form.acPassword) {
      throw new Error("비밀번호를 입력해주세요");
    }
    if (!form.acPresident) {
      throw new Error("이름을 입력해주세요");
    }
    // if(!form.acNewAddress) {
    //   throw new Error('주소를 입력해주세요')
    // }
    if (!form.acBankAccount) {
      throw new Error("주거래은행 계좌번호를 선택해주세요");
    }
    if (form.acAccHoldName !== form.acPresident) {
      throw new Error("주거래은행 예금주가 대표자명과 다릅니다");
    }
  };
  const RiderSign = async () => {
    try {
      const response = await api({
        method: "post",
        url: "/agency/rider/signup.v2.php",
        data: form,
      });
      setIsModalVisible(false);
      props.onOk();
      console.log(response);
    } catch (e) {
      message.error(e.message);
    }
  };
  return (
    <>
      <Modal width="700px" visible={visible} onOk={handleOk} onCancel={handleCancel}>
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "50px" }}>
          <div style={{ textAlign: "center" }}>
            <h2>기사등록</h2>
            <form action="">
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Row gutter={[16, 48]} justify="center">
                  <Col span={6}>
                    <label>회원ID&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acUserId"
                      value={form.acUserId}
                      onChange={e => setForm({ ...form, acUserId: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>비밀번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPassword"
                      value={form.acPassword}
                      type="password"
                      onChange={e => setForm({ ...form, acPassword: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>이름&nbsp;: </label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPresident"
                      value={form.acPresident}
                      onChange={e => setForm({ ...form, acPresident: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>생년월일&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acResRegNo"
                      value={form.acResRegNo}
                      onChange={e => setForm({ ...form, acResRegNo: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>휴대폰번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      name="acCellNo"
                      value={form.acCellNo}
                      onChange={e => setForm({ ...form, acCellNo: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>주거래은행&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Select
                      value={form.acBankAccount}
                      onChange={e => setForm({ ...form, acBankAccount: e })}
                      style={{ width: "100%" }}
                    >
                      <Option value="88">신한은행</Option>
                      <Option value="4">국민은행</Option>
                      <Option value="3">기업은행</Option>
                      <Option value="20">우리은행</Option>
                      <Option value="90">카카오뱅크</Option>
                      <Option value="89">케이뱅크</Option>
                      <Option value="11">농협중앙회</Option>
                      <Option value="2">산업은행</Option>
                      <Option value="23">SC제일은행</Option>
                      <Option value="81">KEB하나은행</Option>
                      <Option value="27">씨티뱅크</Option>
                      <Option value="7">수협은행</Option>
                      <Option value="31">대구은행</Option>
                      <Option value="32">부산은행</Option>
                      <Option value="34">광주은행</Option>
                      <Option value="35">제주은행</Option>
                      <Option value="37">전북은행</Option>
                      <Option value="39">경남은행</Option>
                    </Select>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>가상 계좌번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      readOnly
                      name="acVirtualAccount"
                      value={form.acVirtualAccount}
                      onChange={e => setForm({ ...form, acVirtualAccount: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>기사구분&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Select
                      //name="ucCourierTag"
                      value={form.ucCourierTag}
                      onChange={e => setForm({ ...form, ucCourierTag: Number(e) })}
                      style={{ width: "100%" }}
                    >
                      <Option value={1}>지입</Option>
                      <Option value={2}>리스</Option>
                    </Select>
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>1일 리스료&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Input
                      name="lCourierLease"
                      value={form.lCourierLease}
                      onChange={e => setForm({ ...form, lCourierLease: Number(e.target.value) })}
                    />
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>보증금&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Input
                      name="lCourierDeposit"
                      value={form.lCourierDeposit}
                      onChange={e => setForm({ ...form, lCourierDeposit: Number(e.target.value) })}
                    />
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>콜수수료&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Input
                      name="lCallUnitPrice"
                      value={form.lCallUnitPrice}
                      onChange={e => setForm({ ...form, lCallUnitPrice: Number(e.target.value) })}
                    />
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>콜 동시 접수 제한&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Input
                      name="conCallLimit"
                      value={form.conCallLimit}
                      onChange={e => setForm({ ...form, conCallLimit: Number(e.target.value) })}
                    />
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col pull={2}>
                    <label>관리자모드&nbsp;:</label>&nbsp;&nbsp;
                    <Checkbox
                      name="cManagerFlag"
                      value={form.cManagerFlag}
                      // onChange={(e) => setCManagerFlag(e.target.checked)}
                      // checked={cManagerFlag}
                      onChange={e => setForm({ ...form, cManagerFlag: Number(e.target.value) })}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp;
                  </Col>
                </Row>
                <Row justify="center">
                  <Col pull={2}>
                    &nbsp;&nbsp;<label>출금가능여부&nbsp;:</label>&nbsp;&nbsp;
                    <Checkbox
                      name="cReClaimFlag"
                      value={form.cReClaimFlag}
                      onChange={e => setForm({ ...form, cReClaimFlag: Number(e.target.value) })}
                    />
                    &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>기사특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      readOnly
                      name="acAllocRemark"
                      value={form.acAllocRemark}
                      onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>기사 추가특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      readOnly
                      name="acRemark"
                      value={form.acRemark}
                      onChange={e => setForm({ ...form, acRemark: e.target.value })}
                    />
                  </Col>
                </Row>
                <Button block type="primary" onClick={RiderSign}>
                  기사등록
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RiderSignupModal;
