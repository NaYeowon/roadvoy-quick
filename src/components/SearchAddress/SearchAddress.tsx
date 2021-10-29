import DaumPostcode, { AddressData } from "react-daum-postcode";
import AddressAPIService from "../../util/AddressAPIService";
import KakaoAddress from "../../util/KakaoAddress";
import { modalStyle } from "./style";

export interface IAddress {
  acOldAddress: string;
  acNewAddress: string;
  acAddressDesc: string;
  ulLatiPos: number;
  ulLongPos: number;
}

interface ISearchAddressProps {
  visible: boolean;
  onSuccess: (address: IAddress) => void;
  onFailure: (message: string) => void;
}

export default function SearchAddress(props: ISearchAddressProps) {
  const { visible, onSuccess, onFailure } = props;
  if (!visible) {
    return <></>;
  }

  const handleComplete = async (data: AddressData) => {
    const kakaos = await AddressAPIService.getAddressByKakaoAddress(data.address);
    if (kakaos.length === 0) {
      onFailure("주소지의 좌표 정보를 찾지 못했습니다");
      return;
    }

    const kakao: KakaoAddress = kakaos[0];

    console.log(data);
    onSuccess({
      acOldAddress:
        data.jibunAddress && data.jibunAddress.length > 0 ? data.jibunAddress : data.address,
      acNewAddress: data.roadAddress,
      acAddressDesc: data.buildingName,
      ulLatiPos: kakao.ulLatiPos,
      ulLongPos: kakao.ulLongPos,
    });
  };

  return (
    <DaumPostcode
      onComplete={handleComplete}
      autoClose
      width={595}
      height={450}
      style={modalStyle}
    />
  );
}
