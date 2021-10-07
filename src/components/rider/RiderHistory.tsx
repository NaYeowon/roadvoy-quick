import { ColumnsType } from "antd/lib/table";
import React from "react";
import MemberHelper from "src/helpers/MemberHelper";
import { costFormat } from "src/util/FormatUtil";
import Header from "../Layout/Header";
import { RiderInfo } from "../shop/types";
import { message, PageHeader, Table } from "antd";

const columns: ColumnsType<RiderInfo> = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        render: (text: string, record: RiderInfo) => `${MemberHelper.formatMemberId(record)}`,
        width: 120,
      },
      {
        title: "이름",
        dataIndex: "acPresident",
        width: 80,
      },
      {
        title: "상태메세지",
        dataIndex: "acStatusMessage",
        width: 80,
      },
    ],
  },
  {
    title: "배달",
    children: [
      {
        title: "콜수수료",
        dataIndex: "lCallUnitPrice",
        key: "lCallUnitPrice",
        width: 80,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "당일",
        dataIndex: "usDayDoneCallSum",
        key: "usDayDoneCallSum",
        width: 80,
      },
      {
        title: "당월",
        dataIndex: "usMonthDoneCallSum",
        key: "usMonthDoneCallSum",
        width: 100,
      },
    ],
  },
  {
    title: "출금가능액",
    dataIndex: "lAccountBalance",
    key: "lAccountBalance",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "보증금",
    dataIndex: "lCourierDeposit",
    key: "lCourierDeposit",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "리스료",
    children: [
      {
        title: "종류",
        dataIndex: "ucCourierTag",
        key: "ucCourierTag",
        width: 100,
        render: dataIndex => {
          if (dataIndex === 1) {
            return "지입";
          }
          return "대여";
        },
      },
      {
        title: "차감(매일)",
        dataIndex: "lCourierLease",
        key: "lCourierLease",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "패널티",
    children: [
      {
        title: "동시",
        dataIndex: "ucConCallLimit",
        key: "ucConCallLimit",
        width: 80,
        render: dataIndex => `${dataIndex} 콜`,
      },
      {
        title: "지연",
        dataIndex: "ucCallRtrvTime",
        key: "ucCallRtrvTime",
        width: 80,
        render: dataIndex => `${dataIndex}초`,
      },
    ],
  },
];
const RiderHistory = () => {
  return (
    <div>
      <Header />
      <Table columns={columns} bordered pagination={false} size="small" scroll={{ y: 650 }} />
    </div>
  );
};

export default RiderHistory;
