/* eslint-disable */
import * as React from "react";
import { useState, FunctionComponent } from "react";
import { PhoneOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";

import { Form, Input, Row, Col, Select, Button, message, Checkbox, Popconfirm } from "antd";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";

const { Option } = Select;

interface DistributorProps {
  onOk: () => void;
  onCancel: () => void;
  location: RouteComponentProps;
}
const DistributorRegister = (props: DistributorProps) => {
  const [searchAddress, setSearchAddress] = useState(false);

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress);
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
                <Input name="acUserId" />
              </Form.Item>
              <Form.Item label="비밀번호">
                <Input name="acPassword" type="password" />
              </Form.Item>
              <Form.Item label="가맹점명">
                <Input name="acCompany" />
              </Form.Item>
              <Form.Item label="사업자 등록번호">
                <Input name="acBizRegNo" />
              </Form.Item>
              <Form.Item label="법인 등록번호">
                <Input name="acCorpNo" />
              </Form.Item>
              <Form.Item label="E-mail 주소">
                <Input name="acEmailAddress" />
              </Form.Item>
              <Form.Item label="업태">
                <Input name="acBizCondition" />
              </Form.Item>
              <Form.Item label="업종">
                <Input name="acBizType" />
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
                    // setForm({
                    //   ...form,
                    //   acOldAddress: address.acOldAddress,
                    //   acNewAddress: address.acNewAddress,
                    //   acAddressDesc: address.acAddressDesc,
                    //   ulLatiPos: address.ulLatiPos,
                    //   ulLongPos: address.ulLongPos,
                    // });
                    setSearchAddress(false);
                  }}
                  onFailure={(text: string) => {
                    message.error(text);
                    setSearchAddress(false);
                  }}
                />
                {/* {form.acOldAddress} {form.acAddressDesc} */}
              </Form.Item>
              <Form.Item label="상세 주소">
                <Input placeholder="상세 주소를 입력하세요" name="acAddressDesc" />
              </Form.Item>
              <Form.Item label="대표자명">
                <Input name="acPresident" />
              </Form.Item>
              <Form.Item label="생년월일">
                <Input name="acResRegNo" />
              </Form.Item>
              <Form.Item label="휴대폰번호">
                <Input
                  prefix={<PhoneOutlined />}
                  name="acCellNo"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // setForm({
                    //   ...form,
                    //   acCellNo: e.target.value
                    //     .replace(/[^0-9]/g, "")
                    //     .replace(
                    //       /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                    //       "$1-$2-$3"
                    //     )
                    //     .replace("--", "-"),
                    // });
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // setForm({
                    //   ...form,
                    //   acPhoneNo: e.target.value
                    //     .replace(/[^0-9]/g, "")
                    //     .replace(
                    //       /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                    //       "$1-$2-$3"
                    //     )
                    //     .replace("--", "-"),
                    // });
                  }}
                />
              </Form.Item>
              <Form.Item label="세금계산서 발행">
                <Checkbox style={{ float: "left" }} name="ucTaxInvoType" />
              </Form.Item>
              <Form.Item label="주거래은행">
                <Select>
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
                <Input name="acBankAccount" />
              </Form.Item>
              <Form.Item label="주거래 예금주">
                <Input name="acAccHoldName" />
              </Form.Item>
              <Form.Item label="가상계좌은행">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="가상계좌번호">
                <Input readOnly name="acVirtualAccount" />
              </Form.Item>
              <Form.Item label="관내 + 지역공유">
                <Checkbox style={{ float: "left" }} name="cAreaShareFlag" />
              </Form.Item>
              <Form.Item label="주문 콜 전체공유">
                <Checkbox style={{ float: "left" }} name="cTotalCallShareFlag" />
              </Form.Item>
              <Form.Item label="기본료">
                <span>
                  <Input style={{ width: "50%" }} addonAfter="m" name="ulBaseDist" type="number" />
                </span>
                <span>
                  <Input style={{ width: "50%" }} addonAfter="m" name="ulBaseFare" type="number" />
                </span>
              </Form.Item>
              <Form.Item label="거리할증">
                <span>
                  <Input style={{ width: "50%" }} addonAfter="원" name="ulExtraDist" />
                </span>
                <span>
                  <Input style={{ width: "50%" }} addonAfter="원" name="ulExtraFare" />
                </span>
              </Form.Item>
              <Form.Item label="총판 특이사항">
                <Input name="allocRemark" />
              </Form.Item>
              <Form.Item label="총판 추가특이사항">
                <Input name="acRemark" />
              </Form.Item>
              <Form.Item label="담당관리자">
                <Input name="cpPresident" />
              </Form.Item>
              <Form.Item label="관리자연락처">
                <Input
                  prefix={<PhoneOutlined />}
                  name="cpCellNo"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // setForm({
                    //   ...form,
                    //   acCpCellNo: e.target.value
                    //     .replace(/[^0-9]/g, "")
                    //     .replace(
                    //       /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                    //       "$1-$2-$3"
                    //     )
                    //     .replace("--", "-"),
                    // });
                  }}
                />
              </Form.Item>
              <Popconfirm
                title="총판을 등록하시겠습니까?"
                okText="네"
                cancelText="아니요"
                //onConfirm={executeCreateSignUp}
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
