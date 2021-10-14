/* eslint-disable */
import React, { Component, useEffect, useState } from "react";
import { Modal, Input, Button, Row, Col, message, Select, Checkbox, Form, Popconfirm } from "antd";
import axios, { AxiosError } from "axios";
import { PhoneOutlined } from "@ant-design/icons";
import DaumPostCode, { DaumPostcode } from "react-daum-postcode";
import "./shopSign.css";
import { ShopInfo, ShopSignUpRequest } from "./types";
import api from "src/config/axios";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
import LoginHelper from "src/pages/shared/LoginHelper";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { MemberId } from "src/domain/Member/model";
import "../Order/Popup/_styles.css";
import queryString, { ParsedQuery } from "query-string";
import { RouteComponentProps } from "react-router";

const { Option } = Select;

interface ShopModalProps {
  onOk: () => void;
  onCancel: () => void;
  shop?: ShopInfo;
  location: RouteComponentProps;
}
const ShopSignupModal = (props: ShopModalProps) => {
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
  const [searchAddress, setSearchAddress] = useState(false);

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress);
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
        url: "/agency/shop/execute-command/signup.php",
        data: {
          ...form,
          acCellNo: form.acCellNo?.replaceAll("-", ""),
          acPhoneNo: form.acPhoneNo?.replaceAll("-", ""),
        },
      });
      console.log(response);
      window.close();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const getUpdateForm = async (memberId: MemberId) => {
    try {
      const response = await api({
        method: "get",
        url: "/agency/shop/process-query/find-by-id.php",
        params: memberId,
      });

      setForm({
        ...(response.data.shop as ShopSignUpRequest),
      });
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (isUpdate()) {
      getUpdateForm(getUpdateMemberId());
    }
  }, []);

  const isUpdate = () => {
    if (!props.location.search) return;

    const params = queryString.parse(props.location.search);
    return ["ucAreaNo", "ucDistribId", "ucAgencyId", "ucMemCourId"]
      .map(it => it in params)
      .every(it => it === true)
      ? true
      : false;
  };

  const getUpdateMemberId = (): MemberId => {
    const params = queryString.parse(props.location.search);

    return {
      ucAreaNo: Number(params.ucAreaNo),
      ucDistribId: Number(params.ucDistribId),
      ucAgencyId: Number(params.ucAgencyId),
      ucMemCourId: Number(params.ucMemCourId),
    };
  };

  return (
    <>
      <TitleCol>상점 {isUpdate() ? "수정" : "등록"}</TitleCol>
      <div style={{ textAlign: "left", margin: "0 auto" }}>
        <Row>
          <Col span={12}>
            <Form
              {...formItemLayout}
              initialValues={{
                "input-number": 3,
                "checkbox-group": ["A", "B"],
                rate: 3.5,
              }}
            >
              <Form.Item label="회원번호">
                {isUpdate() ? (
                  <span>{`${form.ucAreaNo} - ${form.ucDistribId} - ${form.ucAgencyId} - ${form.ucMemCourId}`}</span>
                ) : (
                  <></>
                )}
              </Form.Item>
              <Form.Item label="회원 ID">
                <Input
                  name="acUserId"
                  value={form.acUserId}
                  onChange={e => setForm({ ...form, acUserId: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="비밀번호">
                <Input
                  name="acPassword"
                  value={form.acPassword}
                  onChange={e => setForm({ ...form, acPassword: e.target.value })}
                  type="password"
                />
              </Form.Item>
              <Form.Item label="가맹점명">
                <Input
                  name="acCompany"
                  value={form.acCompany}
                  onChange={e => setForm({ ...form, acCompany: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="사업자 등록번호">
                <Input
                  name="acBizRegNo"
                  value={form.acBizRegNo}
                  onChange={e => setForm({ ...form, acBizRegNo: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="법인 등록번호">
                <Input
                  name="acCorpNo"
                  value={form.acCorpNo}
                  onChange={e => setForm({ ...form, acCorpNo: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="E-mail 주소">
                <Input
                  name="acEmailAddress"
                  value={form.acEmailAddress}
                  onChange={e => setForm({ ...form, acEmailAddress: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="업태">
                <Input
                  name="acBizCondition"
                  value={form.acBizCondition}
                  onChange={e => setForm({ ...form, acBizCondition: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="업종">
                <Input
                  name="acBizType"
                  value={form.acBizType}
                  onChange={e => setForm({ ...form, acBizType: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="상점주소">
                <Button
                  type="primary"
                  ghost
                  style={{ width: "100%" }}
                  onClick={() => switchSearchAddress(true)}
                >
                  주소검색
                </Button>
                <SearchAddress
                  visible={searchAddress}
                  onSuccess={(address: IAddress) => {
                    setForm({
                      ...form,
                      acOldAddress: address.acOldAddress,
                      acNewAddress: address.acNewAddress,
                      acAddressDesc: address.acAddressDesc,
                      ulLatiPos: address.ulLatiPos,
                      ulLongPos: address.ulLongPos,
                    });
                    console.log(address);
                    setSearchAddress(false);
                  }}
                  onFailure={(text: string) => {
                    message.error(text);
                    setSearchAddress(false);
                  }}
                />
                {form.acOldAddress} {form.acAddressDesc}
              </Form.Item>
              <Form.Item label="상세 주소">
                <Input
                  placeholder="상세 주소를 입력하세요"
                  name="acAddressDesc"
                  value={form.acAddressDesc}
                  onChange={e => setForm({ ...form, acAddressDesc: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="대표자명">
                <Input
                  name="acPresident"
                  value={form.acPresident}
                  onChange={e => setForm({ ...form, acPresident: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="생년월일">
                <Input
                  name="acResRegNo"
                  value={form.acResRegNo}
                  onChange={e => setForm({ ...form, acResRegNo: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="휴대폰번호">
                <Input
                  prefix={<PhoneOutlined />}
                  name="acCellNo"
                  value={form.acCellNo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({
                      ...form,
                      acCellNo: e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(
                          /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                          "$1-$2-$3"
                        )
                        .replace("--", "-"),
                    });
                  }}
                />
              </Form.Item>
            </Form>
          </Col>

          <Col span={12} pull={1}>
            <Form
              {...formItemLayout}
              initialValues={{
                "input-number": 3,
                "checkbox-group": ["A", "B"],
                rate: 3.5,
              }}
            >
              <Form.Item label="사업장 전화번호">
                <Input
                  prefix={<PhoneOutlined />}
                  name="acPhoneNo"
                  value={form.acPhoneNo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({
                      ...form,
                      acPhoneNo: e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(
                          /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                          "$1-$2-$3"
                        )
                        .replace("--", "-"),
                    });
                  }}
                />
              </Form.Item>
              <Form.Item label="세금계산서 발행">
                <Checkbox
                  style={{ float: "left" }}
                  name="ucTaxInvoType"
                  value={form.ucTaxInvoType}
                  onChange={e => setForm({ ...form, ucTaxInvoType: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="주거래은행">
                <Select
                  defaultValue={form.ucBankCode}
                  onChange={e =>
                    setForm({
                      ...form,
                      ucBankCode: Number(e),
                    })
                  }
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
              </Form.Item>
              <Form.Item label="주거래 계좌번호">
                <Input
                  name="acBankAccount"
                  value={form.acBankAccount}
                  onChange={e => setForm({ ...form, acBankAccount: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="주거래 예금주">
                <Input
                  name="acAccHoldName"
                  value={form.acAccHoldName}
                  onChange={e => setForm({ ...form, acAccHoldName: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="가상계좌은행">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="가상계좌번호">
                <Input
                  readOnly
                  name="acVirtualAccount"
                  value={form.acVirtualAccount}
                  onChange={e => setForm({ ...form, acVirtualAccount: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="기본료">
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="m"
                    name="ulBaseDist"
                    value={form.ulBaseDist}
                    onChange={e => setForm({ ...form, ulBaseDist: parseInt(e.target.value) })}
                  />
                </span>
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="m"
                    name="ulBaseFare"
                    value={form.ulBaseFare}
                    onChange={e => setForm({ ...form, ulBaseFare: parseInt(e.target.value) })}
                  />
                </span>
              </Form.Item>
              <Form.Item label="거리할증">
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="원"
                    name="ulExtraDist"
                    value={form.ulExtraDist}
                    onChange={e => setForm({ ...form, ulExtraDist: parseInt(e.target.value) })}
                  />
                </span>
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="원"
                    name="ulExtraFare"
                    value={form.ulExtraFare}
                    onChange={e => setForm({ ...form, ulExtraFare: parseInt(e.target.value) })}
                  />
                </span>
              </Form.Item>
              <Form.Item label="배차 전 특이사항">
                <Input
                  name="allocRemark"
                  value={form.acAllocRemark}
                  onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="배차 후 특이사항">
                <Input
                  name="acRemark"
                  value={form.acRemark}
                  onChange={e => setForm({ ...form, acRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="담당관리자">
                <Input
                  name="cpPresident"
                  value={form.acCpPresident}
                  onChange={e => setForm({ ...form, acCpPresident: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="관리자연락처">
                <Input
                  prefix={<PhoneOutlined />}
                  name="cpCellNo"
                  value={form.acCpCellNo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({
                      ...form,
                      acCpCellNo: e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(
                          /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                          "$1-$2-$3"
                        )
                        .replace("--", "-"),
                    });
                  }}
                />
              </Form.Item>
              <Popconfirm
                title="상점을 등록하시겠습니까?"
                okText="네"
                cancelText="아니요"
                onConfirm={executeCreateSignUp}
              >
                <Button style={{ marginTop: "30px" }} type="primary">
                  {isUpdate() ? "수정" : "등록"}
                </Button>
              </Popconfirm>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ShopSignupModal;
