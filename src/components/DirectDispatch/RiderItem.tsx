import { Button } from "antd";
import { RiderInfo } from "../shop/types";
import { CallInfo } from "../CallList/CallListComponent";
import { ButtonWrap, RiderItemWrapper, RiderName } from "./styles";

interface Props {
  rider: RiderInfo;
  onClickOptionalDispatchButton: any;
  onClickDispatchButton: any;
  beforeOrderDispatch: boolean;
}

function RiderItem(props: Props) {
  /*
  const { rider, beforeOrderDispatch } = props;

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
    <RiderItemWrapper>
      <RiderName span={14}>{rider.acPresident}</RiderName>
      <ButtonWrap span={3}>{_renderOpenChat()}</ButtonWrap>
      <ButtonWrap span={3}>{_renderOptionalDispatch()}</ButtonWrap>
      <ButtonWrap span={3}>
        <Button onClick={_onClickDispatchButton}>{_renderDispatchButtonName()}</Button>
      </ButtonWrap>
    </RiderItemWrapper>
  );*/
}

RiderItem.defaultProps = {
  beforeOrderDispatch: false,
};

export default RiderItem;
