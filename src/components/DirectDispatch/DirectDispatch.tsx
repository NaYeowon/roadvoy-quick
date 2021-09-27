import Search from "antd/lib/input/Search";
import { RiderInfo } from "../shop/types";
import { message } from "antd";
import api from "../../config/axios";
import RiderItem from "./RiderItem";
import { useEffect, useState } from "react";
import { ErrandId } from "../../domain/Errand/model";

// ucDeliStatus = undefined인 경우 콜 올리기전 배차
interface IDirectDispatchProps {
  ulErrandSeqNo: ErrandId;
  ucDeliStatus?: number;
}

const DirectDispatch = (props: IDirectDispatchProps) => {
  /*
  const { ulErrandSeqNo, ucDeliStatus } = props;

  const [riderList, setRiderList] = useState<RiderInfo[]>([]);
  const [searchRiderName, setSearchRiderName] = useState("");

  useEffect(() => {
    fetchRiderList();
  }, []);

  const fetchRiderList = async () => {
    const response = await api.get("agency/call/dispatchManagementRiderList.php");
    setRiderList(response.data.astRider);
  };

  const postDispatch = async (rider: RiderInfo) => {
    try {
      await api.post("agency/errand/execute-command/direct-dispatch.php", {
        ulErrandSeqNo: ulErrandSeqNo,
        ucAreaNo: rider.ucAreaNo,
        ucDistribId: rider.ucDistribId,
        ucAgencyId: rider.ucAgencyId,
        ucMemCourId: rider.ucMemCourId,
      });

      message.success("배차 했습니다.");
      //      props.onDispatchCallback();
    } catch (e) {
      const error = e as Error;
      message.error(error.message);
    }
  };

  const postOptionalDispatch = async (rider: RiderInfo) => {
    try {
      await api.post("agency/errand/execute-command/optional-dispatch.php", {
        ulErrandSeqNo: ulErrandSeqNo,
        ucAreaNo: rider.ucAreaNo,
        ucDistribId: rider.ucDistribId,
        ucAgencyId: rider.ucAgencyId,
        ucMemCourId: rider.ucMemCourId,
      });

      message.success("선택배차를 요청했습니다.");
      // props.onDispatchCallback();
    } catch (e) {
      const error = e as Error;
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
          <RiderItem
            rider={rider}
            onClickDispatchButton={_onClickDispatchButton}
            onClickOptionalDispatchButton={_onClickOptionalDispatchButton}
            key={rider.acUserId}
          />
        ))}
    </div>
  );*/
};

DirectDispatch.defaultProps = {
  beforeOrderDispatch: false,
};
export default DirectDispatch;
