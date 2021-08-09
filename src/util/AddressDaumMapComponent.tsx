/* eslint-disable */
import React, { useEffect } from "react";
import { useState } from "react";
import Script from "react-load-script";
import { CallInfo } from "src/components/CallList/CallListComponent";

/* global kako */
declare var kakao: any;

interface Props {
  callInfo: CallInfo;
}
const AddressDaumMapComponent = (props: Props) => {
  // const [map, setMap] = useState<any | undefined>(undefined);
  const { callInfo } = props;
  const handleScriptLoad = () => {
    kakao.maps.load(() => {
      const container = document.getElementById("myMap");
      const options = {
        //center: new kakao.maps.LatLng(37.62197524055062, 127.16017523675508),
        center: new kakao.maps.LatLng(callInfo.ulDestLatiPos, callInfo.ulDestLongPos),
        level: 3
      };
      console.log(callInfo.ulDestLatiPos + callInfo.ulDestLongPos);
      var map = new kakao.maps.Map(container, options);

      //마커가 표시 될 위치
      let markerPosition = new kakao.maps.LatLng(37.62197524055062, 127.16017523675508);

      // 마커를 생성
      let marker = new kakao.maps.Marker({
        position: markerPosition
      });

      // 마커를 지도 위에 표시
      marker.setMap(map);
    });
  };

  return (
    <>
      <div
        id="myMap"
        style={{
          width: "100%",
          height: "200px"
        }}
      ></div>
      <Script
        url="https://dapi.kakao.com/v2/maps/sdk.js?appkey=aa85f439ef7c11b952d604921a20714d&libraries=services,drawing&autoload=false"
        onLoad={handleScriptLoad}
      />
    </>
  );
};
export default AddressDaumMapComponent;
