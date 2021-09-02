/* eslint-disable */
import * as React from "react";
import { useState, useEffect } from "react";
import { message, Table, Checkbox, Tag, Drawer, Button, Row, Col } from "antd";
import styled from "styled-components";
import "./Call.css";

import axios from "axios";
import { ColumnsType } from "antd/lib/table";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import { costFormat, getCellNoFormat, getDateFormat } from "../../util/FormatUtil";
import moment from "moment";
import ErrandType from "src/helpers/ErrandType";
import CallListModal from "./CallListModal";

export interface CallInfo {
  acErrandDate: string;
  ucAreaNo: string;
  ucDistribId: string;
  ucAgencyId: string;
  ucMemCourId: string;
  acTradeDate: string;
  ulTradeSeqNo: string;

  ulSplitPostPayment: number;
  ulSplitPrePayment: number;

  ulErrandDispatchAgencyFee: number;
  acCourCellNo: string;
  acOriginCompany: string;
  acDestMemo: string;
  ulErrandFeeAmount: number;
  ucErrandFeeRate: number;
  ucErrandSettlementType: number;
  ucAllocType: number;
  ucTripType: number;
  ulErrandFeeAgency: number;
  ulOriginLatiPos: number;
  ulOriginLongPos: number;
  ucErrandFeeType: number;

  acPickupDateTime: number;
  ulDestLongPos: number;
  ulDestLatiPos: number;
  ulErrandSeqNo: number;
  acOriginMemo: string;
  acOriginCellNo: string;
  acDestCellNo: string;
  title: string;
  dataIndex: string;
  width: number;
  ulGoodsPrice: number;
  ucLeadTime: number;
  ucLimitTime: number;
  ucDeliStatus: number;
  acDestCompany: string;
  checked: boolean;
  usOrderCnt: number;
  acOrderDateTime: string;
  acDoneDateTime: string;
  acCancelDateTime: string;

  ulErrandCharge: number;
  ucPaymentMode: number;
  acClientMemo: string;
  acAllocDateTime: string;

  acDestOldAddr: string;
  acOriginOldAddr: string;
  ucErrandType: ErrandType;
  acDestAddrDesc: string;
  acCourPresident: string;
  acOriginAddrDesc: string;
  acOriginNewAddr: string;
  acDestNewAddr: string;
  onCancel: any;
  onOk: any;
  visible: any;
}

