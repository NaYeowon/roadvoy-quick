/* eslint-disable */

import Modal from "antd/lib/modal/Modal";
import React, { FC, useState } from "react";
import { RiderInfo } from "../shop/types";
import styled from "styled-components";
import { Button, Checkbox, Col, Input, Row, Select } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { useEffect } from "react";

const { Option } = Select;

interface Props {
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  riderInfo: RiderInfo | undefined;
}
const RiderDetail: FC<Props> = (props: Props) => {
  const { visible, onOk, onCancel, riderInfo } = props;

  const [acUserId, setAcUserId] = useState(riderInfo?.acUserId);
  const [acPresident, setAcPresident] = useState(riderInfo?.acPresident);
  const [acPassword, setAcPassword] = useState("");
  const [acCellNo, setAcCellNo] = useState(riderInfo?.acCellNo);
  const [acTeamName, setAcTeamName] = useState(riderInfo?.acTeamName);
  const [usBankCode, setUsBankCode] = useState(riderInfo?.usBankCode);
  const [acWithdrawPassword, setAcWithdrawPassword] = useState("");
  const [ucCourierTag, setUcCourierTag] = useState(riderInfo?.lCourierLease);
  const [lCourierLease, setLcourierLease] = useState(riderInfo?.lCourierLease);
  const [lCourierDeposit, setLcourierDeposit] = useState(riderInfo?.lCourierDeposit);
  const [lCallUnitPrice, setLCallUnitPrice] = useState(riderInfo?.lCallUnitPrice);
  const [cManagerFlag, setCManagerFlag] = useState(riderInfo?.cManagerFlag);
  const [conCallLimit, setConCallLimit] = useState(riderInfo?.conCallLimit);
  const [acName, setAcName] = useState("");
  const [acResRegNo, setAcResRegNo] = useState("");

  useEffect(() => {
    if (!riderInfo) return;

    onInitail();
  }, [riderInfo]);

  const handleCancel = () => {
    onInitail();
    onCancel();
  };

  const handleOk = () => {
    onInitail();
    onOk();
  };

  const onInitail = () => {
    setAcUserId(riderInfo?.acUserId);
    setAcPresident(riderInfo?.acPresident);
    setAcPassword("");
    setAcCellNo(riderInfo?.acCellNo);
    setAcTeamName(riderInfo?.acTeamName);
    setUsBankCode(riderInfo?.usBankCode);
    setAcWithdrawPassword("");
    setUcCourierTag(riderInfo?.ucCourierTag);
    setLcourierLease(riderInfo?.lCourierLease);
    setLcourierDeposit(riderInfo?.lCourierDeposit);
    setLCallUnitPrice(riderInfo?.lCallUnitPrice);
    setCManagerFlag(riderInfo?.cManagerFlag);
    setAcName("");
    setAcResRegNo("");
    setConCallLimit(riderInfo?.conCallLimit);
  };

  return (
    <>
      <Modal
        title="기사 상세"
        width="700px"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div
          style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "50px", marginBottom: "50px" }}
        >
          <div style={{ textAlign: "center" }}>
            <h2>{riderInfo?.acPresident}</h2>
            <form action="">
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Row gutter={[16, 48]} justify="center">
                  <Col span={4}>
                    <label>로그인아이디&nbsp;: </label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acUserId"
                      value={acUserId}
                      onChange={e => {
                        setAcUserId(Number(e.target.value));
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
                    <label>휴대폰번호&nbsp;: </label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      value={acCellNo}
                      onChange={e => {
                        setAcCellNo(Number(e.target.value));
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
                      value={acTeamName}
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
                      value={usBankCode}
                      onChange={e => setUsBankCode(Number(e.toString()))}
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
                      value={ucCourierTag}
                      onChange={e => {
                        setUcCourierTag(e);
                      }}
                      style={{ width: "100%" }}
                    >
                      <Option value="1">지입</Option>
                      <Option value="2">리스</Option>
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
                      value={lCourierLease}
                      onChange={(e: any) => {
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
                      value={lCourierDeposit}
                      onChange={e => {
                        setLcourierDeposit(Number(e.target.value));
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
                      value={lCallUnitPrice}
                      onChange={e => {
                        setLCallUnitPrice(Number(e.target.value));
                      }}
                    />
                  </Col>
                  원&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
                </Row>
                <Row justify="center">
                  <Col pull={3}>
                    &nbsp;&nbsp;<label>관리자모드&nbsp;:</label>&nbsp;&nbsp;
                    <Checkbox
                      name="cManagerFlag"
                      onChange={e => setCManagerFlag(Number(e.target.checked))}
                      checked={Boolean(cManagerFlag)}
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
                      value={conCallLimit}
                      onChange={e => setConCallLimit(Number(e.target.value))}
                    />
                  </Col>
                  건&nbsp;&nbsp;&nbsp;&nbsp;
                  <Col span={3} />
                </Row>
                <Row id="sign-up-submit" style={{ justifyContent: "center" }}>
                  <Button type="primary">기사 수정</Button>
                  <Button type="ghost">기사 삭제</Button>
                </Row>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RiderDetail;
const DetailRiderName = styled.h2`
  color: black;
  margin: 0;
  font-weight: bold;
`;
