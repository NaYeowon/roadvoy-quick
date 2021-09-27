import Col from "antd/lib/col";
import Row from "antd/lib/row";
import styled from "styled-components";

export const RiderItemWrapper = styled(Row)`
  display: flex;
  padding: 4px;
  border-bottom: 1px solid #ebebeb;
  align-items: center;
`;

export const RiderName = styled(Col)`
  color: #212121;
  font-weight: bold;
  text-align: left;
`;

export const ButtonWrap = styled(Col)`
  text-align: right;
`;
