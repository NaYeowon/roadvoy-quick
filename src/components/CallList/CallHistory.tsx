import { DatePicker, Input, message, Table } from "antd";
import moment from "moment";
import locale from "antd/lib/date-picker/locale/ko_KR";
import React, { useEffect, useState } from "react";
import ErrandHelper from "src/helpers/ErrandHelper";
import Header from "../Layout/Header";
import "./CallHistory.css";
import { AxiosError } from "axios";
import DateUtil from "src/util/DateUtil";
import { costFormat, getCellNoFormat } from "src/util/FormatUtil";
import api from "src/config/axios";
import { ErrandDto } from "src/domain/Errand/model";
import { CallModal } from "./Modal";

const Search = Input.Search
const { RangePicker } = DatePicker;

interface Props {
  astErrandSettlementList: [];
  astErrand: ErrandDto[];
  astFilteredErrand: ErrandDto[];

  acSelectedDate: string;

  startDate: moment.Moment;
  endDate: moment.Moment;

  searchQuery: string;

  onOk: () => void;
  onCancel: () => void;
  modalErrand: ErrandDto | undefined;
}

const dateListColumns = [
  {
    title: "일자",
    dataIndex: "acErrandDate",
    key: "acErrandDate",
    width: 100,
    render: (text, record) => {
      return moment(record.acErrandDate).format("MM월 DD일");
    },
  },
  {
    title: "건수",
    dataIndex: "ulCnt",
    width: 70,
    render: (text, record) => {
      return `${parseInt(record.ulCnt).toLocaleString()}건`;
    },
  },
  {
    title: "수수료",
    dataIndex: "ulTotalErrandFeeAgency",
    width: 80,
    render: (text, record) => {
      return `${parseInt(record.ulTotalErrandFeeAgency).toLocaleString()}`;
    },
  },
  {
    title: "배달비",
    dataIndex: "ulTotalErrandCharge",
    width: 100,
    render: (text, record) => {
      return `${parseInt(record.ulTotalErrandCharge).toLocaleString()}`;
    },
  },
];
const columns = [
  {
    title: "콜번호",
    dataIndex: "ulErrandSeqNo",
    key: "ulErrandSeqNo",
    width: 80,
  },
  {
    title: "콜일자",
    dataIndex: "acErrandDate",
    width: 100,
  },
  {
    title: "콜시간",
    dataIndex: "acOrderDateTime",
    render: (text, record) => {
      return moment(record.acOrderDateTime).format("HH:mm:ss");
    },
    width: 80,
  },
  {
    title: "픽업지명",
    dataIndex: "acOriginCompany",
    key: "acOriginCompany",
    width: 100,
  },
  {
    title: "목적지명",
    dataIndex: "acDestCompany",
    key: "acDestCompany",
    width: 100,
  },
  {
    title: "주소",
    render: (text, record) => {
      return ErrandHelper.formatAddress(record);
    },
    width: 400,
  },
  {
    title: "고객연락처",
    dataIndex: "acCompany",
    key: "acCompany",

    width: 120,
  },
  {
    title: "배달비",
    render: (text, record) => {
      return `${costFormat(record.ulErrandCharge)}`;
    },
    width: 80,
  },
  {
    title: "수수료",
    render: (text, record) => {
      return `${costFormat(record.ulErrandFeeAgency)}`;
    },
    width: 80,
  },
  {
    title: "결제정보",
    width: 120,
  },
  {
    title: "주행",
    width: 70,
  },
  {
    title: "정산",

    width: 70,
  },
  {
    title: "기사연락처",
    dataIndex: "acCourCellNo",
    render: (text, record) => {
      return `${getCellNoFormat(record.acCourCellNo)}`;
    },
    width: 120,
  },
  {
    title: "배차시간",
    render: (text, record) => {
      return record.acAllocDateTime ? moment(record.acAllocDateTime).format("HH:mm:ss") : "";
    },
    width: 90,
  },
  {
    title: "픽업시간",
    render: (text, record) => {
      return record.acPickupDateTime ? moment(record.acPickupDateTime).format("HH:mm:ss") : "";
    },
    width: 90,
  },
  {
    title: "완료시간",
    render: (text, record) => {
      return record.acDoneDateTime ? moment(record.acDoneDateTime).format("HH:mm:ss") : "";
    },
    width: 90,
  },
  {
    title: "취소시간",
    render: (text, record) => {
      return record.acCancelDateTime ? moment(record.acCancelDateTime).format("HH:mm:ss") : "";
    },
    width: 90,
  },
];
const CallHistory = (props: Props) => {
  const [astErrand, setAstErrand] = useState<ErrandDto[]>([]);
  const [astErrandView, setAstErrandView] = useState<ErrandDto[]>([]);
  const [astErrandSettlementList, setAstErrandSettlementList] = useState<ErrandDto[]>([]);
  const [acSelectedDate, setAcSelectedDate] = useState<moment.Moment>(moment());
  const [startDate, setStartDate] = useState<moment.Moment>(moment().startOf("month"));
  const [endDate, setEndDate] = useState<moment.Moment>(moment());
  const [modalErrand, setModalErrand] = useState<ErrandDto | undefined>(undefined);

  const CallOk = () => {
    setModalErrand(undefined);
  };

  const CallCancel = () => {
    setModalErrand(undefined);
  };

  const handleChangeDate = val => {
    setStartDate(val[0]);
    setEndDate(val[1]);

    getErrandSettlementList(val[0], val[1]);
  };

  const getErrandSettlementList = async (startDate: moment.Moment, endDate: moment.Moment) => {
    try {
      const params = {
        acStartDate: DateUtil.format(startDate),
        acEndDate: DateUtil.format(endDate),
      };

      const response = await api.get("/agency/errand/settlement/list.php", {
        params: params,
      });
      if (response && response.data) {
        const data = response.data;

        if (data.astErrandSettlementList.length > 0) {
          const acSelectedErrandDate =
            data.astErrandSettlementList[data.astErrandSettlementList.length - 1].acErrandDate;
          setAstErrandSettlementList(data.astErrandSettlementList),
            setAcSelectedDate(acSelectedErrandDate);
        } else {
          setAstErrandSettlementList([]), setAstErrand([]);
        }
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      if (error.response && error.response.data && error.response.data.msg) {
        message.error(error.response.data.msg);
      } else {
        message.error("서버에서 응답을 받지 못했습니다.");
      }
    }
  };

  useEffect(() => {
    getErrandSettlementList(startDate, endDate);
  }, []);

  const getErrandList = async (_acErrandDate: moment.Moment) => {
    try {
      const response = await api.get("/agency/errand/process-query/find-period-history.php", {

        params: {
          acStartDate: DateUtil.format(_acErrandDate),
          acEndDate: DateUtil.format(_acErrandDate),
        },
      });

      if (response && response.data) {
        const { astErrand } = response.data;
        setAcSelectedDate(_acErrandDate);
        setAstErrand(astErrand as ErrandDto[]);
        setAstErrandView(astErrand as ErrandDto[]);
      }
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      if (error.response && error.response.data && error.response.data.msg) {
        message.error(error.response.data.msg);
      } else {
        message.error("서버에서 응답을 받지 못했습니다");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="page-body-wrapper">
        <div className="errand-page-header">
          <RangePicker
            className="errand-header-range-date-picker"
            format="YYYY-MM-DD"
            value={[startDate, endDate]}
            onChange={handleChangeDate}
            locale={locale}
          />
          <div className="errand-header-search">
            <Input
              placeholder="픽업지 주소, 기사 전화번호, 픽업지명, 목적지명"
              allowClear
              size="large"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const val = e.target.value;
                setAstErrandView(
                  astErrand.filter(
                    it =>
                      it.acOriginOldAddr?.includes(val) ||
                      it.acCourCellNo?.includes(val) ||
                      it.acOriginCompany?.includes(val) ||
                      it.acDestCompany?.includes(val)
                  )
                );
              }}
            />
          </div>
        </div>
        <div className="errand-settlement-date-list-wrapper">
          <Table
            className="rovo-scroll-table errand-date-list-table-wrapper"
            style={{ width: "100%", height: "100%", cursor: "pointer" }}
            columns={dateListColumns}
            dataSource={astErrandSettlementList}
            bordered
            onRow={(record: any) => {
              return {
                onClick: () => {
                  getErrandList(moment(record.acErrandDate, "YYYY-MM-DD"));
                },
              };
            }}
            rowKey={(record: any) => {
              return record.acErrandDate;
            }}
            pagination={false}
          />
        </div>
        <div id="errand-list-wrapper">
          <Table
            className="callHistory"
            style={{ width: "100%", height: "calc(100%)", cursor: "pointer" }}
            rowKey={record => {
              return record.ulErrandSeqNo;
            }}
            bordered
            scroll={{ x: "2400" }}
            columns={columns}
            pagination={false}
            dataSource={astErrandView}
            rowClassName={TableList}
            onRow={(errand: ErrandDto) => {
              return {
                onClick: () => {
                  setModalErrand(errand);
                },
              };
            }}
          />
          <CallModal onOk={CallOk} onCancel={CallCancel} errand={modalErrand} />
        </div>
      </div>
    </>
  );
};

const TableList = (callInfo: ErrandDto) => {
  const className: any = [];

  if (Number(callInfo.ucDeliStatus) === 1) {
    className.push("deli-status-temp");
  }
  if (Number(callInfo.ucDeliStatus) === 8) {
    className.push("deli-status-alloc");
  }
  if (Number(callInfo.ucDeliStatus) === 16) {
    className.push("deli-status-pkup");
  }
  if (Number(callInfo.ucDeliStatus) === 32) {
    className.push("deli-status-done");
  }
  if (Number(callInfo.ucDeliStatus) === 64) {
    className.push("deli-status-cancel");
  }

  return className.join("");
};

  return className.join("");
};

export default CallHistory;

