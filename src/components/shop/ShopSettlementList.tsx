/* eslint-disable */
import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Col, Descriptions, Table, Button } from "antd";
import { callFormat, costFormat } from "../../util/FormatUtil";
import { ShopInfo } from "./types";
import axios, { AxiosError } from "axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import { CircularProgress } from "@material-ui/core";
import ShopDaily from "src/dto/ShopDaily";
import ShopDailyTotal from "src/dto/ShopDailyTotal";
import DateUtil from "src/util/DateUtil";
import { NavLink } from "react-router-dom";

interface Props {
  shopInfo: ShopInfo;
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
                pathname: "ShopCallHistory",
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
        dataIndex: "ulDayTotalDeliFee",
        key: "ulDayTotalDeliFee",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "콜당 수수료",
        dataIndex: "ulDayCallCntFee",
        key: "ulDayCallCntFee",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "관리비 충전",
    dataIndex: "1DayReChargeAmount",
    key: "1DayReChargeAmount",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "기사 가맹간 캐시",
    children: [
      {
        title: "카드→현금 입금",
        dataIndex: "ulSubstituteInput",
        key: "ulSubstituteInput",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "현금→카드 송금",
        dataIndex: "ulSubstituteRefund",
        key: "ulSubstituteRefund",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "기사가 예치금 입금",
        dataIndex: "ulSubstituteDeposit",
        key: "ulSubstituteDeposit",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "현금건 완료시 자동송금",
        dataIndex: "ulCashPaymentAutoReansferAmount",
        key: "ulCashPaymentAutoReansferAmount",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "캐시 관리자 직권회수",
    dataIndex: "ulSubstituteCashMinusByManager",
    key: "ulSubstituteCashMinusByManager",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "가상계좌",
    children: [
      {
        title: "입금",
        dataIndex: "ulVirBankDeposit",
        key: "ulVirBankDeposit",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "수수료",
        dataIndex: "ulVirBankFee",
        key: "ulVirBankFee",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
];

const ShopSettlementList: FC<Props> = ({ shopInfo, acStartDate, acEndDate }) => {
  const [astShopDaily, setAstShopDaily] = useState<ShopDaily[]>([]);
  const [stShopDailyTotal, setStShopDailyTotal] = useState<ShopDailyTotal | undefined>();

  useEffect(() => {
    if (shopInfo && acStartDate) {
      getShopSettlementDetail();
    }
  }, [shopInfo, acStartDate, acEndDate]);

  const getShopSettlementDetail = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/shared/shop/settlement/detail/index.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
        params: {
          ucAreaNo: shopInfo.ucAreaNo,
          ucDistribId: shopInfo.ucDistribId,
          ucAgencyId: shopInfo.ucAgencyId,
          ucMemCourId: shopInfo.ucMemCourId,
          acStartDate: acStartDate.format("YYYY-MM-DD"),
          acEndDate: acEndDate.format("YYYY-MM-DD"),
        },
      });

      const { data } = response;

      setAstShopDaily(data.lstFranchiseDaily);
      setStShopDailyTotal(data.stFranchiseDailyTotal);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다.");
      }
    }
  };

  if (!astShopDaily || !stShopDailyTotal) {
    return <CircularProgress title="로딩중" />;
  }
  return (
    <div>
      <Col>
        <div>
          <span style={{ float: "left" }}>{shopInfo.acCompany}</span>
          <Button>다운로드</Button>
        </div>
        <Descriptions bordered column={{ xxl: 5, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }} size="small">
          <Descriptions.Item label="배달콜수">
            {callFormat(stShopDailyTotal.usDayDoneCallSum)}
          </Descriptions.Item>
          <Descriptions.Item label="배달비">
            {costFormat(stShopDailyTotal.ulDayTotalDeliFee)}
          </Descriptions.Item>
          <Descriptions.Item label="콜당수수료">
            {costFormat(stShopDailyTotal.ulDayCallCntFee)}
          </Descriptions.Item>
          <Descriptions.Item label="현금→카드 송금 ">
            {costFormat(stShopDailyTotal.ulSubstituteRefund)}
          </Descriptions.Item>
          <Descriptions.Item label="카드→현금 입금">
            {costFormat(stShopDailyTotal.ulSubstituteInput)}
          </Descriptions.Item>
          <Descriptions.Item label="기사가 캐시입금">
            {costFormat(stShopDailyTotal.ulSubstituteDeposit)}
          </Descriptions.Item>
          <Descriptions.Item label="캐시 관리자 직권회수">
            {costFormat(stShopDailyTotal.ulSubstituteCashMinusByManager)}
          </Descriptions.Item>
          <Descriptions.Item label="가상계좌 입금">
            {costFormat(stShopDailyTotal.ulVirBankDeposit)}
          </Descriptions.Item>
          <Descriptions.Item label="가상계좌 수수료">
            {costFormat(stShopDailyTotal.ulVirBankFee)}
          </Descriptions.Item>
        </Descriptions>
      </Col>

      <Col>
        <Table
          columns={columns}
          dataSource={astShopDaily}
          bordered
          pagination={false}
          size="small"
          scroll={{ y: "calc(100vh - 300px)" }}
        />
      </Col>
    </div>
  );
};

export default ShopSettlementList;
