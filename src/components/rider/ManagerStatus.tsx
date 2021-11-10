import { Tag } from "antd";
import { ManagerFlag } from "src/domain/Errand/model";
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
