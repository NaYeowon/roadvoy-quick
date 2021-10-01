import React from "react";
import { Tag } from "antd";

class ErrandHelper {
  static formatAddress(stErrand) {
    if (parseInt(stErrand.ucErrandType) === 1) {
      return (
        <div>
          <div>
            <Tag color="volcano">픽업지</Tag>
            {stErrand.acOriginOldAddr} {stErrand.acOriginAddrDesc}
          </div>
          <div>
            <Tag color="purple">목적지</Tag>
            {stErrand.acDestOldAddr}
            {stErrand.acDestAddrDesc}
          </div>
        </div>
      );
    } else if (parseInt(stErrand.ucErrandType) === 2) {
      return (
        <div>
          <Tag color="purple">목적지</Tag>
          {stErrand.acDestOldAddr} {stErrand.acDestOldAddr}
        </div>
      );
    } else if (parseInt(stErrand.ucErrandType) === 3) {
      return (
        <div>
          <div>
            <Tag color="volcano">픽업지</Tag>
            {stErrand.acOriginOldAddr} {stErrand.acOriginAddrDesc}
          </div>
          <div>
            <Tag color="purple">목적지</Tag>
            {stErrand.acDestOldAddr}
            {stErrand.acDestAddrDesc}
          </div>
          <div>
            <Tag color="purple">경유지1</Tag>
            {stErrand.acStop1OldAddr} {stErrand.acStop1OldAddr}
          </div>
        </div>
      );
    }
  }
}

export default ErrandHelper;
