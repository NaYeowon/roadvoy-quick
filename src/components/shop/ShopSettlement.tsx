/* eslint-disable */
import React, { useState, useEffect } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from "antd";
import axios from "axios";
import { ColumnsType } from "antd/lib/table";

import LoginHelper from "../../pages/shared/LoginHelper";
import Header from "../Layout/Header";
import ShopSettlementList from "./ShopSettlementList";
import { callFormat, costFormat } from "../../util/FormatUtil";
import XLSX from "xlsx";

interface IShopSettlement {
  title: string;
  dataIndex: string;
  acStartDate: Date;
  acEndDate: Date;
  acCompany: string;
  usMonthDeliDoneCntSum: number;
}

const columns: ColumnsType<IShopSettlement> = [
  {
    title: "가맹",
    dataIndex: "acCompany"
  },
  {
    title: "콜수",
    dataIndex: "usMonthDeliDoneCntSum",
    width: 100,
    render: (call: number) => callFormat(call)
  },
  {
    title: "가상계좌",
    dataIndex: "ulPaygoRoadvoyCardFee",
    render: (cost: number) => costFormat(cost)
  }
];

const { RangePicker } = DatePicker;

const ShopSettlement = (props: IShopSettlement) => {
  const [astManageShop, setAstManageShop] = useState<IShopSettlement[]>([]);
  const { acStartDate, acEndDate } = props;
  const fetchShopList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/agency/shop/manage/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });

      setAstManageShop(response.data.astManageShop);
    } catch (e) {
      message.error(e.message);
    }
  };
  useEffect(() => {
    const delay = window.setInterval(fetchShopList, 1000);
    return () => clearInterval(delay);
  }, []);

  return (
    <>
      <Header />
      <PageHeader />
      <Row>
        <Col span={18} push={6} style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <ShopSettlementList />
        </Col>
        <Col span={6} pull={18}>
          <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <b>조회기간</b>
            </div>
            <RangePicker style={{ width: "100%" }} />
            <Button
              style={{ width: "100%" }}
              onClick={() => {
                const fileName = `상점정산 ${acStartDate} ~ ${acEndDate}` + ".xlsx"; //날짜 undefined
                const dataSheet = [`${astManageShop}`]; //안뜸
                const dataWS = XLSX.utils.json_to_sheet(dataSheet);
                const wb = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(wb, dataWS, "nameData");
                XLSX.writeFile(wb, fileName);
              }}
            >
              다운로드
            </Button>
          </Space>
          <Table
            columns={columns}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            dataSource={astManageShop}
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

export default ShopSettlement;
