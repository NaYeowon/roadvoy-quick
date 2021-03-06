/* eslint-disable */

import { Form, Input, Button, Row, Col, message, Select, Popconfirm, Checkbox } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { RouteComponentProps } from "react-router";
import React, { useMemo, useState } from "react";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
import { AgencyDTO } from "../shop/types";
import api from "src/config/axios";
import { AxiosError } from "axios";
import queryString from "query-string";
import { MemberId } from "src/domain/Member/model";

const { Option } = Select;

interface AgencyProps {
  onOk: () => void;
  onCancel: () => void;
  location: RouteComponentProps;
  agency?: AgencyDTO;
}
const AgencyRegister = (props: AgencyProps) => {
  const [searchAddress, setSearchAddress] = useState(false);
  const [form, setForm] = useState<AgencyDTO>({
    ucAreaNo: 0,
    ucDistribId: 0,
    ucAgencyId: 0,
    ucMemCourId: 0,

    acUserId: "",
    acPassword: "",
    acCompany: "",
    acEmailAddress: "",
    acResRegNo: "",
    acBizRegNo: "",
    acBizType: "",
    acBizCondition: "",
    acCorpNo: "",
    acPresident: "",
    acEntryDateTime: "",
    ucTaxInvoType: 0,
    acPhoneNo: "",
    acCellNo: "",
    acOldAddress: "",
    acNewAddress: "",
    acAddressDesc: "",
    ulLatiPos: 0,
    ulLongPos: 0,
    cDelayWarning: "",
    cUseRight: "",
    usVirtualBank: 0,
    acVirtualAccount: "",
    usBankCode: 0,
    acBankAccount: "",
    acAccHoldName: "",
    cAreaShareFlag: "",
    cTotalCallShareFlag: "",
    ulBaseDist: 0,
    ulBaseFare: 0,
    ulExtraDist: 0,
    ulExtraFare: 0,
    allocRemark: "",
    acRemark: "",
    cpPresident: "",
    cpCellNo: "",
    ucDefaultCallRtrvTime: 0,
  });

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress);
  };

  const ensureValidData = () => {
    const userId = /^[a-zA-Z][a-zA-Z0-9]{5,20}$/;
    const password =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|<>?:{}])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    const company = /[a-zA-Z???-???|???-???|???-???0-9]{2,}$/;
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
    if (!form.acPassword || !password.test(form.acPassword)) {
      throw new Error("??????????????? 8~20????????? ??????,????????????,?????? ????????? ??????????????????");
    }
    if (!form.acCompany || !company.test(form.acCompany)) {
      throw new Error("??????????????? ?????? ?????? ????????? 2?????? ?????? ??????????????????");
    }
    if (!form.acBizRegNo || !bizRegNo.test(form.acBizRegNo)) {
      throw new Error("?????????????????????(10??????)??? ???????????????");
    }
    if (!form.acEmailAddress || !mail.test(form.acEmailAddress)) {
      throw new Error("????????? ????????? ??????????????????");
    }
    if (!form.acBizCondition && !form.acBizType) {
      throw new Error("?????? ?????? ????????? ??????????????????");
    }
    if (!form.acOldAddress) {
      throw new Error("????????? ??????????????????");
    }
    if (!form.acPresident || !company.test(form.acPresident)) {
      throw new Error("??????????????? ?????? ?????? ????????? 2?????? ?????? ??????????????????");
    }
    if (!form.acResRegNo) {
      throw new Error("??????????????? ??????????????????");
    }
    if (!form.usBankCode) {
      throw new Error("????????? ??????????????? ???????????????");
    }
    if (!form.acBankAccount || !bankAccount.test(form.acBankAccount)) {
      throw new Error("????????? ??????????????? 9~15????????? ????????? ??????????????????");
    }
    if (!form.acAccHoldName || !(form.acAccHoldName === form.acPresident)) {
      throw new Error("??????????????? ???????????? ??????????????? ????????????");
    }
    if (form.acResRegNo.length === 8) {
      const year = Number(form.acResRegNo.substring(0, 3));
      const month = Number(form.acResRegNo.substring(4, 5));
      let day = Number(form.acResRegNo.substring(6, 7));
      console.log(year, month, day);

      const monthOfDaySize = new Date(Number(year), Number(month), 0).getDate();
      if (day > monthOfDaySize) {
        throw new Error("??????????????? ??????????????????");
      } else if (day < 1) {
        throw new Error("??????????????? ??????????????????");
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

  const executeUpdate = async () => {
    try {
      const results = await Promise.all([
        api({
          method: "post",
          url: "/distrib/agency/execute-command/modify.php",
          data: {
            ...form,
            acCellNo: form.acCellNo?.replace("-", ""),
            acPhoneNo: form.acPhoneNo?.replace("-", ""),
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
      console.log(results[0], results[1], results[2]);
      window.close();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const executeCreateSignUp = async () => {
    try {
      ensureValidData();
      const respons = await api({
        method: "post",
        url: "/distrib/agency/execute-command/signup.php",
        data: {
          ...form,
          acPhoneNo: form.acPhoneNo?.replace("-", ""),
          acCellNo: form.acCellNo?.replace("-", ""),
          cpCellNo: form.cpCellNo?.replace("-", ""),
          acBizRegNo: form.acBizRegNo?.replace("-", ""),
          acCorpNo: form.acCorpNo?.replace("-", ""),
        },
      });
      console.log(respons);
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
        url: "/hq/member/process-query/find-member-by-id.php",
        params: memberId,
      });
      console.log(response.data);

      setForm({
        ...form,
        ...(response.data.stMember as AgencyDTO),
        ...memberId,
      });
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  React.useEffect(() => {
    if (isUpdate()) {
      getUpdateForm(getUpdateMemberId());
    }
  }, []);

  const getUpdateMemberId = (): MemberId => {
    const params = queryString.parse(props.location.search);

    return {
      ucAreaNo: Number(params.ucAreaNo),
      ucDistribId: Number(params.ucDistribId),
      ucAgencyId: Number(params.ucAgencyId),
      ucMemCourId: Number(params.ucMemCourId),
    };
  };

  const isUpdate = () => {
    if (!props.location.search) return;

    const params = queryString.parse(props.location.search);
    return ["ucAreaNo", "ucDistribId", "ucAgencyId", "ucMemCourId"]
      .map(it => it in params)
      .every(it => it === true)
      ? true
      : false;
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
      <Row style={{ borderBottom: "1px solid #f5f5f5" }}>
        <TitleCol>??????{isUpdate() ? "??????" : "??????"}</TitleCol>
      </Row>
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
            <Form.Item label="????????????"></Form.Item>
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
                type="password"
                onChange={e => setForm({ ...form, acPassword: e.target.value })}
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
                //onChange={e => setForm({ ...form, acCorpNo: e.target.value })}
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
              <Input placeholder="?????? ????????? ???????????????" name="acAddressDesc" />
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
                maxLength={13}
              />
              {cellNoValidationMesage && (
                <span style={{ color: "red" }}>{cellNoValidationMesage}</span>
              )}
            </Form.Item>
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
                maxLength={13}
              />
              {phoneNoValidationMesage && (
                <span style={{ color: "red" }}>{phoneNoValidationMesage}</span>
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
            <Form.Item label="??????????????? ??????">
              <Checkbox
                style={{ float: "left" }}
                name="ucTaxInvoType"
                value={form.ucTaxInvoType}
                onChange={e => setForm({ ...form, ucTaxInvoType: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="???????????????">
              <Select
                value={form.usBankCode}
                onChange={e => setForm({ ...form, usBankCode: Number(e) })}
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
            <Form.Item label="?????? + ????????????">
              <Checkbox
                style={{ float: "left" }}
                name="cAreaShareFlag"
                value={form.cAreaShareFlag}
                onChange={e => setForm({ ...form, cAreaShareFlag: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="?????? ??? ????????????">
              <Checkbox
                style={{ float: "left" }}
                name="cTotalCallShareFlag"
                value={form.cTotalCallShareFlag}
                onChange={e => setForm({ ...form, cTotalCallShareFlag: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="?????????">
              <span>
                <Input
                  style={{ width: "50%" }}
                  addonAfter="m"
                  name="ulBaseDist"
                  type="number"
                  value={form.ulBaseDist}
                  onChange={e => setForm({ ...form, ulBaseDist: parseInt(e.target.value) })}
                />
              </span>
              <span>
                <Input
                  style={{ width: "50%" }}
                  addonAfter="m"
                  name="ulBaseFare"
                  type="number"
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
                  type="number"
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
                  type="number"
                  value={form.ulExtraFare}
                  onChange={e => setForm({ ...form, ulExtraFare: parseInt(e.target.value) })}
                />
              </span>
            </Form.Item>
            <Form.Item label="?????? ????????????" style={{ paddingTop: "7%" }}>
              <Input
                name="allocRemark"
                value={form.allocRemark}
                onChange={e => setForm({ ...form, allocRemark: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="?????? ??????????????????">
              <Input
                name="acRemark"
                value={form.acRemark}
                onChange={e => setForm({ ...form, acRemark: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="???????????????">
              <Input
                name="cpPresident"
                value={form.cpPresident}
                onChange={e => setForm({ ...form, cpPresident: e.target.value })}
              />
            </Form.Item>
            <Form.Item label="??????????????????">
              <Input
                prefix={<PhoneOutlined />}
                name="cpCellNo"
                value={form.cpCellNo}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setForm({
                    ...form,
                    cpCellNo: e.target.value
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
    </>
  );
};

export default AgencyRegister;
