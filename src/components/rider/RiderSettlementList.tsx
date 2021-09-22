/* eslint-disable */
import { FC, useEffect, useState } from "react";
import { Col, Descriptions, Table, Button } from "antd";
import RiderInfo1, { RiderInfo } from "../shop/types";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import axios, { AxiosError } from "axios";
import LoginHelper from "../../pages/shared/LoginHelper";
import RiderDailyTotal from "../../dto/RiderDailyTotal";
import RiderDaily from "../../dto/RiderDaily";
import { callFormat, costFormat } from "src/util/FormatUtil";
import DateUtil from "src/util/DateUtil";
import { NavLink } from "react-router-dom";
import api from "../../config/axios";

interface Props {
  riderInfo: RiderInfo;
  acStartDate: moment.Moment;
  acEndDate: moment.Moment;
}

const columns = [
  {
    title: "영업일",
    dataIndex: "acBizDate",
    key: "acBizDate",
    width: 100,
    render: date => {
      return DateUtil.formatShortDate(date);
    },
  },
  {
    title: "배달",
    children: [
      {
        title: "콜수",
        dataIndex: "usDayDoneCallSum",
        key: "usDayDoneCallSum",
        width: 60,
        render: (text, record) => {
          return (
            <NavLink
              to={{
                pathname: "RiderCallHistory",
              }}
            >
              <Button type="primary" size="small">
                {text.toLocaleString()}콜
              </Button>
            </NavLink>
          );
        },
      },
      {
        title: "배달비",
        dataIndex: "lDayTotalRevenue",
        key: "lDayTotalRevenue",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "콜수수료",
        dataIndex: "lDayDeliCost",
        key: "lDayDeliCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "수입",
        dataIndex: "lDayDeliIncome",
        key: "lDayDeliIncome",
        width: 100,
      },
    ],
  },
  {
    title: "심부름",
    children: [
      {
        title: "콜수",
        dataIndex: "usDayDoneErrandSum",
        key: "usDayDoneErrandSum",
        width: 60,
        render: (text, record) => {
          return (
            <NavLink
              to={{
                pathname: "RiderCallHistory",
              }}
            >
              <Button type="primary" size="small">
                {text.toLocaleString()}콜
              </Button>
            </NavLink>
          );
        },
      },
      {
        title: "배달비",
        dataIndex: "lDayErrandCharge",
        key: "lDayErrandCharge",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "심부름 수수료",
        dataIndex: "lDayErrandFeeAgency",
        key: "lDayErrandFeeAgency",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "리스료",
    dataIndex: "lDayCycleLeaseCost",
    key: "lDayCycleLeaseCost",
    width: 100,

    render: (cost: number) => costFormat(cost),
  },
  {
    title: "기사↔기사",
    children: [
      {
        title: "캐시입금",
        dataIndex: "ulSubstituteCashPlus",
        key: "ulSubstituteCashPlus",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "캐시송금",
        dataIndex: "ulSubstituteCashMinus",
        key: "ulSubstituteCashMinus",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "기사↔가맹",
    children: [
      {
        title: "현금↔카드 입금",
        dataIndex: "ulSubstituteInput",
        key: "ulSubstituteInput",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "카드↔현금 송금",
        dataIndex: "ulSubstituteRefund",
        key: "ulSubstituteRefund",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "예치금송금",
        dataIndex: "ulSubstituteDeposit",
        key: "ulSubstituteDeposit",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "현금건 완료시 자동송금",
        dataIndex: "ulCashPaymentAutoTransferAmount",
        key: "ulCashPaymentAutoTransferAmount",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "직권 회수 당한 예치금(지출)",
    dataIndex: "ulSubstituteCashMinusByManager",
    key: "ulSubstituteCashMinusByManager",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "직권 회수 예치금(수입)",
    dataIndex: "ulSubstituteCashPlusByManager",
    key: "ulSubstituteCashPlusByManager",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "가상계좌입금",
    dataIndex: "ulVirBankDeposit",
    key: "ulVirBankDeposit",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "출금",
    children: [
      {
        title: "직접출금",
        dataIndex: "ulReClaimAmount",
        key: "ulReClaimAmount",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "수수료",
        dataIndex: "ulReClaimComm",
        key: "ulReClaimComm",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "본사출금",
        dataIndex: "ulCreditAmount",
        key: "ulCreditAmount",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "잔고",
    dataIndex: "lRealBalance",
    key: "lRealBalance",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "보증금",
    dataIndex: "lDayCourierDeposit",
    key: "lDayCourierDeposit",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "출금가능액",
    dataIndex: "lReclaimableBalance",
    key: "lReclaimableBalance",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "갚지못한금액",
    children: [
      {
        title: "콜수수료",
        dataIndex: "lNonDeliCost",
        key: "lNonDeliCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "리스료",
        dataIndex: "lNonCycleLeaseCost",
        key: "lNonCycleLeaseCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "전날까지누적 콜수수료",
        dataIndex: "lNonPrevNonDeliCost",
        key: "lNonPrevNonDeliCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "전날까지누적 리스료",
        dataIndex: "lNonPrevNonCycleLeaseCost",
        key: "lNonPrevNonCycleLeaseCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "갚은금액",
    children: [
      {
        title: "콜수수료",
        dataIndex: "lRepayDeliCost",
        key: "lRepayDeliCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "리스료",
        dataIndex: "lRepayCycleLeaseCost",
        key: "lRepayCycleLeaseCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "전날콜수수료",
        dataIndex: "lRepayPrevNonDeliCost",
        key: "lRepayPrevNonDeliCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "전날리스료",
        dataIndex: "lRepayPrevNonCycleLeaseCost",
        key: "lRepayPrevNonCycleLeaseCost",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
];

const RiderSettlementList: FC<Props> = ({ riderInfo, acStartDate, acEndDate }) => {
  const [astRiderDaily, setAstRiderDaily] = useState<RiderDaily[]>([]);
  const [stRiderDailyTotal, setStRiderDailyTotal] = useState<RiderDailyTotal | undefined>();

  useEffect(() => {
    if (riderInfo && acStartDate) {
      getRiderSettlementDetail();
    }
  }, [riderInfo, acStartDate, acEndDate]);

  const getRiderSettlementDetail = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/shared/rider/settlement/detail/index.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
        params: {
          ucAreaNo: riderInfo.ucAreaNo,
          ucDistribId: riderInfo.ucDistribId,
          ucAgencyId: riderInfo.ucAgencyId,
          ucMemCourId: riderInfo.ucMemCourId,
          acStartDate: acStartDate.format("YYYY-MM-DD"),
          acEndDate: acEndDate.format("YYYY-MM-DD"),
        },
      });

      const { data } = response;

      setAstRiderDaily(data.lstRiderDaily);
      setStRiderDailyTotal(data.stRiderDailyTotal);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다");
      }
    }
  };

  if (!astRiderDaily || !stRiderDailyTotal) {
    return <CircularProgress title="로딩중" />;
  }

  return (
    <div>
      <Col>
        <div>
          <span style={{ float: "left" }}>{riderInfo.acPresident}</span>
          <Button
            onClick={() => {
              const fileName = `기사정산 ${acStartDate.format("YYYY-MM-DD")} ~ ${acEndDate.format(
                "YYYY-MM-DD"
              )}.xlsx`;
              api({
                method: "GET",
                url: "https://api.roadvoy.net/shared/rider/settlement/export/index.php",
                params: {
                  acStartDate: acStartDate.format("YYYY-MM-DD"),
                  acEndDate: acEndDate.format("YYYY-MM-DD"),
                },
                responseType: "blob",
              }).then(response => {
                const url = window.URL.createObjectURL(
                  new Blob([response.data], { type: response.headers["content-type"] })
                );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("dowonload", fileName);
                document.body.appendChild(link);
                link.click();
              });
            }}
          >
            다운로드
          </Button>
        </div>
        <Descriptions bordered column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }} size="small">
          <Descriptions.Item label="배달콜수">
            {callFormat(stRiderDailyTotal.usDayDoneCallSum)}
          </Descriptions.Item>
          <Descriptions.Item label="배달비">
            {costFormat(stRiderDailyTotal.lDayTotalRevenue)}
          </Descriptions.Item>
          <Descriptions.Item label="콜수수료">
            {costFormat(stRiderDailyTotal.lDayDeliCost)}
          </Descriptions.Item>

          <Descriptions.Item label="퀵콜수">
            {callFormat(stRiderDailyTotal.usDayDoneErrandSum)}
          </Descriptions.Item>
          <Descriptions.Item label="퀵배달비">
            {costFormat(stRiderDailyTotal.lDayErrandCharge)}
          </Descriptions.Item>
          <Descriptions.Item label="퀵수수료">
            {costFormat(stRiderDailyTotal.lDayErrandFeeAgency)}
          </Descriptions.Item>

          <Descriptions.Item label="기사 캐시입금">
            {costFormat(stRiderDailyTotal.ulSubstituteCashPlus)}
          </Descriptions.Item>
          <Descriptions.Item label="기사 캐시송금">
            {costFormat(stRiderDailyTotal.ulSubstituteCashMinus)}
          </Descriptions.Item>

          <Descriptions.Item label="현금→카드 입금">
            {costFormat(stRiderDailyTotal.ulSubstituteInput)}
          </Descriptions.Item>
          <Descriptions.Item label="카드→현금 송금">
            {costFormat(stRiderDailyTotal.ulSubstituteRefund)}
          </Descriptions.Item>
          <Descriptions.Item label="예치금송금">
            {costFormat(stRiderDailyTotal.ulSubstituteDeposit)}
          </Descriptions.Item>
          <Descriptions.Item label="가상계좌입금">
            {costFormat(stRiderDailyTotal.ulVirBankDeposit)}
          </Descriptions.Item>

          <Descriptions.Item label="출금">
            {costFormat(stRiderDailyTotal.ulReClaimAmount)}
          </Descriptions.Item>
          <Descriptions.Item label="출금수수료">
            {costFormat(stRiderDailyTotal.ulReClaimComm)}
          </Descriptions.Item>
          <Descriptions.Item label="본사출금">
            {costFormat(stRiderDailyTotal.ulCreditAmount)}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      <Col>
        <Table
          columns={columns}
          dataSource={astRiderDaily}
          bordered
          pagination={false}
          size="small"
          scroll={{ y: 560 }}
        />
        ,
      </Col>
    </div>
  );
};

export default RiderSettlementList;
