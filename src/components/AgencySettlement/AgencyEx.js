/* eslint-disable */
import React, { Component } from "react";
import { PageHeader, Table } from "antd";

import Header from "../Layout/Header";
import "antd/dist/antd.css";

class AgencyEx extends Component {
  render() {
    const columns = [
      {
        title: "계정정보",
        children: [
          {
            title: "아이디",
            dataIndex: "ucMemCourId",
            width: 70
          },
          {
            title: "총판명",
            dataIndex: "acCompany",
            key: "acCompany",
            width: 70
          }
        ]
      },
      {
        title: "콜 수",
        children: [
          {
            title: "당일",
            dataIndex: "ulCustCallCnt",
            key: "ulCustCallCnt",
            width: 50
          },
          {
            title: "당일(누적)",
            dataIndex: "companyName",
            key: "companyName",
            width: 50
          }
        ]
      },
      {
        title: "콜 수익",
        children: [
          {
            title: "선/착불",
            dataIndex: "usDeliDoneCntSum",
            key: "usDeliDoneCntSum",
            width: 50
          },
          {
            title: "신용",
            dataIndex: "usMonthDeliDoneCntSum",
            key: "usMonthDeliDoneCntSum",
            width: 50
          },
          {
            title: "입금",
            dataIndex: "usMonthDeliDoneCntSum",
            key: "usMonthDeliDoneCntSum",
            width: 50
          }
        ]
      },
      {
        title: "매출 정산",
        children: [
          {
            title: "매출액",
            dataIndex: "",
            key: "",
            width: 50
          },
          {
            title: "선결제",
            dataIndex: "",
            key: "",
            width: 50
          },
          {
            title: "후결제",
            dataIndex: "",
            key: "",
            width: 50
          }
        ]
      },
      {
        title: "수익 정산",
        children: [
          {
            title: "기사수익",
            dataIndex: "",
            key: "",
            width: 50
          },
          {
            title: "퀵수익",
            dataIndex: "",
            key: "",
            width: 50
          },
          {
            title: "비용",
            dataIndex: "",
            key: "",
            width: 50
          },
          {
            title: "실수익",
            dataIndex: "",
            key: "",
            width: 50
          },
          {
            title: "로드보이 수익 (30%)",
            dataIndex: "",
            key: "",
            width: 70
          }
        ]
      }
    ];

    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i
        // ucMemCourId: '값',
        // ex) age: i+1
      });
    }
    return (
      <div>
        <div>
          <Header />
        </div>
        <Table
          columns={columns}
          dataSource={data}
          bordered
          pagination={false}
          size="middle"
          scroll={{ x: "calc(700px + 50%)", y: 650 }}
        />
        ,
      </div>
    );
  }
}
export default AgencyEx;
