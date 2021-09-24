/* eslint-disable */
import * as React from "react";
import { useState, useEffect } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button, Spin } from "antd";
import axios from "axios";
import { ColumnsType } from "antd/lib/table";

import LoginHelper from "../../pages/shared/LoginHelper";
import Header from "../Layout/Header";
import ShopSettlementList from "./ShopSettlementList";
import { callFormat, costFormat } from "../../util/FormatUtil";
import XLSX from "xlsx";
import { ShopInfo } from "./types";
import styled from "styled-components";
import moment from "moment";

const columns: ColumnsType<ShopInfo> = [
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

const ShopSettlement = (props: ShopInfo) => {
  const [astManageShop, setAstManageShop] = useState<ShopInfo[]>([]);
  const [selectedShop, setSelectedShop] = useState<ShopInfo | undefined>(undefined);
  const [acStartDate, setAcStartDate] = useState<moment.Moment>(moment().startOf("month"));
  const [acEndDate, SetAcEndDate] = useState<moment.Moment>(moment());

  const handleChangeDateRange = val => {
    setAcStartDate(val[0]);
    SetAcEndDate(val[1]);
  };

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

  const donwloadXlsx = () => {
    const fileName = `상점정산 ${props.acStartDate} ~ ${props.acEndDate}` + ".xlsx"; //날짜 undefined

    let dataSheet = new Array();

    for (var i = 0; i < astManageShop.length; i++) {
      dataSheet[i] = {
        이름: astManageShop[i].acCompany,
        아이디: `${astManageShop[i].ucAreaNo}-${astManageShop[i].ucDistribId}-${astManageShop[i].ucAgencyId}-${astManageShop[i].ucMemCourId}`,
        배달콜수: astManageShop[i].usMonthDeliDoneCntSum
      };
    }

    const dataWS = XLSX.utils.json_to_sheet(dataSheet);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, dataWS, "nameData");
    XLSX.writeFile(wb, fileName);
  };

  useEffect(() => {
    // const delay = window.setInterval(fetchShopList, 1000);
    // return () => clearInterval(delay);
    fetchShopList();
  }, []);

  const SettlementList = (record: any) => {
    let content;
    if (!selectedShop) {
      content = <Content>상점을 선택하세요.</Content>;
    } else {
      content = (
        <ShopSettlementList
          shopInfo={selectedShop}
          acStartDate={acStartDate}
          acEndDate={acEndDate}
        />
      );
    }

    return (
      <Col
        span={18}
        push={6}
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
        {SettlementList(astManageShop)}
        <Col span={6} pull={18}>
          <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <b>조회기간</b>
            </div>
            <RangePicker
              style={{ width: "100%" }}
              value={[acStartDate, acEndDate]}
              onChange={handleChangeDateRange}
            />
            <Button style={{ width: "100%" }} onClick={donwloadXlsx}>
              다운로드
            </Button>
          </Space>
          <Table
            columns={columns}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            dataSource={astManageShop}
            bordered
            onRow={(record: ShopInfo) => {
              return {
                onClick: () => {
                  setSelectedShop(record);
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

const Content = styled.span`
  font-size: 20pt;
  color: grey;
`;

export default ShopSettlement;
