import { Type } from 'class-transformer'

class ErrandCompany {
  @Type(() => Number)
    ulErrandCompanySeqNo!: number;

  @Type(() => Number)
  ucAreaNo!: number;

  @Type(() => Number)
  ucDistribId!: number;

  @Type(() => Number)
  ucAgencyId!: number;

  acCompany!: string;

  acCellNo!: string;

  acName!: string;

  acOldAddr!: string;

  acNewAddr!: string;

  acAddrDesc!: string;

  @Type(() => Number)
    ulLatiPos!: number;

  @Type(() => Number)
    ulLongPos!: number;

  acEntryDateTime!: string;
}

export default ErrandCompany
