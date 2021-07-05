/* eslint-disable */
import React, { useState, useEffect } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from "antd";
import axios from "axios";
import { ColumnsType } from "antd/lib/table";

import LoginHelper from "../../pages/shared/LoginHelper";
import Header from "../Layout/Header";
import ShopSettlementList from "./ShopSettlementList";
import { costFormat } from "../../util/FormatUtil";

interface IShopSettlement {
  title: string;
  dataIndex: string;
}
const columns: ColumnsType<IShopSettlement> = [
  {
    title: "가맹",
    dataIndex: "acCompany"
  },
  {
    title: "콜수",
    dataIndex: "ulCustCallCnt",
    width: 100,
    render: (cost: number) => costFormat(cost)
  },
  {
    title: "가상계좌",
    dataIndex: "ulCurrentVirAccBalance",
    render: (cost: number) => costFormat(cost)
  }
];

const { RangePicker } = DatePicker;

const ShopSettlement = () => {
  const [astManageShop, setAstManageShop] = useState<IShopSettlement[]>([]);
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
            <Button style={{ width: "100%" }}>다운로드</Button>
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
