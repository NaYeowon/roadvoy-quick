/* eslint-disable */

import PaymentMode from "src/helpers/PaymentMode";

export interface Errand {
  acErrandDate: string
  ulErrandSeqNo: number;
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;

  ucDeliStatus: number;

  acTradeDate: string;
  ulTradeSeqNo: number;
  acAllocTime: string;
  acPickupTime: string;
  acDoneTime: string;
  acCancelTime: string;
  ucCancelStatus: number;
  ucLeadTime: number;
  ucApproTime: number;
  acOldClientAddr: string;
  acNewClientAddr: string;
  acClientAddrDesc: string;
  acClientCellNo: string;
  acClientMemo: string;
  acClientDistrict: string;
  ulClientLatiPos: number;
  ulClientLongPos: number;
  ucPaymentMode: PaymentMode;
  ucLastPaidMode: PaymentMode;
  ulOrderAmount: number;
  acAcptPresident: string;
  acAcptCellNo: string;
  acTeamName: string;
  acRiderName: string;
  acFranCompany: string;
  acFranRemark: string;
  acFranPhoneNo: string;
  acFranCellNo: string;
  ulFranLatiPos: number;
  ulFranLongPos: number;
  ulDeliCharge: number;
  ulDeliExtraFare: number;
  ulTimeExtraFare: number;
  ulPriceExtraFare: number;
  ulEtcExtraFare: number;
  ulChangeExtraFare: number;
  ulDongExtraFare: number;
  ulAreaExtraFare: number;
  ulAreaFareAmount: number;
  ulNightExtraFare: number;
  ulRainyExtraFare: number;
  ulLongDistanceExtraFare: number;
  ulDeliChargeTotal: number;
  ulCourseNo: number;
  acPickupAvailableTime: string;
}