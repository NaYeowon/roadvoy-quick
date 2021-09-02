/* eslint-disable */

enum PaymentMode {
  UNDEFINED = 0,
  CARD = 2,
  CASH = 3,
  PRE_PAYMENT = 4, // 선결제
  INSTALLMENT_PAYMENT = 6 // 분할결제
}

export default PaymentMode;
