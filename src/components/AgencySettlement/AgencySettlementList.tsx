/* eslint-disable */
import { FC, useEffect, useState } from "react";
import { Table } from "antd";

import { AgencyDTO } from "../shop/types";
import AgencyDaily from "src/dto/AgencyDaily";
import LoginHelper from "src/pages/shared/LoginHelper";
import api from "src/config/axios";
import axios, { AxiosError } from "axios";
import { CircularProgress } from "@material-ui/core";
import { callFormat, costFormat } from "src/util/FormatUtil";

interface Props {
  agency: AgencyDTO;
  acStartDate: moment.Moment;
  acEndDate: moment.Moment;
}

const columns = [
  {
    title: "가맹콜수",
    dataIndex: "usDayDoneCallSum",
    width: 80,
  },
  {
    title: "기사 수행콜수",
    dataIndex: "usDayDoneCallSum",
    width: 80,
  },
  {
    title: "콜수수료",
    dataIndex: "lDayDeliCost",
    width: 50,
  },
  {
    title: "심부름 접수 대행수수료",
    dataIndex: "lDayErrandFeeAgency",
    width: 100,
  },
  {
    title: "관리비",
    dataIndex: "lDayReChargeAmount",
    width: 80,
  },
  {
    title: "콜 당 수수료",
    dataIndex: "ulDayCallCntFee",
    width: 100,
  },
  {
    title: "기사 일차감 총액",
    dataIndex: "lDayCycleLeaseCost",
    width: 100,
  },
  {
    title: "기사 일차감 실수입",
    dataIndex: "",
    width: 100,
  },
  {
    title: "탈퇴 가맹 환불액",
    dataIndex: "lDayRefundAmount",
    width: 100,
  },
  {
    title: "탈퇴 기사 환불액",
    dataIndex: "lDayRefundAmtCour",
    width: 100,
  },
  {
    title: "기사→대행 캐시송금",
    dataIndex: "ulSubstituteDeposit",
    width: 100,
  },
  {
    title: "가상계좌 입금",
    dataIndex: "ulVirBankDeposit",
    width: 100,
  },
  {
    title: "가상계좌 수수료",
    dataIndex: "ulVirBankFee",
    width: 100,
  },
  {
    title: "프로그램 사용료",
    dataIndex: "ulDayBizProfitAmt",
    width: 100,
  },
  {
    title: "본사직권 출금",
    dataIndex: "ulCreditAmount",
    width: 100,
  },
  {
    title: "출금",
    dataIndex: "ulReClaimAmount",
    width: 100,
  },
  {
    title: "출금수수료",
    dataIndex: "ulReClaimComm",
    width: 100,
  },
  {
    title: "관리자가 회수한 캐시",
    dataIndex: "ulSubstituteCashMinusByManager",
    width: 100,
  },
];

const AgencySettlementList: FC<Props> = ({ agency, acStartDate, acEndDate }) => {
  const [astAgencyDaily, setAstAgencyDaily] = useState<AgencyDaily[]>([]);

  useEffect(() => {
    if (agency && acStartDate) {
      getRiderSettlementDetail();
    }
  }, [agency, acStartDate, acEndDate]);

  const getRiderSettlementDetail = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/agency/errand/settlement/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
        params: {
          ucAreaNo: agency.ucAreaNo,
          ucDistribId: agency.ucDistribId,
          ucAgencyId: agency.ucAgencyId,
          ucMemCourId: agency.ucMemCourId,
          acStartDate: acStartDate.format("YYYY-MM-DD"),
          acEndDate: acEndDate.format("YYYY-MM-DD"),
        },
      });

      const { data } = response;

      setAstAgencyDaily(data.astErrandSettlementList);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다");
      }
    }
  };

  if (!astAgencyDaily) {
    return <CircularProgress title="로딩중" />;
  }
  return (
    <>
      <span style={{ float: "left" }}>{agency.acCompany}</span>

      <Table
        columns={columns}
        dataSource={astAgencyDaily}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: "calc(100vh - 200px)" }}
      />
    </>
  );
};

export default AgencySettlementList;
