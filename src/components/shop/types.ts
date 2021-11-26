export interface ShopInfo {
  format: any;
  title: string;
  dataIndex: string;
  acStartDate: Date;
  acEndDate: Date;
  acCompany: string;
  usMonthDeliDoneCntSum: number;
  handleClickShop: any;
  cLeaveFlag: string;
  ucAreaNo: string;
  ucDistribId: string;
  ucAgencyId: string;
  ucMemCourId: string;
  shopInfoData: string;

  usDeliDoneCntSum: number;
  ulVirAccDeposit: number;
  ulVirAccDeduct: number;
  lVirAccBalance: number;
  ucTimeExtraFareType: number;
  ucNightExtraFareType: number;
  ucRainyExtraFareType: number;

  usDayDoneCallSum: number;
  ulDayTotalDeliFee: number;
  ulDayCallCntFee: number;
  ulSubstituteRefund: number;
  ulSubstituteInput: number;
  ulSubstituteDeposit: number;
  ulSubstituteCashMinusByManager: number;
  ulVirBankDeposit: number;
  ulVirBankFee: number;

  acPresident: string;
  acCellNo: number;
  acPhoneNo: number;
  acBizRegNo: number;
  acResRegNo: number;
  acRemark: string;
  acAllocRemark: string;
  acCpPresident: string;
  acCpCellNo: number;
  ulBaseDist: number;
  ulBaseFare: number;
  ulExtraDist: number;
  ulExtraFare: number;
  acPassword: number;
  acNewAddress: string;
  acOldAddress: string;
  acAddressDesc: string;
  ulLatiPos: number;
  ulLongPos: number;
}

export interface ShopSignUpRequest {
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;

  acUserId: string;
  acCompany: string;
  acPresident: string;
  acPassword: string;
  acCellNo: string;
  acPhoneNo: string;
  acBizRegNo: string;
  acCorpNo: string;
  acEmailAddress: string;
  acBizCondition: string;
  acBizType: string;
  acResRegNo: string;
  acNewAddress: string;
  acOldAddress: string;
  acAddressDesc: string;
  ulLatiPos: number;
  ulLongPos: number;
  ucTaxInvoType: number;
  ucBankCode: number;
  acBankAccount: string;
  acAccHoldName: string;
  usVirtualBank: number;
  acVirtualAccount: string;
  acAllocRemark: string;
  acRemark: string;
  acCpPresident: string;
  acCpCellNo: string;
  ulBaseDist: number;
  ulBaseFare: number;
  ulExtraDist: number;
  ulExtraFare: number;
  cManagerFlag: string;
  cAreaShareFlag: string;
  cTotalCallShareFlag: string;
  cReClaimFlag: string;
}
export interface ShopDTO {
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;

  ulVirAccDeposit: number;
  ulVirAccDeduct: number;
  lVirAccBalance: number;

  ucTimeExtraFareType: number;
  ucNightExtraFareType: number;
  ucRainyExtraFareType: number;

  acUserId: string;
  acCompany: string;
  acPresident: string;
  acPassword: string;
  acCellNo: string;
  acPhoneNo: string;
  acBizRegNo: string;
  acCorpNo: string;
  acEmailAddress: string;
  acBizCondition: string;
  acBizType: string;
  acResRegNo: string;
  acNewAddress: string;
  acOldAddress: string;
  acAddressDesc: string;
  ulLatiPos: number;
  ulLongPos: number;
  ucTaxInvoType: number;
  ucBankCode: number;
  acBankAccount: string;
  acAccHoldName: string;
  usVirtualBank: number;
  acVirtualAccount: string;
  acAllocRemark: string;
  acRemark: string;
  acCpPresident: string;
  acCpCellNo: string;
  ulBaseDist: number;
  ulBaseFare: number;
  ulExtraDist: number;
  ulExtraFare: number;
  cManagerFlag: string;
  cAreaShareFlag: string;
  cTotalCallShareFlag: string;
  cReClaimFlag: string;
}

export interface AgencyDTO {
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;

  acUserId: string;
  acPassword: string;
  acCompany: string;
  acEmailAddress: string;
  acBizRegNo: string;
  acResRegNo: string;
  acBizType: string;
  acBizCondition: string;
  acCorpNo: string;
  acPresident: string;
  acEntryDateTime: string;
  ucTaxInvoType: number;
  acPhoneNo: string;
  acCellNo: string;
  acOldAddress: string;
  acNewAddress: string;
  acAddressDesc: string;
  ulLatiPos: number;
  ulLongPos: number;
  cDelayWarning: string;
  cUseRight: string;
  usVirtualBank: number;
  acVirtualAccount: string;
  usBankCode: number;
  acBankAccount: string;
  acAccHoldName: string;
  cAreaShareFlag: string;
  cTotalCallShareFlag: string;
  ulBaseDist: number;
  ulBaseFare: number;
  ulExtraDist: number;
  ulExtraFare: number;
  allocRemark: string;
  acRemark: string;
  cpPresident: string;
  cpCellNo: string;
  ucDefaultCallRtrvTime: number;
}
export interface RiderInfo {
  asStatusMessage: string;
  lCallUnitPrice: number;
  usDayDoneCallSum: number;
  lAccountBalance: number;
  lCourierDeposit: number;
  lCourierLease: number;
  ucConCallLimit: number;
  ucCallRtrvTime: number;
  ucAppFakeLogoutType: number;
  acTeamName: string;

