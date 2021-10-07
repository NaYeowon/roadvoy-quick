/* eslint-disable */

import { Table } from "antd";
import React, { Component } from "react";
import { CallInfo } from "../CallList/CallListComponent";
import Header from "../Layout/Header";

interface IProps {
  location: any;
}

interface IState {
  astCall: CallInfo[];
}

const columns = [
  {
    title: "가맹명",
    dataIndex: "",
    key: "",
    width: 100,
  },
  {
    title: "점수",
    dataIndex: "",
    key: "",
    width: 50,
  },
  {
    title: "진행/조리",
    dataIndex: "",
    key: "",
    width: 50,
  },
  {
    title: "주소",
    dataIndex: "",
    key: "",
    width: 200,
  },
  {
    title: "배달비",
    dataIndex: "",
    key: "",
    width: 80,
  },
  {
    title: "결제정보",
    dataIndex: "",
    key: "",
    width: 80,
  },
  {
    title: "기사",
    dataIndex: "",
    key: "",
    width: 80,
  },
  {
    title: "고객연락처",
    dataIndex: "",
    key: "",
    width: 80,
  },
];
class RiderCallHistory extends Component<IProps, IState> {
  render() {
    return (
      <>
        <Header />
        <Table
          columns={columns}
          bordered
          style={{ width: "100%", height: "100%", cursor: "pointer" }}
        />
      </>
    );
  }
}

export default RiderCallHistory;
