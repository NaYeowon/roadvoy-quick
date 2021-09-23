import Col from "antd/lib/col";
import styled from "styled-components";

export const formItemLayout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 14,
  },
};

export const LeftAlignedCol = styled(Col)`
  text-align: left;
`;

export const TitleCol = styled(Col)`
  font-size: 3vh;
  padding: 5px 20px 15px 20px;
`;
