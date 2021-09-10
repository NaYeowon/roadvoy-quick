/* eslint-disable */

import { Button, Col, Row } from "antd";
import { RiderInfo } from "../shop/types";
import { CallInfo } from "./CallListComponent";
import styled from "styled-components";

interface Props {
  rider: RiderInfo;
  call?: CallInfo;
  onClickOptionalDispatchButton: any;
  onClickDispatchButton: any;
  beforeOrderDispatch: boolean;
}

function DirectDispatchRiderItem(props: Props) {
  const { rider, call, beforeOrderDispatch } = props;

  const _onClickDispatchButton = () => {
    props.onClickDispatchButton(rider);
  };

  const _onClickOptionalDispatchButton = () => {
    props.onClickOptionalDispatchButton(rider);
  };

  const _renderOpenChat = () => {
    return <Button>채팅</Button>;
  };

  const _renderOptionalDispatch = () => {
    if (beforeOrderDispatch || call!.ucDeliStatus >= 8) return <></>;
    return <Button onClick={_onClickOptionalDispatchButton}>선택</Button>;
  };

  const _renderDispatchButtonName = () => {
    if (beforeOrderDispatch) return "선택";

    return call!.ucDeliStatus < 8 ? "직권" : "전환";
  };
  return (
    <Wrapper>
      <RiderName span={14}>{rider.acPresident}</RiderName>
      <ButtonWrap span={3}>{_renderOpenChat()}</ButtonWrap>
      <ButtonWrap span={3}>{_renderOptionalDispatch()}</ButtonWrap>
      <ButtonWrap span={3}>
        <Button onClick={_onClickDispatchButton}>{_renderDispatchButtonName()}</Button>
      </ButtonWrap>
    </Wrapper>
  );
}

DirectDispatchRiderItem.defaultProps = {
  beforeOrderDispatch: false
};

export default DirectDispatchRiderItem;

const Wrapper = styled(Row)`
  display: flex;
  padding: 4px;
  border-bottom: 1px solid #ebebeb;
  align-items: center;
`;
const RiderName = styled(Col)`
  color: #212121;
  font-weight: bold;
  text-align: left;
`;
const ButtonWrap = styled(Col)`
  text-align: right;
`;
