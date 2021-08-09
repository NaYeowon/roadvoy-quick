/* eslint-disable */
import { Row, Timeline } from "antd";
import TimelineItem from "antd/lib/timeline/TimelineItem";
import moment from "moment";
import React from "react";
import styled from "styled-components";
import { CallInfo } from "./CallListComponent";

interface Props {
  callInfo: CallInfo;
}
const CallTimeLine = (props: Props) => {
  const { callInfo } = props;

  const arrTimeLine: any = [];
  arrTimeLine.push(
    <Timeline.Item color="#00BCD4">
      <TimeTitle>주문</TimeTitle>
      <span>{moment(callInfo.acOrderDateTime).format("HH:mm:ss")}</span>
    </Timeline.Item>
  );
  if (callInfo.acAllocDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#FF8F00">
        <TimeTitle>배차</TimeTitle>
        <span>{moment(callInfo.acAllocDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }
  if (callInfo.acPickupDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#AA00FF">
        <TimeTitle>픽업</TimeTitle>
        <span>{moment(callInfo.acPickupDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }
  if (callInfo.acDoneDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#4CAF50">
        <TimeTitle>완료</TimeTitle>
        <span>{moment(callInfo.acDoneDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }
  if (callInfo.acCanCelDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#F44336">
        <TimeTitle>취소</TimeTitle>
        <span>{moment(callInfo.acCanCelDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }

  return (
    <Row style={{ marginBottom: "12px" }}>
      <Timeline>{arrTimeLine}</Timeline>
    </Row>
  );
};

export default CallTimeLine;

const TimeTitle = styled.span`
  margin-right: 2px;
`;
