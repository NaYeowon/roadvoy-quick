/* eslint-disable */
import { Col, DatePicker, Descriptions, message, PageHeader, Row, Table } from "antd";
import { AxiosError } from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import api from "src/config/axios";
import { callFormat } from "src/util/FormatUtil";
import { CallQuantityDto } from "../shop/types";
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
    render: (call: number) => callFormat(call),
  },
  {
    title: "1월",
    dataIndex: "ulMonth1CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "2월",
    dataIndex: "ulMonth2CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "3월",
    dataIndex: "ulMonth3CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "4월",
    dataIndex: "ulMonth4CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "5월",
    dataIndex: "ulMonth5CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "6월",
    dataIndex: "ulMonth6CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "7월",
    dataIndex: "ulMonth7CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "8월",
    dataIndex: "ulMonth8CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "9월",
    dataIndex: "ulMonth9CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "10월",
    dataIndex: "ulMonth10CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "11월",
    dataIndex: "ulMonth11CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
  {
    title: "12월",
    dataIndex: "ulMonth12CallCount",
    width: 100,
    render: (call: number) => callFormat(call),
  },
];
export const CallQuantity = () => {
  const [astManageCallQuantity, setAstManageCallQuantity] = useState<CallQuantityDto[]>([]);
  const [selectCallQuantity, setSelectCallQuantity] = useState<CallQuantityDto | undefined>(
    undefined
  );
  const [year, setYear] = useState<moment.Moment>(moment());

  const handleChangeYearRange = val => {
    setYear(val[0]);
  };

  const CallQuantityList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/distrib/process-query/settlement.php",
      });
      setAstManageCallQuantity(response.data.lstCallStatistics);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  useEffect(() => {
    const delay = window.setInterval(CallQuantityList, 1000);
    return () => clearInterval(delay);
  }, []);

  return (
    <>
      <span>
        <DistributorStatistics />
      </span>
      <div style={{ paddingTop: "30px" }}>
        <Row>
          <Col span={4} pull={1}>
            <span style={{ width: "400px", paddingLeft: "10px" }}>
              년도 : <DatePicker picker="year" value={year} onChange={handleChangeYearRange} />
            </span>
          </Col>
          <Col span={20}>
            <Table columns={columns} bordered dataSource={astManageCallQuantity} />
          </Col>
        </Row>
      </div>
    </>
  );
};
