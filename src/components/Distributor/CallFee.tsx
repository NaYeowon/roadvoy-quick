/* eslint-disable */
import { Col, DatePicker, Descriptions, PageHeader, Row, Table } from "antd";
import DistributorStatistics from "./DistributorStatistics";

const columns = [
  {
    title: "대행명",
    dataIndex: "acCompany",
    width: 150,
  },
  {
    title: "연도합계",
    dataIndex: "ulYearTotalCallCount",
    width: 150,
  },
  {
    title: "1월",
    dataIndex: "ulMonth1CallCount",
    width: 100,
  },
  {
    title: "2월",
    dataIndex: "ulMonth2CallCount",
    width: 100,
  },
  {
    title: "3월",
    dataIndex: "ulMonth3CallCount",
    width: 100,
  },
  {
    title: "4월",
    dataIndex: "ulMonth4CallCount",
    width: 100,
  },
  {
    title: "5월",
    dataIndex: "ulMonth5CallCount",
    width: 100,
  },
  {
    title: "6월",
    dataIndex: "ulMonth6CallCount",
    width: 100,
  },
  {
    title: "7월",
    dataIndex: "ulMonth7CallCount",
    width: 100,
  },
  {
    title: "8월",
    dataIndex: "ulMonth8CallCount",
    width: 100,
  },
  {
    title: "9월",
    dataIndex: "ulMonth9CallCount",
    width: 100,
  },
  {
    title: "10월",
    dataIndex: "ulMonth10CallCount",
    width: 100,
  },
  {
    title: "11월",
    dataIndex: "ulMonth11CallCount",
    width: 100,
  },
  {
    title: "12월",
    dataIndex: "ulMonth12CallCount",
    width: 100,
  },
];

export const CallFee = () => {
  return (
    <>
      <span>
        <DistributorStatistics />
      </span>
      <div style={{ paddingTop: "30px" }}>
        <Row>
          <Col span={4} pull={1}>
            <span style={{ width: "400px", paddingLeft: "10px" }}>
              년도 : <DatePicker picker="year" />
            </span>
          </Col>
          <Col span={20}>
            <Table columns={columns} bordered />
          </Col>
        </Row>
      </div>
    </>
  );
};
