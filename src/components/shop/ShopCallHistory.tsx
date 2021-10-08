import { Table } from "antd";
import Header from "../Layout/Header";

const columns = [
  {
    title: "접수",
    dataIndex: "",
    key: "",
    width: 50,
  },
  {
    title: "진행/조리",
    dataIndex: "",
    key: "",
    width: 50,
  },
  {
    title: "주소",
    dataIndex: "",
    key: "",
    width: 200,
  },
  {
    title: "배달비",
    dataIndex: "",
    key: "",
    width: 80,
  },
  {
    title: "결제정보",
    dataIndex: "",
    key: "",
    width: 80,
  },
  {
    title: "기사",
    dataIndex: "",
    key: "",
    width: 80,
  },
  {
    title: "고객연락처",
    dataIndex: "",
    key: "",
    width: 80,
  },
];
const ShopCallHistory = () => {
  return (
    <div>
      <Header />
      <Table
        columns={columns}
        bordered
        style={{ width: "100%", height: "100%", cursor: "pointer" }}
      />
    </div>
  );
};

export default ShopCallHistory;
