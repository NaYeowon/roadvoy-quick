/* eslint-disable */
import React, { Component, useState, useEffect } from "react";

import "./Shop.css";
// eslint-disable-next-line import/order
import Header from "../Layout/Header";

import { message, PageHeader, Table } from "antd";

import "antd/dist/antd.css";
import axios from "axios";
import { ColumnsType } from "antd/lib/table";
import MemberHelper from "src/helpers/MemberHelper";

import NumberUtil from "../../util/NumberUtil";
import LoginHelper from "../../pages/shared/LoginHelper";
import { costFormat } from "../../util/FormatUtil";

// ================================
// react 는 props (property) 와 state 가 변경될 때 마다 render 가 호출되므로
// columns 와 같은 변수의 값은 한번 설정되면 변경되지 않는 값이므로
// render 밖에 정의해서 사용한다
// arr[0]['ucMemCourId'];
// arr[1]['ucMemCourId']

interface IShop {
  title: string;
  dataIndex: string;
  width: number;
  usDeliDoneCntSum: number;
  usMonthDeliDoneCntSum: number;
  ulVirAccDeposit: number;
  ulVirAccDeduct: number;
  lVirAccBalance: number;
  ucTimeExtraFareType: number;
  ucNightExtraFareType: number;
  ucRainyExtraFareType: number;
  ucAreaNo: string;
  ucDistribId: string;
  ucAgencyId: string;
  ucMemCourId: string;
}

const columns: ColumnsType<IShop> = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        width: 120,
        render: (text: string, record: IShop) => `${MemberHelper.formatMemberId(record)}`
      },
      {
        title: "가맹명",
        dataIndex: "acCompany",
        width: 160
      }
    ]
  },
  {
    title: "관리정보",
    children: [
      {
        title: "콜수",
        dataIndex: "ulCustCallCnt",
        key: "ulCustCallCnt",
        width: 100
      },
      {
        title: "관리비",
        dataIndex: "ulCustCallAmt",
        key: "ulCustCallAmt",
        width: 100,
        render: (cost: number) => costFormat(cost)
      },
      {
        title: "충전예정일",
        dataIndex: "acCustCallDueDate",
        key: "acCustCallDueDate",
        width: 100
      }
    ]
  },
  {
    title: "콜수",
    children: [
      {
        title: "당일",
        dataIndex: "usDeliDoneCntSum",
        key: "usDeliDoneCntSum",
        width: 80,

        sorter: (a, b) => a.usDeliDoneCntSum - b.usDeliDoneCntSum
      },
      {
        title: "당월",
        dataIndex: "usMonthDeliDoneCntSum",
        key: "usMonthDeliDoneCntSum",
        width: 80,
        sorter: (a, b) => a.usMonthDeliDoneCntSum - b.usMonthDeliDoneCntSum
      }
    ]
  },
  {
    title: "가상계좌",
    children: [
      {
        title: "잔액",
        dataIndex: "ulCurrentVirAccBalance",
        key: "ulCurrentVirAccBalance",
        width: 120,
        // render: (data1: any, data2: IShop) => {
        //   let format = (data2.ulVirAccDeposit + data2.lVirAccBalance - data2.ulVirAccDeduct)
        //   return format.toLocaleString()+'원'
        // }
        render: (string: any, record: IShop) =>
          NumberUtil.formatNumberWithText(
            Number(record.ulVirAccDeposit) +
              Number(record.lVirAccBalance) -
              Number(record.ulVirAccDeduct)
          )
      },
      {
        title: "가상계좌(우리은행)",
        dataIndex: "acVirtualAccount",
        key: "acVirtualAccount",
        width: 200
      }
    ]
  },
  {
    title: "할증",
    children: [
      {
        title: "시간",
        dataIndex: "ucTimeExtraFareType",
        key: "ucTimeExtraFareType",
        className: "time-extra-fare-column",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "심야",
        dataIndex: "ucNightExtraFareType",
        key: "ucNightExtraFareType",
        className: "night-extra-fare-column",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "우천",
        dataIndex: "ucRainyExtraFareType",
        key: "ucRainyExtraFareType",
        className: "rainy-extra-fare-column",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "장거리",
        dataIndex: "",
        key: "",
        className: "",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "시간초과(야간)",
        dataIndex: "",
        key: "",
        className: "",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "물건가격별",
        dataIndex: "",
        key: "",
        className: "",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "주문수정",
        dataIndex: "",
        key: "",
        className: "",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "구역",
        dataIndex: "",
        key: "",
        className: "",
        render: (text: string, record: IShop) => "",
        width: 30
      },
      {
        title: "기타",
        dataIndex: "",
        key: "",
        className: "",
        render: (text: string, record: IShop) => "",
        width: 30
      }
    ]
  }
];
// react 는 props (property) 와 state 가 변경될 때 마다 render 가 호출되므로
// columns 와 같은 변수의 값은 한번 설정되면 변경되지 않는 값이므로
// render 밖에 정의해서 사용한다
// ================================

const Shop = () => {
  const [astManageShop, setAstManageShop] = useState<IShop[]>([]);
  const fetchShopList = async () => {
    // ================================
    // 이 부분이 1초마다 호출되는 Routine
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/agency/shop/manage/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`
        }
      });

      setAstManageShop(response.data.astManageShop);
    } catch (e) {
      message.error(e.message);
    }
  };
  // 이 부분이 1초마다 호출되는 Routine
  // ================================

  // ================================
  // 이 부분이 Main Routine

  useEffect(() => {
    const delay = window.setInterval(fetchShopList, 1000);
    return () => clearInterval(delay);
  }, []);

  // 이 부분이 Main Routine
  // ================================

  return (
    <div>
      <div>
        <Header />
      </div>
      <PageHeader>
        <span>
          <b>{astManageShop?.length}</b>개의 가맹점이 등록 되어있습니다.
        </span>
        <span style={{ float: "right" }} />
      </PageHeader>
      <Table
        columns={columns}
        dataSource={astManageShop}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: 650 }}
        rowClassName={(record: IShop) => {
          const className: any = [];
          if (record.ucTimeExtraFareType === 1) {
            className.push("time-extra-fare-on");
          }
          if (record.ucNightExtraFareType === 1) {
            className.push("night-extra-fare-on");
          }
          if (record.ucRainyExtraFareType === 1) {
            className.push("rainy-extra-fare-on");
          }
          return className.join(" ");
        }}
      />
      ,
    </div>
  );
};
export default Shop;
