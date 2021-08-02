/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from "antd";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import { RiderInfo } from "../shop/types";
import XLSX from "xlsx";
import styled from "styled-components";
import AgencySettlementList from "./AgencySettlementList";

const columns = [
  {
    title: "대행이름",
    dataIndex: "name"
  },
  {
    title: "콜수",
    dataIndex: "call",
    width: 80
  }
];
const data = [
  {
    key: 1,
    name: "대행이름",
    call: "0"
  },
  {
    key: 2,
    name: "대행이름",
    call: "0"
  }
];
const { RangePicker } = DatePicker;

const AgencySettlement = props => {
  const [selectedAgency, setSelectedAgency] = useState(false);
  const [riderInfoData, setRiderInfoData] = useState("");
  //   const fetchRiderList = async () => {
  //     try {
  //       const response = await axios({
  //         method: "get",
  //         url: "",
  //         headers: {
  //           Authorization: `Bearer ${LoginHelper.getToken()}`
  //         }
  //       });

  //       setAstManageRider(response.data.astManageRider);
  //     } catch (e) {
  //       message.error(e.message);
  //     }
  //   };

  //   useEffect(() => {
  //     // const delay = window.setInterval(fetchRiderList, 1000);
  //     // return () => clearInterval(delay);
  //     fetchRiderList();
  //   }, []);

  const SettlementList = (record: any) => {
    let content;
    let agencyInfo = new Array();
    console.log(agencyInfo);
    if (selectedAgency === false) {
      content = <Content>대행을 선택하세요.</Content>;
    } else {
      content = <AgencySettlementList />;
    }

    return (
      <Col
        span={20}
        push={4}
        style={{ paddingLeft: "20px", paddingRight: "20px", textAlign: "center" }}
      >
        {content}
      </Col>
    );
  };

  return (
    <>
      <Header />
      <PageHeader />
      <Row>
        {SettlementList(data)}
        <Col span={4} pull={20}>
          <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <b>조회기간</b>
            </div>
            <RangePicker style={{ width: "100%" }} />
            <Button style={{ width: "100%" }}>다운로드</Button>
          </Space>
          <Table
            columns={columns}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            dataSource={data}
            bordered
            onRow={record => {
              return {
                onClick: () => {
                  setSelectedAgency(true);
                  <AgencySettlementList />;
                }
              };
            }}
            size="small"
            pagination={false}
            scroll={{ y: 650 }}
          />
        </Col>
      </Row>
    </>
  );
};
export default AgencySettlement;
const Content = styled.span`
  font-size: 20pt;
  color: grey;
`;
