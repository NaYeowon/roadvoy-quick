/* eslint-disable */
import Search from "antd/lib/input/Search";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { RiderInfo } from "../shop/types";
import { CallInfo } from "./CallListComponent";
import TradeAPIService from "src/util/TradeAPIService";
import { message } from "antd";
import { Errand } from "src/util/Errand";
import DirectDispatchRiderItem from "./DirectDispatchRiderItem";
import api from "../../config/axios";

interface Props {
  call?: CallInfo;
  beforeOrderDispatch: boolean;
  onDispatchCallback?: any;
  onSelectedBeforeDispatchRider?: any;
}

const DirectDispatch = (props: Props) => {
  const { call, beforeOrderDispatch } = props;

  const [riderList, setRiderList] = useState<RiderInfo[]>([]);
  const [searchRiderName, SetSearchRiderName] = useState("");

  useEffect(() => {
    if (!beforeOrderDispatch && call!.ucDeliStatus >= 32) return;
    fetchRiderList();
  }, []);

  const fetchRiderList = async () => {
    let response = await api.get("agency/call/dispatchManagementRiderList.php");
    setRiderList(response.data.astRider);
  };

  const postDispatch = async (rider: RiderInfo) => {
    try {
      await TradeAPIService.postForceDispatch(call as unknown as Errand, rider);

      message.success("배차 했습니다.");
      props.onDispatchCallback();
    } catch (error) {
      message.error(error.message);
    }
  };

  const postOptionalDispatch = async (rider: RiderInfo) => {
    try {
      await TradeAPIService.postOptionalDispatch(call as unknown as Errand, rider);

      message.success("선택배차를 요청했습니다.");
      props.onDispatchCallback();
    } catch (error) {
      message.error(error.message);
    }
  };

  function getDeliStatus() {
    if (call?.ucDeliStatus === 2) {
      return 4;
    }
  }
  const _onClickDispatchButton = (rider: RiderInfo) => {
    if (beforeOrderDispatch) {
      props.onSelectedBeforeDispatchRider(rider);
      return;
    }
    switch (getDeliStatus()) {
      case 4: {
        postDispatch(rider);
        break;
      }
    }
  };

  const _onClickOptionalDispatchButton = (rider: RiderInfo) => {
    if (call!.ucDeliStatus >= 8) return;
    postOptionalDispatch(rider);
  };

  return (
    <div style={{ paddingTop: "8px" }}>
      <Search
        placeholder="기사명을 입력하세요"
        enterButton="검색"
        onSearch={(value: string) => SetSearchRiderName(value)}
        onChange={e => SetSearchRiderName(e.target.value)}
        value={searchRiderName}
      />
      {riderList
        .filter(
          (rider: RiderInfo) =>
            !searchRiderName ||
            rider.acPresident.toLocaleLowerCase().includes(searchRiderName.toLocaleLowerCase())
        )
        .map(rider => (
          <DirectDispatchRiderItem
            rider={rider}
            call={call}
            onClickDispatchButton={_onClickDispatchButton}
            onClickOptionalDispatchButton={_onClickOptionalDispatchButton}
            beforeOrderDispatch={beforeOrderDispatch}
          />
        ))}
    </div>
  );
};

DirectDispatch.defaultProps = {
  beforeOrderDispatch: false,
};
export default DirectDispatch;
