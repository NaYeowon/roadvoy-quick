import { Button } from "antd";
import { RiderInfo } from "../shop/types";
import { ButtonWrap, RiderItemWrapper, RiderName } from "./styles";

interface Props {
  rider: RiderInfo;
  onClickOptionalDispatchButton: any;
  onClickDispatchButton: any;
  beforeOrderDispatch: boolean;
  ucDeliStatus: number;
}

function RiderItem(props: Props) {
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
    if (beforeOrderDispatch || props.ucDeliStatus >= 8) return <></>;
    return <Button onClick={_onClickOptionalDispatchButton}>선택</Button>;
  };

  const _renderDispatchButtonName = () => {
    if (beforeOrderDispatch) return "선택";

    return props.ucDeliStatus < 8 ? "직권" : "전환";
  };
  return (
    <RiderItemWrapper>
      <RiderName span={8}>{rider.acPresident}</RiderName>
      <ButtonWrap>{_renderOpenChat()}</ButtonWrap>
      <ButtonWrap>{_renderOptionalDispatch()}</ButtonWrap>
      <ButtonWrap>
        <Button onClick={_onClickDispatchButton}>{_renderDispatchButtonName()}</Button>
      </ButtonWrap>
    </RiderItemWrapper>
  );
}

RiderItem.defaultProps = {
  beforeOrderDispatch: false,
};

export default RiderItem;
