import * as React from "react";
import { useState, useEffect } from "react";
import { message, Table, Checkbox, Tag, PageHeader } from "antd";
import styled from "styled-components";
import "./Call.css";
import axios, { AxiosError } from "axios";
import { ColumnsType } from "antd/lib/table";

import Header from "../Layout/Header";
import LoginHelper from "../../pages/shared/LoginHelper";
import { costFormat, getCellNoFormat, getDateFormat } from "../../util/FormatUtil";
import moment from "moment";
import ErrandHelper from "src/helpers/ErrandHelper";
import api from "../../config/axios";
import DateUtil from "../../util/DateUtil";
import { ErrandDto, ErrandType } from "../../domain/Errand/model";
import { CallModal } from "./Modal";
import { MemberGroupSelector } from "../Member";

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

  // 경유지
  acStop1Company: string;
  acStop1Name: string;
  acStop1CellNo: string;
  acStop1Memo: string;
  ulStop1LatiPos: number;
  ulStop1LongPos: number;
  acStop1OldAddr: number;
  acStop1NewAddr: string;
  acStop1AddrDesc: string;
  acStop2CellNo: string;
  acStop2Company: string;
  acStop2Name: string;
  acStop2Memo: string;
  ulStop2LatiPos: number;
  ulStop2LongPos: number;
  acStop2OldAddr: string;
  acStop2NewAddr: string;
  acStop2AddrDesc: string;

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
export const getDeliStatus = (call: CallInfo) => {
  if (call.ucDeliStatus === 2) {
    return 4;
  }
  return call.ucDeliStatus;
};

const columns: ColumnsType<ErrandDto> = [
  {
    title: "상점명",
    dataIndex: "acOriginCompany",
    className: "deli-status",
    width: 120,
    render: (text: string, record: ErrandDto) => record.acDestCompany,
  },
  {
    title: "접수",
    dataIndex: "acOrderDateTime",
    className: "deli-status",
    width: 50,
    render: (data: string) => getDateFormat(data),
  },
  {
    title: "진행/조리",
    dataIndex: "ucLimitTime",
    className: "deli-status",
    width: 50,
    render: (text: string, call: ErrandDto) => {
      const diff = Math.abs(moment().valueOf() - moment(call.acOrderDateTime).valueOf());
      return Math.floor(diff / 1000 / 60) + "분/" + `${call.ucLimitTime}` + "분";
    },
  },
  {
    title: "주소",
    dataIndex: "ulErrandCharge",
    className: "deli-status",
    width: 200,
    render: (text: string, call: ErrandDto) => {
      return ErrandHelper.formatAddress(call);
    },
  },
  {
    title: "배달비",
    dataIndex: "ulErrandCharge",
    className: "deli-status",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "결제정보",
    dataIndex: "ucPaymentMode",
    className: "deli-status",
    width: 90,
    render: (value: number, record: ErrandDto) => {
      const charge = Number(record.ulGoodsPrice).toLocaleString();
      switch (Number(value)) {
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
              <span>{charge}원</span>
            </>
          );
        case 5:
          return (
            <>
              <Tag color="#f50">분할</Tag>
              <span>{charge}원</span>
            </>
          );
      }
    },
  },
  {
    title: "기사",
    dataIndex: "acCourPresident",
    className: "deli-status",
    width: 90,
  },
  {
    title: "고객연락처",
    dataIndex: "acDestCellNo",
    className: "deli-status",
    width: 90,
    render: (phone: string) => getCellNoFormat(phone),
  },
];

interface IDeliStatusCount {
  temp: number;
  wait: number;
  alloc: number;
  pkup: number;
  done: number;
  cancel: number;
}

