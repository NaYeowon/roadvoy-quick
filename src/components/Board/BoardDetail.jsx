/* eslint-disable */
import React from "react";
import { Descriptions, Button } from "antd";
import { useHistory } from "react-router-dom";

import Header from "../Layout/Header";

const BoardDetail = () => {
  const history = useHistory();

  const onCancel = () => {
    history.goBack();
  };
  return (
    <>
      <Header />
      <div style={{ width: "1000px", marginRight: "auto", marginLeft: "auto", marginTop: "130px" }}>
        <Descriptions bordered size="small" title="글목록">
          <Descriptions.Item label="제목" span={3} />
          <Descriptions.Item label="작성자">ㅇㅇㅇ</Descriptions.Item>
          <Descriptions.Item label="ㅇㅇㅇ">ㅇㅇㅇ</Descriptions.Item>
          <Descriptions.Item label="작성일">2021-06-22</Descriptions.Item>
          <Descriptions.Item label="내용" span={3} rows={8} />
        </Descriptions>
        <div style={{ textAlign: "center", paddingTop: "10px" }}>
          <Button onClick={onCancel}>목록</Button>
          <Button>수정</Button>
          <Button>삭제</Button>
        </div>
      </div>
    </>
  );
};
export default BoardDetail;
