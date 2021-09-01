/* eslint-disable */
import geolib from "geolib";
import NumberUtil from "src/util/NumberUtil";

class DistanceHelper {
  static getDistance(ulFromLatiPos, ulFromLongPos, ulToLatiPos, ulToLongPos) {
    const distance = geolib.getDistance(
      { latitude: parseFloat(ulFromLatiPos), longitude: parseFloat(ulFromLongPos) },
      { latitude: parseFloat(ulToLatiPos), longitude: parseFloat(ulToLongPos) }
    );

    return distance;
  }

  static getDistanceText(ulFromLatiPos, ulFromLongPos, ulToLatiPos, ulToLongPos) {
    const distance = geolib.getDistance(
      { latitude: parseFloat(ulFromLatiPos), longitude: parseFloat(ulFromLongPos) },
      { latitude: parseFloat(ulToLatiPos), longitude: parseFloat(ulToLongPos) }
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