const CallListComponent = () => {
  const [errandList, setErrandList] = useState<ErrandDto[]>([]);

  const [deliStatusCount, setDeliStatusCount] = useState<IDeliStatusCount>({
    temp: 0,
    wait: 0,
    alloc: 0,
    pkup: 0,
    done: 0,
    cancel: 0,
  });

  const [isCheckedTemp, setIsCheckedTemp] = useState(true);
  const [isCheckedWait, setIsCheckedWait] = useState(true);
  const [isCheckedAlloc, setIsCheckedAlloc] = useState(true);
  const [isCheckedPkup, setIsCheckedPkup] = useState(true);
  const [isCheckedDone, setIsCheckedDone] = useState(true);
  const [isCheckedCancel, setIsCheckedCancel] = useState(false);

  const [modalErrand, setModalErrand] = useState<ErrandDto | undefined>(undefined);

  useEffect(() => {
    const delay = window.setInterval(fetchCallList, 1000);
    return () => clearInterval(delay);
  }, []);

  const fetchCallList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/agency/errand/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
        params: {
          acErrandDate: DateUtil.getTodayMoment().format("YYYY-MM-DD"),
        },
      });
      const astErrand = response.data.astErrand as ErrandDto[];
      setErrandList(
        astErrand
          .sort((a, b) => {
            return b.ulErrandSeqNo - a.ulErrandSeqNo;
          })
          .sort((a, b) => {
            return a.ucDeliStatus - b.ucDeliStatus;
          })
      );

      const _deliStatusCount = {
        temp: 0,
        wait: 0,
        alloc: 0,
        pkup: 0,
        done: 0,
        cancel: 0,
      };

      for (let i = 0; i < astErrand.length; i++) {
        switch (Number(astErrand[i].ucDeliStatus)) {
          case 1:
            _deliStatusCount.temp++;
            break;
          case 4:
            _deliStatusCount.wait++;
            break;
          case 8:
            _deliStatusCount.alloc++;
            break;
          case 16:
            _deliStatusCount.pkup++;
            break;
          case 32:
            _deliStatusCount.done++;
            break;
          case 64:
            _deliStatusCount.cancel++;
            break;
        }
      }
      setDeliStatusCount(_deliStatusCount);
    } catch (e) {
      const error = e as Error;
      message.error(error.message);
    }
  };

  const TableList = (errand: ErrandDto) => {
    const className: any = [];

    if (Number(errand.ucDeliStatus) === 1) {
      className.push("deli-status-temp");
      if (isCheckedTemp === false) {
        className.push(" box-checked-xw");
      }
    }
    if (Number(errand.ucDeliStatus) === 4) {
      className.push("deli-status-wait");
      if (isCheckedWait === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(errand.ucDeliStatus) === 8) {
      className.push("deli-status-alloc");
      if (isCheckedAlloc === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(errand.ucDeliStatus) === 16) {
      className.push("deli-status-pkup");
      if (isCheckedPkup === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(errand.ucDeliStatus) === 32) {
      className.push("deli-status-done");
      if (isCheckedDone === false) {
        className.push(" box-checked-show");
      }
    }
    if (Number(errand.ucDeliStatus) === 64) {
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

  const handleCloseModal = () => {
    setModalErrand(undefined);
  };

  return (
    <>
      <Header />
      <PageHeader>
        <span style={{ float: "right" }}>
          <MemberGroupSelector />
        </span>
      </PageHeader>
      <Checkbox.Group
        style={{ width: "100%", display: "flex" }}
        defaultValue={["대기", "배차", "픽업", "완료"]}
      >
        <CustomCheckbox
          value="대기"
          style={{ backgroundColor: "#00BCD4", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedWait}
          onChange={wait}
        >
          대기 {deliStatusCount.wait}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="배차"
          style={{ backgroundColor: "#FF8F00", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedAlloc}
          onChange={alloc}
        >
          배차 {deliStatusCount.alloc}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="픽업"
          style={{ backgroundColor: "#AA00FF", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedPkup}
          onChange={pkup}
        >
          픽업 {deliStatusCount.pkup}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="완료"
          style={{ backgroundColor: "#4CAF50", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedDone}
          onChange={done}
        >
          완료 {deliStatusCount.done}콜
        </CustomCheckbox>
        <CustomCheckbox
          value="취소"
          style={{ backgroundColor: "#F44336", width: "20%", padding: "5px", margin: "0px" }}
          checked={isCheckedCancel}
          onChange={cancle}
        >
          취소 {deliStatusCount.cancel}콜
        </CustomCheckbox>
      </Checkbox.Group>
      <Table
        className="test"
        columns={columns}
        dataSource={errandList}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: "calc(100vh - 197px)" }}
        rowClassName={TableList}
        onRow={(errand: ErrandDto) => {
          return {
            onClick: () => {
              setModalErrand(errand);
            },
          };
        }}
      />
      <CallModal onOk={handleCloseModal} onCancel={handleCloseModal} errand={modalErrand} />
    </>
  );
};
export default CallListComponent;

const CustomCheckbox = styled(Checkbox)`
  color: white;
  font-size: 11pt;
  font-weight: bold;
`;
