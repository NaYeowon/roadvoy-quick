/* eslint-disable */

import axios from "axios";
import { plainToClass } from "class-transformer";
import Address from "./Address";
import { AddressConverter } from "./AddressConverter";
import KakaoAddress from "./KakaoAddress";
import KakaoKeywordAddress from "./KakaoKeywordAddress";

class AddressAPIService {
  public static async getAddressByKakaoAddress(_acQuery: string = ""): Promise<KakaoAddress[]> {
    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/search/address.json?query=${_acQuery}`,
      {
        headers: {
          Authorization: "KakaoAK c548171fabbbe9d4e9ca65f2b201225f",
          "Content-Type": "application/json"
        }
      }
    );
    return plainToClass(KakaoAddress, response.data.documents as KakaoAddress[]);
  }

  public static async getAddressListByKaKaoKeyword(_acQuery = ""): Promise<Address[]> {
    let astAddr: Address[] = [];
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${_acQuery}`,
        {
          headers: {
            Authorization: "KakaoAK c548171fabbbe9d4e9ca65f2b201225f",
            "Content-Type": "application/json"
          }
        }
      );

      astAddr = AddressConverter.convertByKakaoKeywordAddressList(
        plainToClass(KakaoKeywordAddress, response.data.documents as KakaoKeywordAddress[])
      );
    } catch (e) {
      console.log(e);
    }
    return astAddr;
  }

  public static async getAddressListByKakaoAddress(_acQuery = ""): Promise<Address[]> {
    let astAddr: Address[] = [];
    try {
      const response = await axios.get(
        `https://dapi.kakao.com/v2/local/search/address.json?query=${_acQuery}`,
        {
          headers: {
            Authorization: "KakaoAK c548171fabbbe9d4e9ca65f2b201225f",
            "Content-Type": "application/json"
          }
        }
      );
      astAddr = AddressConverter.convertByKakaoKeywordAddressList(
        plainToClass(KakaoKeywordAddress, response.data.documents as KakaoKeywordAddress[])
      );
    } catch (e) {
      console.log(e);
    }
    return astAddr;
  }
}

export default AddressAPIService;
