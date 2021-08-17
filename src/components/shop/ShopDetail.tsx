/* eslint-disable */

import { Button, Col, Form, Input, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import { PhoneOutlined } from "@ant-design/icons";
import React from "react";
import { ShopInfo } from "./types";
import DaumPostCode from "react-daum-postcode";
import { useState, FC } from "react";
import { useEffect } from "react";

interface Props {
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  shopInfo: ShopInfo | undefined;
}
const ShopDetail: FC<Props> = (props: Props) => {
  const { visible, onOk, onCancel, shopInfo } = props;
  const [acCompany, setAcCompany] = useState(shopInfo?.acCompany);
  const [acPresident, setAcPresident] = useState(shopInfo?.acPresident);
  const [acPassword, setAcPassword] = useState("");
  const [acCellNo, setAcCellNo] = useState(shopInfo?.acCellNo);
  const [acPhoneNo, setAcPhoneNo] = useState(shopInfo?.acPhoneNo);
  const [acBizRegNo, setAcBizRegNo] = useState(shopInfo?.acBizRegNo);
  const [acResRegNo, setAcResRegNo] = useState(shopInfo?.acResRegNo);
  const [acAddressDesc, setAcAddressDesc] = useState(shopInfo?.acAddressDesc);
  const [remark, setRemark] = useState(shopInfo?.acRemark);
  const [allocRemark, setAllocRemark] = useState(shopInfo?.acAllocRemark);
  const [cpPresident, setCpPresident] = useState(shopInfo?.acCpPresident);
  const [cpCellNo, setCpCellNo] = useState(shopInfo?.acCpCellNo);
  const [baseDist, setBaseDist] = useState(shopInfo?.ulBaseDist);
  const [baseFare, setBaseFare] = useState(shopInfo?.ulBaseFare);
  const [extraDist, setExtraDist] = useState(shopInfo?.ulExtraDist);
  const [extraFare, setExtraFare] = useState(shopInfo?.ulExtraFare);

  const [fullAddress, setFullAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [isDaumPost, setIsDaumPost] = useState(false);

  useEffect(() => {
    if (!shopInfo) return;

    onInitail();
  }, [shopInfo]);

  const onInitail = () => {
    setAcCompany(shopInfo?.acCompany);
    setAcPresident(shopInfo?.acPresident);
    setAcPassword("");
    setAcCellNo(shopInfo?.acCellNo);
    setAcPhoneNo(shopInfo?.acPhoneNo);
    setAcBizRegNo(shopInfo?.acBizRegNo);
    setAcResRegNo(shopInfo?.acResRegNo);
    setAcAddressDesc(shopInfo?.acAddressDesc);
    setRemark(shopInfo?.acRemark);
    setAllocRemark(shopInfo?.acAllocRemark);
    setCpPresident(shopInfo?.acCpPresident);
    setCpCellNo(shopInfo?.acCpCellNo);
    setBaseDist(shopInfo?.ulBaseDist);
    setBaseFare(shopInfo?.ulBaseFare);
    setExtraDist(shopInfo?.ulExtraDist);
    setExtraFare(shopInfo?.ulExtraFare);
  };

  const handleAddress = data => {
    let AllAddress = data.address;
    let extraAddress = "";
    const zoneCodes = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setFullAddress(AllAddress);
    setZoneCode(zoneCodes);
    setIsDaumPost(false);
  };
  const width = 595;
  const height = 450;

  const modalStyle: React.CSSProperties = {
    position: "absolute",
    display: "block",
    top: 35,
    left: "-150px",
    width: "500px",
    height: "450px",
    border: "1px solid #000000",
    zIndex: 100
  };

  const handleCancel = () => {
    setIsDaumPost(false);
    onCancel();
  };

  const handleOk = () => {
    setIsDaumPost(false);
    onOk();
  };

  console.log(allocRemark);
  return (
    <>
      <Modal
        title="상점 상세"
        width={700}
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "100px" }}>
          <div style={{ textAlign: "center" }}>
            <h2>{shopInfo?.acCompany}</h2>
            <Form>
              <div style={{ textAlign: "center", margin: "0 auto" }}>
                <Row gutter={[16, 48]} justify="center">
                  <Col span={4}>
                    <label>가맹점명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acCompany"
                      value={acCompany}
                      onChange={e => setAcCompany(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={4}>
                    <label>대표자명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPresident"
                      value={acPresident}
                      onChange={e => setAcPresident(e.target.value)}
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
                      onChange={e => setAcPassword(e.target.value)}
                      type="password"
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
                      value={acCellNo}
                      onChange={e => {
                        setAcCellNo(Number(e.target.value));
                      }}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>전화번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      name="acPhoneNo"
                      value={acPhoneNo}
                      onChange={e => setAcPhoneNo(Number(e.target.value))}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>사업자번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acBizRegNo"
                      value={acBizRegNo}
                      onChange={e => setAcBizRegNo(Number(e.target.value))}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>생년월일&nbsp;:</label>
                  </Col>
                  <Col span={4}>
                    <Input
                      name="acResRegNo"
                      value={acResRegNo}
                      onChange={e => setAcResRegNo(Number(e.target.value))}
                    />
                  </Col>
                  <Col span={4} />
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>상점주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      onClick={() => {
                        setIsDaumPost(!isDaumPost);
                      }}
                      style={{ width: "100%" }}
                    >
                      주소검색
                    </Button>
                    {isDaumPost ? (
                      <DaumPostCode
                        onComplete={handleAddress}
                        autoClose
                        width={width}
                        height={height}
                        style={modalStyle}
                        //isDaumPost={isDaumPost}
                      />
                    ) : null}
                    <div className="address">{fullAddress}</div>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>상세주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="상세 주소를 입력하세요"
                      name="acAddressDesc"
                      value={acAddressDesc}
                      onChange={e => setAcAddressDesc(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>배차특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="allocRemark"
                      value={allocRemark}
                      onChange={e => setAllocRemark(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>가맹특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input name="remark" value={remark} onChange={e => setRemark(e.target.value)} />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>담당관리자&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="cpPresident"
                      value={cpPresident}
                      onChange={e => setCpPresident(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={4}>
                    <label>관리자연락처&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      name="cpCellNo"
                      value={cpCellNo}
                      onChange={e => setCpCellNo(Number(e.target.value))}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>기본료&nbsp;:</label>
                  </Col>
                  <Col span={10}>
                    <Row gutter={48}>
                      <Col span={12}>
                        <Input
                          addonAfter="m"
                          name="baseDist"
                          value={baseDist}
                          onChange={e => setBaseDist(Number(e.target.value))}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          addonAfter="m"
                          name="baseFare"
                          value={baseFare}
                          onChange={e => setBaseFare(Number(e.target.value))}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>거리할증&nbsp;:</label>
                  </Col>
                  <Col span={10}>
                    <Row gutter={48}>
                      <Col span={12}>
                        <Input
                          addonAfter="원"
                          name="extraDist"
                          value={extraDist}
                          onChange={e => setExtraDist(Number(e.target.value))}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          addonAfter="원"
                          name="extraFare"
                          value={extraFare}
                          onChange={e => setExtraFare(Number(e.target.value))}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row id="sign-up-submit">
                  <Button type="primary" size="large" block>
                    상점수정
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

export default ShopDetail;
