/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from "antd";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import { RiderInfo } from "../shop/types";
import XLSX from "xlsx";
import styled from "styled-components";
import { MemberGroupSelector } from "../Member";

const columns = [
  {
    title: "이름",
    dataIndex: "",
  },
  {
    title: "콜수",
    dataIndex: "",
    width: 80,
  },
];

const { RangePicker } = DatePicker;

const RiderSettlement = props => {
  const [astManageRider, setAstManageRider] = useState<[]>([]);
  const [selectedRider, setSelectedRider] = useState(false);
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

  const DistributorXlsx = () => {
    const fileName = `총판정산` + ".xlsx";

    let dataSheet = new Array();

    for (var i = 0; i < astManageRider.length; i++) {
      dataSheet[i] = {};
    }
    const dataWS = XLSX.utils.json_to_sheet(dataSheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, dataWS, "nameData");
    XLSX.writeFile(wb, fileName);
  };

  //   useEffect(() => {
  //     // const delay = window.setInterval(fetchRiderList, 1000);
  //     // return () => clearInterval(delay);
  //     fetchRiderList();
  //   }, []);

  const SettlementList = (record: any) => {
    let content;
    let riderInfo = new Array();
    riderInfo = record;
    console.log(riderInfo);
    if (selectedRider === false) {
      content = <Content>총판을 선택하세요.</Content>;
    } else {
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
      <PageHeader style={{ paddingBottom: " 5vh" }}>
        <span style={{ float: "right" }}>
          <MemberGroupSelector />
        </span>
      </PageHeader>
      <Row>
        {SettlementList(astManageRider)}
        <Col span={4} pull={20}>
          <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <b>조회기간</b>
            </div>
            <RangePicker style={{ width: "100%" }} />
            <Button style={{ width: "100%" }} onClick={DistributorXlsx}>
              다운로드
            </Button>
          </Space>
          <Table
            columns={columns}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            dataSource={astManageRider}
            bordered
            onRow={(record: RiderInfo) => {
              return {
                onClick: () => {
                  setSelectedRider(true);
                  setRiderInfoData(JSON.stringify(record));
                },
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
export default RiderSettlement;
const Content = styled.span`
  font-size: 20pt;
  color: grey;
`;
