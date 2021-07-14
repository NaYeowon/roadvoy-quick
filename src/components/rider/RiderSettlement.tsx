/* eslint-disable */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from "antd";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import RiderSettlementList from "./RiderSettlementList";

import XLSX from "xlsx";

interface Rider {
  title: string;
  dataIndex: string;
  width: number;
  acStartDate: Date;
  acEndDate: Date;
  acPresident: string;
  ucAreaNo: string;
  ucDistribId: string;
  ucAgencyId: string;
  ucMemCourId: string;
  lDayErrandCharge: number;
  ulCallCntFee: number;
  ulDayTotalRevenue: number;
  usMonthDoneCallSum: number;
}
const columns = [
  {
    title: "이름",
    dataIndex: "acPresident",
    key: "acPresident"
  },
  {
    title: "콜수",
    dataIndex: "usMonthDoneCallSum",
    key: "usMonthDoneCallSum",
    width: 80
  }
];

const { RangePicker } = DatePicker;

const RiderSettlement = (props: Rider) => {
  const [astManageRider, setAstManageRider] = useState<Rider[]>([]);
  const fetchRiderList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/agency/rider/manage/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });

      setAstManageRider(response.data.astManageRider);
    } catch (e) {
      message.error(e.message);
    }
  };

  const riderXlsx = () => {
    const fileName = `기사정산` + ".xlsx";

    let dataSheet = new Array();

    for (var i = 0; i < astManageRider.length; i++) {
      dataSheet[i] = {
        이름: astManageRider[i].acPresident,
        아이디: `${astManageRider[i].ucAreaNo}-${astManageRider[i].ucDistribId}-${astManageRider[i].ucAgencyId}-${astManageRider[i].ucMemCourId}`,
        배달콜수: astManageRider[i].usMonthDoneCallSum,
        배달비: astManageRider[i].lDayErrandCharge,
        배달콜수수료: astManageRider[i].ulCallCntFee,
        배달수입: astManageRider[i].ulDayTotalRevenue,
        // 퀵콜수: astManageRider[i].usDayAcptErrandSum,
        // 퀵배달비: astManageRider[i],
        // 퀵수수료: astManageRider[i],
        리스료: astManageRider[i],
        대행에지불한리스료: astManageRider[i],
        대행에지불한콜수수료: astManageRider[i],
        나에게캐시입금: astManageRider[i],
        다른기사에게캐시송금: astManageRider[i],
        현금카드송금: astManageRider[i]
      };
    }
    const dataWS = XLSX.utils.json_to_sheet(dataSheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, dataWS, "nameData");
    XLSX.writeFile(wb, fileName);
  };

  useEffect(() => {
    const delay = window.setInterval(fetchRiderList, 1000);
    return () => clearInterval(delay);
  }, []);

  return (
    <>
      <Header />
      <PageHeader />
      <Row>
        <Col span={20} push={4} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <RiderSettlementList />
        </Col>
        <Col span={4} pull={20}>
          <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <b>조회기간</b>
            </div>
            <RangePicker style={{ width: "100%" }} />
            <Button style={{ width: "100%" }} onClick={riderXlsx}>
              다운로드
            </Button>
          </Space>
          <Table
            columns={columns}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            dataSource={astManageRider}
            bordered
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
