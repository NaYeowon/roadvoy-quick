/* eslint-disable */
import { useEffect } from "react";
import { useState } from "react";
import Script from "react-load-script";
/* global kako */
declare var kakao: any;

interface AddressDaumMapComponentProps {
  acAddress: string;
}

export const AddressDaumMapComponent = (props: AddressDaumMapComponentProps) => {
  const { acAddress } = props;
  const [map, setMap] = useState<any | undefined>();

  const handleScriptLoad = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("myMap");
      const options = {
        level: 3,
      };

      //지도를 미리 생성
      setMap(new kakao.maps.Map(container, options));
    });
  };

  useEffect(() => {
    if (!map) {
      return;
    }

    //주소-좌표 변환 객체를 생성
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(
      acAddress,
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
      [acAddress]
    );
  }, [map, acAddress]);

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
