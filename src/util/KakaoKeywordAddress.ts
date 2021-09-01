/* eslint-disable */

import { Expose, Type } from "class-transformer";

class KakaoKeywordAddress {
  @Expose({ name: "address_name" })
  acOldAddress!: string;

  @Expose({ name: "road_address_name" })
  acNewAddress!: string;

  @Expose({ name: "place_name" })
  acAddressDesc!: string;

  @Expose({ name: "y" })
  @Type(() => Number)
  ulLatiPos!: number;

  @Expose({ name: "x" })
  @Type(() => Number)
  ulLongPos!: number;
}

export default KakaoKeywordAddress;
