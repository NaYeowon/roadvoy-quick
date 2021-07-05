/* eslint-disable */
import * as React from "react";
import { useState, FunctionComponent, useRef } from "react";
import { Modal, Form, Input, Row, Col, Select, Button } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { Checkbox } from "@material-ui/core";

// import axios from 'axios';

const { Option } = Select;

interface Props {
  visible: boolean | undefined;
  onOk: boolean | any;
  onCancel: boolean | any;
}

const RiderSignupModal: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(true);

  const [userId, setUserId] = useState("");
  const [president, setPresident] = useState("");
  const [password, setPassword] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [teamName, setTeamName] = useState("");
  const [bankCode, setBankCode] = useState("");
  const [withdrawPassword, setWithdrawPassword] = useState("");
  const [courierTag, setCourierTag] = useState("");
  const [courierLease, setCourierLease] = useState("");
  const [courierDeposit, setCourierDeposit] = useState("");
  const [callUnitPrice, setCallUnitPrice] = useState("");
  const [conCallLimit, setConCallLimit] = useState("");
  const [managerFlag, setManagerFlag] = useState("");

  const handleOk = (e: React.MouseEvent) => {
    setVisible(false);
    e.preventDefault();

    props.onOk(visible);
  };

  const handleCancel = (e: React.MouseEvent) => {
    setVisible(false);
    e.preventDefault();

    props.onOk(visible);
  };

  return (
    <>
      <Modal width="700px" visible={props.visible} onOk={handleOk} onCancel={handleCancel}>
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
                      name="userId"
                      value={userId}
                      onChange={e => {
                        setUserId(e.target.value);
                      }}
                    />
                  </Col>
                </Row>

                <Row justify="center" gutter={[16, 48]}>
                  <Col span={4}>
                    <label>이름&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="president"
                      value={president}
                      onChange={e => {
                        setPresident(e.target.value);
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
                      name="password"
                      value={password}
                      onChange={e => {
                        setPassword(e.target.value);
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
                      name="cellNo"
                      value={cellNo}
                      onChange={e => {
                        setCellNo(e.target.value);
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
                      name="teamName"
                      value={teamName}
                      onChange={e => {
                        setTeamName(e.target.value);
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
                      // name="bankCode"
                      value={bankCode}
                      onChange={(e: any) => {
                        setBankCode(e.target.value);
                      }}
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
                      name="withdrawPassword"
                      value={withdrawPassword}
                      onChange={e => {
                        setWithdrawPassword(e.target.value);
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
                      // name="courierTag"
                      value={courierTag}
                      onChange={(e: any) => {
                        setCourierTag(e.target.value);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Option value="">지입</Option>
                      <Option value="">리스</Option>
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
                      name="courierLease"
                      value={courierLease}
                      onChange={e => {
                        setCourierLease(e.target.value);
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
                      name="courierDeposit"
                      value={courierDeposit}
                      onChange={e => {
                        setCourierDeposit(e.target.value);
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
                      name="callUnitPrice"
                      value={callUnitPrice}
                      onChange={e => {
                        setCallUnitPrice(e.target.value);
                      }}
                    />
                  </Col>{" "}
                  원&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
                </Row>
                <Row justify="center">
                  <Col pull={3}>
                    &nbsp;&nbsp;<label>관리자모드&nbsp;:</label>&nbsp;&nbsp;
                    <Checkbox />
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
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RiderSignupModal;
