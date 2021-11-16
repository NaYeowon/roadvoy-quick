/* eslint-disable */
import Header from "../Layout/Header";
import { Button, Col, DatePicker, PageHeader, Row } from "antd";
import { Link } from "react-router-dom";
import { MemberGroupSelector } from "../Member";

const DistributorStatistics = () => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <>
      <Header />
      <PageHeader>
        <span style={{ float: "right" }}>
          <MemberGroupSelector />
        </span>
        <span style={{ float: "left" }}>
          <Button key="3">
            <Link to="/CallQuantity">배달콜수 통계</Link>
          </Button>
          <Button key="2">
            <Link to="/CallFee">콜수수료 통계</Link>
          </Button>
          <Button key="1">
            <Link to="/ProgramUsageFee">프로그램사용료 통계</Link>
          </Button>
        </span>
        <span style={{ width: "400px", paddingLeft: "10px" }}>
          년도 : <DatePicker onChange={onChange} picker="year" />
        </span>
      </PageHeader>
    </>
  );
};

export default DistributorStatistics;
