/* eslint-disable */
import { FC, useEffect, useState } from "react";
import { Col, Descriptions, Table, Button } from "antd";
import { RiderInfo } from "../shop/types";
import moment from "moment";
import { CircularProgress } from "@material-ui/core";
import axios from "axios";
import LoginHelper from "../../pages/shared/LoginHelper";
import RiderDailyTotal from "../../dto/RiderDailyTotal";
import RiderDaily from "../../dto/RiderDaily";

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
  },
  {
    title: "배달",
    children: [
      {
        title: "콜수",
        dataIndex: "usDayDoneCallSum",
        key: "usDayDoneCallSum",
        width: 60,
      },
      {
        title: "배달비",
        dataIndex: "lDayTotalRevenue",
        key: "lDayTotalRevenue",
        width: 100,
      },
      {
        title: "콜수수료",
        dataIndex: "lDayDeliCost",
        key: "lDayDeliCost",
        width: 100,
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
      },
      {
        title: "배달비",
        dataIndex: "lDayErrandCharge",
        key: "lDayErrandCharge",
        width: 100,
      },
      {
        title: "심부름 수수료",
        dataIndex: "lDayErrandFeeAgency",
        key: "lDayErrandFeeAgency",
        width: 100,
      },
    ],
  },
  {
    title: "리스료",
    dataIndex: "lDayCycleLeaseCost",
    key: "lDayCycleLeaseCost",
    width: 100,
  },
  {
    title: "기사↔기사",
    children: [
      {
        title: "캐시입금",
        dataIndex: "ulSubstituteCashPlus",
        key: "ulSubstituteCashPlus",
        width: 100,
      },
      {
        title: "캐시송금",
        dataIndex: "ulSubstituteCashMinus",
        key: "ulSubstituteCashMinus",
        width: 100,
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
      },
      {
        title: "카드↔현금 송금",
        dataIndex: "ulSubstituteRefund",
        key: "ulSubstituteRefund",
        width: 100,
      },
      {
        title: "예치금송금",
        dataIndex: "ulSubstituteDeposit",
        key: "ulSubstituteDeposit",
        width: 100,
      },
      {
        title: "현금건 완료시 자동송금",
        dataIndex: "ulCashPaymentAutoTransferAmount",
        key: "ulCashPaymentAutoTransferAmount",
        width: 100,
      },
    ],
  },
  {
    title: "직권 회수 당한 예치금(지출)",
    dataIndex: "ulSubstituteCashMinusByManager",
    key: "ulSubstituteCashMinusByManager",
    width: 100,
  },
  {
    title: "직권 회수 예치금(수입)",
    dataIndex: "ulSubstituteCashPlusByManager",
    key: "ulSubstituteCashPlusByManager",
    width: 100,
  },
  {
    title: "가상계좌입금",
    dataIndex: "ulVirBankDeposit",
    key: "ulVirBankDeposit",
    width: 100,
  },
  {
    title: "출금",
    children: [
      {
        title: "직접출금",
        dataIndex: "ulReClaimAmount",
        key: "ulReClaimAmount",
        width: 100,
      },
      {
        title: "수수료",
        dataIndex: "ulReClaimComm",
        key: "ulReClaimComm",
        width: 100,
      },
      {
        title: "본사출금",
        dataIndex: "ulCreditAmount",
        key: "ulCreditAmount",
        width: 100,
      },
    ],
  },
  {
    title: "잔고",
    dataIndex: "lRealBalance",
    key: "lRealBalance",
    width: 100,
  },
  {
    title: "보증금",
    dataIndex: "lDayCourierDeposit",
    key: "lDayCourierDeposit",
    width: 100,
  },
  {
    title: "출금가능액",
    dataIndex: "lReclaimableBalance",
    key: "lReclaimableBalance",
    width: 100,
  },
  {
    title: "갚지못한금액",
    children: [
      {
        title: "콜수수료",
        dataIndex: "lNonDeliCost",
        key: "lNonDeliCost",
        width: 100,
      },
      {
        title: "리스료",
        dataIndex: "lNonCycleLeaseCost",
        key: "lNonCycleLeaseCost",
        width: 100,
      },
      {
        title: "전날까지누적 콜수수료",
        dataIndex: "lNonPrevNonDeliCost",
        key: "lNonPrevNonDeliCost",
        width: 100,
      },
      {
        title: "전날까지누적 리스료",
        dataIndex: "lNonPrevNonCycleLeaseCost",
        key: "lNonPrevNonCycleLeaseCost",
        width: 100,
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
      },
      {
        title: "리스료",
        dataIndex: "lRepayCycleLeaseCost",
        key: "lRepayCycleLeaseCost",
        width: 100,
      },
      {
        title: "전날콜수수료",
        dataIndex: "lRepayPrevNonDeliCost",
        key: "lRepayPrevNonDeliCost",
        width: 100,
      },
      {
        title: "전날리스료",
        dataIndex: "lRepayPrevNonCycleLeaseCost",
        key: "lRepayPrevNonCycleLeaseCost",
        width: 100,
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
    } catch (error) {
      console.log(error);
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
          <Button>다운로드</Button>
        </div>
        <Descriptions bordered column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }} size="small">
          <Descriptions.Item label="배달콜수">{`${stRiderDailyTotal.usDayDoneCallSum}콜`}</Descriptions.Item>
          <Descriptions.Item label="배달비">{`${stRiderDailyTotal.lDayTotalRevenue}원`}</Descriptions.Item>
          <Descriptions.Item label="콜수수료">{`${stRiderDailyTotal.lDayDeliCost}원`}</Descriptions.Item>

          <Descriptions.Item label="퀵콜수">{`${stRiderDailyTotal.usDayDoneErrandSum}콜`}</Descriptions.Item>
          <Descriptions.Item label="퀵배달비">{`${stRiderDailyTotal.lDayErrandCharge}원`}</Descriptions.Item>
          <Descriptions.Item label="퀵수수료">{`${stRiderDailyTotal.lDayErrandFeeAgency}원`}</Descriptions.Item>

          <Descriptions.Item label="기사 캐시입금">{`${stRiderDailyTotal.ulSubstituteCashPlus}원`}</Descriptions.Item>
          <Descriptions.Item label="기사 캐시송금">{`${stRiderDailyTotal.ulSubstituteCashMinus}원`}</Descriptions.Item>

          <Descriptions.Item label="현금→카드 입금">{`${stRiderDailyTotal.ulSubstituteInput}원`}</Descriptions.Item>
          <Descriptions.Item label="카드→현금 송금">{`${stRiderDailyTotal.ulSubstituteRefund}원`}</Descriptions.Item>
          <Descriptions.Item label="예치금송금">{`${stRiderDailyTotal.ulSubstituteDeposit}원`}</Descriptions.Item>
          <Descriptions.Item label="가상계좌입금">{`${stRiderDailyTotal.ulVirBankDeposit}원`}</Descriptions.Item>

          <Descriptions.Item label="출금">{`${stRiderDailyTotal.ulReClaimAmount}원`}</Descriptions.Item>
          <Descriptions.Item label="출금수수료">{`${stRiderDailyTotal.ulReClaimComm}원`}</Descriptions.Item>
          <Descriptions.Item label="본사출금">{`${stRiderDailyTotal.ulCreditAmount}원`}</Descriptions.Item>
        </Descriptions>
      </Col>

      <Col>
        <Table
          columns={columns}
          dataSource={astRiderDaily}
          bordered
          pagination={false}
          size="small"
          scroll={{ x: "calc(700px + 50%)", y: 650 }}
        />
        ,
      </Col>
    </div>
  );
};

export default RiderSettlementList;
