/* eslint-disable */
import React, { Component, useEffect, useState } from "react";

// eslint-disable-next-line import/order
import Header from "../Layout/Header";

import { message, PageHeader, Table } from "antd";
import "antd/dist/antd.css";

import LoginHelper from "../../pages/shared/LoginHelper";
import { AgencyDTO } from "../shop/types";
import api from "src/config/axios";
import { MemberGroupSelector } from "../Member";
import AgencyDetail from "./AgencyDetail";
import MemberHelper from "src/helpers/MemberHelper";
import { DateFormat, getCellNoFormat } from "src/util/FormatUtil";
const columns = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        render: (text: string, record: AgencyDTO) => `${MemberHelper.formatMemberId(record)}`,
        width: 70,
      },
      {
        title: "총판명",
        dataIndex: "acCompany",
        width: 70,
      },
      {
        title: "사업자등록번호",
        dataIndex: "acBizRegNo",
        width: 70,
      },
      {
        title: "대표자명",
        dataIndex: "acPresident",
        width: 50,
      },
      {
        title: "가입일자",
        dataIndex: "acEntryDateTime",
        render: (data: string) => DateFormat(data),

        width: 50,
      },
      {
        title: "세금계산서발행",
        dataIndex: "ucTaxInvoType",
        render: (value: number, record: AgencyDTO) => {
          switch (Number(value)) {
            case 0:
              return "미발행";
            case 1:
              return "발행";
          }
        },
        width: 80,
      },
      {
        title: "구분",
        dataIndex: "ucDistribId",
        width: 30,
      },
    ],
  },
  {
    title: "연락처",
    children: [
      {
        title: "(업체)전화번호",
        dataIndex: "acPhoneNo",
        render: (phone: string) => getCellNoFormat(phone),
        width: 80,
      },
      {
        title: "(휴대)전화번호",
        dataIndex: "acCellNo",
        render: (phone: string) => getCellNoFormat(phone),
        width: 80,
      },
      {
        title: "주소",
        dataIndex: "acOldAddress" + "acAddressDesc",
        render: (text: string, record: AgencyDTO) => {
          return `${record.acOldAddress} ${record.acAddressDesc}`;
        },
        width: 200,
      },
    ],
  },
  {
    title: "Platform사용",
    children: [
      {
        title: "경고",
        dataIndex: "cDelayWarning",
        width: 30,
      },
      {
        title: "제한",
        dataIndex: "cUseRight",
        width: 30,
      },
    ],
  },
  {
    title: "가상계좌",
    children: [
      {
        title: "거래은행",
        dataIndex: "usVirtualBank",
        render: (value: number, record: AgencyDTO) => {
          switch (Number(value)) {
            case 88:
              return "신한은행";
            case 4:
              return "국민은행";
            case 3:
              return "기업은행";
            case 20:
              return "우리은행";
            case 90:
              return "카카오뱅크";
            case 89:
              return "케이뱅크";
            case 11:
              return "농협중앙회";
            case 2:
              return "산업은행";
            case 23:
              return "SC제일은행";
            case 81:
              return "KEB하나은행";
            case 27:
              return "씨티뱅크";
            case 7:
              return "수협은행";
            case 31:
              return "대구은행";
            case 32:
              return "부산은행";
            case 34:
              return "광주은행";
            case 35:
              return "제주은행";
            case 37:
              return "전북은행";
            case 39:
              return "경남은행";
          }
        },
        width: 50,
      },
      {
        title: "계좌번호",
        dataIndex: "acVirtualAccount",
        width: 100,
      },
    ],
  },
];

const Agency = () => {
  const [astManagerAgency, setAstManagerAgency] = useState<AgencyDTO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectAgency, setSelectAgency] = useState<AgencyDTO | undefined>(undefined);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const fetchAgencyList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/get-agencies.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });

      setAstManagerAgency(response.data.lstMember);
    } catch (e) {
      const error = e as Error;
      message.error(error.message);
    }
  };

  useEffect(() => {
    const delay = window.setInterval(fetchAgencyList, 1000);
    return () => clearInterval(delay);
  }, []);
  return (
    <>
      <Header />
      <PageHeader>
        <span>
          <b>{astManagerAgency?.length}</b>개의 대행이 등록 되어있습니다.
        </span>

        <span style={{ float: "right" }}>
          <MemberGroupSelector />
        </span>
      </PageHeader>
      <Table
        columns={columns}
        dataSource={astManagerAgency}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: 650 }}
        onRow={(agency: AgencyDTO) => {
          return {
            onClick: () => {
              setIsModalVisible(true);
              setSelectAgency(agency);
            },
          };
        }}
      />
      <AgencyDetail
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        agency={selectAgency}
        visible={isModalVisible}
      />
    </>
  );
};

export default Agency;
