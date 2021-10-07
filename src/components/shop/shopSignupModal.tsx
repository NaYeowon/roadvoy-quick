/* eslint-disable */
import React, { Component, useState } from "react";
import { Modal, Input, Button, Row, Col, message, Select, Checkbox, Form } from "antd";
import axios, { AxiosError } from "axios";
import { PhoneOutlined } from "@ant-design/icons";
import DaumPostCode, { DaumPostcode } from "react-daum-postcode";
import "./shopSign.css";
import { ShopInfo, ShopSignUpRequest } from "./types";
import { RouteComponentProps } from "react-router";
import api from "src/config/axios";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
import LoginHelper from "src/pages/shared/LoginHelper";

const { Option } = Select;

interface ShopModalProps {
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  shop?: ShopInfo;
}
const ShopSignupModal = (props: ShopModalProps) => {
  const { visible, onCancel, onOk } = props;
  const [form, setForm] = useState<ShopSignUpRequest>({
    ucAreaNo: 0,
    ucDistribId: 0,
    ucAgencyId: 0,
    ucMemCourId: 0,

    acUserId: "",
    acCompany: "",
    acPresident: "",
    acPassword: "",
    acCellNo: "",
    acPhoneNo: "",
    acBizRegNo: "",
    acCorpNo: "",
    acEmailAddress: "",
    acBizCondition: "",
    acBizType: "",
    acResRegNo: "",
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
    acAllocRemark: "",
    acRemark: "",
    acCpPresident: "",
    acCpCellNo: "",
    ulBaseDist: 0,
    ulBaseFare: 0,
    ulExtraDist: 0,
    ulExtraFare: 0,
    cManagerFlag: 0,
    cAreaShareFlag: 0,
    cTotalCallShareFlag: 0,
    cReClaimFlag: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchAddress, setSearchAddress] = useState(false);
  // const [address, setAddress] = useState(""); // 주소
  // const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  // const [isOpenPost, setIsOpenPost] = useState(false);
  // const onCompletePost = data => {
  //   let fullAddr = data.address;
  //   let extraAddr = "";

  //   if (data.addressType === "R") {
  //     if (data.bname !== "") {
  //       extraAddr += data.bname;
  //     }
  //     if (data.buildingName !== "") {
  //       extraAddr += extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
  //     }
  //     fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";
  //   }

  //   setAddress(data.zonecode);
  //   setAddressDetail(fullAddr);
  //   setIsOpenPost(false);
  // };
  // const postCodeStyle: React.CSSProperties = {
  //   position: "absolute",
  //   display: "block",
  //   top: 35,
  //   left: "-150px",
  //   width: "500px",
  //   height: "450px",
  //   border: "1px solid #000000",
  //   zIndex: 100,
  // };

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress);
  };

  const handleOk = e => {
    setIsModalVisible(false);
    onOk();
    props.onOk();
  };

  const handleCancel = e => {
    setIsModalVisible(false);
    onCancel();
    props.onCancel();
  };
  const ensureValidData = () => {
    if (!form) {
      throw new Error("데이터를 찾지 못했습니다.");
    }

    if (!form.acCompany) {
      throw new Error("가맹점명을 입력하세요");
    }
    if (!form.acPresident) {
      throw new Error("대표자명을 입력하세요");
    }
    if (!form.acPassword) {
      throw new Error("비밀번호를 입력하세요");
    }
    if (!form.acCellNo) {
      throw new Error("전화번호를 입력하세요");
    }
    if (!form.acPhoneNo) {
      throw new Error("휴대폰번호를 입력하세요");
    }
    if (!form.acBizRegNo) {
      throw new Error("사업자번호를 입력하세요");
    }
    if (!form.acBizCondition || !form.acBizType) {
      throw new Error("업태 또는 업종을 입력하세요");
    }
    // if (!form.acOldAddress) {
    //   throw new Error("주소를 입력하세요");
    // }
    if (!form.acResRegNo) {
      throw new Error("생년월일을 입력하세요");
    }
    if (!form.ucBankCode) {
      throw new Error("주거래은행을 입력하세요");
    }
    if (!form.acBankAccount) {
      throw new Error("주거래은행 계좌번호를 입력하세요");
    }
    if (!form.acAccHoldName) {
      throw new Error("주거래은행 예금주를 입력하세요");
    }
    if (form.acAccHoldName !== form.acPresident) {
      throw new Error("주거래은행 예금주와 대표자명이 다릅니다");
    }
  };

  const executeCreateSignUp = async () => {
    try {
      ensureValidData();
      const response = await api({
        method: "post",
        url: "/agency/shop/signup.php",
        data: form,
      });
      console.log(response);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  return (
    <>
      <Modal width={700} visible={visible} onCancel={handleCancel} onOk={handleOk}>
        <div style={{ maxWidth: "700px", margin: "0 auto", paddingTop: "100px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ textAlign: "center", margin: "0 auto" }}>
              <h2>상점등록</h2>
              <Form>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>회원번호&nbsp;:</label>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <span>{`${form.ucAreaNo} - ${form.ucDistribId} - ${form.ucAgencyId} - ${form.ucMemCourId}`}</span>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
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
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>비밀번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPassword"
                      value={form.acPassword}
                      onChange={e => setForm({ ...form, acPassword: e.target.value })}
                      type="password"
                    />
                  </Col>
                </Row>
                <Row gutter={[16, 48]} justify="center">
                  <Col span={6}>
                    <label>가맹점명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acCompany"
                      value={form.acCompany}
                      onChange={e => setForm({ ...form, acCompany: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>사업자 등록번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acBizRegNo"
                      value={form.acBizRegNo}
                      onChange={e => setForm({ ...form, acBizRegNo: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>법인 등록번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acCorpNo"
                      value={form.acCorpNo}
                      onChange={e => setForm({ ...form, acCorpNo: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>E-mail주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acEmailAddress"
                      value={form.acEmailAddress}
                      onChange={e => setForm({ ...form, acEmailAddress: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>업태&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acBizCondition"
                      value={form.acBizCondition}
                      onChange={e => setForm({ ...form, acBizCondition: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>업종&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acBizType"
                      value={form.acBizType}
                      onChange={e => setForm({ ...form, acBizType: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>상점주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Button
                      type="primary"
                      style={{ width: "100%" }}
                      onClick={() => switchSearchAddress(true)}
                    >
                      주소검색
                    </Button>
                    <SearchAddress
                      visible={searchAddress}
                      onSuccess={(address: IAddress) => {
                        ({
                          ...form,
                          acOldAddress: address.acOldAddress,
                          acNewAddress: address.acNewAddress,
                          acAddressDesc: address.acAddressDesc,
                          ulLatiPos: address.ulLatiPos,
                          ulLongPos: address.ulLongPos,
                        });
                        setSearchAddress(false);
                      }}
                      onFailure={(text: string) => {
                        message.error(text);
                        setSearchAddress(false);
                      }}
                    />
                    {form.acOldAddress} {form.acAddressDesc}
                    {/* <Button type="primary" onClick={switchSearchAddress}>
                      주소검색
                    </Button>
                    {isOpenPost ? (
                      <DaumPostcode autoClose onComplete={onCompletePost} style={postCodeStyle} />
                    ) : null}
                    <div className="address">{addressDetail}</div> */}
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>상세주소&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      placeholder="상세 주소를 입력하세요"
                      name="acAddressDesc"
                      value={form.acAddressDesc}
                      onChange={e => setForm({ ...form, acAddressDesc: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>대표자명&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acPresident"
                      value={form.acPresident}
                      onChange={e => setForm({ ...form, acPresident: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
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
                <Row justify="center" gutter={[16, 48]}>
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
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>사업장 전화번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      name="acPhoneNo"
                      value={form.acPhoneNo}
                      onChange={e => setForm({ ...form, acPhoneNo: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>세금계산서 발행&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Checkbox
                      style={{ float: "left" }}
                      name="ucTaxInvoType"
                      value={form.ucTaxInvoType}
                      onChange={e => setForm({ ...form, ucTaxInvoType: Number(e.target.value) })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>주거래은행&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Select
                      defaultValue={form.ucBankCode}
                      onChange={e =>
                        setForm({
                          ...form,
                          ucBankCode: Number(e),
                        })
                      }
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
                    <label>주거래 계좌번호&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acBankAccount"
                      value={form.acBankAccount}
                      onChange={e => setForm({ ...form, acBankAccount: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>주거래 예금주&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acAccHoldName"
                      value={form.acAccHoldName}
                      onChange={e => setForm({ ...form, acAccHoldName: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 16]}>
                  <Col span={6}>
                    <label>가상계좌은행&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input readOnly />
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
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>기본료&nbsp;:</label>
                  </Col>
                  <Col span={10}>
                    <Row>
                      <Col span={12}>
                        <Input
                          addonAfter="m"
                          name="ulBaseDist"
                          value={form.ulBaseDist}
                          type="number"
                          onChange={e => setForm({ ...form, ulBaseDist: Number(e.target.value) })}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          addonAfter="m"
                          name="ulBaseFare"
                          value={form.ulBaseFare}
                          type="number"
                          onChange={e => setForm({ ...form, ulBaseFare: Number(e.target.value) })}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>거리할증&nbsp;:</label>
                  </Col>
                  <Col span={10}>
                    <Row>
                      <Col span={12}>
                        <Input
                          addonAfter="원"
                          name="ulExtraDist"
                          value={form.ulExtraDist}
                          onChange={e => setForm({ ...form, ulExtraDist: Number(e.target.value) })}
                        />
                      </Col>
                      <Col span={12}>
                        <Input
                          addonAfter="원"
                          name="ulExtraFare"
                          value={form.ulExtraFare}
                          onChange={e => setForm({ ...form, ulExtraFare: Number(e.target.value) })}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>배차 전 특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="allocRemark"
                      value={form.acAllocRemark}
                      onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>배차 후 특이사항&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="acRemark"
                      value={form.acRemark}
                      onChange={e => setForm({ ...form, acRemark: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>담당관리자&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      name="cpPresident"
                      value={form.acCpPresident}
                      onChange={e => setForm({ ...form, acCpPresident: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                  <Col span={6}>
                    <label>관리자연락처&nbsp;:</label>
                  </Col>
                  <Col span={8}>
                    <Input
                      prefix={<PhoneOutlined />}
                      name="cpCellNo"
                      value={form.acCpCellNo}
                      onChange={e => setForm({ ...form, acCpCellNo: e.target.value })}
                    />
                  </Col>
                </Row>
                <Row id="sign-up-submit">
                  <Button type="primary" size="large" block onClick={executeCreateSignUp}>
                    상점등록
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ShopSignupModal;
