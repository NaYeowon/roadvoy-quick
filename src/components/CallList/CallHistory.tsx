/* eslint-disable */

import { Col, DatePicker, Row } from 'antd';
import moment from 'moment';
import Table from 'rc-table/lib/Table';
import React, { useState } from 'react';
import ErrandHelper from 'src/helpers/ErrandHelper';
import Header from '../Layout/Header';
import { CallInfo } from './CallListComponent';
import './CallHistory.css'

const { RangePicker } = DatePicker;

interface Props {
  astErrandSettlementList: [];
  astErrand: CallInfo[];
  astFilteredErrand: CallInfo[];
  acSelectedDate: string;

  startDate: moment.Moment;
  endDate: moment.Moment;
}

const dateListColumns = [
    {
      title: "일자",
      dataIndex: "acErrandDate",
      key: "acErrandDate",
      width: 100,
      render: (text, record) => {
        return moment(record.acErrandDate).format("MM월 DD일");
      },
    },
    {
      title: "건수",
      dataIndex: "ulCnt",
      width: 50,
      render: (text, record) => {
        return `${parseInt(record.ulCnt).toLocaleString()}건`;
      },
    },
    {
      title: "수수료",
      dataIndex: "ulTotalErrandFeeAgency",
      width: 70,
      render: (text, record) => {
        return `${parseInt(record.ulTotalErrandFeeAgency).toLocaleString()}`;
      },
    },
    {
      title: "배달비",
      dataIndex: "ulTotalErrandCharge",
      width: 80,
      render: (text, record) => {
        return `${parseInt(record.ulTotalErrandCharge).toLocaleString()}`;
      },
    },
  ];
  const columns = [
    {
      title: "콜번호",
      dataIndex: "ulErrandSeqNo",
      key: "ulErrandSeqNo",
      width: 60,
    },
    {
      title: "콜일자",
      dataIndex: "acErrandDate",
      width: 100,
    },
    {
      title: "콜시간",
      dataIndex: "acOrderDateTime",
      render: (text, record) => {
        return moment(record.acOrderDateTime).format("HH:mm:ss");
      },
      width: 80,
    },
    {
      title: "픽업지명",
      dataIndex: "acOriginCompany",
      key: "acOriginCompany",
      width: 100,
    },
    {
      title: "목적지명",
      dataIndex: "acDestCompany",
      key: "acDestCompany",
      width: 100,
    },
    {
      title: "주소",
      render: (text, record) => {
        return ErrandHelper.formatAddress(record);
      },
      width: 280,
    },
    {
      title: "고객연락처",
      dataIndex: "acCompany",
      key: "acCompany",
     
      width: 160,
    },
    {
      title: "배달비",
      render: (text, record) => {
        return `${record.ulErrandCharge.toLocaleString()}원`;
      },
      width: 80,
    },
    {
      title: "수수료",
      render: (text, record) => {
        return `${record.ulErrandFeeAgency.toLocaleString()}원`;
      },
      width: 50,
    },
    {
      title: "결제정보",
      
      width: 120,
    },
    {
      title: "주행",
      
      width: 50,
    },
    {
      title: "정산",
    
      width: 50,
    },
    {
      title: "기사연락처",
      dataIndex: "acCourCellNo",
  
      width: 160,
    },
    {
      title: "배차시간",
      render: (text, record) => {
        return record.acAllocDateTime ? moment(record.acAllocDateTime).format("HH:mm:ss") : "";
      },
      width: 80,
    },
    {
      title: "픽업시간",
      render: (text, record) => {
        return record.acPickupDateTime ? moment(record.acPickupDateTime).format("HH:mm:ss") : "";
      },
      width: 80,
    },
    {
      title: "완료시간",
      render: (text, record) => {
        return record.acDoneDateTime ? moment(record.acDoneDateTime).format("HH:mm:ss") : "";
      },
      width: 80,
    },
    {
      title: "취소시간",
      render: (text, record) => {
        return record.acCancelDateTime ? moment(record.acCancelDateTime).format("HH:mm:ss") : "";
      },
      width: 80,
    },
  ];
const CallHistory = (props: Props) => {
  const [astErrand, setAstErrand] = useState<CallInfo[]>([])
  const [astErrandSettlementList, setAstErrandSettlementList] = useState<CallInfo[]>([])
  const [astFilteredErrand, setAstFilteredErrand] = useState<CallInfo[]>([])
  const [acSelectedDate, setAcSelectedDate] = useState(null)
  const [StartDate, setStartDate] = useState<moment.Moment>(moment().startOf("month"));
  const [EndDate, setEndDate] = useState<moment.Moment>(moment());

  const handleChangeDateRange = val => {
    setStartDate(val[0]);
    setEndDate(val[1]);
  };



    return (
      <>
      <Header />
      <div className="page-body-wrapper">
        <div className="errand-page-header">
          <RangePicker
            className="errand-header-range-date-picker"
            format="YYYY-MM-DD"
            value={[StartDate, EndDate]}
            onChange={handleChangeDateRange}
          />
        </div>
        <div className="errand-settlement-date-list-wrapper">
          <Table
            className="rovo-scroll-table errand-date-list-table-wrapper"
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            rowKey={record => {
              return record.acErrandDate;
            }}
            scroll={{ x: "2500" }}
            columns={dateListColumns}
          />
        </div>
        <div id="errand-list-wrapper">
          <Table
            className="rovo-scroll-table errand-list-table-wrapper"
            style={{ width: "100%", height: "calc(100%)", cursor: "pointer" }}
            rowKey={record => {
              return record.ulErrandSeqNo;
            }}
           
            scroll={{ x: "2400" }}
            columns={columns}
          />
        </div>
      </div>
      </>
    );
  }

export default CallHistory;