const columns: ColumnsType<CallInfo> = [
  {
    title: "상점명",
    dataIndex: "acOriginCompany",
    key: "acOriginCompany",
    className: "deli-status",
    width: 120,
    render: (text: string, record: CallInfo) => record.acOriginCompany
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
    render: (text: string, call: CallInfo) => {
      const diff = Math.abs(moment().valueOf() - moment(call.acOrderDateTime).valueOf());
      return Math.floor(diff / 1000 / 60) + "분/" + `${call.ucLimitTime}` + "분";
    }
  },
  {
    title: "주소",
    dataIndex: "ulErrandCharge",
    className: "deli-status",
    width: 200,
    render: (text: string, call: CallInfo) => {
      if (call.ucErrandType == ErrandType.DIFFERENT_DESTINATION) {
        const originAddr = call.acOriginOldAddr ? call.acOriginOldAddr : call.acOriginNewAddr;
        const destAddr = call.acDestOldAddr ? call.acDestOldAddr : call.acDestNewAddr;
        return (
          <div>
            <div>
              <Tag color="volcano">픽업지</Tag>
              {originAddr} {call.acOriginAddrDesc}
            </div>
            <div>
              <Tag color="purple">목적지</Tag>
              {destAddr}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            <Tag color="purple">목적지</Tag>
            {call.acDestOldAddr} {call.acDestAddrDesc}
          </div>
        );
      }
    }
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
              <Tag color="#2db7f5">카드</Tag>
              <span>{charge}원</span>
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectCall, setSelectCall] = useState<CallInfo | undefined>(undefined);

  const [tempCount, setTempCount] = useState(0);
  const [waitCount, setWaitCount] = useState(0);
  const [allocCount, setAllocCount] = useState(0);
  const [pkupCount, setpkupCount] = useState(0);
  const [doneCount, setDoneCount] = useState(0);
  const [cancelCount, setCancleCount] = useState(0);

  const [isCheckedTemp, setIsCheckedTemp] = useState(true);
  const [isCheckedWait, setIsCheckedWait] = useState(true);
  const [isCheckedAlloc, setIsCheckedAlloc] = useState(true);
  const [isCheckedPkup, setIsCheckedPkup] = useState(true);
  const [isCheckedDone, setIsCheckedDone] = useState(true);
  const [isCheckedCancel, setIsCheckedCancel] = useState(true);

  const [callInfo, setCallInfo] = useState<CallInfo | undefined>(undefined);
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
          acErrandDate: moment().format("YYYY-MM-DD")
        }
      });
      const astErrand = response.data.astErrand as any[];
      setAstManageCall(
        astErrand.sort((a, b) => {
          return b.ulErrandSeqNo - a.ulErrandSeqNo;
        })
      );

      let temp: number = 0;
      let wait: number = 0;
      let alloc: number = 0;
      let pkup: number = 0;
      let done: number = 0;
      let cancel: number = 0;

      for (var i = 0; i < astErrand.length; i++) {
        if (astErrand[i].ucDeliStatus === 1) {
          temp += 1;
          setTempCount(temp);
        } else if (astErrand[i].ucDeliStatus === "4") {
          wait += 1;
          setWaitCount(wait);
        } else if (astErrand[i].ucDeliStatus === "8") {
          alloc += 1;
          setAllocCount(alloc);
        } else if (astErrand[i].ucDeliStatus === "16") {
          pkup += 1;
          setpkupCount(pkup);
        } else if (astErrand[i].ucDeliStatus === "32") {
          done += 1;
          setDoneCount(done);
        } else if (astErrand[i].ucDeliStatus === "64") {
          cancel += 1;
          setCancleCount(cancel);
        }
      }
    } catch (e) {
      message.error(e.message);
    }
  };

  const TableList = (callInfo: CallInfo) => {
    const className: any = [];

    if (Number(callInfo.ucDeliStatus) === 1) {
      className.push("deli-status-temp");
      if (isCheckedTemp === false) {
        className.push(" box-checked-xw");
      }
    }
    if (Number(callInfo.ucDeliStatus) === 4) {
      className.push("deli-status-wait");
      if (isCheckedWait === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(callInfo.ucDeliStatus) === 8) {
      className.push("deli-status-alloc");
      if (isCheckedAlloc === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(callInfo.ucDeliStatus) === 16) {
      className.push("deli-status-pkup");
      if (isCheckedPkup === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(callInfo.ucDeliStatus) === 32) {
      className.push("deli-status-done");
      if (isCheckedDone === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(callInfo.ucDeliStatus) === 64) {
      className.push("deli-status-cancel");
      if (isCheckedCancel === false) {
        className.push(" box-checked-show");
      }
    }

    return className.join("");
  };

  const temp = (e: React.ChangeEvent) => {
    console.log(e);
    setIsCheckedTemp(!isCheckedTemp);
  };

  const wait = (e: React.ChangeEvent) => {
    console.log(e);
    setIsCheckedWait(!isCheckedWait);
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

  const cancle = (e: React.ChangeEvent) => {
    console.log(e);
    setIsCheckedCancel(!isCheckedCancel);
  };

  const CallOk = () => {
    setIsModalVisible(false);
  };

  const CallCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Header />
      <Checkbox.Group
        style={{ width: "100%", display: "flex" }}
        defaultValue={["대기", "배차", "픽업", "완료", "취소"]}
      >
        <CustomCheckbox
          value="대기"
          style={{ backgroundColor: "#00BCD4", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedWait}
          onChange={wait}
        >
          대기 {waitCount}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="배차"
          style={{ backgroundColor: "#FF8F00", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedAlloc}
          onChange={alloc}
        >
          배차 {allocCount}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="픽업"
          style={{ backgroundColor: "#AA00FF", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedPkup}
          onChange={pkup}
        >
          픽업 {pkupCount}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="완료"
          style={{ backgroundColor: "#4CAF50", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedDone}
          onChange={done}
        >
          완료 {doneCount}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="취소"
          style={{ backgroundColor: "#F44336", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedCancel}
          onChange={cancle}
        >
          취소 {cancelCount}콜
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
        onRow={(callInfo: CallInfo) => {
          return {
            onClick: () => {
              setIsModalVisible(true);
              setSelectCall(callInfo);
              setCallInfo(callInfo);
            }
          };
        }}
      />
      <CallListModal
        visible={isModalVisible}
        onOk={CallOk}
        onCancel={CallCancel}
        callInfo={callInfo}
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
