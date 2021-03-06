/* eslint-disable */
import React, { useEffect, useMemo, useState } from "react";
import { Input, Button, Row, Col, message, Select, Checkbox, Form, Popconfirm } from "antd";
import { AxiosError } from "axios";
import { PhoneOutlined } from "@ant-design/icons";
import "./shopSign.css";
import { ShopInfo, ShopSignUpRequest } from "./types";
import api from "src/config/axios";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { MemberId } from "src/domain/Member/model";
import "../Order/Popup/_styles.css";
import queryString from "query-string";
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
    cManagerFlag: "",
    cAreaShareFlag: "",
    cTotalCallShareFlag: "",
    cReClaimFlag: "",
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
    const company = /[a-zA-Z???-???|???-???|???-???0-9]{2,}$/;
    const name = /[a-zA-Z???-???|???-???|???-???]{2,}$/;
    const mail =
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const bizRegNo = /[(0-9)|-]{12,}$/;
    const bankAccount = /[(0-9)]{9,15}$/;

    if (!form) {
      throw new Error("???????????? ?????? ???????????????.");
    }
    if (!form.acUserId || !userId.test(form.acUserId)) {
      throw new Error("??????ID??? 6~20????????? ??????, ????????? ????????? ??????????????????");
    }
    if (!form.acCompany || !company.test(form.acCompany)) {
      throw new Error("??????????????? ?????? ?????? ????????? 2?????? ?????? ??????????????????");
    }
    if (!form.acPassword || !password.test(form.acPassword)) {
      throw new Error("??????????????? 8~20????????? ??????,????????????,?????? ????????? ??????????????????");
    }
    if (!form.acBizRegNo || !bizRegNo.test(form.acBizRegNo)) {
      throw new Error("?????????????????????(10??????)??? ???????????????");
    }
    if (!form.acEmailAddress || !mail.test(form.acEmailAddress)) {
      throw new Error("????????? ????????? ??????????????????");
    }
    if (!form.acBizCondition && !form.acBizType) {
      throw new Error("?????? ?????? ????????? ???????????????");
    }
    if (!form.acOldAddress) {
      throw new Error("????????? ???????????????");
    }
    if (!form.acPresident || !name.test(form.acPresident)) {
      throw new Error("??????????????? ?????? ?????? ????????? 2?????? ?????? ??????????????????");
    }
    if (!form.acResRegNo) {
      throw new Error("??????????????? ???????????????");
    }
    if (!form.acCellNo) {
      throw new Error("?????????????????? ???????????????");
    }
    if (!form.ucBankCode) {
      throw new Error("?????????????????? ???????????????");
    }
    if (!form.acBankAccount || !bankAccount.test(form.acBankAccount)) {
      throw new Error("????????? ??????????????? 9~15????????? ????????? ??????????????????");
    }
    if (!form.acAccHoldName || !(form.acAccHoldName === form.acPresident)) {
      throw new Error("????????? ?????? ???????????? ??????????????? ?????????????????????");
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
      executeUpdate();
    } else {
      executeCreateSignUp();
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

  const executeUpdate = async () => {
    try {
      const results = await Promise.all([
        api({
          method: "post",
          url: "/agency/shop/execute-command/modify.php",
          data: {
            ...form,
            acCellNo: form.acCellNo?.replaceAll("-", ""),
            acPhoneNo: form.acPhoneNo?.replaceAll("-", ""),
          },
        }),
        api({
          method: "put",
          url: "/shared/member/bankAccount/index.php",
          data: {
            ...form,
            acBankAccount: form.acBankAccount,
          },
        }),
        api({
          method: "post",
          url: "/agency/member/execute-command/change-password.php",
          data: {
            ...form,
            acPassword: form.acPassword,
          },
        }),
      ]);
      window.close();
      console.log(results[0], results[1], results[2]);
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
        ...(response.data.stMember as ShopSignUpRequest),
        ...memberId,
        ulLatiPos: form.ulLatiPos,
        ulLongPos: form.ulLongPos,
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
      return "?????????????????? ??????????????????";
    } else {
      return "";
    }
  }, [form.acCellNo]);
  const phoneNoValidationMesage = useMemo(() => {
    if (
      form.acPhoneNo.length >= 3 &&
      ![
        "02",
        "051",
        "053",
        "032",
        "062",
        "042",
        "052",
        "044",
        "031",
        "033",
        "043",
        "041",
        "063",
        "061",
        "054",
        "055",
        "064",
      ].some(it => form.acPhoneNo.startsWith(it))
    ) {
      return "??????????????? ??????????????????";
    } else {
      return "";
    }
  }, [form.acPhoneNo]);

  return (
    <>
      <TitleCol>?????? {isUpdate() ? "??????" : "??????"}</TitleCol>
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
              <Form.Item label="????????????">
                {isUpdate() ? (
                  <span
                    style={{ float: "left" }}
                  >{`${form.ucAreaNo} - ${form.ucDistribId} - ${form.ucAgencyId} - ${form.ucMemCourId}`}</span>
                ) : (
                  <></>
                )}
              </Form.Item>
              <Form.Item label="?????? ID">
                <Input
                  name="acUserId"
                  value={form.acUserId}
                  onChange={e => setForm({ ...form, acUserId: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="????????????">
                <Input
                  name="acPassword"
                  value={form.acPassword}
                  onChange={e => setForm({ ...form, acPassword: e.target.value })}
                  type="password"
                />
              </Form.Item>
              <Form.Item label="????????????">
                <Input
                  name="acCompany"
                  value={form.acCompany}
                  onChange={e => setForm({ ...form, acCompany: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="????????? ????????????">
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
              <Form.Item label="?????? ????????????">
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
              <Form.Item label="E-mail ??????">
                <Input
                  name="acEmailAddress"
                  value={form.acEmailAddress}
                  onChange={e => setForm({ ...form, acEmailAddress: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="??????">
                <Input
                  name="acBizCondition"
                  value={form.acBizCondition}
                  onChange={e => setForm({ ...form, acBizCondition: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="??????">
                <Input
                  name="acBizType"
                  value={form.acBizType}
                  onChange={e => setForm({ ...form, acBizType: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="????????????">
                <Button
                  type="primary"
                  ghost
                  style={{ width: "100%" }}
                  onClick={() => switchSearchAddress(true)}
                >
                  ????????????
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
              <Form.Item label="?????? ??????">
                <Input
                  placeholder="?????? ????????? ???????????????"
                  name="acAddressDesc"
                  value={form.acAddressDesc}
                  onChange={e => setForm({ ...form, acAddressDesc: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="????????????">
                <Input
                  name="acPresident"
                  value={form.acPresident}
                  onChange={e => setForm({ ...form, acPresident: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="????????????">
                <Input
                  name="acResRegNo"
                  value={form.acResRegNo}
                  onChange={e => setForm({ ...form, acResRegNo: e.target.value })}
                  maxLength={8}
                />
              </Form.Item>
              <Form.Item label="???????????????">
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
              <Form.Item label="????????? ????????????">
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
                          /(^02|^051|^053|^032|^062|^042|^052|^044|^031|^033|^043|^041|^063|^061|^054|^055|^064)([0-9]+)([0-9]{4})/,
                          "$1-$2-$3"
                        )
                        .replace("--", "-"),
                    });
                  }}
                />
                {phoneNoValidationMesage && (
                  <span style={{ color: "red" }}>{phoneNoValidationMesage}</span>
                )}
              </Form.Item>
              <Form.Item label="??????????????? ??????">
                <Checkbox
                  style={{ float: "left" }}
                  name="ucTaxInvoType"
                  value={form.ucTaxInvoType}
                  onChange={e => setForm({ ...form, ucTaxInvoType: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="???????????????">
                <Select
                  value={form.ucBankCode}
                  onChange={e => setForm({ ...form, ucBankCode: Number(e) })}
                >
                  <Option value={88}>????????????</Option>
                  <Option value={4}>????????????</Option>
                  <Option value={3}>????????????</Option>
                  <Option value={20}>????????????</Option>
                  <Option value={90}>???????????????</Option>
                  <Option value={89}>????????????</Option>
                  <Option value={11}>???????????????</Option>
                  <Option value={2}>????????????</Option>
                  <Option value={23}>SC????????????</Option>
                  <Option value={81}>KEB????????????</Option>
                  <Option value={27}>????????????</Option>
                  <Option value={7}>????????????</Option>
                  <Option value={31}>????????????</Option>
                  <Option value={32}>????????????</Option>
                  <Option value={34}>????????????</Option>
                  <Option value={35}>????????????</Option>
                  <Option value={37}>????????????</Option>
                  <Option value={39}>????????????</Option>
                </Select>
              </Form.Item>
              <Form.Item label="????????? ????????????">
                <Input
                  name="acBankAccount"
                  value={form.acBankAccount}
                  onChange={e => setForm({ ...form, acBankAccount: e.target.value })}
                  maxLength={15}
                />
              </Form.Item>
              <Form.Item label="????????? ?????????">
                <Input
                  name="acAccHoldName"
                  value={form.acAccHoldName}
                  onChange={e => setForm({ ...form, acAccHoldName: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="??????????????????">
                <Input readOnly />
              </Form.Item>
              <Form.Item label="??????????????????">
                <Input
                  readOnly
                  name="acVirtualAccount"
                  value={form.acVirtualAccount}
                  onChange={e => setForm({ ...form, acVirtualAccount: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="?????????" style={{ paddingTop: "7%" }}>
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
              <Form.Item label="????????????">
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="???"
                    name="ulExtraDist"
                    value={form.ulExtraDist}
                    onChange={e => setForm({ ...form, ulExtraDist: parseInt(e.target.value) })}
                  />
                </span>
                <span>
                  <Input
                    style={{ width: "50%" }}
                    addonAfter="???"
                    name="ulExtraFare"
                    value={form.ulExtraFare}
                    onChange={e => setForm({ ...form, ulExtraFare: parseInt(e.target.value) })}
                  />
                </span>
              </Form.Item>
              <Form.Item label="?????? ??? ????????????">
                <Input
                  name="allocRemark"
                  value={form.acAllocRemark}
                  onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="?????? ??? ????????????">
                <Input
                  name="acRemark"
                  value={form.acRemark}
                  onChange={e => setForm({ ...form, acRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="???????????????">
                <Input
                  name="cpPresident"
                  value={form.acCpPresident}
                  onChange={e => setForm({ ...form, acCpPresident: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="??????????????????">
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
              <Form.Item label="???????????? ????????? ????????????">
                <Checkbox style={{ float: "left" }} />
              </Form.Item>
              <Form.Item label="???????????? ????????????">
                <Checkbox style={{ float: "left" }} name="" />
              </Form.Item>
              <Popconfirm
                title="????????? ?????????????????????????"
                okText="???"
                cancelText="?????????"
                onConfirm={executeSignUp}
              >
                <Button style={{ marginTop: "30px" }} type="primary">
                  {isUpdate() ? "??????" : "??????"}
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
