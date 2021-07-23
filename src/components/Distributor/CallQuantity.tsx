/* eslint-disable */
import React from "react";
import { Descriptions } from "antd";
import DistributorStatistics from "./DistributorStatistics";

export const CallQuantity = () => {
  return (
    <div>
      <DistributorStatistics />
      <Descriptions bordered layout="vertical" column={14}>
        <Descriptions.Item label="대행명">ss</Descriptions.Item>
        <Descriptions.Item label="연도합계">콜</Descriptions.Item>
        <Descriptions.Item label="1월">콜</Descriptions.Item>
        <Descriptions.Item label="2월">콜</Descriptions.Item>
        <Descriptions.Item label="3월">콜</Descriptions.Item>
        <Descriptions.Item label="4월">콜</Descriptions.Item>
        <Descriptions.Item label="5월">콜</Descriptions.Item>
        <Descriptions.Item label="6월">콜</Descriptions.Item>
        <Descriptions.Item label="7월">콜</Descriptions.Item>
        <Descriptions.Item label="8월">콜</Descriptions.Item>
        <Descriptions.Item label="9월">콜</Descriptions.Item>
        <Descriptions.Item label="10월">콜</Descriptions.Item>
        <Descriptions.Item label="11월">콜</Descriptions.Item>
        <Descriptions.Item label="12월">콜</Descriptions.Item>
      </Descriptions>
    </div>
  );
};
