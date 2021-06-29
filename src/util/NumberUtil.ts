class NumberUtil {
    public static formatNumberWithText(val: number) {
        if(!val) val = 0;
        return `${val.toLocaleString()}원`;
    }
}

export default NumberUtil