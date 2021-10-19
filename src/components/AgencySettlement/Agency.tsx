/* eslint-disable */
import React, { Component, useEffect, useState } from "react";

// eslint-disable-next-line import/order
import Header from "../Layout/Header";

import { message, PageHeader, Table } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

import LoginHelper from "../../pages/shared/LoginHelper";
import { AgencyDTO } from "../shop/types";
import api from "src/config/axios";
import { MemberGroupSelector } from "../Member";
import AgencyDetail from "./AgencyDetail";

const columns = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        key: "ucMemCourId",
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
        width: 50,
      },
      {
        title: "세금계산서발행",
        dataIndex: "ucTaxInvoType",
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
        width: 80,
      },
      {
        title: "(휴대)전화번호",
        dataIndex: "acCellNo",
        width: 80,
      },
      {
        title: "주소",
        dataIndex: "acOldAddress" + "acAddressDesc",
        width: 100,
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
        url: "/agency/errand/list.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });

      setAstManagerAgency(response.data.astManagerAgency);
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
