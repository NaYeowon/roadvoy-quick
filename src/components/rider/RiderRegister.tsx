/* eslint-disable */
import * as React from "react";
import { useEffect, useMemo, useState } from "react";
import { Input, Row, Col, Select, Button, message, Form, Popconfirm } from "antd";
import { PhoneOutlined } from "@ant-design/icons";
import { AxiosError } from "axios";
import "./RiderSettlementList.css";
import Checkbox from "antd/lib/checkbox/Checkbox";
import { RiderSignUpRequest } from "../shop/types";
import api from "src/config/axios";
import { formItemLayout, TitleCol } from "../Order/Popup/styles";
import { RouteComponentProps } from "react-router";
import queryString from "query-string";
import { MemberId } from "src/domain/Member/model";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";
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
    cManagerFlag: "N",
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
    const name = /[a-zA-Z???-???|???-???|???-???]{2,50}$/;
    const bankAccount = /[(0-9)]{9,15}$/;
    const withdrawPassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()_+|<>?:{}])[A-Za-z\d$@$!%*#?&]{0,8}$/;

    if (!form) {
      throw new Error("???????????? ?????? ???????????????.");
    }
    if (!form.acUserId || !userId.test(form.acUserId)) {
      throw new Error("??????ID??? 6~20????????? ??????, ????????? ????????? ??????????????????");
    }
    if (!form.acPassword || !password.test(form.acPassword)) {
      throw new Error("??????????????? 8~20????????? ??????,????????????,?????? ????????? ??????????????????");
    }
    if (!form.acPresident || !name.test(form.acPresident)) {
      throw new Error("????????? 2?????? ?????? ??????????????????");
    }
    if (!form.acCellNo) {
      throw new Error("?????????????????? ??????????????????");
    }
    if (!form.acOldAddress) {
      throw new Error("????????? ??????????????????");
    }
    if (!form.acBankAccount) {
      throw new Error("??????????????? ??????????????? ??????????????????");
    }
    if (!form.acWithdrawPassword || !withdrawPassword.test(form.acWithdrawPassword)) {
      throw new Error("????????????????????? 8?????? ????????? ??????,????????????,?????? ????????? ??????????????????");
    }
    if (!form.acBankAccount || !bankAccount.test(form.acBankAccount)) {
      throw new Error("????????? ??????????????? 9~15????????? ????????? ??????????????????");
    }
    if (form.acAccHoldName !== form.acPresident) {
      throw new Error("??????????????? ???????????? ??????????????? ????????????");
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

  const executeUpdate = async () => {
    try {
      const results = await Promise.all([
        api({
          method: "post",
          url: "/agency/rider/execute-command/modify.php",
          data: {
            ...form,
            acCellNo: form.acCellNo?.replace("-", ""),
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
      return "?????????????????? ??????????????????";
    } else {
      return "";
    }
  }, [form.acCellNo]);

  //

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
              <Form.Item label="??????">
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
              <Form.Item label="??????">
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
                  value={form.usBankCode}
                  onChange={e =>
                    setForm({
                      ...form,
                      usBankCode: Number(e),
                    })
                  }
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
              <Form.Item label="??????????????????">
                <Input
                  name="acWithdrawPassword"
                  type="password"
                  value={form.acWithdrawPassword}
                  onChange={e => setForm({ ...form, acWithdrawPassword: e.target.value })}
                  maxLength={8}
                />
              </Form.Item>

              <Form.Item label="????????????" style={{ paddingTop: "7%" }}>
                <Select
                  value={form.ucCourierTag}
                  onChange={e => setForm({ ...form, ucCourierTag: Number(e) })}
                >
                  <Option value={1}>??????</Option>
                  <Option value={2}>??????</Option>
                </Select>
              </Form.Item>
              <Form.Item label="1??? ?????????">
                <Input
                  name="lCourierLease"
                  value={form.lCourierLease}
                  onChange={e => setForm({ ...form, lCourierLease: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="?????????">
                <Input
                  name="lCourierDeposit"
                  value={form.lCourierDeposit}
                  onChange={e => setForm({ ...form, lCourierDeposit: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="????????????">
                <Input
                  name="lCallUnitPrice"
                  value={form.lCallUnitPrice}
                  onChange={e => setForm({ ...form, lCallUnitPrice: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="??? ?????? ????????????">
                <Input
                  name="conCallLimit"
                  value={form.conCallLimit}
                  onChange={e => setForm({ ...form, conCallLimit: Number(e.target.value) })}
                />
              </Form.Item>
              <Form.Item label="???????????????">
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
              <Form.Item label="?????? ????????????">
                <Checkbox
                  style={{ float: "left" }}
                  name="cReClaimFlag"
                  value={form.cReClaimFlag}
                  onChange={e => setForm({ ...form, cReClaimFlag: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="?????? ????????????">
                <Input
                  name="acAllocRemark"
                  value={form.acAllocRemark}
                  onChange={e => setForm({ ...form, acAllocRemark: e.target.value })}
                />
              </Form.Item>
              <Form.Item label="?????? ?????? ????????????">
                <Input
                  name="acRemark"
                  value={form.acRemark}
                  onChange={e => setForm({ ...form, acRemark: e.target.value })}
                />
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
export default RiderRegister;
