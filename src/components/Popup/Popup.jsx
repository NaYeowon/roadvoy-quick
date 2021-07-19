/* eslint-disable */
import * as React from "react";
import { useState, useCallback, useEffect } from "react";
import { Checkbox } from "@material-ui/core";
import { Form, Select, Radio, Button, Input, Col, Row, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import DaumPostcode from "react-daum-postcode";
import axios from "axios";

import styled from "styled-components";
import APIHelper from "src/helpers/APIHelper";
import LoginHelper from "src/pages/shared/LoginHelper";
import { transpileModule } from "typescript";
import PaymentMode from "../../helpers/PaymentMode";
import SearchAddressType from "../../helpers/SearchAddressType";

const { Search } = Input;
const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const modalStyle = {
  position: "absolute",
  top: 0,
  left: "-100px",
  zIndex: "100",
  border: "1px solid #000000",
  overflow: "hidden"
};

const Popup = () => {
  const [fullAddress, setFullAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [isDaumPost, setIsDaumPost] = useState(false);

  const [fullAddress2, setFullAddress2] = useState("");
  const [zoneCode2, setZoneCode2] = useState("");
  const [isDaumPost2, setIsDaumPost2] = useState(false);

  useEffect(() => {
    //console.log("useEffect");
    window.onkeydown = e => {
      console.log(e);
      if (e.key === "Escape") {
        //console.log(e.key);
        setIsDaumPost(false);
        setIsDaumPost2(false);
      }
    };
  }, []);

  const onFinish = values => {
    //console.log("Received values of form: ", values);
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
      AllAddress += extraAddress !== "" ? `(${extraAddress})` : "";
    }

    setFullAddress(AllAddress);
    setZoneCode(zoneCodes);
    setIsDaumPost(false);
  };

  const handleAddress2 = data => {
    let AllAddress2 = data.address;
    let extraAddress2 = "";
    const zoneCodes2 = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress2 += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress2 += extraAddress2 !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress2 += extraAddress2 !== "" ? `(${extraAddress2})` : "";
    }

    setFullAddress2(AllAddress2);
    setZoneCode2(zoneCodes2);
    setIsDaumPost2(false);
  };

  const handleOpenPost = useCallback(() => {
    setIsDaumPost(true);
  }, []);

  const handleOpenPost2 = useCallback(() => {
    setIsDaumPost2(true);
  }, []);

  const test = () => {
    console.log("asd");
  };

  // const LimitTime = ({ time }) => (
  //   <LeftAlignedCol span={8}>
  //     <Radio value={time}>{time}</Radio>
  //   </LeftAlignedCol>
  // );

  // const LimitTimes = [
  //   "즉시",
  //   "5분",
  //   "15분",
  //   "10분",
  //   "20분",
  //   "30분",
  //   "40분",
  //   "50분",
  //   "60분",
  //   "90분",
  //   "120분"
  // ];

  const [acOriginCompany, setAcOriginCompany] = useState("");
  const [acOriginCellNo, setAcOriginCellNo] = useState("");
  const [acOriginMemo, setAcOriginMemo] = useState("");
  const [ulOriginLatiPos, setUlOriginLatiPos] = useState("");
  const [ulOriginLongPos, setUlOriginLongPos] = useState("");
  const [acOriginOldAddr, setAcOriginOldAddr] = useState("");
  const [acOriginNewAddr, setAcOriginNewAddr] = useState("");
  const [acOriginAddrDesc, setAcOriginAddrDesc] = useState("");

  const [ucAreaNo, setUcAreaNo] = useState("");
  const [ucDistribId, setUcDistribId] = useState("");
  const [ucAgencyId, setUcAgencyId] = useState("");
  const [ucMemCourId, setUcMemCourId] = useState("");
  const [ucErrandType, setUcErrandType] = useState(1);

  const [acDestCompany, setAcDestCompany] = useState("");
  const [acDestCellNo, setAcDestCellNo] = useState("");
  const [acDestMemo, setDestMemo] = useState("");
  const [ulDestLatiPos, setUlDestLatiPos] = useState("");
  const [ulDestLongPos, setUlDestLongPos] = useState("");
  const [acDestOldAddr, setAcDestOldAddr] = useState("");
  const [acDestNewAddr, setAcDestNewAddr] = useState("");
  const [acDestAddrDesc, setAcDestAddrDesc] = useState("");
  const [ucLimitTime, setUcLimitTime] = useState("");
  const [ucPaymentMode, setUcPaymentMode] = useState("");
  const [ucErrandFeeType, setUcErrandFeeType] = useState(1);
  const [ulErrandFeeAmount, setUlErrandFeeAmount] = useState(1);
  const [ucErrandFeeRate, setUcErrandFeeRate] = useState(0);
  const [ulErrandCharge, setUlErrandCharge] = useState(0);
  const [ulGoodsPrice, setUlGoodsPrice] = useState(1);
  const [ucErrandSettlementType, setUcErrandSettlementType] = useState(1);
  //const [ucAllocType, setUcAllocType] = useState(1);
  const [ucTripType, setUcTripType] = useState("");

  const CallSign = async () => {
    const form = new FormData();

    form.append("ucAreaNo", Number(ucAreaNo));
    form.append("ucDistribId", Number(ucDistribId));
    form.append("ucAgencyId", Number(ucAgencyId));
    form.append("ucMemCourId", Number(ucMemCourId));
    form.append("ucErrandType", Number(ucErrandType));
    form.append("acDestCellNo", acDestCellNo);
    form.append("acDestCompany", acDestCompany);
    form.append("acDestMemo", acDestMemo);

    form.append("acOriginCompany", acOriginCompany);
    form.append("acOriginCellNo", acOriginCellNo);
    form.append("acOriginMemo", acOriginMemo);
    form.append("ulOriginLatiPos", Number(ulOriginLatiPos));
    form.append("ulOriginLongPos", Number(ulOriginLongPos));
    form.append("acOriginOldAddr", acOriginOldAddr);
    form.append("acOriginNewAddr", acOriginNewAddr);
    form.append("acOriginAddrDesc", acOriginAddrDesc);

    form.append("ulDestLatiPos", Number(ulDestLatiPos));
    form.append("ulDestLongPos", Number(ulDestLongPos));
    form.append("acDestOldAddr", acDestOldAddr);
    form.append("acDestNewAddr", acDestNewAddr);
    form.append("acDestAddrDesc", acDestAddrDesc);

    form.append("ucLimitTime", Number(ucLimitTime));
    form.append("ucPaymentMode", Number(ucPaymentMode));
    form.append("ucErrandFeeType", Number(ucErrandFeeType));
    form.append("ulErrandFeeAmount", Number(ulErrandFeeAmount));
    form.append("ucErrandFeeRate", Number(ucErrandFeeRate));
    form.append("ulErrandCharge", Number(ulErrandCharge));
    form.append("ulGoodsPrice", Number(ulGoodsPrice));
    form.append("ucErrandSettlementType", Number(ucErrandSettlementType));
    //form.append("ucAllocType", Number(ucAllocType));
    form.append("ucTripType", Number(ucTripType));

    try {
      const response = await axios({
        method: "post",
        url: "https://api.roadvoy.net/agency/errand/order.v3.php",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });
      console.log(response);
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <>
      <Row>
        <Col span={12}>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              "input-number": 3,
              "checkbox-group": ["A", "B"],
              rate: 3.5
            }}
          >
            <Form.Item label="심부름 종류">
              <Col style={{ textAlign: "left" }}>
                <Checkbox /> 바로목적지로
              </Col>
            </Form.Item>

            <Form.Item label="픽업지 업체명">
              <Input
                placeholder="업체명을 입력하세요"
                value={acOriginCompany}
                name="acOriginCompany"
                onChange={e => {
                  setAcOriginCompany(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="픽업지 연락처">
              <Input
                placeholder="연락처를 입력하세요"
                value={acOriginCellNo}
                name="acOriginCellNo"
                onChange={e => {
                  setAcOriginCellNo(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="픽업지 주소">
              <Button
                type="primary"
                onClick={() => handleOpenPost(SearchAddressType.ERRAND_ORIGIN)}
                style={{ width: "100%" }}
                name={acOriginNewAddr}
                value={acOriginAddrDesc}
              >
                주소검색
              </Button>
              {isDaumPost ? (
                <DaumPostcode
                  onComplete={handleAddress}
                  autoClose
                  width={595}
                  height={450}
                  style={modalStyle}
                  isDaumPost={isDaumPost}
                  key={test}
                />
              ) : null}
              <div>{fullAddress}</div>
            </Form.Item>

            <Form.Item label="픽업지 상세주소">
              <Input
                placeholder="상세주소를 입력하세요"
                value={acOriginAddrDesc}
                name="acOriginAddrDesc"
                onChange={e => {
                  setAcOriginAddrDesc(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item label="픽업지 요청사항">
              <TextArea
                rows={2}
                value={acOriginMemo}
                name="acOriginMemo"
                onChange={e => {
                  setAcOriginMemo(e.target.value);
                }}
              />
            </Form.Item>
            <div style={{ backgroundColor: "#fff280" }}>
              <Form.Item label="목적지 업체명">
                <Input
                  placeholder="업체명을 입력하세요"
                  name="acDestCompany"
                  value={acDestCompany}
                  onChange={e => {
                    setAcDestCompany(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="목적지 연락처">
                <Input
                  placeholder="연락처를 입력하세요"
                  name="acDestCellNo"
                  value={acDestCellNo}
                  onChange={e => {
                    setAcDestCellNo(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="목적지 주소">
                <Button
                  type="primary"
                  block
                  onChange={e => {
                    setAcDestOldAddr(e.target.value);
                  }}
                  style={{ width: "100%" }}
                  name="acDestOldAddr"
                  value={acDestOldAddr}
                >
                  주소검색
                </Button>
                {isDaumPost2 ? (
                  <DaumPostcode
                    onComplete={handleAddress2}
                    autoClose
                    width={595}
                    height={450}
                    style={modalStyle}
                    isDaumPost2={isDaumPost2}
                    key={test}
                  />
                ) : null}
                <div>{fullAddress2}</div>
              </Form.Item>

              <Form.Item label="목적지 상세주소">
                <Input
                  placeholder="상세주소를 입력하세요"
                  name="acDestAddrDesc"
                  value={acDestAddrDesc}
                  onChange={e => {
                    setAcDestAddrDesc(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item label="목적지 요청사항">
                <TextArea
                  rows={2}
                  name="acClientMemo"
                  onChange={e => {
                    setDestMemo(e.target.value);
                  }}
                  value={acDestMemo}
                />
              </Form.Item>
            </div>
            <Form.Item label="픽업 ↔ 목적지">
              <span>
                <b />
              </span>
            </Form.Item>
          </Form>
        </Col>
        <Col span={12} pull={1}>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              "input-number": 3,
              "checkbox-group": ["A", "B"],
              rate: 3.5
            }}
          >
            <Form.Item label="제한시간">
              <Radio.Group
                style={{ float: "left" }}
                value={ucLimitTime}
                name="ucLimitTime"
                onChange={e => setUcLimitTime(e.target.value)}
              >
                <Row>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={0}>즉시</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={10}>10분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={15}>15분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={20}>20분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={30}>30분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={40}>40분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={50}>50분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={60}>60분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={90}>90분</Radio>
                  </Col>
                  <Col span={8} style={{ textAlign: "left" }}>
                    <Radio value={120}>120분</Radio>
                  </Col>
                </Row>
                {/* <Row>
                  {LimitTimes.map((limitTime, index) => (
                    <LimitTime key={index} time={limitTime} />
                  ))}
                </Row> */}
              </Radio.Group>
            </Form.Item>

            <Form.Item name="" label="주행유형">
              <Radio.Group
                style={{ float: "left" }}
                name="ucTripType"
                value={ucTripType}
                buttonStyle="solid"
                onChange=""
              >
                <Radio value={1}>편도</Radio>
                <Radio value={2}>왕복</Radio>
                <Radio value={3}>경유</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="결제유형">
              <Radio.Group
                name="ucPaymentMode"
                value={ucPaymentMode}
                onChange={e => setUcPaymentMode(e.target.value)}
                style={{ float: "left" }}
              >
                <Radio value={3}>현금</Radio>
                <Radio value={4}>선결제</Radio>
                <Radio value={5}>후결제</Radio>
                <Radio value={6}>분할</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="현금결제금액">
              <Input
                style={{ width: "50%", float: "left" }}
                placeholder="0"
                type="number"
                name={ulGoodsPrice}
                onChange={e => {
                  setUlGoodsPrice(e.target.value);
                }}
                disabled={ucPaymentMode !== PaymentMode.CASH}
              />
            </Form.Item>

            <Form.Item label="배달비">
              <Input
                style={{ width: "50%", float: "left" }}
                placeholder="0"
                type="number"
                name={ulErrandCharge}
                onChange={e => {
                  setUlErrandCharge(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item name="" label="정산유형">
              <Radio.Group
                style={{ float: "left" }}
                name="ucErrandSettlementType"
                value={ucErrandSettlementType}
                onChange={e => {
                  setUcErrandSettlementType(e.target.value);
                }}
              >
                <Radio value={1}>수기정산</Radio>
                <Radio value={2}>자동정산</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item name="" label="대행 수수료">
              <Radio.Group
                style={{ float: "left" }}
                name="ucErrandFeeType"
                value={ucErrandFeeType}
                onChange={e => {
                  setUcErrandFeeType(e.target.value);
                }}
              >
                <Radio value={1}>수수료 금액</Radio>
                <Radio value={2}>수수료 율(%)</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item label="수수료(원)">
              <Input
                style={{ width: "50%", float: "left" }}
                placeholder="0"
                type="number"
                value=""
                onChange=""
                disabled=""
              />
            </Form.Item>

            <Form.Item label="수수료 율(%)">
              <Input
                style={{ width: "50%", float: "left" }}
                placeholder="0"
                type="number"
                value=""
                onChange=""
                disabled=""
              />
            </Form.Item>

            <Form.Item label="배차대행 수수료">
              <Input
                style={{ width: "50%", float: "left" }}
                placeholder="0"
                type="number"
                value=""
                onChange=""
              />
            </Form.Item>

            <Form.Item label="직권배차">
              <Button type="primary" type="submit" style={{ width: "100%" }}>
                기사선택
              </Button>
              <Row style={{ float: "right" }}>
                <Button style={{ marginTop: "30px" }} type="submit" onClick={CallSign}>
                  접수
                </Button>
              </Row>
            </Form.Item>
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
