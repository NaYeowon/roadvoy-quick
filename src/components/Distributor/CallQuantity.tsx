/* eslint-disable */
import { Col, DatePicker, message, Row, Space, Table } from "antd";
import styled from "styled-components";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "src/config/axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import { CallQuantityDto } from "../shop/types";
import CallQuantityList from "./CallQuantityList";
import DistributorStatistics from "./DistributorStatistics";

const columns = [
  {
    title: "대행명",
    dataIndex: "acCompany",
    key: "acCompany",
  },
];

export const CallQuantity = (props: CallQuantityDto) => {
  const [astManagerAgency, setAstManagerAgency] = useState<CallQuantityDto[]>([]);
  const [selected, setSelected] = useState<CallQuantityDto | undefined>(undefined);
  const [year, setYear] = useState<moment.Moment>(moment());

  const handleChangeYearRange = val => {
    setYear(val);
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
    const delay = window.setInterval(fetchAgencyList, 1000);
    return () => clearInterval(delay);
  }, []);

  const SettlementList = (record: any) => {
    let content;
    if (!selected) {
      content = <Content>대행을 선택하세요.</Content>;
    } else {
      content = <CallQuantityList callQuantity={selected} acYear={year} />;
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
      <span>
        <DistributorStatistics />
      </span>
      <div style={{ paddingTop: "30px" }}>
        <Row>
          {SettlementList(astManagerAgency)}
          <Col span={4} pull={20}>
            <Space direction="vertical" size={12} style={{ paddingBottom: "10px", width: "100%" }}>
              <div style={{ textAlign: "center" }}>
                <b>연도선택</b>
              </div>
              <DatePicker
                style={{ width: "100%" }}
                picker="year"
                value={year}
                onChange={handleChangeYearRange}
              />
            </Space>
            <Table
              columns={columns}
              style={{ width: "100%", height: "100%", cursor: "pointer" }}
              dataSource={astManagerAgency}
              bordered
              onRow={(record: CallQuantityDto) => {
                return {
                  onClick: () => {
                    setSelected(record);
                  },
                };
              }}
              size="small"
              pagination={false}
              scroll={{ y: "calc(100vh - 250px)" }}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};
const Content = styled.span`
  font-size: 20pt;
  color: grey;
`;
