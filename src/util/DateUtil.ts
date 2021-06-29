import moment from "moment";

export const monthFirstDateFormat = "YYYY-MM-01";
export const dateFormat = "YYYY-MM-DD";

class DateUtil {
  public static getMonthFirstDate() {
    return moment(DateUtil.getTodayMoment()).format(monthFirstDateFormat);
  }

  public static getMonthFirstDateMoment(): moment.Moment {
    return moment(moment(DateUtil.getTodayMoment()).format(monthFirstDateFormat));
  }

  public static formatShortDate(date: string | moment.Moment) {
    return moment(date).format("MM월 DD일");
  }

  public static format(_moment: moment.Moment) {
    return moment(_moment).format(dateFormat);
  }

  public static getTodayMoment(): moment.Moment {
    if (parseInt(moment().format("H")) < 6) {
      return moment().subtract(1, "days");
    } else {
      return moment();
    }
  }
}

export default DateUtil;
