/* eslint-disable */

import * as React from "react";
import { useState, FunctionComponent, useRef } from "react";
import { PhoneOutlined } from "@ant-design/icons";

import { Modal, Form, Input, Row, Col, Select, Button } from "antd";

const { Option } = Select;

interface Props {
  visible: boolean | undefined;
  onOk: boolean | any;
  onCancel: boolean | any;
}

const DistributorSignUpModal: FunctionComponent<Props> = props => {
  const [visible, setVisible] = useState(true);

  const handleCancel = (e: React.MouseEvent) => {
    setVisible(false);
    e.preventDefault();
    props.onOk(visible);
  };

  return (
    <>
      <Modal width="700px" visible={props.visible} onCancel={handleCancel}>
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "50px" }}>
          <div style={{ textAlign: "center" }}>
            <h2>총판등록</h2>
            <form action="">
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Row gutter={[16, 48]} justify="center">
                  <Col span={4}>
                    <label>브랜드 선택:</label>
                  </Col>
                  <Col span={8}>
                    <Select style={{ width: "100%" }}>
                      <Option value="1">로드보이</Option>
                      <Option value="2">네오델리</Option>
                    </Select>
                  </Col>
                </Row>

                <Row justify="center" gutter={[16, 48]}>
                  <Col span={4}>
                    <label>지역코드&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="president" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>비밀번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="password" type="password" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>상호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>대표자명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input />
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
                    <label>휴대폰번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input prefix={<PhoneOutlined />} name="cellNo" />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>유선전화번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input />
                  </Col>
                </Row>

                <Button type="primary" size="large" block>
                  총판등록
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DistributorSignUpModal;
