/* eslint-disable */
import * as geolib from "geolib";

class DistanceHelper {
  static getDistance(uloOriginLatiPos, ulOriginLongPos, ulDestLatiPos, ulDestLongPos) {
    const distance = geolib.getDistance(
      { latitude: uloOriginLatiPos, longitude: ulOriginLongPos },
      { latitude: ulDestLatiPos, longitude: ulDestLongPos }
    );

    return distance;
  }

  static getDistanceText(uloOriginLatiPos, ulOriginLongPos, ulDestLatiPos, ulDestLongPos) {
    const distance = geolib.getDistance(
      { latitude: uloOriginLatiPos, longitude: ulOriginLongPos },
      { latitude: ulDestLatiPos, longitude: ulDestLongPos }
    );

    return DistanceHelper.getDistanceToText(distance);
  }

  static getDistanceToText(distance) {
    if (distance >= 1000) {
      return (distance / 1000).toFixed(2) + "km";
    } else {
      return parseInt(distance) + "m";
    }
  }
}

export default DistanceHelper;
