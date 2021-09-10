/* eslint-disable */

import { Type, Expose } from "class-transformer";

class KakaoAddress {
  @Expose({ name: "address_name" })
  addressName!: string;

  @Expose({ name: "y" })
  @Type(() => Number)
  ulLatiPos!: number;

  @Expose({ name: "x" })
  @Type(() => Number)
  ulLongPos!: number;
}

export default KakaoAddress;
