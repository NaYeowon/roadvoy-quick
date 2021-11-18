import { Tag } from "antd";
import { RiderSignUpRequest } from "../shop/types";

interface Props {
  cManagerFlag: string;
  rider?: RiderSignUpRequest;
}

const ManagerStatus = (props: Props) => {
  const { cManagerFlag } = props;

  let managerText;
  let managerColor;
  switch (cManagerFlag) {
    case "Y":
      managerText = "관리자";
      managerColor = "red";
      break;
  }
  return (
    <>
      <Tag color={managerColor}>{managerText}</Tag>
    </>
  );
};

export default ManagerStatus;
