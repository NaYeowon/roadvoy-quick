/* eslint-disable */

import { RiderInfo } from "src/components/shop/types";
import APIHelper from "src/helpers/APIHelper";
import { Errand } from "./Errand";

class TradeAPIService {
  public static async postForceDispatch(stTrade: Errand, stRider: RiderInfo) {
    try {
      const form = new FormData();

      form.append("ucAreaNo", String(stTrade.ucAreaNo));
      form.append("ucDistribId", String(stTrade.ucDistribId));
      form.append("ucAgencyId", String(stTrade.ucAgencyId));
      form.append("ucMemCourId", String(stTrade.ucMemCourId));
      form.append("acTradeDate", stTrade.acTradeDate);
      form.append("ulTradeSeqNo", String(stTrade.ulTradeSeqNo));

      form.append("ucAcptAreaNo", String(stRider.ucAreaNo));
      form.append("ucAcptucDistribId", String(stRider.ucDistribId));
      form.append("ucAcptucAgencyId", String(stRider.ucAgencyId));
      form.append("ucAcptucMemCourId", String(stRider.ucMemCourId));

      await APIHelper.getInstance().post("/agency/trade/dispatch/index.php", form);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다.");
      }
    }
  }

  public static async postOptionalDispatch(stTrade: Errand, stRider: RiderInfo) {
    try {
      const form = new FormData();

      form.append("ucAreaNo", String(stTrade.ucAreaNo));
      form.append("ucDistribId", String(stTrade.ucDistribId));
      form.append("ucAgencyId", String(stTrade.ucAgencyId));
      form.append("ucMemCourId", String(stTrade.ucMemCourId));
      form.append("acTradeDate", stTrade.acTradeDate);
      form.append("ulTradeSeqNo", String(stTrade.ulTradeSeqNo));

      form.append("ucAcptAreaNo", String(stRider.ucAreaNo));
      form.append("ucAcptDistribId", String(stRider.ucDistribId));
      form.append("ucAcptAgencyId", String(stRider.ucAgencyId));
      form.append("ucAcptMemCourId", String(stRider.ucMemCourId));

      await APIHelper.getInstance().post("/agency/trade/dispatch/index.php", form);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다.");
      }
    }
  }

  public static async postDispatchCancel(trade: Errand) {
    try {
      const form = new FormData();

      form.append("ucAreaNo", String(trade.ucAreaNo));
      form.append("ucDistribId", String(trade.ucDistribId));
      form.append("ucAgencyId", String(trade.ucAgencyId));
      form.append("ucMemCourId", String(trade.ucMemCourId));
      form.append("acTradeDate", String(trade.acTradeDate));
      form.append("ulErrandSeqNo", String(trade.ulErrandSeqNo));

      await APIHelper.getInstance().post("/agency/trade/dispatch/cancel.php", form);
    } catch (error) {
      if (error.response && error.response.data && error.reponse.data.msg) {
        throw new Error(error.response.data.msg);
      } else {
        throw new Error("서버에서 응답을 받지 못했습니다.");
      }
    }
  }
}

export default TradeAPIService;
