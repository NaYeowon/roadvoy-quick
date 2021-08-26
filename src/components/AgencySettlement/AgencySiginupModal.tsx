/* eslint-disable */

import { Modal, Form, Input, Button, Row, Col, message } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import React from "react";
import { useState } from "react";
import DaumPostcode from "react-daum-postcode";
import "../../util/Modal.css";

const AgencySiginupModal = props => {
  const [visible, setVisible] = useState(true);
  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = data => {
    let fullAddr = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddr);
    setIsOpenPost(false);
  };

  const postCodeStyle: React.CSSProperties = {
    position: "absolute",
    display: "block",
    top: 35,
    left: "-150px",
    width: "500px",
    height: "450px",
    border: "1px solid #000000",
    zIndex: 100
  };

  const handleOk = e => {
    setVisible(false);
    e.preventDefault();
    props.onOk(visible);
  };

  const handleCancel = e => {
    setVisible(false);
    e.preventDefault();
    props.onCancel(visible);
  };
  return (
    <>
      <Modal
        width="700px"
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        keyboard={false}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "100px" }}>
          <div style={{ textAlign: "center", border: "10px" }}>
            <h2>대행등록</h2>
            <Form>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Row gutter={[16, 16]} justify="center">
                  <Col span={4}>
                    <label>대행점명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="acCompany" value="" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>대표자명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="acPresident" />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center">
                  <Col span={4}>
                    <label>비밀번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="acPassword" type="password" />
                  </Col>
                </Row>
                <Row gutter={[16, 16]} justify="center">
                  <Col span={4}>
                    <label>휴대폰번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input prefix={<PhoneOutlined />} name="acCellNo" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>전화번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input prefix={<PhoneOutlined />} />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>사업자번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>생년월일&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Input />
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>가맹점주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Button type="primary" onClick={onChangeOpenPost} style={{ width: "100%" }}>
                      주소검색
                    </Button>
                    {isOpenPost ? (
                      <DaumPostcode autoClose onComplete={onCompletePost} style={postCodeStyle} />
                    ) : null}
                    <div className="address">{address}</div>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>상세주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input placeholder="상세 주소를 입력하세요" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>배차특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>가맹특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>담당관리자&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="cpPresident" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>관리자연락처&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input prefix={<PhoneOutlined />} />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>기본료&nbsp;:</label>
                  </Col>
                  <Col span={10}>
                    <Row>
                      <Col span={12}>
                        <Input addonAfter="m" />
                      </Col>
                      <Col span={12}>
                        <Input addonAfter="m" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>거리할증&nbsp;:</label>
                  </Col>
                  <Col span={10}>
                    <Row>
                      <Col span={12}>
                        <Input addonAfter="원" />
                      </Col>
                      <Col span={12}>
                        <Input addonAfter="원" />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row id="sign-up-submit">
                  <Button type="primary" block>
                    가맹등록
                  </Button>
                </Row>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgencySiginupModal;
