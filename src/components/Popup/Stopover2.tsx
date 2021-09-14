/* eslint-disable */
import { Button, Form, Input, message } from "antd";
import DaumPostcode from "react-daum-postcode";

import React, { useCallback, useEffect, useState } from "react";
import TextArea from "antd/lib/input/TextArea";
import './Popup.css'
import { CallInfo } from "../CallList/CallListComponent";
import ErrandType from "src/helpers/ErrandType";
import axios, { AxiosError } from "axios";
import LoginHelper from "src/pages/shared/LoginHelper";

interface Props {
  callInfo: CallInfo | undefined
}

const Stopover = (props:Props) => {
  const {callInfo} = props
  const [fullAddress, setFullAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [isDaumPost, setIsDaumPost] = useState(false);

  const [ucErrandType, setUcErrandType] = useState(ErrandType.DIFFERENT_DESTINATION);
  const [acStop2CellNo, setAcStop2CellNo] = useState("");
  const [acStop2Company, setAcStop2Company] = useState("");
  const [acStop2Name, setAcStop2Name] = useState("");
  const [acStop2Memo, setAcStop2Memo] = useState("");
  const [ulStop2LatiPos, setUlStop2LatiPos] = useState(0);
  const [ulStop2LongPos, setUlStop2LongPos] = useState(0);
  const [acStop2OldAddr, setAcStop2OldAddr] = useState("");
  const [acStop2NewAddr, setAcStop2NewAddr] = useState("");
  const [acStop2AddrDesc, setAacStop2AddrDesc] = useState("");

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
    console.log(data);

    setFullAddress(AllAddress);
    setZoneCode(zoneCodes);
    setIsDaumPost(false);
  };

  const handleOpenPost = useCallback(() => {
    setIsDaumPost(!isDaumPost);
  }, [!isDaumPost]);

  const modalStyle: React.CSSProperties = {
    position: "absolute",
    top: 30,
    left: "-100px",
    zIndex: 100,
    border: "1px solid #000000",
    overflow: "hidden",
  };

    // 전화번호 
    useEffect(() => {
        setAcStop2CellNo(acStop2CellNo.replace(/[^0-9]/g, '').replace(/(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/, '$1-$2-$3').replace('--', '-'))
      },[acStop2CellNo])
    
  return (
    <>
      <div style={{ backgroundColor: "#fff280", padding:'0px' }}>
        <Form.Item label="경유지 업체명">
          <Input 
            placeholder="업체명을 입력하세요" 
            value={acStop2Company}
            onChange={e => {
              setAcStop2Company(e.target.value);
            }}
            disabled={ucErrandType === ErrandType.SAME}
          />
        </Form.Item>
        <Form.Item label="경유지 고객명">
          <Input 
            placeholder="고객명을 입력하세요" 
            value={acStop2Name}
            onChange={e => {
              setAcStop2Name(e.target.value);
            }}
            disabled={ucErrandType === ErrandType.SAME}
          />
        </Form.Item>
        <Form.Item label="경유지 연락처">
          <Input 
            placeholder="연락처를 입력하세요" 
            value={acStop2CellNo}  
            onChange={e => {
              setAcStop2CellNo(e.target.value)
            }}
            disabled={ucErrandType === ErrandType.SAME}
          />
        </Form.Item>
        <Form.Item label="경유지 주소">
          <Button type="primary" onClick={() => handleOpenPost()} style={{ width: "100%" }}>
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
          <div>{fullAddress}</div>
        </Form.Item>
        <Form.Item label="경유지 상세주소">
          <Input 
            placeholder="상세주소를 입력하세요" 
            value={acStop2AddrDesc}  
            onChange={e => {
              setAacStop2AddrDesc(e.target.value)
            }}
          />
        </Form.Item>
        <Form.Item label="경유지 요청사항">
          <TextArea 
            rows={2}
            name="acStop1Memo"
            onChange={e => {
              setAcStop2Memo(e.target.value);
            }}
            value={acStop2Memo}
          />
        </Form.Item>
      </div>
    </>
  );
};

export default Stopover;
