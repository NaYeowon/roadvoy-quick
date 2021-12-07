import { CircularProgress } from "@material-ui/core";
import { Table } from "antd";
import { AxiosError } from "axios";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import api from "src/config/axios";
import { callFormat } from "src/util/FormatUtil";
import { CallQuantityDto, CallQuantityYear } from "../shop/types";

interface Props {
  callQuantity: CallQuantityDto;
  ulYear: moment.Moment;
}
const columns = [
  {
    title: "연도합계",
    dataIndex: "ulYearTotalCallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "1월",
    dataIndex: "ulMonth1CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "2월",
    dataIndex: "ulMonth2CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "3월",
    dataIndex: "ulMonth3CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "4월",
    dataIndex: "ulMonth4CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "5월",
    dataIndex: "ulMonth5CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "6월",
    dataIndex: "ulMonth6CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "7월",
    dataIndex: "ulMonth7CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "8월",
    dataIndex: "ulMonth8CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "9월",
    dataIndex: "ulMonth9CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "10월",
    dataIndex: "ulMonth10CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "11월",
    dataIndex: "ulMonth11CallCount",
    render: (call: number) => callFormat(call),
  },
  {
    title: "12월",
    dataIndex: "ulMonth12CallCount",
    render: (call: number) => callFormat(call),
  },
];

const CallQuantityList: FC<Props> = ({ callQuantity, ulYear }) => {
  const [astCallQuantity, setAstCallQuantity] = useState<CallQuantityYear[]>([]);

  useEffect(() => {
    if (callQuantity && ulYear) {
      getCallQuantityDetail();
    }
  }, [callQuantity, ulYear]);

  const getCallQuantityDetail = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/distrib/process-query/settlement.php",
        params: {
          ucAreaNo: callQuantity.ucAreaNo,
          ucDistribID: callQuantity.ucDistribId,
          ucAgencyId: callQuantity.ucAgencyId,
          ulYear: ulYear.format("YYYY"),
        },
      });

      const { data } = response;
      setAstCallQuantity(data.lstCallStatistics);
    } catch (e) {
      const error = e as AxiosError;
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다.");
      }
    }
  };

  if (!astCallQuantity) {
    return <CircularProgress title="로딩중" />;
  }
  return (
    <>
      <span style={{ float: "left" }}>{callQuantity.acCompany}</span>

      <Table
        columns={columns}
        dataSource={astCallQuantity}
        bordered
        pagination={false}
        size="small"
        scroll={{ y: "700px" }}
      />
    </>
  );
};

export default CallQuantityList;
