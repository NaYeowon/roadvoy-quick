export interface ShopInfo {
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
