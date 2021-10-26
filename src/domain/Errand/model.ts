export enum ErrandType {
  DIFFERENT_DESTINATION = 1,
  SAME = 2,
  STOP = 3,
}

export enum PaymentMode {
  UNDEFINED = 0,
  CARD = 2,
  CASH = 3,
  PRE_PAYMENT = 4, // 선결제
  INSTALLMENT_PAYMENT = 5, // 분할결제
}

export enum ErrandFeeType {
  AMOUNT = 1,
  RATE = 2,
}

export enum ErrandAllocType {
  NORMAL = 1,
  FORCE_DISPATCH = 2,
}

export type ErrandId = number;
export interface IErrandOrderRequest {
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;
  ucErrandType: ErrandType;

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

  ulSplitPrePayment: number;
  ulSplitPostPayment: number;

  // 경유지
  acStop1Name: string;
  acStop1CellNo: string;
  acStop1Company: string;
  ulStop1LatiPos: number;
  ulStop1LongPos: number;
  acStop1OldAddr: string;
  acStop1NewAddr: string;
  acStop1AddrDesc: string;
  acStop1Memo: string;

  acStop2Name: string;
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

export interface ErrandDto {
  ulErrandSeqNo: ErrandId;

  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;
  ucErrandType: ErrandType;

  ucDeliStatus: number;

  acOrderDateTime: string;
  acAllocDateTime: string | undefined;
  acPickupDateTime: string | undefined;
  acDoneDateTime: string | undefined;
  acCancelDateTime: string | undefined;

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

  ulSplitPrePayment: number;
  ulSplitPostPayment: number;

  // 경유지
  acStop1Name: string;
  acStop1CellNo: string;
  acStop1Company: string;
  ulStop1LatiPos: number;
  ulStop1LongPos: number;
  acStop1OldAddr: string;
  acStop1NewAddr: string;
  acStop1AddrDesc: string;
  acStop1Memo: string;

  acStop2Name: string;
  acStop2CellNo: string;
  acStop2Company: string;
  ulStop2LatiPos: number;
  ulStop2LongPos: number;
  acStop2OldAddr: string;
  acStop2NewAddr: string;
  acStop2AddrDesc: string;
  acStop2Memo: string;

  acCourPresident: string;
  acCourCellNo: string;
  ucAcptAreaNo: number;
  ucAcptDistribId: number;
  ucAcptAgencyId: number;
  ucAcptMemCourId: number;
}

export interface IErrandCompany {
  acAddrDesc: string;
  acCellNo: string;
  acCompany: string;
  acEntryDateTime: string;
  acName: string;
  acNewAddr: string;
  acOldAddr: string;
  ucAgencyId: number;
  ucAreaNo: number;
  ucDistribId: number;
  ucMemCourId: number;
  ulErrandCompanySeqNo: number;
  ulLatiPos: number;
  ulLongPos: number;
}
