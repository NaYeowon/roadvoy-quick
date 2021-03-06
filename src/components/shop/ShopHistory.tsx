import { ColumnsType } from "antd/lib/table";
import { message, PageHeader, Table } from "antd";
import MemberHelper from "src/helpers/MemberHelper";
import { bankAccount, callFormat, costFormat } from "src/util/FormatUtil";
import Header from "../Layout/Header";
import { ShopDTO, ShopInfo } from "./types";
import api from "src/config/axios";
import LoginHelper from "src/pages/shared/LoginHelper";
import { useEffect, useState } from "react";
import ShopModal from "./ShopModal";
import { MemberGroupSelector } from "../Member";
import { AxiosError } from "axios";

const columns: ColumnsType<ShopDTO> = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        width: 120,
        render: (text: string, record: ShopDTO) => `${MemberHelper.formatMemberId(record)}`,
      },
      {
        title: "가맹명",
        dataIndex: "acCompany",
        width: 160,
      },
    ],
  },
  {
    title: "관리정보",
    children: [
      {
        title: "콜수",
        dataIndex: "ulCustCallCnt",
        key: "ulCustCallCnt",
        width: 100,
        render: (call: number) => callFormat(call),
      },
      {
        title: "관리비",
        dataIndex: "ulCustCallAmt",
        key: "ulCustCallAmt",
        width: 100,
        render: (cost: number) => costFormat(cost),
      },
      {
        title: "충전예정일",
        dataIndex: "acCustCallDueDate",
        key: "acCustCallDueDate",
        width: 100,
      },
    ],
  },
  {
    title: "콜수",
    children: [
      {
        title: "당일",
        dataIndex: "usDeliDoneCntSum",
        key: "usDeliDoneCntSum",
        width: 80,
        render: (call: number) => callFormat(call),
      },
      {
        title: "당월",
        dataIndex: "usMonthDeliDoneCntSum",
        key: "usMonthDeliDoneCntSum",
        width: 80,
        render: (call: number) => callFormat(call),
        //sorter: (a, b) => a.usMonthDeliDoneCntSum - b.usMonthDeliDoneCntSum,
      },
    ],
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
        render: (string: any, record: ShopDTO) =>
          costFormat(
            Number(record.ulVirAccDeposit) +
              Number(record.lVirAccBalance) -
              Number(record.ulVirAccDeduct)
          ),
      },
      {
        title: "가상계좌(우리은행)",
        dataIndex: "acVirtualAccount",
        key: "acVirtualAccount",
        render: (bank: string) => bankAccount(bank),
        width: 200,
      },
    ],
  },
  {
    title: "할증",
    children: [
      {
        title: "시간",
        dataIndex: "ucTimeExtraFareType",
        key: "ucTimeExtraFareType",
        className: "time-extra-fare-column",
        render: (text: string, record: ShopDTO) => "",
        width: 30,
      },
      {
        title: "심야",
        dataIndex: "ucNightExtraFareType",
        key: "ucNightExtraFareType",
        className: "night-extra-fare-column",
        render: (text: string, record: ShopDTO) => "",
        width: 30,
      },
      {
        title: "우천",
        dataIndex: "ucRainyExtraFareType",
        key: "ucRainyExtraFareType",
        className: "rainy-extra-fare-column",
        render: (text: string, record: ShopDTO) => "",
        width: 30,
      },
    ],
  },
];

const ShopHistory = () => {
  const [astManageShop, setAstManageShop] = useState<ShopDTO[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalShop, setModalShop] = useState<ShopDTO | undefined>(undefined);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  const fetchShopList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/agency/shop/process-query/get-leaves.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });
      setAstManageShop(response.data.astMemberHis);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  useEffect(() => {
    const delay = window.setInterval(fetchShopList, 1000);
    return () => clearInterval(delay);
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <PageHeader>
        <span>
          <b>{astManageShop?.length}</b>개의 가맹점이 탈퇴 되었습니다.
        </span>
        <span style={{ float: "right" }}>
          <MemberGroupSelector />
        </span>
      </PageHeader>
      <Table
        columns={columns}
        dataSource={astManageShop}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: "calc(100vh - 203px)" }}
        onRow={(shop: ShopDTO) => {
          return {
            onClick: () => {
              setIsModalVisible(true);
              setModalShop(shop);
              console.log(setModalShop(shop));
            },
          };
        }}
      />
      <ShopModal
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        shop={modalShop}
        visible={isModalVisible}
        shopHistory={true}
      />
    </div>
  );
};

export default ShopHistory;
