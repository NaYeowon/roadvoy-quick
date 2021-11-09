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
import { bankAccount, bankCode, bizNumber, DateFormat, getCellNoFormat } from "src/util/FormatUtil";
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
        render: data => bizNumber(data),
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
        title: "세금계산서발행여부",
        dataIndex: "ucTaxInvoType",
        align: "center",
        render: (value: number, record: AgencyDTO) => {
          switch (Number(value)) {
            case 0:
              return "N";
            case 1:
              return "Y";
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
        align: "center",
        dataIndex: "cDelayWarning",
        width: 30,
      },
      {
        title: "제한",
        align: "center",
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
        render: (bankcode: number) => bankCode(bankcode),
        width: 50,
      },
      {
        title: "계좌번호",
        dataIndex: "acVirtualAccount",
        render: (bank: string) => bankAccount(bank),
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
        scroll={{ y: "calc(100vh - 203px)" }}
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
