/* eslint-disable */
import * as React from "react";
import { useState } from "react";
import { Modal, Input, Row, Col, Select, Button, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import axios from "axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import "./RiderSettlementList.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { RiderInfo } from "../shop/types";

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

  const [acUserId, setAcUserId] = useState("");
  const [acPresident, setAcPresident] = useState("");
  const [acPassword, setAcPassword] = useState("");
  const [acCellNo, setAcCellNo] = useState("");
  const [acteamName, setAcTeamName] = useState("");
  const [usBankCode, setUsBankCode] = useState("");
  const [acBankAccount, setAcBankAccount] = useState("");
  const [acWithdrawPassword, setAcWithdrawPassword] = useState("");
  const [ucCourierTag, setUcCourierTag] = useState("");
  const [lCourierLease, setLcourierLease] = useState("");
  const [lCourierDeposit, setLcourierDeposit] = useState("");
  const [lCallUnitPrice, setLCallUnitPrice] = useState("");
  const [cManagerFlag, setCManagerFlag] = useState("");
  const [conCallLimit, setConCallLimit] = useState("");
  const [acName, setAcName] = useState("");
  const [acResRegNo, setAcResRegNo] = useState("");

  const handleOk = e => {
    setIsModalVisible(false);
    e.preventDefault();
    onInitail();

    props.onOk();
  };

  const handleCancel = e => {
    setIsModalVisible(false);
    e.preventDefault();
    onInitail();

    props.onOk();
  };

  const onInitail = () => {
    setAcUserId("");
    setAcPresident("");
    setAcPassword("");
    setAcCellNo("");
    setAcTeamName("");
    setUsBankCode("");
    setAcBankAccount("");
    setAcWithdrawPassword("");
    setUcCourierTag("");
    setLcourierLease("");
    setLcourierDeposit("");
    setLCallUnitPrice("");
    setCManagerFlag("");
    setAcName("");
    setAcResRegNo("");
    setConCallLimit("");
  };

  const RiderSign = async () => {
    const form = new FormData();

    form.append("acUserId", acUserId);
    form.append("acPresident", acPresident);
    form.append("acPassword", acPassword);
    form.append("acCellNo", acCellNo);
    form.append("acteamName", acteamName);
    //form.append("usBankCode", Number(usBankCode));
    form.append("usBankCode", usBankCode);
    form.append("acBankAccount", String(acBankAccount));
    form.append("acWithdrawPassword", acWithdrawPassword);
    form.append("ucCourierTag", String(ucCourierTag));
    form.append("lCourierLease", lCourierLease);
    form.append("lCourierDeposit", String(lCourierDeposit));
    form.append("lCallUnitPrice", String(lCallUnitPrice));
    form.append("cManagerFlag", cManagerFlag ? "Y" : "N");
    form.append("conCallLimit", conCallLimit);
    form.append("acName", acName);
    form.append("acResRegNo", acResRegNo);

    try {
      const response = await axios({
        method: "post",
        url: "https://api.roadvoy.net/agency/rider/signup.v2.php",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });
      onInitail();
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
                  <Col span={4}>
                    <label>로그인아이디&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acUserId"
                      value={acUserId}
                      onChange={e => {
                        setAcUserId(e.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <Row justify="center" gutter={[16, 48]}>
                  <Col span={4}>
                    <label>이름&nbsp;: </label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPresident"
                      value={acPresident}
                      onChange={e => {
                        setAcPresident(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>비밀번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPassword"
                      value={acPassword}
                      type="password"
                      onChange={e => {
                        setAcPassword(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>휴대폰번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      name="acCellNo"
                      value={acCellNo}
                      onChange={e => {
                        setAcCellNo(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>소속&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acTeamName"
                      value={acteamName}
                      onChange={e => {
                        setAcTeamName(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>출금은행&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Select
                      //name="acBankAccount"
                      value={acBankAccount}
                      onChange={e => setAcBankAccount(e)}
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
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>출금비밀번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acWithdrawPassword"
                      value={acWithdrawPassword}
                      type="password"
                      onChange={e => {
                        setAcWithdrawPassword(e.target.value);
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>기사구분&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Select
                      //name="ucCourierTag"
                      value={ucCourierTag}
                      onChange={e => {
                        setUcCourierTag(e);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Option value={1}>지입</Option>
                      <Option value={2}>리스</Option>
                    </Select>
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={5}>
                    <label>1일 리스료&nbsp;:</label>
                  </Col>
                  <Col span={5}>
                    <Input
                      name="lCourierLease"
                      value={lCourierLease}
                      onChange={e => {
                        setLcourierLease(e.target.value);
                      }}
                    />
                  </Col>{" "}
                  원&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={5}>
                    <label>보증금&nbsp;:</label>
                  </Col>
                  <Col span={5}>
                    <Input
                      name="lCourierDeposit"
                      value={lCourierDeposit}
                      onChange={e => {
                        setLcourierDeposit(e.target.value);
                      }}
                    />
                  </Col>{" "}
                  원&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={5}>
                    <label>콜수수료&nbsp;:</label>
                  </Col>
                  <Col span={5}>
                    <Input
                      name="lCallUnitPrice"
                      value={lCallUnitPrice}
                      onChange={e => {
                        setLCallUnitPrice(e.target.value);
                      }}
                    />
                  </Col>{" "}
                  원&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
                </Row>
                <Row justify="center">
                  <Col pull={3}>
                    &nbsp;&nbsp;<label>관리자모드&nbsp;:</label>&nbsp;&nbsp;
                    <Checkbox
                      name="cManagerFlag"
                      // onChange={(e) => setCManagerFlag(e.target.checked)}
                      // checked={cManagerFlag}
                    />
                    {/* antd Checkbox */}
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={5}>
                    <label>콜 동시 접수 제한&nbsp;:</label>
                  </Col>
                  <Col span={5}>
                    <Input
                      name="conCallLimit"
                      value={conCallLimit}
                      onChange={e => setConCallLimit(e.target.value)}
                    />
                  </Col>
                  건&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
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
