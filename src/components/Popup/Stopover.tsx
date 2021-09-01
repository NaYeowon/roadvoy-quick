/* eslint-disable */
import { Button, Form, Input } from "antd";
import DaumPostcode from "react-daum-postcode";

import React, { useCallback, useState } from "react";
import TextArea from "antd/lib/input/TextArea";

const Stopover = props => {
  const [fullAddress, setFullAddress] = useState("");
  const [zoneCode, setZoneCode] = useState("");
  const [isDaumPost, setIsDaumPost] = useState(false);

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
    overflow: "hidden"
  };

  return (
    <>
      <div style={{ backgroundColor: "#fff280" }}>
        <Form.Item label="경유지 업체명">
          <Input placeholder="업체명을 입력하세요" />
        </Form.Item>
        <Form.Item label="경유지 연락처">
          <Input placeholder="연락처를 입력하세요" />
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
          <Input placeholder="상세주소를 입력하세요" />
        </Form.Item>
        <Form.Item label="경유지 요청사항">
          <TextArea />
        </Form.Item>
      </div>
    </>
  );
};

export default Stopover;
