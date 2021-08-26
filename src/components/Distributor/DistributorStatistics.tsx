/* eslint-disable */

import React from "react";
import Header from "../Layout/Header";
import { Button, Calendar, Col, DatePicker, Descriptions, Row } from "antd";
import { Link } from "react-router-dom";

const DistributorStatistics = () => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <>
      <Header />
      <Row>
        <Col span={4} pull={20}></Col>
      </Row>
      <div>
        <span style={{ float: "left", width: "400px", paddingLeft: "10px" }}>
          년도 : <DatePicker onChange={onChange} picker="year" />
        </span>
        <span style={{ float: "right" }}>
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
      </div>
    </>
  );
};

export default DistributorStatistics;
