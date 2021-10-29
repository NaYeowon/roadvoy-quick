/* eslint-disable */
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Input, Row, Col, Select, Button, message, Form, Popconfirm, Result } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import "./RiderSettlementList.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { RiderInfo, RiderSignUpRequest } from "../shop/types";
import api from "src/config/axios";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { RouteComponentProps } from "react-router";
import queryString, { ParsedQuery } from "query-string";
import { MemberId } from "src/domain/Member/model";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
import { parseTwoDigitYear } from "moment";
import { ManagerFlag } from "src/domain/Errand/model";

const { Option } = Select;

interface Props {
  onOk: () => void;
  onCancel: () => void;
  rider?: RiderSignUpRequest;
  location: RouteComponentProps;
}

const RiderRegister = (props: Props) => {
  const [form, setForm] = useState<RiderSignUpRequest>({
    acUserId: "",
    ucAreaNo: 0,
    ucDistribId: 0,
    ucAgencyId: 0,
    ucMemCourId: 0,
    acPresident: "",
    acPassword: "",
    acResRegNo: "",
    acCellNo: "",
    acNewAddress: "",
    acOldAddress: "",
    acAddressDesc: "",
    ulLatiPos: 0,
    ulLongPos: 0,
    ucTaxInvoType: 0,
    usBankCode: 0,
    acWithdrawPassword: "",
    acBankAccount: "",
    acAccHoldName: "",
    usVirtualBank: 0,
    acVirtualAccount: "",
    ucCourierTag: 0,
    lCourierLease: 0,
    lCourierDeposit: 0,
    lCallUnitPrice: 0,
    conCallLimit: 0,
    cManagerFlag: "",
    cReClaimFlag: 0,
    acAllocRemark: "",
    acRemark: "",
    acTeamName: "",
    ucCallRtrvTime: 0,
    ucManagerCallRtrvTime: 0,
  });

  const [searchAddress, setSearchAddress] = useState(false);

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress);
  };

  const ensureValidData = () => {
    const userId = /^[a-zA-Z0-9]{6,20}$/;
    const password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|<>?:{}])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    const name = /[a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{2,50}$/;
    const bankAccount = /[(0-9)]{9,15}$/;
    const withdrawPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|<>?:{}])[A-Za-z\d$@$!%*#?&]{0,8}$/;

    if (!form) {
      throw new Error("데이터를 찾지 못했습니다.");
    }
    if (!form.acUserId || !userId.test(form.acUserId)) {
      throw new Error("회원ID를 6~20자리의 숫자, 영문자 형태로 입력해주세요");
    }
    if (!form.acPassword || !password.test(form.acPassword)) {
      throw new Error("비밀번호를 8~20자리의 숫자,특수문자,영문 형태로 입력해주세요");
    }
    if (!form.acPresident || !name.test(form.acPresident)) {
      throw new Error("이름을 2글자 이상 입력해주세요");
    }
    if (!form.acCellNo) {
      throw new Error("휴대폰번호를 입력해주세요");
    }
    if (!form.acOldAddress) {
      throw new Error("주소를 입력해주세요");
    }
    if (!form.acBankAccount) {
      throw new Error("주거래은행 계좌번호를 선택해주세요");
    }
    if (!form.acWithdrawPassword || !withdrawPassword.test(form.acWithdrawPassword)) {
      throw new Error("출금비밀번호를 8자리 이내의 숫자,특수문자,영문 형태로 입력해주세요");
    }
    if (!form.acBankAccount || !bankAccount.test(form.acBankAccount)) {
      throw new Error("주거래 계좌번호를 9~15자리의 숫자로 입력해주세요");
    }
    if (form.acAccHoldName !== form.acPresident) {
      throw new Error("주거래은행 예금주가 대표자명과 다릅니다");
    }
    if (form.acResRegNo.length === 8) {
      const year = Number(form.acResRegNo.substring(0, 3));
      const month = Number(form.acResRegNo.substring(4, 5));
      let day = Number(form.acResRegNo.substring(6, 7));
      console.log(year, month, day);

      const monthOfDaySize = new Date(Number(year), Number(month), 0).getDate();
      if (day > monthOfDaySize) {
        throw new Error("overflow");
      } else if (day < 1) {
        throw new Error("");
      } else if (!(1 <= month && month <= 12)) {
      }
    }
  };

  const executeSignUp = () => {
    if (isUpdate()) {
      executeUpdateSignUp();
    } else {
      executeCreateSignUp();
    }
  };

  const executeCreateSignUp = async () => {
    try {
      ensureValidData();
      const response = await api({
        method: "post",
        url: "/agency/rider/execute-command/signup.php",
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

  const executeUpdateSignUp = async () => {
    try {
      ensureValidData();

      await api({
        method: "post",
        url: "/agency/rider/execute-command/modify.php",
        data: {
          // ucAreaNo: form.ucAreaNo,
          // ucDistribId: form.ucDistribId,
          // ucAgencyId: form.ucAgencyId,
          // ucMemCourId: form.ucMemCourId,
          ...form,
          acCellNo: form.acCellNo?.replace("-", ""),
        },
      });

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
        url: "/agency/rider/process-query/find-by-id.php",
        params: memberId,
      });
      console.log(response.data);

      setForm({
        ...(response.data.stRiderUpdateData as RiderSignUpRequest),
        ...memberId,
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

  const cellNoValidationMesage = useMemo(() => {
    if (
      form.acCellNo.length >= 3 &&
      !["010", "016", "019", "018"].some(it => form.acCellNo.startsWith(it))
    ) {
      return "휴대폰번호를 입력해주세요";
    } else {
      return "";
    }
  }, [form.acCellNo]);

  //

  return (
    <>
      <TitleCol>기사 {isUpdate() ? "수정" : "등록"}</TitleCol>
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
                  <span
                    style={{ float: "left" }}
                  >{`${form.ucAreaNo} - ${form.ucDistribId} - ${form.ucAgencyId} - ${form.ucMemCourId}`}</span>
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
              <Form.Item label="이름">
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
                        .replace(/(^010|^016|^019|^018)([0-9]+)([0-9]{4})/, "$1-$2-$3")
                        .replace("--", "-"),
                    });
                  }}
                />
                {cellNoValidationMesage && (
                  <span style={{ color: "red" }}>{cellNoValidationMesage}</span>
                )}
              </Form.Item>
              <Form.Item label="주소">
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
              <Form.Item label="출금비밀번호">
                <Input
                  name="acWithdrawPassword"
                  type="password"
                  value={form.acWithdrawPassword}
                  onChange={e => setForm({ ...form, acWithdrawPassword: e.target.value })}
                  maxLength={8}
                />
              </Form.Item>

              <Form.Item label="기사구분" style={{ paddingTop: "7%" }}>
                <Select
                  value={form.ucCourierTag}
                  onChange={e => setForm({ ...form, ucCourierTag: Number(e) })}
                >
                  <Option value={1}>지입</Option>
                  <Option value={2}>리스</Option>
                </Select>
              </Form.Item>
              <Form.Item label="1일 리스료">
                <Input
                  name="lCourierLease"
                  value={form.lCourierLease}
                  onChange={e => setForm({ ...form, lCourierLease: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="보증금">
                <Input
                  name="lCourierDeposit"
                  value={form.lCourierDeposit}
                  onChange={e => setForm({ ...form, lCourierDeposit: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="콜수수료">
                <Input
                  name="lCallUnitPrice"
                  value={form.lCallUnitPrice}
                  onChange={e => setForm({ ...form, lCallUnitPrice: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="콜 동시 접수제한">
                <Input
                  name="conCallLimit"
                  value={form.conCallLimit}
                  onChange={e => setForm({ ...form, conCallLimit: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="관리자모드">
                <Checkbox
                  style={{ float: "left" }}
                  name="cManagerFlag"
                  value={form.cManagerFlag}
                  onChange={e =>
                    setForm({
                      ...form,
                      cManagerFlag: e.target.checked ? ManagerFlag.YES : ManagerFlag.NO,
                    })
                  }
                  checked={form.cManagerFlag === ManagerFlag.YES}
                />
              </Form.Item>
              <Form.Item label="출금 가능여부">
                <Checkbox
                  style={{ float: "left" }}
                  name="cReClaimFlag"
                  value={form.cReClaimFlag}
                  onChange={e => setForm({ ...form, cReClaimFlag: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="기사 특이사항">
                <Input
                  name="acAllocRemark"
                  value={form.acAllocRemark}
                  onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="기사 추가 특이사항">
                <Input
                  name="acRemark"
                  value={form.acRemark}
                  onChange={e => setForm({ ...form, acRemark: e.target.value })}
                />
              </Form.Item>
              <Popconfirm
                title="기사를 등록하시겠습니까?"
                okText="네"
                cancelText="아니요"
                onConfirm={executeSignUp}
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
export default RiderRegister;
