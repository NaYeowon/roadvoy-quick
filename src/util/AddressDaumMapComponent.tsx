/* eslint-disable */
import { useEffect } from "react";
import { useState } from "react";
import Script from "react-load-script";
import { ShopDTO } from "src/components/shop/types";
import { ErrandDto } from "../domain/Errand/model";

/* global kako */
declare var kakao: any;

interface AddressDaumMapComponentProps {
  errand: ErrandDto;
}

export const AddressDaumMapComponent = (props: AddressDaumMapComponentProps) => {
  const { errand } = props;
  const [map, setMap] = useState<any | undefined>();

  const handleScriptLoad = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(errand.ulDestLatiPos, errand.ulDestLongPos),
        level: 3,
      };

      //지도를 미리 생성
      setMap(new kakao.maps.Map(container, options));
    });
  };

  useEffect(() => {
    if (!map || !errand) {
      return;
    }

    //주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      errand.acDestOldAddr,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          map.setCenter(coords, marker);
        }
      },
      [errand.acDestAddrDesc]
    );
  }, [map, errand]);

  return (
    <>
      <div
        id="myMap"
        style={{
          width: "100%",
          height: "200px",
        }}
      ></div>
      <Script
        url="https://dapi.kakao.com/v2/maps/sdk.js?appkey=aa85f439ef7c11b952d604921a20714d&libraries=services,drawing&autoload=false"
        onLoad={handleScriptLoad}
      />
    </>
  );
};

interface ShopAddressProps {
  shop: ShopDTO;
}
export const ShopAddressComponent = (props: ShopAddressProps) => {
  const { shop } = props;
  const [map, setMap] = useState<any | undefined>();

  const handleScriptLoad = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("myMap");
      const options = {
        center: new kakao.maps.LatLng(shop.ulLatiPos, shop.ulLongPos),
        level: 3,
      };

      //지도를 미리 생성
      setMap(new kakao.maps.Map(container, options));
    });
  };

  useEffect(() => {
    if (!map || !shop) {
      return;
    }

    //주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      shop.acOldAddress,
      function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          var marker = new kakao.maps.Marker({
            map: map,
            position: coords,
          });
          map.setCenter(coords, marker);
        }
      },
      [shop.acAddressDesc]
    );
  }, [map, shop]);

  return (
    <>
      <div
        id="myMap"
        style={{
          width: "100%",
          height: "200px",
        }}
      ></div>
      <Script
        url="https://dapi.kakao.com/v2/maps/sdk.js?appkey=aa85f439ef7c11b952d604921a20714d&libraries=services,drawing&autoload=false"
        onLoad={handleScriptLoad}
      />
    </>
  );
};
