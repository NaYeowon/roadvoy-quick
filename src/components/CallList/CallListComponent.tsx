/* eslint-disable */
import * as React from "react";
import { useState, useEffect } from "react";
import { message, Table, Checkbox, Tag } from "antd";
import styled from "styled-components";
import "./Call.css";

import axios from "axios";
import { ColumnsType } from "antd/lib/table";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import { costFormat, getCellNoFormat, getDateFormat } from "../../util/FormatUtil";

interface CallInfo {
  title: string;
  dataIndex: string;
  width: number;
  ulGoodsPrice: number;
  ucLeadTime: number;
  ucLimitTime: number;
  ucDeliStatus: number;
  acDestCompany: string;
}

const columns: ColumnsType<CallInfo> = [
  {
    title: "가맹명",
    dataIndex: "acDestCompany",
    key: "acDestCompany",
    className: "deli-status",
    width: 120,
    render: (text: string, record: CallInfo) => record.acDestCompany
  },
  {
    title: "접수",
    dataIndex: "acOrderDateTime",
    className: "deli-status",
    width: 50,
    render: (data: string, record: CallInfo) => getDateFormat(data)
  },
  {
    title: "진행/조리",
    dataIndex: "ucLimitTime",
    className: "deli-status",
    width: 50,
    render: (dataIndex: number, record) => `분/${record.ucLimitTime}분`
  },
  {
    title: "주소",
    dataIndex: "acDestOldAddr",
    className: "deli-status",
    width: 200
  },
  {
    title: "배달비",
    dataIndex: "ulErrandCharge",
    className: "deli-status",
    width: 100,
    render: (cost: number) => costFormat(cost)
  },
  {
    title: "결제정보",
    dataIndex: "ucPaymentMode",
    className: "deli-status",
    width: 90,
    render: (dataIndex: number, record) => {
      const charge = Number(record.ulGoodsPrice).toLocaleString();
      switch (Number(dataIndex)) {
        case 2:
          return (
            <>
              <Tag color="#2db7f5">카드</Tag>ㅇ<span>{charge}원</span>
            </>
          );
        case 3:
          return (
            <>
              <Tag color="#87d068">현금</Tag>
              <span>{charge}원</span>
            </>
          );
        case 4:
          return (
            <>
              <Tag color="#f50">선결</Tag>
              <span>{charge.toLocaleString()}원</span>
            </>
          );
      }
    }
  },
  {
    title: "기사",
    dataIndex: "acCourPresident",
    className: "deli-status",
    width: 90
  },
  {
    title: "고객연락처",
    dataIndex: "acDestCellNo",
    className: "deli-status",
    width: 90,
    render: (phone: string) => getCellNoFormat(phone)
  }
];

const CallListComponent = () => {
  const [astErrand, setAstManageCall] = useState<CallInfo[]>([]);
  const [isCheckedTemp, setIsCheckedTemp] = useState(false);
  const [isCheckedWait, setIsCheckedWait] = useState(false);
  const [isCheckedAlloc, setIsCheckedAlloc] = useState(false);
  const [isCheckedPkup, setIsCheckedPkup] = useState(false);
  const [isCheckedDone, setIsCheckedDone] = useState(false);
  const [isCheckedCancel, setIsCheckedCancel] = useState(false);

  useEffect(() => {
    const delay = window.setInterval(fetchCallList, 1000);
    return () => clearInterval(delay);
  }, []);

  const fetchCallList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/agency/errand/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`
        },
        params: {
          acErrandDate: "2021-06-30"
        }
      });
      // console.log(response.data.astErrand)
      setAstManageCall(response.data.astErrand);
    } catch (e) {
      message.error(e.message);
    }
  };

  const TableList = (record: CallInfo) => {
    const className: any = [];

    if (Number(record.ucDeliStatus) === 1) {
      className.push("deli-status-temp");
      if (isCheckedTemp === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(record.ucDeliStatus) === 4) {
      className.push("deli-status-wait");
      if (isCheckedWait === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(record.ucDeliStatus) === 8) {
      className.push("deli-status-alloc");
      if (isCheckedAlloc === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(record.ucDeliStatus) === 16) {
      className.push("deli-status-pkup");
      if (isCheckedPkup === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(record.ucDeliStatus) === 32) {
      className.push("deli-status-done");
      if (isCheckedDone === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(record.ucDeliStatus) === 64) {
      className.push("deli-status-cancel");
      if (isCheckedCancel === false) {
        className.push(" box-checked-show");
      }
    }
    // console.log(typeof record.ucDeliStatus)

    return className.join("");
  };

  const alloc = (e: React.ChangeEvent) => {
    console.log(e);
    setIsCheckedAlloc(!isCheckedAlloc);
  };

  const pkup = (e: React.ChangeEvent) => {
    console.log(e);
    setIsCheckedPkup(!isCheckedPkup);
  };

  const done = (e: React.ChangeEvent) => {
    console.log(e);
    setIsCheckedDone(!isCheckedDone);
  };

  return (
    <>
      <Header />
      <Checkbox.Group style={{ width: "100%", display: "flex" }}>
        <CustomCheckbox
          value="대기"
          style={{ backgroundColor: "#00BCD4", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedWait}
        >
          대기 0콜
        </CustomCheckbox>
        <CustomCheckbox
          value="배차"
          style={{ backgroundColor: "#FF8F00", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedAlloc}
          onChange={alloc}
        >
          {" "}
          배차 0콜
        </CustomCheckbox>
        <CustomCheckbox
          value="픽업"
          style={{ backgroundColor: "#AA00FF", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedPkup}
          onChange={pkup}
        >
          픽업 0콜
        </CustomCheckbox>
        <CustomCheckbox
          value="완료"
          style={{ backgroundColor: "#4CAF50", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedDone}
          onChange={done}
        >
          완료 0콜
        </CustomCheckbox>
        <CustomCheckbox
          value="취소"
          style={{ backgroundColor: "#F44336", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedCancel}
        >
          취소 0콜
        </CustomCheckbox>
      </Checkbox.Group>
      <Table
        className="test"
        columns={columns}
        dataSource={astErrand}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: 650 }}
        rowClassName={TableList}
      />
    </>
  );
};
export default CallListComponent;

const CustomCheckbox = styled(Checkbox)`
  color: white;
  font-size: 11pt;
  font-weight: bold;
`;
