/* eslint-disable */
/* eslint-disable */
import * as React from "react";
import "./CallSignPopup.css";
import { useState, useCallback, useEffect } from "react";
import { Form, Radio, Button, Input, Col, Row, message, Checkbox, Collapse, Popconfirm, AutoComplete } from "antd";
import { CloseCircleTwoTone } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
import DaumPostcode from "react-daum-postcode";
import axios, { AxiosError } from "axios";
import NumberFormat from 'react-number-format'

import './Popup.css'
import styled from "styled-components";
import LoginHelper from "src/pages/shared/LoginHelper";
import PaymentMode from "../../helpers/PaymentMode";
import SearchAddressType from "../../helpers/SearchAddressType";
import ErrandFeeType from "src/helpers/ErrandFeeType";
import ErrandType from "src/helpers/ErrandType";
import { CallInfo } from "../CallList/CallListComponent";
import DirectDispatch from "../CallList/DirectDispatch";
import Stopover from "./Stopover";
import { RiderInfo } from "../shop/types";
import ErrandAllocType from "src/helpers/ErrandAllocType";
import AddressAPIService from "src/util/kakao";
import DistanceHelper from "src/helpers/DistanceHelper";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
import { CallDetailShopTitle } from "../CallList";
import ErrandAddressType from "src/helpers/ErrandAddressType";
import ErrandAPIService from "src/helpers/ErrandAPIService";
import ErrandCompany from "src/util/ErrandCompany";
import { useForm } from "antd/lib/form/Form";

interface Props {
  callInfo: CallInfo | undefined;
  stForceDispatchRider: RiderInfo;
}
const { Panel } = Collapse;
const { Search } = Input;
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
  top: 30,
  left: "-100px",
  zIndex: 100,
  border: "1px solid #000000",
  overflow: "hidden"
};

