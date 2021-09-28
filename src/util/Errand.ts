import { ErrandAllocType, ErrandFeeType, ErrandType, PaymentMode } from "../domain/Errand/model";

export interface Errand {
  acErrandDate: string
  ulErrandSeqNo: number;

  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;
  ucErrandType: ErrandType;

  ucDeliStatus: number;

  // 출발지
  acOriginCompany: string;
  acOriginCellNo: string;
  acOriginMemo: string;
  ulOriginLatiPos: number;
  ulOriginLongPos: number;
  acOriginOldAddr: string;
  acOriginNewAddr: string;
  acOriginAddrDesc: string;

  // 목적지
  acDestCompany: string;
  acDestCellNo: string;
  acDestMemo: string;
  ulDestLatiPos: number;
  ulDestLongPos: number;
  acDestOldAddr: string;
  acDestNewAddr: string;
  acDestAddrDesc: string;

  ucLimitTime: number;
  ucPaymentMode: PaymentMode;
  ucErrandFeeType: ErrandFeeType;
  ulErrandFeeAmount: number;
  ucErrandFeeRate: number;
  ulErrandCharge: number;
  ulGoodsPrice: number;
  ucErrandSettlementType: number;
  ucAllocType: ErrandAllocType;
  ucTripType: number;
  ulErrandFeeAgency: number;
  ulErrandDispatchAgencyFee: number;

  // 경유지
  acStop1CellNo: string;
  acStop1Company: string;
  ulStop1LatiPos: number;
  ulStop1LongPos: number;
  acStop1OldAddr: string;
  acStop1NewAddr: string;
  acStop1AddrDesc: string;
  acStop1Memo: string;

  acStop2CellNo: string;
  acStop2Company: string;
  ulStop2LatiPos: number;
  ulStop2LongPos: number;
  acStop2OldAddr: string;
  acStop2NewAddr: string;
  acStop2AddrDesc: string;
  acStop2Memo: string;

  ucAcptAreaNo: number;
  ucAcptDistribId: number;
  ucAcptAgencyId: number;
  ucAcptMemCourId: number;
}