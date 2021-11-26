/* eslint-disable */
import { useEffect, useState } from "react";
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from "antd";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import { AgencyDTO } from "../shop/types";
import styled from "styled-components";
import AgencySettlementList from "./AgencySettlementList";
import moment from "moment";
import api from "src/config/axios";
import { callFormat } from "src/util/FormatUtil";
import { MemberGroupSelector } from "../Member";

const columns = [
  {
    title: "대행이름",
    dataIndex: "acCompany",
    width: 120,
  },
  {
    title: "콜수",
    dataIndex: "usDayDoneErrandSum",
    render: (call: number) => callFormat(call),
    width: 80,
  },
];

const { RangePicker } = DatePicker;

const AgencySettlement = props => {
  const [astManagerAgency, setAstManagerAgency] = useState<AgencyDTO[]>([]);
  const [selectedAgency, setSelectedAgency] = useState<AgencyDTO | undefined>(undefined);
  const [acStartDate, setAcStartDate] = useState<moment.Moment>(moment().startOf("month"));
  const [acEndDate, setAcEndDate] = useState<moment.Moment>(moment());

  const handleChangeDateRange = val => {
    setAcStartDate(val[0]);
    setAcEndDate(val[1]);
  };

  const fetchAgencyList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/get-agencies.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });

      setAstManagerAgency(response.data.lstMember);
    } catch (e) {
      const error = e as Error;
      message.error(error.message);
    }
  };
  useEffect(() => {
    // const delay = window.setInterval(fetchAgencyList, 1000);
    // return () => clearInterval(delay);
    fetchAgencyList();
  }, []);

  const SettlementList = (record: any) => {
    let content;
    if (!selectedAgency) {
      content = <Content>대행을 선택하세요.</Content>;
    } else {
      content = (
        <AgencySettlementList
          agency={selectedAgency}
          acStartDate={acStartDate}
          acEndDate={acEndDate}
        />
      );
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
        {SettlementList(astManagerAgency)}
        <Col span={4} pull={20}>
          <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
            <div style={{ textAlign: "center" }}>
              <b>조회기간</b>
            </div>
            <RangePicker
              style={{ width: "100%" }}
              value={[acStartDate, acEndDate]}
              onChange={handleChangeDateRange}
            />
            <Button style={{ width: "100%" }}>다운로드</Button>
          </Space>
          <Table
            columns={columns}
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            dataSource={astManagerAgency}
            bordered
            onRow={(record: AgencyDTO) => {
              return {
                onClick: () => {
                  setSelectedAgency(record);
                },
              };
            }}
            size="small"
            pagination={false}
            scroll={{ y: "calc(100vh - 250px)" }}
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
