/* eslint-disable */
/* eslint-disable */
import * as React from "react";
import "./CallSignPopup.css";
import { useState, useCallback, useEffect } from "react";
import {
  Form,
  Radio,
  Button,
  Input,
  Col,
  Row,
  message,
  Checkbox,
  Collapse,
  Popconfirm,
  AutoComplete,
} from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import DaumPostcode from "react-daum-postcode";
import axios, { AxiosError } from "axios";
import NumberFormat, { NumberFormatValues } from "react-number-format";

import "./Popup.css";
import styled from "styled-components";
import LoginHelper from "src/pages/shared/LoginHelper";
import SearchAddressType from "../../helpers/SearchAddressType";
import { CallInfo } from "../CallList/CallListComponent";
import DirectDispatch from "../CallList/DirectDispatch";
import Stopover1 from "./Stopover1";
import Stopover2 from "./Stopover2";
import { RiderInfo } from "../shop/types";
import ErrandAllocType from "src/helpers/ErrandAllocType";
import AddressAPIService from "src/util/kakao";
import DistanceHelper from "src/helpers/DistanceHelper";
import { costFormat } from "src/util/FormatUtil";
import {
  ErrandFeeType,
  ErrandType,
  IErrandOrderRequest,
  PaymentMode,
} from "../../domain/Errand/model";
import { Place } from "../Place";
import { IPlace } from "../Place/Place";

interface Props {
  callInfo: CallInfo | undefined;
  stForceDispatchRider: RiderInfo;
}
const { Panel } = Collapse;
const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};

