/* eslint-disable */
import * as React from "react";
import { useState, FunctionComponent } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";

import { Form, Input, Row, Col, Select, Button, message, Checkbox, Popconfirm } from "antd";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
import { DistributorDto } from "../shop/types";
import { AxiosError } from "axios";
import api from "src/config/axios";

const { Option } = Select;

interface DistributorProps {
  onOk: () => void;
  onCancel: () => void;
  location: RouteComponentProps;
}
const DistributorRegister = (props: DistributorProps) => {
  const [form, setForm] = useState<DistributorDto>({
    ucAreaNo: "",
    ucDistribId: "",
    ucAgencyId: "",
    ucMemCourId: "",

    acUserId: "",
    acPassword: "",
    acCompany: "",
    acBizRegNo: "",
    acCorpNo: "",
    acPresident: "",
    acErrandDate: "",
    ucTaxInvoType: 0,
    acPhoneNo: "",
    acCellNo: "",
    acEmailAddress: "",
    acBizCondition: "",
    acBizType: "",
    acResRegNo: "",
    acOldAddress: "",
    acNewAddress: "",
    ulLatiPos: 0,
    ulLongPos: 0,
    acAddressDesc: "",
    usBankCode: 0,
    acBankAccount: "",
    acAccHoldName: "",
    cDelayWarning: "",
    cUseRight: "",
    usVirtualBank: 0,
    acVirtualAccount: "",
    cAreaShareFlag: "",
    cTotalCallShareFlag: "",
    ulBaseDist: 0,
    ulBaseFare: 0,
    ulExtraDist: 0,
    ulExtraFare: 0,
    acAllocRemark: "",
    acRemark: "",
    acCpPresident: "",
    acCpCellNo: "",
    acWithdrawPassword: "",
    cManagerFlag: "N",
  });
  const [searchAddress, setSearchAddress] = useState(false);

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress);
  };

  const executeSignUp = () => {
    executeCreateSignUp();
  };

  const executeCreateSignUp = async () => {
    try {
      const response = await api({
        method: "post",
        url: "/hq/member/distrib/execute-command/signup.php",
        data: {
          ...form,
          acCellNo: form.acCellNo?.replace("-", ""),
        },
      });
      console.log(response);
      window.close();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  return (
    <>
      <TitleCol>총판등록</TitleCol>
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
              <Form.Item label="회원번호"></Form.Item>
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
                />{" "}
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({
                      ...form,
                      acBizRegNo: e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, "$1-$2-$3")
                        .replace("--", "-"),
                    });
                  }}
                  maxLength={12}
                />
              </Form.Item>
              <Form.Item label="법인 등록번호">
                <Input
                  name="acCorpNo"
                  value={form.acCorpNo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setForm({
                      ...form,
                      acCorpNo: e.target.value
                        .replace(/[^0-9]/g, "")
                        .replace(/([0-9]{6})([0-9]{7})/, "$1-$2")
                        .replace("--", "-"),
                    });
                  }}
                  maxLength={14}
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
              <Form.Item label="총판주소">
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
                  maxLength={8}
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
                  defaultValue={form.usBankCode}
                  onChange={e =>
                    setForm({
                      ...form,
                      usBankCode: Number(e),
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
                  maxLength={15}
                />
              </Form.Item>
              <Form.Item label="주거래 예금주">
                <Input
                  name="acAccHoldName"
                  value={form.acAccHoldName}
                  onChange={e => setForm({ ...form, acAccHoldName: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="출금비밀번호">
                <Input
                  name="acWithdrawPassword"
                  type="password"
                  value={form.acWithdrawPassword}
                  onChange={e => setForm({ ...form, acWithdrawPassword: e.target.value })}
                  maxLength={8}
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
              <Form.Item label="관내 + 지역공유">
                <Checkbox
                  style={{ float: "left" }}
                  name="cAreaShareFlag"
                  value={e => setForm({ ...form, cAreaShareFlag: e.target.checked })}
                />
              </Form.Item>
              <Form.Item label="주문 콜 전체공유">
                <Checkbox
                  style={{ float: "left" }}
                  name="cManagerFlag"
                  value={e => setForm({ ...form, cManagerFlag: e.target.checked })}
                />
              </Form.Item>
              <Form.Item label="기본료">
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="m"
                    name="ulBaseDist"
                    value={form.ulBaseDist}
                    onChange={e => setForm({ ...form, ulBaseDist: Number(e.target.value) })}
                    type="number"
                  />
                </span>
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="m"
                    name="ulBaseFare"
                    value={form.ulBaseFare}
                    onChange={e => setForm({ ...form, ulBaseFare: Number(e.target.value) })}
                    type="number"
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
              <Form.Item label="총판 특이사항">
                <Input
                  name="allocRemark"
                  value={form.acAllocRemark}
                  onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="총판 추가특이사항">
                <Input
                  name="acRemark"
                  value={form.acRemark}
                  onChange={e => setForm({ ...form, acRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="담당관리자">
                <Input
                  name="acCpPresident"
                  value={form.acCpPresident}
                  onChange={e => setForm({ ...form, acCpPresident: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="관리자연락처">
                <Input
                  prefix={<PhoneOutlined />}
                  name="acCpCellNo"
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
                title="총판을 등록하시겠습니까?"
                okText="네"
                cancelText="아니요"
                onConfirm={executeSignUp}
              >
                <Button style={{ marginTop: "30px" }} type="primary">
                  등록
                </Button>
              </Popconfirm>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DistributorRegister;
