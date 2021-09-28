import { Tag } from "antd";
import { costFormat } from "./FormatUtil";
import { ErrandFeeType } from "../domain/Errand/model";

interface FlatFixedRateSystemProps {
  ucErrandFeeType: ErrandFeeType;
  ulErrandFeeAgency: number;
}

const FlatFixedRateSystem = (props: FlatFixedRateSystemProps) => {
  const { ucErrandFeeType, ulErrandFeeAgency } = props;

  const charge = costFormat(ulErrandFeeAgency);

  let errandFeeType;
  let errandFeeTypeColor;

  switch (Number(ucErrandFeeType)) {
    case 1:
      errandFeeType = "정액제";
      errandFeeTypeColor = "#2db7f5";
      break;
    case 2:
      errandFeeType = "정률제";
      errandFeeTypeColor = "#87d068";
      break;
  }
  return (
    <>
      <Tag color={errandFeeTypeColor}>{errandFeeType}</Tag>
      <span>{charge}</span>
    </>
  );
};

export default FlatFixedRateSystem;