const Popup = (props: Props) => {
  const [fullAddress, setFullAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [isDaumPost, setIsDaumPost] = useState(false);

  const [fullAddress2, setFullAddress2] = useState("");
  const [zoneCode2, setZoneCode2] = useState("");
  const [isDaumPost2, setIsDaumPost2] = useState(false);

  const [isDispatchListVisible, setIsDispatchListVisible] = useState(false);

  const [stForceDispatchRider, setStForceDispatchRider] = useState<RiderInfo | null>(null);

  const handleAddress = async data => {
    let AllAddress = data.address;
    let extraAddress = "";
    const zoneCodes = data.zonecode;

    const kakaos = await AddressAPIService.getAddressByKakaoAddress(data.address);
    if (kakaos.length > 0) {
      let kakao = kakaos[0];
      setUlOriginLatiPos(kakao.y);
      setUlOriginLongPos(kakao.x);
    }
    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== "" ? `(${extraAddress})` : "";
    }
    console.log(data);
    console.log(ulOriginLatiPos);

    setFullAddress(AllAddress);
    setZoneCode(zoneCodes);
    setAcOriginOldAddr(AllAddress);
    setIsDaumPost(false);
  };

  const handleAddress2 = async data => {
    let AllAddress2 = data.address;
    let extraAddress2 = "";
    const zoneCodes2 = data.zonecode;
    const kakaos = await AddressAPIService.getAddressByKakaoAddress(data.address);
    if (kakaos.length > 0) {
      let kakao = kakaos[0];
      setUlDestLatiPos(kakao.y);
      setUlDestLongPos(kakao.x);
    }

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

  const handleOpenPost = useCallback(
    (SearchAddressType: SearchAddressType) => {
      setIsDaumPost(!isDaumPost);
    },
    [!isDaumPost]
  );

  const handleOpenPost2 = useCallback(
    (SearchAddressType: SearchAddressType) => {
      setIsDaumPost2(!isDaumPost2);
    },
    [!isDaumPost2]
  );

  const [acOriginCompany, setAcOriginCompany] = useState("");
  const [acOriginCellNo, setAcOriginCellNo] = useState("");
  const [acOriginMemo, setAcOriginMemo] = useState("");
  const [ulOriginLatiPos, setUlOriginLatiPos] = useState(0);
  const [ulOriginLongPos, setUlOriginLongPos] = useState(0);
  const [acOriginOldAddr, setAcOriginOldAddr] = useState("");
  const [acOriginNewAddr, setAcOriginNewAddr] = useState("");
  const [acOriginAddrDesc, setAcOriginAddrDesc] = useState("");

  const [ucAreaNo, setUcAreaNo] = useState("");
  const [ucDistribId, setUcDistribId] = useState("");
  const [ucAgencyId, setUcAgencyId] = useState("");
  const [ucMemCourId, setUcMemCourId] = useState("");
  const [ucErrandType, setUcErrandType] = useState(ErrandType.DIFFERENT_DESTINATION);

  const [ulErrandSeqNo, setUlErrandSeqNo] = useState("");
  const [acDestCompany, setAcDestCompany] = useState("");
  const [acDestCellNo, setAcDestCellNo] = useState("");
  const [acDestMemo, setAcDestMemo] = useState("");
  const [ulDestLatiPos, setUlDestLatiPos] = useState(0);
  const [ulDestLongPos, setUlDestLongPos] = useState(0);
  const [acDestOldAddr, setAcDestOldAddr] = useState("");
  const [acDestNewAddr, setAcDestNewAddr] = useState("");
  const [acDestAddrDesc, setAcDestAddrDesc] = useState("");
  const [ucLimitTime, setUcLimitTime] = useState(0);
  const [ucPaymentMode, setUcPaymentMode] = useState(0);
  const [ucErrandFeeType, setUcErrandFeeType] = useState(0);
  const [ulErrandFeeAmount, setUlErrandFeeAmount] = useState(0);
  const [ucErrandFeeRate, setUcErrandFeeRate] = useState(0);
  const [ulErrandCharge, setUlErrandCharge] = useState(0);
  const [ulGoodsPrice, setUlGoodsPrice] = useState(0);
  const [ulSplitPostPayment, setUlSplitPostPayment] = useState(0);
  const [ulSplitPrePayment, setUlSplitPrePayment] = useState(0);
  const [ucErrandSettlementType, setUcErrandSettlementType] = useState(0);
  const [ucAllocType, setUcAllocType] = useState(1);
  const [ucTripType, setUcTripType] = useState(0);
  const [ulErrandFeeAgency, setUlErrandFeeAgency] = useState("");
  const [ulErrandDispatchAgencyFee, setUlErrandDispatchAgencyFee] = useState(0);
  const [ulErrandFeeCourier, setUlErrandFeeCourier] = useState("");

  const CallSign = async () => {
    const form = new FormData();

    form.append("ucAreaNo", String(ucAreaNo));
    form.append("ucDistribId", String(ucDistribId));
    form.append("ucAgencyId", String(ucAgencyId));
    form.append("ucMemCourId", String(ucMemCourId));
    form.append("ucErrandType", String(ucErrandType));
    form.append("acDestCellNo", acDestCellNo);
    form.append("acDestCompany", acDestCompany);
    form.append("acDestMemo", acDestMemo);

    form.append("acOriginCompany", acOriginCompany);
    form.append("acOriginCellNo", acOriginCellNo);
    form.append("acOriginMemo", acOriginMemo);
    form.append("ulOriginLatiPos", String(ulOriginLatiPos));
    form.append("ulOriginLongPos", String(ulOriginLongPos));
    form.append("acOriginOldAddr", acOriginOldAddr);
    form.append("acOriginNewAddr", acOriginNewAddr);
    form.append("acOriginAddrDesc", acOriginAddrDesc);

    form.append("ulDestLatiPos", String(ulDestLatiPos));
    form.append("ulDestLongPos", String(ulDestLongPos));
    form.append("acDestOldAddr", acDestOldAddr);
    form.append("acDestNewAddr", acDestNewAddr);
    form.append("acDestAddrDesc", acDestAddrDesc);

    form.append("ucLimitTime", String(ucLimitTime));
    form.append("ucPaymentMode", String(ucPaymentMode));
    form.append("ucErrandFeeType", String(ucErrandFeeType));
    form.append("ulErrandFeeAmount", String(ulErrandFeeAmount));
    form.append("ucErrandFeeRate", String(ucErrandFeeRate));
    form.append("ulErrandCharge", String(ulErrandCharge));
    form.append("ulGoodsPrice", String(ulGoodsPrice));
    form.append("ucErrandSettlementType", String(ucErrandSettlementType));
    form.append("ucAllocType", String(ucAllocType));
    form.append("ucTripType", String(ucTripType));
    form.append("ulErrandFeeAgency", String(ulErrandFeeAgency));
    form.append("ulErrandDispatchAgencyFee", String(ulErrandDispatchAgencyFee));

    if (ucAllocType === ErrandAllocType.FORCE_DISPATCH && stForceDispatchRider) {
      form.append("ucAcptAreaNo", String(stForceDispatchRider.ucAreaNo));
      form.append("ucAcptDistribId", String(stForceDispatchRider.ucDistribId));
      form.append("ucAcptAgencyId", String(stForceDispatchRider.ucAgencyId));
      form.append("ucAcptMemCourId", String(stForceDispatchRider.ucMemCourId));
    }

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
      window.close();
    } catch (e) {
      const error = e as AxiosError
      message.error(error.message);
    }
  };

  const handleClickSwap = () => {
    setAcOriginCompany(acDestCompany);
    setAcOriginCellNo(acDestCellNo);
    setAcOriginOldAddr(acDestOldAddr);
    setAcOriginNewAddr(acDestNewAddr);
    setFullAddress(fullAddress2);
    setAcOriginAddrDesc(acDestAddrDesc);
    setAcOriginMemo(acDestMemo);

    setAcDestCompany(acOriginCompany);
    setAcDestCellNo(acOriginCellNo);
    setAcDestOldAddr(acOriginOldAddr);
    setAcDestNewAddr(acOriginNewAddr);
    setFullAddress2(fullAddress);
    setAcDestAddrDesc(acOriginAddrDesc);
    setAcDestMemo(acOriginMemo);
  };

  const handleClickCancelSelectDispatchRider = () => {
    setUcAllocType(ErrandAllocType.NORMAL), setStForceDispatchRider(null);
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

  // 픽업지 목적지 거리계산
  let originToDestDistance;
  if (ulOriginLatiPos !== 0 && ucErrandType !== ErrandType.SAME && ulDestLatiPos !== 0) {
    originToDestDistance = DistanceHelper.getDistanceText(
      ulOriginLatiPos,
      ulOriginLongPos,
      ulDestLatiPos,
      ulDestLongPos
    );
  }

  // 분할결제 선지급액
  let splitAdvancePayment
  if(ucPaymentMode === PaymentMode.INSTALLMENT_PAYMENT) {
    splitAdvancePayment = (ulErrandCharge) - ulSplitPrePayment
  }

  // 배차 대행 수수료
  let calcErrandFeeAgency
  if(ucErrandFeeType == ErrandFeeType.AMOUNT) {
    calcErrandFeeAgency = ulErrandFeeAmount
  } else {
    calcErrandFeeAgency = ((ulErrandCharge) * (ucErrandFeeRate) / 100);
  }

  useEffect(() => {
    if(ucErrandFeeType != ErrandFeeType.RATE) {
      setUcErrandFeeRate(0)
    }
    if(ucErrandFeeType != ErrandFeeType.AMOUNT) {
      setUlErrandFeeAmount(0)
    }
  },[ucErrandFeeType])

  // 배달기사 수수료
  let riderFee
    riderFee = (ulErrandCharge) - calcErrandFeeAgency

  // 전화번호 
  useEffect(() => {
      setAcOriginCellNo(acOriginCellNo.replace(/[^0-9]/g, '').replace(/(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, '$1-$2-$3').replace('--', '-'))
    },[acOriginCellNo])
  useEffect(() => {
    setAcDestCellNo(acDestCellNo.replace(/[^0-9]/g, '').replace(/(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, '$1-$2-$3').replace('--', '-'))
    },[acDestCellNo])

  // 분할결제 선지급액
  useEffect(() => {
    if(ulSplitPrePayment > ulErrandCharge) {
      alert('배달비용 금액보다 클 수 없습니다.')
    }
  }, [ulSplitPrePayment])

  // 정액제 
  useEffect(() => {
    if(ulErrandFeeAmount > ulErrandCharge) {
      alert('배달비용 금액보다 클 수 없습니다.')
    }
  }, [ulErrandFeeAmount])
  // 정률제
  useEffect(() => {
    if(ucErrandFeeRate > 100) {
      alert('100% 보다 클 수 없습니다.')
    }
  }, [ucErrandFeeRate])

  // 타사 지급 수수료
  useEffect(() => {
    if(ulErrandDispatchAgencyFee > ulErrandCharge) {
      alert('배달비용 금액보다 클 수 없습니다.')
    }
  }, [ulErrandDispatchAgencyFee])
 
  // disable 0으로 초기화
  useEffect(() => {
    if ( ucPaymentMode != PaymentMode.INSTALLMENT_PAYMENT ) {
      setUlSplitPrePayment(0)
    }
  }, [ucPaymentMode])

  useEffect(() => {
    if ( ucErrandType === ErrandType.SAME ) {
      setAcOriginCompany("")
      setAcOriginCellNo("")
      setAcOriginOldAddr("")
      setAcOriginAddrDesc("")
      setFullAddress("")
      setAcOriginMemo("")
    }
  }, [ucErrandType])

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
              rate: 3.5
            }}
          >
            <Form.Item label="접수 번호" />
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
                <span>바로목적지로</span>
                <span style={{paddingLeft:'60px'}}>
                  <Button onClick={handleClickSwap}>
                    픽업지 ↔ 목적지
                  </Button>
                </span>
              </Col>
            </Form.Item>

            <Form.Item label="픽업지 업체명">
              {/* <Search
                placeholder="업체명을 입력하세요"
                enterButton="검색"
                onSearch={(val) => {
                  //handleSearchAddressByCompanyName(val, ErrandAddressType.ORIGIN)
                }}
                value={acOriginCompany}
                name="acOriginCompany"
                onChange={e => {
                  setAcOriginCompany(e.target.value);
                }}
                disabled={ucErrandType === ErrandType.SAME}
              /> */}
              <AutoComplete 
                style={{textAlign:'left'}}
                placeholder="업체명을 입력하세요"
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                value={acOriginCompany}
                onChange={(value) => setAcOriginCompany(value)}
                disabled={ucErrandType === ErrandType.SAME}
              />
            </Form.Item>

            <Form.Item label="픽업지 연락처">
              <Search
                placeholder="연락처를 입력하세요"
                enterButton="검색"
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
                onClick={() => handleOpenPost(SearchAddressType.ERRAND_ORIGIN)}
                style={{ width: "100%" }}
                value={acOriginOldAddr}
                disabled={ucErrandType === ErrandType.SAME}
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
                />
              ) : null}
            
              {fullAddress}
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
            <div style={{ textAlign: "center" }}>
              <Collapse ghost>
                <Panel 
                  header={<Button disabled={ucErrandType === ErrandType.SAME}>경유지 추가 1</Button>} 
                  key="1" 
                  showArrow={false}
                  >
                  <Stopover />
                </Panel>
              </Collapse>
              <Collapse ghost>
                <Panel 
                  header={<Button disabled={ucErrandType === ErrandType.SAME}>경유지 추가 2</Button>} 
                  key="2" 
                  showArrow={false}
                  >
                  <Stopover />
                </Panel>
              </Collapse>
              
            </div>
            <Form.Item label="목적지 업체명">
              <Search
                placeholder="업체명을 입력하세요"
                enterButton="검색"
                onSearch={(val: string) => {
                
                }}
                tabIndex={2}
                name="acDestCompany"
                value={acDestCompany}
                onChange={e => {
                  setAcDestCompany(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="목적지 연락처">
              <Search
                placeholder="연락처를 입력하세요"
                enterButton="검색"
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
                onClick={() => handleOpenPost2(SearchAddressType.ERRAND_DEST)}
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

            <Form.Item label="픽업 ↔ 목적지">
              <span className="originToDestDistance">
                {originToDestDistance}
              </span>
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
              rate: 3.5
            }}
          >
            <Form.Item label="제한시간">
              <Radio.Group
                value={ucLimitTime}
                name="ucLimitTime"
                onChange={e => setUcLimitTime(e.target.value)}
                style={{width:'100%'}}
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
                name="ucTripType"
                value={ucTripType}
                onChange={e => setUcTripType(e.target.value)}
                style={{ float: "left", width:'100%'}}
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
                value={ucPaymentMode}
                onChange={e => setUcPaymentMode(e.target.value)}
                style={{ float: "left", width:'100%'}}
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
                onValueChange={(value: any) => {
                  setUlGoodsPrice(parseInt(value.value))
                }}
                thousandSeparator={true}
                maxLength={10}
                value={ulGoodsPrice}
                suffix=" 원"
              />
            </Form.Item>

            <Form.Item label="배달비용">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                name="ulErrandCharge"
                thousandSeparator={true}
                onValueChange={(value: any) => {
                  setUlErrandCharge(parseInt(value.value))
                }}
                suffix=" 원"
                value={ulErrandCharge}
                maxLength={9}
              />
            </Form.Item>

            <Form.Item label="분할결제 선지급액">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                name="ulSplitPrePayment"
                onValueChange={(value: any) => {
                  setUlSplitPrePayment(parseInt(value.value))
                }}
                disabled={ucPaymentMode !== PaymentMode.INSTALLMENT_PAYMENT }
                suffix=" 원"
                value={ulSplitPrePayment}
              />
            </Form.Item>

            <Form.Item label="분할결제 잔여금액" name="ulSplitPostPayment">
              <span style={{paddingRight:'11px'}}>
              {costFormat(splitAdvancePayment)}
              </span>
            </Form.Item>

            <Form.Item label="정산유형">
              <Radio.Group
                name="ucErrandSettlementType"
                value={ucErrandSettlementType}
                onChange={e => setUcErrandSettlementType(e.target.value)}
                style={{ float: "left", width:'100%'}}
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
                name="ucErrandFeeType"
                value={ucErrandFeeType}
                onChange={e => setUcErrandFeeType(e.target.value)}
                style={{ float: "left", width:'100%'}}
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
                name="ulErrandFeeAmount"
                onValueChange={(values: any) => {
                  setUlErrandFeeAmount(parseInt(values.value))
                }}
                disabled={ucErrandFeeType !== ErrandFeeType.AMOUNT}
                suffix=" 원"
                value={ulErrandFeeAmount}
              />
            </Form.Item>

            <Form.Item label="정률제(%)">
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                name="ucErrandFeeRate"
                onValueChange={(e) => {
                  setUcErrandFeeRate(parseInt(e.value))
                }}
                disabled={ucErrandFeeType !== ErrandFeeType.RATE}
                suffix=" %"
                value={ucErrandFeeRate}
              />
            </Form.Item>

            <Form.Item label="배차대행 수수료" name="ulErrandFeeAgency">
              <span style={{paddingRight:'11px'}}>
                {costFormat(calcErrandFeeAgency)}
              </span>
            </Form.Item>

            <Form.Item label="배달기사 수수료" name="ulErrandFeeCourier">
              <span style={{paddingRight:'11px'}}>
                {costFormat(riderFee)}
              </span>
            </Form.Item>

            <Form.Item label="타사 지급 수수료" >
              <NumberFormat
                className="input-number-format"
                placeholder="0"
                thousandSeparator={true}
                name="ulErrandDispatchAgencyFee"
                onValueChange={(e) => {
                  setUlErrandDispatchAgencyFee(parseInt(e.value))
                }}
                suffix=" 원"
                value={ulErrandDispatchAgencyFee}
              />
            </Form.Item>

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
              )}
              <Row style={{ float: "right" }}>
                <Popconfirm 
                  title="심부름을 접수하시겠습니까?"
                  okText="네"
                  cancelText="아니요"
                  onConfirm={CallSign}
                >
                  <Button style={{ marginTop: "30px" }} type="ghost">
                    접수
                  </Button>
                </Popconfirm>
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
const TitleCol = styled(Col)`
  font-size: 3vh;
  padding: 5px 20px 15px 20px;
`;