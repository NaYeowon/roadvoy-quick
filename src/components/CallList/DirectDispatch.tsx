/* eslint-disable */
import Search from "antd/lib/transfer/search";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import APIHelper from "src/helpers/APIHelper";
import { RiderInfo } from "../shop/types";
import { CallInfo } from "./CallListComponent";

interface Props {
  call: CallInfo;
  beforeOrderDispatch: boolean;
  onDispatchCallback?: any;
  onSelectedBeforeDispatchRider?: any;
}

const DirectDispatch = (props: Props) => {
  const { call, beforeOrderDispatch } = props;

  const [riderList, setRiderList] = useState<RiderInfo[]>([]);
  const [searchRiderName, SetSearchRiderName] = useState("");

  useEffect(() => {
    if (!beforeOrderDispatch && call.ucDeliStatus >= 32) return;
    fetchRiderList();
  }, []);

  const fetchRiderList = async () => {
    setRiderList(await APIHelper.getInstance().get("agency/call/dispatchManagementRiderList.php"));
    return;
  };
  return (
    <div>
      <Search placeholder="기사명을 입력하세요" />
    </div>
  );
};

export default DirectDispatch;
