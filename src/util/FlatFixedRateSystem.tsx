/* eslint-disable */
import React from "react";
import { Tag } from "antd";
import { CallInfo } from "src/components/CallList/CallListComponent";
import { costFormat } from "./FormatUtil";

interface Props {
    callInfo: CallInfo
}

const FlatFixedRateSystem = (props: Props) => {
    const {callInfo} = props;

    const ucErrandFeeType:number = Number(callInfo.ucErrandFeeType)
    const charge = costFormat(callInfo.ulErrandFeeAgency)

    let errandFeeType
    let errandFeeTypeColor

    switch (ucErrandFeeType) {
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