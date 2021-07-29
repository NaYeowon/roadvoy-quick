/* eslint-disable */

import React from "react";
import Header from "../Layout/Header";
import { Button, DatePicker, Descriptions } from "antd";
import { Link } from "react-router-dom";

import "./DistributorStatistics.css";

const DistributorStatistics = () => {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <>
      <Header />
      <div>
        <span style={{ float: "left", width: "400px" }}>
          <DatePicker onChange={onChange} picker="year" />
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
