/* eslint-disable */
import { Button, Checkbox, Col, Form, Input, Radio, Row } from "antd";
import Modal from "antd/lib/modal/Modal";
import React, { useCallback, useEffect, useState, FC } from "react";
import ErrandType from "src/helpers/ErrandType";
import { CallInfo } from "./CallListComponent";
import SearchAddressType from "../../helpers/SearchAddressType";
import DaumPostcode from "react-daum-postcode";
import TextArea from "antd/lib/input/TextArea";
import styled from "styled-components";
import PaymentMode from "src/helpers/PaymentMode";
import ErrandFeeType from "src/helpers/ErrandFeeType";
import { Script } from "vm";

const formItemLayout = {
  labelCol: {
    span: 7
  },
  wrapperCol: {
    span: 14
  }
};

const modalStyle: React.CSSProperties = {
  position: "absolute",
  top: 35,
  left: "-100px",
  zIndex: 100,
  border: "1px solid #000000",
  overflow: "hidden"
};
interface Props {
  fullAddress?: string;
  zoneCode?: number;
  visible: boolean | undefined;
  onOk: () => void;
  onCancel: () => void;
  callInfo: CallInfo | undefined;
}
const CallModify: FC<Props> = (props: Props) => {
  const { visible, onOk, onCancel, callInfo } = props;

  const [fullAddress, setFullAddress] = useState(props.fullAddress);
  const [zoneCode, setZoneCode] = useState(props.zoneCode);
  const [isDaumPost, setIsDaumPost] = useState(false);

  const [fullAddress2, setFullAddress2] = useState("");
  const [zoneCode2, setZoneCode2] = useState("");
  const [isDaumPost2, setIsDaumPost2] = useState(false);

  const [isDispatchListVisible, setIsDispatchListVisible] = useState(false);

  const [acOriginCompany, setAcOriginCompany] = useState(callInfo?.acOriginCompany);
  const [acOriginCellNo, setAcOriginCellNo] = useState(callInfo?.acOriginCellNo);
  const [acOriginMemo, setAcOriginMemo] = useState(callInfo?.acOriginMemo);
  const [ulOriginLatiPos, setUlOriginLatiPos] = useState(callInfo?.ulOriginLatiPos);
  const [ulOriginLongPos, setUlOriginLongPos] = useState(callInfo?.ulOriginLongPos);
  const [acOriginOldAddr, setAcOriginOldAddr] = useState(callInfo?.acOriginOldAddr);
  const [acOriginNewAddr, setAcOriginNewAddr] = useState(callInfo?.acOriginNewAddr);
  const [acOriginAddrDesc, setAcOriginAddrDesc] = useState(callInfo?.acOriginAddrDesc);

  const [ucAreaNo, setUcAreaNo] = useState("");
  const [ucDistribId, setUcDistribId] = useState("");
  const [ucAgencyId, setUcAgencyId] = useState("");
  const [ucMemCourId, setUcMemCourId] = useState("");
  const [ucErrandType, setUcErrandType] = useState(callInfo?.ucErrandType);

  const [acDestCompany, setAcDestCompany] = useState(callInfo?.acDestCompany);
  const [acDestCellNo, setAcDestCellNo] = useState(callInfo?.acDestCellNo);
  const [acDestMemo, setAcDestMemo] = useState(callInfo?.acDestMemo);
  const [ulDestLatiPos, setUlDestLatiPos] = useState(callInfo?.ulDestLatiPos);
  const [ulDestLongPos, setUlDestLongPos] = useState(callInfo?.ulDestLongPos);
  const [acDestOldAddr, setAcDestOldAddr] = useState(callInfo?.acDestOldAddr);
  const [acDestNewAddr, setAcDestNewAddr] = useState(callInfo?.acDestNewAddr);
  const [acDestAddrDesc, setAcDestAddrDesc] = useState(callInfo?.acDestAddrDesc);
  const [ucLimitTime, setUcLimitTime] = useState(Number(callInfo?.ucLimitTime));
  const [ucPaymentMode, setUcPaymentMode] = useState(Number(callInfo?.ucPaymentMode));
  const [ucErrandFeeType, setUcErrandFeeType] = useState(Number(callInfo?.ucErrandFeeType));
  const [ulErrandFeeAmount, setUlErrandFeeAmount] = useState(callInfo?.ulErrandFeeAmount);
  const [ucErrandFeeRate, setUcErrandFeeRate] = useState(callInfo?.ucErrandFeeRate);
  const [ulErrandCharge, setUlErrandCharge] = useState(callInfo?.ulErrandCharge);
  const [ulGoodsPrice, setUlGoodsPrice] = useState(Number(callInfo?.ulGoodsPrice));
  const [ucErrandSettlementType, setUcErrandSettlementType] = useState(
    Number(callInfo?.ucErrandSettlementType)
  );
  const [ucAllocType, setUcAllocType] = useState(callInfo?.ucAllocType);
  const [ucTripType, setUcTripType] = useState(Number(callInfo?.ucTripType));
  const [ulErrandFeeAgency, setUlErrandFeeAgency] = useState(callInfo?.ulErrandFeeAgency);

  useEffect(() => {
    if (!callInfo) return;

    onInitail();
  }, [callInfo]);

  const onInitail = () => {
    setFullAddress(props.fullAddress);
    setZoneCode(props.zoneCode);

    setAcOriginCompany(callInfo?.acOriginCompany);
    setAcOriginCellNo(callInfo?.acOriginCellNo);
    setAcOriginMemo(callInfo?.acOriginMemo);
    setAcOriginNewAddr(callInfo?.acOriginNewAddr);
    setAcOriginAddrDesc(callInfo?.acOriginAddrDesc);
    setUlOriginLatiPos(callInfo?.ulOriginLatiPos);
    setUlOriginLongPos(callInfo?.ulOriginLongPos);

    setAcDestCompany(callInfo?.acDestCompany);
    setAcDestCellNo(callInfo?.acDestCellNo);
    setAcDestMemo(callInfo?.acDestMemo);
    setUlDestLatiPos(callInfo?.ulDestLatiPos);
    setUlDestLongPos(callInfo?.ulDestLongPos);
    setAcDestOldAddr(callInfo?.acDestOldAddr);
    setAcDestNewAddr(callInfo?.acDestNewAddr);
    setAcDestAddrDesc(callInfo?.acDestAddrDesc);
    setUcLimitTime(Number(callInfo?.ucLimitTime));
    setUcPaymentMode(Number(callInfo?.ucPaymentMode));
    setUcErrandFeeType(Number(callInfo?.ucErrandFeeType));
    setUlErrandFeeAmount(callInfo?.ulErrandFeeAmount);
    setUcErrandFeeRate(callInfo?.ucErrandFeeRate);
    setUlErrandCharge(callInfo?.ulErrandCharge);
    setUlGoodsPrice(Number(callInfo?.ulGoodsPrice));
    setUcErrandSettlementType(Number(callInfo?.ucErrandSettlementType));
    setUcTripType(Number(callInfo?.ucTripType));
  };

  const handleCancel = () => {
    onCancel();
    setIsDaumPost(false);
    setIsDaumPost2(false);
    onInitail();
  };
  const handleOk = () => {
    onOk();
    setIsDaumPost(false);
    setIsDaumPost2(false);
    onInitail();
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
    setAcDestOldAddr(AllAddress);
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
    setAcDestOldAddr(AllAddress2);
    setIsDaumPost2(false);
  };

  const handleOpenPost = useCallback((SearchAddressType: SearchAddressType) => {
    setIsDaumPost(!isDaumPost);
  }, []);

  const handleOpenPost2 = useCallback((SearchAddressType: SearchAddressType) => {
    setIsDaumPost2(!isDaumPost2);
  }, []);

  return (
    <div>
      <Modal
        width={1000}
        title="심부름 수정"
        visible={visible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Row>
          <Col span={12}>
            <Form
              name="validate_other"
              {...formItemLayout}
              initialValues={{
                "input-number": 3,
                "checkbox-group": ["A", "B"],
                rate: 3.5
              }}
            >
              <Form.Item label="심부름 종류">
                <Col style={{ textAlign: "left" }}>
                  <Checkbox
                    style={{ paddingRight: "10px" }}
                    onChange={e => {
                      setUcErrandType(
                        e.target.checked ? ErrandType.SAME : ErrandType.DIFFERENT_DESTINATION
                      );
                    }}
                    checked={ucErrandType === ErrandType.SAME}
                  />
                  바로목적지로
                </Col>
              </Form.Item>

              <Form.Item label="픽업지 업체명">
                <Input
                  placeholder="업체명을 입력하세요"
                  value={acOriginCompany}
                  name="acOriginCompany"
                  onChange={e => setAcOriginCompany(e.target.value)}
                  disabled={ucErrandType === ErrandType.SAME}
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
                  disabled={ucErrandType === ErrandType.SAME}
                />
              </Form.Item>

              <Form.Item label="픽업지 주소">
                <Button
                  type="primary"
                  //onClick={() => handleOpenPost(SearchAddressType.ERRAND_ORIGIN)}
                  onClick={() => {
                    setIsDaumPost(!isDaumPost);
                  }}
                  style={{ width: "100%" }}
                  name={acOriginNewAddr}
                  value={acOriginAddrDesc}
                  disabled={ucErrandType === ErrandType.SAME}
                >
                  주소검색
                </Button>
                <div>
                  {isDaumPost ? (
                    <DaumPostcode
                      onComplete={handleAddress}
                      autoClose
                      width={595}
                      height={450}
                      style={modalStyle}
                    />
                  ) : null}
                </div>
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
                  disabled={ucErrandType === ErrandType.SAME}
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
                  disabled={ucErrandType === ErrandType.SAME}
                />
              </Form.Item>
              <div style={{ backgroundColor: "#fff280" }}>
                <Form.Item label="목적지 업체명">
                  <Input
                    placeholder="업체명을 입력하세요"
                    name="acDestCompany"
                    value={acDestCompany}
                    onChange={e => setAcDestCompany(e.target.value)}
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
                    //onClick={() => handleOpenPost2(SearchAddressType.ERRAND_DEST)}
                    onClick={() => {
                      setIsDaumPost2(!isDaumPost2);
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
                    name="acDestMemo"
                    onChange={e => {
                      setAcDestMemo(e.target.value);
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
          <Col span={12} pull={1} style={{ right: "0px" }}>
            <Form
              name="validate_other"
              {...formItemLayout}
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
                  onChange={e => setUcLimitTime(Number(e.target.value))}
                >
                  <Row>
                    <LeftAlignedCol span={8}>
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
                  {/* <Row>
                  {LimitTimes.map((limitTime, index) => (
                    <LimitTime key={index} time={limitTime} />
                  ))}
                </Row> */}
                </Radio.Group>
              </Form.Item>

              <Form.Item label="주행유형">
                <Radio.Group
                  name="ucTripType"
                  value={ucTripType}
                  onChange={e => setUcTripType(Number(e.target.value))}
                  style={{ float: "left" }}
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
                  onChange={e => setUcPaymentMode(Number(e.target.value))}
                  style={{ textAlign: "left", width: "300px" }}
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
                  value={ulGoodsPrice}
                  onChange={e => setUlGoodsPrice(Number(e.target.value))}
                  disabled={ucPaymentMode !== PaymentMode.CASH}
                />
              </Form.Item>

              <Form.Item label="배달비">
                <Input
                  style={{ width: "50%", float: "left" }}
                  placeholder="0"
                  type="number"
                  value={ulErrandCharge}
                  onChange={e => {
                    setUlErrandCharge(parseInt(e.target.value));
                  }}
                />
              </Form.Item>

              <Form.Item label="정산유형">
                <Radio.Group
                  name="ucErrandSettlementType"
                  value={ucErrandSettlementType}
                  onChange={e => setUcErrandSettlementType(Number(e.target.value))}
                  style={{ float: "left" }}
                >
                  <Radio value={1}>수기정산</Radio>
                  <Radio value={2}>자동정산</Radio>
                </Radio.Group>
              </Form.Item>

              <Form.Item label="대행 수수료">
                <Radio.Group
                  name="ucErrandFeeType"
                  value={ucErrandFeeType}
                  onChange={e => setUcErrandFeeType(Number(e.target.value))}
                  style={{ float: "left" }}
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
                  value={ulErrandFeeAmount}
                  name="ulErrandFeeAmount"
                  onChange={e => setUlErrandFeeAmount(parseInt(e.target.value))}
                  disabled={ucErrandFeeType !== ErrandFeeType.AMOUNT}
                />
              </Form.Item>

              <Form.Item label="수수료 율(%)">
                <Input
                  style={{ width: "50%", float: "left" }}
                  placeholder="0"
                  type="number"
                  name="ucErrandFeeRate"
                  value={ucErrandFeeRate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUcErrandFeeRate(parseInt(e.target.value))
                  }
                  disabled={ucErrandFeeType !== ErrandFeeType.RATE}
                />
              </Form.Item>

              <Form.Item label="배차대행 수수료">
                <Input
                  style={{ width: "50%", float: "left" }}
                  placeholder="0"
                  type="number"
                  value={ulErrandFeeAgency}
                  name="ulErrandFeeAgency"
                  onChange={e => setUlErrandFeeAgency(Number(e.target.value))}
                />
              </Form.Item>

              <Form.Item label="직권배차">
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

                <Row style={{ float: "right" }}>
                  <Button style={{ marginTop: "30px" }} type="primary">
                    심부름 수정
                  </Button>
                </Row>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CallModify;
const LeftAlignedCol = styled(Col)`
  text-align: left;
`;