const Popup = (props: Props) => {
  const [form, setForm] = useState<IErrandOrderRequest>({
    ucAreaNo: 0,
    ucDistribId: 0,
    ucAgencyId: 0,
    ucMemCourId: 0,
    ucErrandType: ErrandType.DIFFERENT_DESTINATION,

    // 출발지
    acOriginCompany: "",
    acOriginCellNo: "",
    acOriginMemo: "",
    ulOriginLatiPos: 0,
    ulOriginLongPos: 0,
    acOriginOldAddr: "",
    acOriginNewAddr: "",
    acOriginAddrDesc: "",

    // 목적지
    acDestCompany: "",
    acDestCellNo: "",
    acDestMemo: "",
    ulDestLatiPos: 0,
    ulDestLongPos: 0,
    acDestOldAddr: "",
    acDestNewAddr: "",
    acDestAddrDesc: "",

    ucLimitTime: 0,
    ucPaymentMode: PaymentMode.UNDEFINED,
    ucErrandFeeType: ErrandFeeType.AMOUNT,
    ulErrandFeeAmount: 0,
    ucErrandFeeRate: 0,
    ulErrandCharge: 0,
    ulGoodsPrice: 0,
    ucErrandSettlementType: 0,
    ucAllocType: ErrandAllocType.NORMAL,
    ucTripType: 0,
    ulErrandFeeAgency: 0,
    ulErrandDispatchAgencyFee: 0,

    // 경유지
    acStop1Company: "",
    acStop1CellNo: "",
    acStop1Memo: "",
    ulStop1LatiPos: 0,
    ulStop1LongPos: 0,
    acStop1OldAddr: "",
    acStop1NewAddr: "",
    acStop1AddrDesc: "",

    acStop2Company: "",
    acStop2CellNo: "",
    acStop2Memo: "",
    ulStop2LatiPos: 0,
    ulStop2LongPos: 0,
    acStop2OldAddr: "",
    acStop2NewAddr: "",
    acStop2AddrDesc: "",

    ucAcptAreaNo: 0,
    ucAcptDistribId: 0,
    ucAcptAgencyId: 0,
    ucAcptMemCourId: 0,
  });
  const [stForceDispatchRider, setStForceDispatchRider] = useState<RiderInfo | null>(null);

  // 로컬에서만 보여주는 겉값
  const [ulCalculatedErrandFeeAgency, setUlCalculatedErrandFeeAgency] = useState<number>(0);
  const [ulCalculatedRiderFee, setUlCalculatedRiderFee] = useState<number>(0);
  const [acOriginToDestDistance, setAcOriginToDestDistance] = useState<string>("");

  const ensureValidData = () => {
    if (!form) {
      throw new Error("데이터를 찾지 못했습니다");
    }

    if (form.ucErrandType === ErrandType.DIFFERENT_DESTINATION) {
      if (!form.acOriginCompany) {
        throw new Error("픽업지 업체명을 입력하세요");
      } else if (!form.acOriginCellNo) {
        throw new Error("픽업지 연락처를 입력하세요");
      } else if (!form.ulOriginLatiPos) {
        throw new Error("픽업지 주소를 입력하세요");
      }
    }

    if (!form.acDestCompany) {
      throw new Error("목적지 업체명을 입력하세요");
    }
    if (!form.acDestCellNo) {
      throw new Error("목적지 연락처를 입력하세요");
    }
    if (!form.ulDestLatiPos) {
      throw new Error("목적지 주소를 입력하세요");
    }
    if (!form.ucPaymentMode) {
      throw new Error("결제유형을 선택하세요");
    }
    if (form.ucPaymentMode === PaymentMode.CASH && form.ulGoodsPrice < 0) {
      throw new Error("현금결제금액은 0원보다 작을 수 없습니다");
    }
    if (!form.ucTripType || form.ucTripType === 0) {
      throw new Error("주행유형을 선택하세요");
    }
    if (!form.ucErrandSettlementType || form.ucErrandSettlementType === 0) {
      throw new Error("정산유형을 선택하세요");
    }
    if (!form.ucErrandFeeType) {
      throw new Error("대행 수수료를 선택하세요");
    }
    if (form.ucErrandFeeType === ErrandFeeType.AMOUNT && form.ulErrandFeeAmount < 0) {
      throw new Error("대행수수료(정액제)는 0원보다 작을 수 없습니다");
    }
    if (form.ucErrandFeeType === ErrandFeeType.RATE && form.ucErrandFeeRate < 0) {
      throw new Error("대행수수료(정률제)는 0%보다 작을 수 없습니다");
    }
    if (form.ucErrandFeeType === ErrandFeeType.RATE && form.ucErrandFeeRate > 100) {
      throw new Error("대행수수료(정률제)는 100%보다 클 수 없습니다");
    }
    if (
      form.ucErrandFeeType === ErrandFeeType.AMOUNT &&
      form.ulErrandFeeAmount > form.ulErrandCharge
    ) {
      throw new Error("대행수수료는 배달비보다 클 수 없습니다");
    }
  };

  const executeCreateOrder = async () => {
    try {
      ensureValidData();

      const response = await axios({
        method: "post",
        url: "https://api.roadvoy.net/agency/errand/execute-command/create-order.php",
        data: form,
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });
      console.log(response);
      window.close();
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const handleClickSwap = () => {
    setForm({
      ...form,

      acOriginCompany: form.acDestCompany,
      acOriginCellNo: form.acDestCellNo,
      acOriginMemo: form.acDestMemo,
      ulOriginLatiPos: form.ulDestLatiPos,
      ulOriginLongPos: form.ulDestLongPos,
      acOriginOldAddr: form.acDestOldAddr,
      acOriginNewAddr: form.acDestNewAddr,
      acOriginAddrDesc: form.acDestAddrDesc,

      acDestCompany: form.acOriginCompany,
      acDestCellNo: form.acOriginCellNo,
      acDestMemo: form.acOriginMemo,
      ulDestLatiPos: form.ulOriginLatiPos,
      ulDestLongPos: form.ulOriginLongPos,
      acDestOldAddr: form.acOriginOldAddr,
      acDestNewAddr: form.acOriginNewAddr,
      acDestAddrDesc: form.acOriginAddrDesc,
    });
  };

  const handleClickCancelSelectDispatchRider = () => {
    // setUcAllocType(ErrandAllocType.NORMAL), setStForceDispatchRider(null);
  };

  let forceAllocRiderBody;
  if (stForceDispatchRider) {
    forceAllocRiderBody = (
      <span onClick={handleClickCancelSelectDispatchRider}>
        <span>{stForceDispatchRider.acPresident}</span>
        <CloseCircleTwoTone twoToneColor="#ff0000" style={{ paddingLeft: "5px" }} />
      </span>
    );
  }

  useEffect(() => {
    if (form.ucErrandType !== ErrandType.DIFFERENT_DESTINATION) {
      setAcOriginToDestDistance("");
      return;
    }

    if (form.ulOriginLatiPos === 0) {
      setAcOriginToDestDistance("");

      return;
    }

    if (form.ulDestLatiPos === 0) {
      setAcOriginToDestDistance("");
      return;
    }

    setAcOriginToDestDistance(
      DistanceHelper.getDistanceText(
        form.ulOriginLatiPos,
        form.ulOriginLongPos,
        form.ulDestLatiPos,
        form.ulDestLongPos
      )
    );
  }, [form.ulOriginLatiPos, form.ulDestLatiPos]);

  // 분할결제 선지급액
  /*let splitAdvancePayment;
  if (ucPaymentMode === PaymentMode.INSTALLMENT_PAYMENT) {
    splitAdvancePayment = ulErrandCharge - ulSplitPrePayment;
  }*/

  useEffect(() => {
    if (form.ucErrandFeeType != ErrandFeeType.RATE) {
      setForm({
        ...form,
        ucErrandFeeRate: 0,
      });
    }
    if (form.ucErrandFeeType != ErrandFeeType.AMOUNT) {
      setForm({
        ...form,
        ulErrandFeeAmount: 0,
      });
    }
  }, [form.ucErrandFeeType]);

  useEffect(() => {
    if (form.ucErrandFeeType == ErrandFeeType.AMOUNT) {
      setUlCalculatedErrandFeeAgency(form.ulErrandFeeAmount);
    } else {
      setUlCalculatedErrandFeeAgency((form.ulErrandCharge * form.ucErrandFeeRate) / 100);
    }
  }, [form.ulErrandFeeAmount, form.ulErrandCharge, form.ucErrandFeeRate, form.ucErrandFeeType]);

  useEffect(() => {
    setUlCalculatedRiderFee(form.ulErrandCharge - ulCalculatedErrandFeeAgency);
  }, [form.ulErrandCharge, ulCalculatedErrandFeeAgency]);

  // 정액제
  useEffect(() => {
    if (form.ulErrandFeeAmount > form.ulErrandCharge) {
      alert("배달비용 금액보다 클 수 없습니다.");
    }
  }, [form.ulErrandFeeAmount]);

  // 정률제
  useEffect(() => {
    if (form.ucErrandFeeRate > 100) {
      alert("100% 보다 클 수 없습니다.");
    }
  }, [form.ucErrandFeeRate]);

  useEffect(() => {
    if (form.ucErrandType === ErrandType.SAME) {
      setForm({
        ...form,
        acOriginCompany: "",
        acOriginCellNo: "",
        acOriginMemo: "",
        ulOriginLatiPos: 0,
        ulOriginLongPos: 0,
        acOriginOldAddr: "",
        acOriginNewAddr: "",
        acOriginAddrDesc: "",
      });
    }
  }, [form.ucErrandType]);

  return (
    <>
      <Row style={{ borderBottom: "1px solid #f5f5f5" }}>
        <TitleCol>심부름 접수</TitleCol>
      </Row>
      <Row>
        <Col span={12}>
          <Form
            name="validate_other"
            {...formItemLayout}
            initialValues={{
              "input-number": 3,
              "checkbox-group": ["A", "B"],
              rate: 3.5,
            }}
          >
            <Form.Item label="접수 번호" />
            <Form.Item label="심부름 종류">
              <Col style={{ textAlign: "left" }}>
                <Checkbox
                  style={{ paddingRight: "10px" }}
                  onChange={e => {
                    setForm({
                      ...form,
                      ucErrandType: e.target.checked
                        ? ErrandType.SAME
                        : ErrandType.DIFFERENT_DESTINATION,
                    });
                  }}
                  checked={form.ucErrandType === ErrandType.SAME}
                />
                <span>
                  <span>바로목적지로</span>
                  <Button onClick={handleClickSwap} style={{ float: "right" }}>
                    픽업지 ↔ 목적지
                  </Button>
                </span>
              </Col>
            </Form.Item>
            <Place
              prefix="픽업지"
              place={{
                acCompany: form.acOriginCompany,
                acCellNo: form.acOriginCellNo,
                acMemo: form.acOriginMemo,
                ulLatiPos: form.ulOriginLatiPos,
                ulLongPos: form.ulOriginLongPos,
                acOldAddress: form.acOriginOldAddr,
                acNewAddress: form.acOriginNewAddr,
                acAddressDesc: form.acOriginAddrDesc,
              }}
              onChange={(place: IPlace) => {
                setForm({
                  ...form,
                  acOriginCompany: place.acCompany,
                  acOriginCellNo: place.acCellNo,
                  acOriginMemo: place.acMemo,
                  ulOriginLatiPos: place.ulLatiPos,
                  ulOriginLongPos: place.ulLongPos,
                  acOriginOldAddr: place.acOldAddress,
                  acOriginNewAddr: place.acNewAddress,
                  acOriginAddrDesc: place.acAddressDesc,
                });
              }}
            />

            <div style={{ textAlign: "center" }}>
              <Collapse ghost>
                <Panel
                  header={
                    <Button disabled={form.ucErrandType === ErrandType.SAME}>경유지 추가 1</Button>
                  }
                  key="1"
                  showArrow={false}
                >
                  {/*
                  <Stopover1 callInfo={props.callInfo} />                  
                  */}
                </Panel>
              </Collapse>
              <Collapse ghost>
                <Panel
                  header={
                    <Button disabled={form.ucErrandType === ErrandType.SAME}>경유지 추가 2</Button>
                  }
                  key="2"
                  showArrow={false}
                >
                  {/*
                  <Stopover2 callInfo={props.callInfo} />*/}
                </Panel>
              </Collapse>
            </div>
            <Place
              prefix="목적지"
              place={{
                acCompany: form.acDestCompany,
                acCellNo: form.acDestCellNo,
                acMemo: form.acDestMemo,
                ulLatiPos: form.ulDestLatiPos,
                ulLongPos: form.ulDestLongPos,
                acOldAddress: form.acDestOldAddr,
                acNewAddress: form.acDestNewAddr,
                acAddressDesc: form.acDestAddrDesc,
              }}
              onChange={(place: IPlace) => {
                setForm({
                  ...form,
                  acDestCompany: place.acCompany,
                  acDestCellNo: place.acCellNo,
                  acDestMemo: place.acMemo,
                  ulDestLatiPos: place.ulLatiPos,
                  ulDestLongPos: place.ulLongPos,
                  acDestOldAddr: place.acOldAddress,
                  acDestNewAddr: place.acNewAddress,
                  acDestAddrDesc: place.acAddressDesc,
                });
              }}
            />

            <Form.Item label="픽업 ↔ 목적지">
              <span className="originToDestDistance">{acOriginToDestDistance}</span>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} pull={1}>
          <Form
            name="validate_other"
            {...formItemLayout}
            initialValues={{
              "input-number": 3,
              "checkbox-group": ["A", "B"],
              rate: 3.5,
            }}
          >
            <Form.Item label="제한시간">
              <Radio.Group
                value={form.ucLimitTime}
                onChange={e =>
                  setForm({
                    ...form,
                    ucLimitTime: parseInt(e.target.value),
                  })
                }
                style={{ width: "100%" }}
              >
                <Row>
                  <LeftAlignedCol span={20}>
                    <Radio value={0}>즉시</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={10}>10분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={15}>15분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={20}>20분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={30}>30분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={40}>40분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={50}>50분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={60}>60분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={90}>90분</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={120}>120분</Radio>
                  </LeftAlignedCol>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="주행유형">
              <Radio.Group
                value={form.ucTripType}
                onChange={e =>
                  setForm({
                    ...form,
                    ucTripType: parseInt(e.target.value),
                  })
                }
                style={{ float: "left", width: "100%" }}
              >
                <Row>
                  <LeftAlignedCol span={8}>
                    <Radio value={1}>편도</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={2}>왕복</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={3}>경유</Radio>
                  </LeftAlignedCol>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="결제유형">
              <Radio.Group
                name="ucPaymentMode"
                value={form.ucPaymentMode}
                onChange={e =>
                  setForm({
                    ...form,
                    ucPaymentMode: parseInt(e.target.value),
                  })
                }
                style={{ float: "left", width: "100%" }}
              >
                <Row>
                  <LeftAlignedCol span={8}>
                    <Radio value={3}>현금</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={4}>선결제</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={5}>분할결제</Radio>
                  </LeftAlignedCol>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="물건가격">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                name="ulGoodsPrice"
                onValueChange={(value: NumberFormatValues) => {
                  setForm({
                    ...form,
                    ulGoodsPrice: parseInt(value.value),
                  });
                }}
                thousandSeparator={true}
                maxLength={10}
                value={form.ulGoodsPrice}
                suffix=" 원"
              />
            </Form.Item>

            <Form.Item label="배달비용">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                onValueChange={(value: NumberFormatValues) => {
                  setForm({
                    ...form,
                    ulErrandCharge: parseInt(value.value),
                  });
                }}
                suffix=" 원"
                value={form.ulErrandCharge}
                maxLength={9}
              />
            </Form.Item>

            <Form.Item label="정산유형">
              <Radio.Group
                value={form.ucErrandSettlementType}
                onChange={e => {
                  setForm({
                    ...form,
                    ucErrandSettlementType: parseInt(e.target.value),
                  });
                }}
                style={{ float: "left", width: "100%" }}
              >
                <Row>
                  <LeftAlignedCol span={8}>
                    <Radio value={1}>수기정산</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={2}>자동정산</Radio>
                  </LeftAlignedCol>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="대행 수수료">
              <Radio.Group
                value={form.ucErrandFeeType}
                onChange={e => {
                  setForm({
                    ...form,
                    ucErrandFeeType: parseInt(e.target.value),
                  });
                }}
                style={{ float: "left", width: "100%" }}
              >
                <Row>
                  <LeftAlignedCol span={8}>
                    <Radio value={1}>정액제</Radio>
                  </LeftAlignedCol>
                  <LeftAlignedCol span={8}>
                    <Radio value={2}>정률제</Radio>
                  </LeftAlignedCol>
                </Row>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="정액제(원)">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                onValueChange={(value: NumberFormatValues) => {
                  setForm({
                    ...form,
                    ulErrandFeeAmount: parseInt(value.value),
                  });
                }}
                disabled={form.ucErrandFeeType !== ErrandFeeType.AMOUNT}
                suffix=" 원"
                value={form.ulErrandFeeAmount}
              />
            </Form.Item>

            <Form.Item label="정률제(%)">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                name="ucErrandFeeRate"
                onValueChange={(value: NumberFormatValues) => {
                  setForm({
                    ...form,
                    ucErrandFeeRate: parseInt(value.value),
                  });
                }}
                disabled={form.ucErrandFeeType !== ErrandFeeType.RATE}
                suffix=" %"
                value={form.ucErrandFeeRate}
              />
            </Form.Item>
            <Form.Item label="배차대행 수수료" name="ulErrandFeeAgency">
              <span style={{ paddingRight: "11px" }}>
                {costFormat(ulCalculatedErrandFeeAgency)}
              </span>
            </Form.Item>

            <Form.Item label="배달기사 수수료" name="ulErrandFeeCourier">
              <span style={{ paddingRight: "11px" }}>{costFormat(ulCalculatedRiderFee)}</span>
            </Form.Item>

            <Form.Item label="타사지급 수수료">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                onValueChange={(value: NumberFormatValues) => {
                  const val = parseInt(value.value);
                  if (val > form.ulErrandCharge) {
                    alert("배달비용 금액보다 클 수 없습니다.");
                    return;
                  }

                  setForm({
                    ...form,
                    ulErrandDispatchAgencyFee: val,
                  });
                }}
                suffix=" 원"
                value={form.ulErrandDispatchAgencyFee}
              />
            </Form.Item>
            {/*
            <Form.Item label="직권배차">
              {forceAllocRiderBody}
              <Button
                type={isDispatchListVisible ? "ghost" : "primary"}
                block
                onClick={() => {
                  setIsDispatchListVisible(!isDispatchListVisible);
                }}
                style={{ width: "100%" }}
              >
                {isDispatchListVisible ? "닫기" : "기사선택"}
              </Button>
              {isDispatchListVisible ? (
                <DirectDispatch
                  beforeOrderDispatch
                  onSelectedBeforeDispatchRider={rider => {
                    setIsDispatchListVisible(false);
                    setStForceDispatchRider(rider);
                    setUcAllocType(ErrandAllocType.FORCE_DISPATCH);
                  }}
                />
              ) : (
                <></>
              )}*/}
            <Row style={{ float: "right" }}>
              <Popconfirm
                title="심부름을 접수하시겠습니까?"
                okText="네"
                cancelText="아니요"
                onConfirm={executeCreateOrder}
              >
                <Button style={{ marginTop: "30px" }} type="ghost">
                  접수
                </Button>
              </Popconfirm>
            </Row>
          </Form>
        </Col>
      </Row>
    </>
  );
};
export default Popup;
const LeftAlignedCol = styled(Col)`
  text-align: left;
`;
const TitleCol = styled(Col)`
  font-size: 3vh;
  padding: 5px 20px 15px 20px;
`;
