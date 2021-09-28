import { Row, Timeline } from "antd";
import moment from "moment";
import styled from "styled-components";
import { ErrandDto } from "../../domain/Errand/model";

interface CallTimeLineProps {
  errand: ErrandDto;
}

const CallTimeLine = (props: CallTimeLineProps) => {
  const { errand } = props;

  const arrTimeLine: any = [];
  arrTimeLine.push(
    <Timeline.Item color="#00BCD4">
      <TimeTitle>주문</TimeTitle>
      <span>{moment(errand.acOrderDateTime).format("HH:mm:ss")}</span>
    </Timeline.Item>
  );
  if (errand.acAllocDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#FF8F00">
        <TimeTitle>배차</TimeTitle>
        <span>{moment(errand.acAllocDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }
  if (errand.acPickupDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#AA00FF">
        <TimeTitle>픽업</TimeTitle>
        <span>{moment(errand.acPickupDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }
  if (errand.acDoneDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#4CAF50">
        <TimeTitle>완료</TimeTitle>
        <span>{moment(errand.acDoneDateTime).format("HH:mm:ss")}</span>
      </Timeline.Item>
    );
  }
  if (errand.acCancelDateTime) {
    arrTimeLine.push(
      <Timeline.Item color="#F44336">
        <TimeTitle>취소</TimeTitle>
        <span>{moment(errand.acCancelDateTime).format("HH:mm:ss")}</span>
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
