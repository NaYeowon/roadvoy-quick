/* eslint-disable */

import Address from "./Address";
import KakaoKeywordAddress from "./KakaoKeywordAddress";

export class AddressConverter {
  public static convertByKakaoKeywordAddressList(
    kakaoAddressList: KakaoKeywordAddress[]
  ): Address[] {
    const addressList: Address[] = kakaoAddressList.map((kakaoAddress: KakaoKeywordAddress) => {
      const address: Address = new Address();
      address.acOldAddress = kakaoAddress.acOldAddress;
      if (kakaoAddress.acAddressDesc) {
        address.acOldAddress = `${address.acOldAddress} ${kakaoAddress.acAddressDesc}`;
      }
      address.acNewAddress = kakaoAddress.acNewAddress;
      address.ulCurrLatiPos = kakaoAddress.ulLatiPos;
      address.ulCurrLongPos = kakaoAddress.ulLongPos;

      return address;
    });
    return addressList;
  }
}
