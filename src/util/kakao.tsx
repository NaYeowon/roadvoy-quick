/* eslint-disable */

import axios from "axios";

interface KakaoAddress {
  address_name: string;

  y: number;

  x: number;
}

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

    if (response.data && response.data.documents) {
      return response.data.documents as KakaoAddress[];
    } else {
      return [];
    }
  }
}

export default AddressAPIService;
