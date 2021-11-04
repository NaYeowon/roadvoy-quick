import { message, PageHeader, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import api from "src/config/axios";
import MemberHelper from "src/helpers/MemberHelper";
import LoginHelper from "src/pages/shared/LoginHelper";
import { bankAccount, bankCode, DateFormat, getCellNoFormat } from "src/util/FormatUtil";
import Header from "../Layout/Header";
import { DistributorDto } from "../shop/types";
import DistributorDetail from "./DistributorDetail";

const columns: ColumnsType<DistributorDto> = [
  {
    title: "계정정보",
    children: [
      {
        title: "아이디",
        dataIndex: "ucMemCourId",
        render: (text: string, record: DistributorDto) => `${MemberHelper.formatMemberId(record)}`,
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
        render: (text: string, record: DistributorDto) => {
          return record.acBizRegNo
            .replace(/[^0-9]/g, "")
            .replace(/([0-9]{3})([0-9]{2})([0-9]{5})/, "$1-$2-$3")
            .replace("--", "-");
        },
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
        render: (value: number, record: DistributorDto) => {
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
        render: (text: string, record: DistributorDto) => {
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
const Distributor = () => {
  const [astManageDistributor, setAstManageDistributor] = useState<DistributorDto[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectDistributor, setSelectDistributor] = useState<DistributorDto | undefined>(undefined);

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const fetchRiderList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/get-distribs.php",
        headers: {
          Authorization: `Bearer ${LoginHelper.getToken()}`,
        },
      });

      setAstManageDistributor(response.data.lstMember);
    } catch (e) {
      message.error(e.message);
    }
  };

  useEffect(() => {
    const delay = window.setInterval(fetchRiderList, 1000);
    return () => clearInterval(delay);
  }, []);

  return (
    <>
      <div>
        <Header />
      </div>
      <PageHeader>
        <span>
          <b>{astManageDistributor?.length}</b>개의 총판이 등록 되어있습니다.
        </span>
      </PageHeader>
      <Table
        columns={columns}
        dataSource={astManageDistributor}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: 650 }}
        onRow={(distributor: DistributorDto) => {
          return {
            onClick: () => {
              setIsModalVisible(true);
              setSelectDistributor(distributor);
            },
          };
        }}
      />
      <DistributorDetail
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
        distributor={selectDistributor}
        visible={isModalVisible}
      />
    </>
  );
};

export default Distributor;