  title: string;
  dataIndex: string;
  width: number;
  acStartDate: Date;
  acEndDate: Date;
  acPresident: string;
  ucAreaNo: string;
  ucDistribId: string;
  ucAgencyId: string;
  ucMemCourId: string;
  lDayErrandCharge: number;
  ulCallCntFee: number;
  ulDayTotalRevenue: number;
  usMonthDoneCallSum: number;

  lDayTotalRevenue: number;
  lDayDeliCost: number;
  usDayDoneErrandSum: number;
  lDayErrandFeeAgency: number;
  ulSubstituteCashPlus: number;
  ulSubstituteCashMinus: number;
  ulSubstituteInput: number;
  ulSubstituteRefund: number;
  ulSubstituteDeposit: number;
  ulVirBankDeposit: number;
  ulReClaimAmount: number;
  ulReClaimComm: number;
  ulCreditAmount: number;

  acUserId: number;
  acPassword: number;
  acCellNo: number;
  acBankAccount: number;
  ucCourierTag: number;
  conCallLimit: number;
  usBankCode: number;
  acWithdrawPassword: number;
  cManagerFlag: string;
}

export interface RiderSignUpRequest {
  acUserId: string;
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;
  acPresident: string;
  acPassword: string;
  acResRegNo: string;
  acCellNo: string;
  acNewAddress: string;
  acOldAddress: string;
  acAddressDesc: string;
  ulLatiPos: number;
  ulLongPos: number;
  ucTaxInvoType: number;
  usBankCode: number;
  acBankAccount: string;
  acWithdrawPassword: string;
  acAccHoldName: string;
  usVirtualBank: number;
  acVirtualAccount: string;
  ucCourierTag: number;
  lCourierLease: number;
  lCourierDeposit: number;
  lCallUnitPrice: number;
  conCallLimit: number;
  cManagerFlag: string;
  cReClaimFlag: number;
  acAllocRemark: string;
  acRemark: string;
  acTeamName: string;
  ucCallRtrvTime: number;
  ucManagerCallRtrvTime: number;
}

export interface DistributorDto {
  ucAreaNo: number;
  ucDistribId: number;
  ucAgencyId: number;
  ucMemCourId: number;

  acUserId: string;
  acPassword: string;
  acCompany: string;
  acBizRegNo: string;
  acCorpNo: string;
  acPresident: string;
  acErrandDate: string;
  ucTaxInvoType: number;
  acPhoneNo: string;
  acCellNo: string;
  acEmailAddress: string;
  acBizCondition: string;
  acBizType: string;
  acResRegNo: string;
  usBankCode: number;
  acBankAccount: string;
  acAccHoldName: string;
  acOldAddress: string;
  acAddressDesc: string;
  acNewAddress: string;
  ulLatiPos: number;
  ulLongPos: number;
  cDelayWarning: string;
  cUseRight: string;
  usVirtualBank: number;
  acVirtualAccount: string;
  cAreaShareFlag: string;
  cTotalCallShareFlag: string;
  ulBaseDist: number;
  ulBaseFare: number;
  ulExtraDist: number;
  ulExtraFare: number;
  acAllocRemark: string;
  acRemark: string;
  acCpPresident: string;
  acCpCellNo: string;
  acWithdrawPassword: string;
}

export interface CallQuantityDto {
  ucAreaNo: string;
  ucDistribId: string;
  ucAgencyId: string;
  ucMemCourId: string;
  acYear: Date;

  acCompany: string;
  ulYearTotalCallCount: number;
  ulMonth1CallCount: number;
  ulMonth2CallCount: number;
  ulMonth3CallCount: number;
  ulMonth4CallCount: number;
  ulMonth5CallCount: number;
  ulMonth6CallCount: number;
  ulMonth7CallCount: number;
  ulMonth8CallCount: number;
  ulMonth9CallCount: number;
  ulMonth10CallCount: number;
  ulMonth11CallCount: number;
  ulMonth12CallCount: number;
}
class RiderInfo1 {
  asStatusMessage: string | undefined;

  lCallUnitPrice: number | undefined;

  usDayDoneCallSum: number | undefined;

  lAccountBalance: number | undefined;

  lCourierDeposit: number | undefined;

  lCourierLease: number | undefined;

  ucConCallLimit: number | undefined;

  ucCallRtrvTime: number | undefined;

  ucAppFakeLogoutType: number | undefined;

  acTeamName: string | undefined;

  title: string | undefined;

  dataIndex: string | undefined;

  width: number | undefined;

  acStartDate: Date | undefined;

  acEndDate: Date | undefined;

  acPresident: string | undefined;

  ucAreaNo: string | undefined;

  ucDistribId: string | undefined;

  ucAgencyId: string | undefined;

  ucMemCourId: string | undefined;

  lDayErrandCharge: number | undefined;

  ulCallCntFee: number | undefined;

  ulDayTotalRevenue: number | undefined;

  usMonthDoneCallSum: number | undefined;

  public getName(): string | undefined {
    if (this.acTeamName && this.acTeamName.length > 0) {
      return `${this.acPresident}(${this.acTeamName})`;
    }
    return this.acPresident;
  }

  public getPlainPrimaryKey(): string {
    return `${this.ucAreaNo}-${this.ucDistribId}-${this.ucAgencyId}-${this.ucMemCourId}`;
  }
}
export default RiderInfo1;
