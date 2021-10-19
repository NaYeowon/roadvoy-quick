/* eslint-disable */
import * as React from "react";
import { useState, useEffect } from "react";

import Header from "../Layout/Header";

import { Button, message, Modal, PageHeader, Table, Tag } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import { ColumnsType } from "antd/lib/table";
import MemberHelper from "src/helpers/MemberHelper";

import { costFormat } from "../../util/FormatUtil";
import LoginHelper from "../../pages/shared/LoginHelper";
import { RiderInfo, RiderSignUpRequest } from "../shop/types";
import RiderDetail from "./RiderDetail";
import { MemberGroupSelector } from "../Member";
import riderState from "./riderState";

const columns: ColumnsType<RiderSignUpRequest> = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        render: (text: string, record: RiderSignUpRequest) =>
          `${MemberHelper.formatMemberId(record)}`,
        width: 120,
      },
      {
        title: "이름",
        dataIndex: "acPresident",
        width: 80,
      },
      {
        title: "상태메세지",
        dataIndex: "acStatusMessage",
        width: 80,
      },
    ],
  },
  {
    title: "배달",
    children: [
      {
        title: "콜수수료",
        dataIndex: "lCallUnitPrice",
        key: "lCallUnitPrice",
        width: 80,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "당일",
        dataIndex: "usDayDoneCallSum",
        key: "usDayDoneCallSum",
        width: 80,
      },
      {
        title: "당월",
        dataIndex: "usMonthDoneCallSum",
        key: "usMonthDoneCallSum",
        width: 100,
      },
    ],
  },
  {
    title: "출금가능액",
    dataIndex: "lAccountBalance",
    key: "lAccountBalance",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "보증금",
    dataIndex: "lCourierDeposit",
    key: "lCourierDeposit",
    width: 100,
    render: (cost: number) => costFormat(cost),
  },
  {
    title: "리스료",
    children: [
      {
        title: "종류",
        dataIndex: "ucCourierTag",
        key: "ucCourierTag",
        width: 100,
        render: dataIndex => {
          if (dataIndex == 1) {
            return "지입";
          }
          return "대여";
        },
      },
      {
        title: "차감(매일)",
        dataIndex: "lCourierLease",
        key: "lCourierLease",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
    ],
  },
  {
    title: "패널티",
    children: [
      {
        title: "동시",
        dataIndex: "ucConCallLimit",
        key: "ucConCallLimit",
        width: 80,
        render: dataIndex => `${dataIndex} 콜`,
      },
      {
        title: "지연",
        dataIndex: "ucCallRtrvTime",
        key: "ucCallRtrvTime",
        width: 80,
        render: dataIndex => `${dataIndex}초`,
      },
    ],
  },
];
// eslint-disable-next-line @typescript-eslint/no-redeclare
const Rider = () => {
  const [astManageRider, setAstManageRider] = useState<RiderSignUpRequest[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectRider, setSelectRider] = useState<RiderSignUpRequest | undefined>(undefined);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const fetchRiderList = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "https://api.roadvoy.net/agency/rider/manage/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });

      setAstManageRider(response.data.astManageRider);
    } catch (e) {
      message.error(e.message);
    }
  };

  //   const [value,setVale] = useState(1);
  // const [isIncrease,setIsIncrease] = useState(false);
  // useEffect(()=>{
  //   const tick = () => {
  //        return setTimeOut(()=>setValue(value+1),1000);
  //     }
  //   if(!isIncrease) return undefined;
  //   tick();
  //   return ()=>clearTimeiout(tick);
  // },[value,isIncrease])

  useEffect(() => {
    const delay = window.setInterval(fetchRiderList, 1000);
    return () => clearInterval(delay);
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <PageHeader>
        <span>
          <b>{astManageRider?.length}</b>개의 기사가 등록 되어있습니다.
        </span>

        <span style={{ float: "right" }}>
          <MemberGroupSelector />
        </span>
      </PageHeader>
      <Table
        columns={columns}
        dataSource={astManageRider}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: 650 }}
        onRow={(riderInfo: RiderSignUpRequest) => {
          return {
            onClick: () => {
              setIsModalVisible(true);
              setSelectRider(riderInfo);
            },
          };
        }}
      />
      <RiderDetail
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        rider={selectRider}
        visible={isModalVisible}
      />
    </div>
  );
};
export default Rider;
