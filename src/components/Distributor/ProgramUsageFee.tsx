/* eslint-disable */
import React from "react";
import { Descriptions } from "antd";
import DistributorStatistics from "./DistributorStatistics";

export const ProgramUsageFee = () => {
  return (
    <div>
      <DistributorStatistics />
      <Descriptions bordered layout="vertical" column={14}>
        <Descriptions.Item label="대행명">uu</Descriptions.Item>
        <Descriptions.Item label="연도합계">원</Descriptions.Item>
        <Descriptions.Item label="1월">원</Descriptions.Item>
        <Descriptions.Item label="2월">원</Descriptions.Item>
        <Descriptions.Item label="3월">원</Descriptions.Item>
        <Descriptions.Item label="4월">원</Descriptions.Item>
        <Descriptions.Item label="5월">원</Descriptions.Item>
        <Descriptions.Item label="6월">원</Descriptions.Item>
        <Descriptions.Item label="7월">원</Descriptions.Item>
        <Descriptions.Item label="8월">원</Descriptions.Item>
        <Descriptions.Item label="9월">원</Descriptions.Item>
        <Descriptions.Item label="10월">원</Descriptions.Item>
        <Descriptions.Item label="11월">원</Descriptions.Item>
        <Descriptions.Item label="12월">원</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
