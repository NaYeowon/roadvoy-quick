import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { LoginForm } from "src/pages/shared/Login";
import { MemberIdDto } from "../../../domain/Member/model";

const { Option } = Select;

export type MemberType = "AREA" | "DISTRIB" | "AGENCY" | "RIDER" | "SHOP";
interface MemberIdProps {
  memberIds: MemberIdDto[];
  memberType: MemberType;
  onChange: (memberId: MemberIdDto) => void;
}

export default function MemberIdSelector(props: MemberIdProps) {
  const { memberType, memberIds, onChange } = props;

  const [select, setSelect] = useState<string>("전체");
  const [loginId, setLoginId] = useLocalStorage<LoginForm | undefined>("loginId", undefined);

  useEffect(() => {
    console.log(loginId);
    if (loginId) {
      let sut;

      if (memberType === "AGENCY") {
        sut = memberIds.find(
          it =>
            Number(it.ucAreaNo) === Number(loginId.ucAreaNo) &&
            Number(it.ucDistribId) === Number(loginId.ucDistribId) &&
            Number(it.ucAgencyId) === Number(loginId.ucAgencyId) &&
            Number(it.ucMemCourId) === Number(loginId.ucMemCourId)
        );
      } else if (memberType === "AREA") {
        sut = memberIds.find(it => Number(it.ucAreaNo) === Number(loginId.ucAreaNo));
      } else if (memberType === "DISTRIB") {
        sut = memberIds.find(
          it =>
            Number(it.ucAreaNo) === Number(loginId.ucAreaNo) &&
            Number(it.ucDistribId) % 16 === Number(loginId.ucDistribId) % 16
        );
      }
      if (sut) {
        setSelect(sut.acCompany || sut.ucAreaNo);
        onChange(sut);
      }
    } else {
      setSelect("ddddd");
    }
  }, [memberIds]);

  return (
    <Select
      defaultValue={"선택하세요"}
      onChange={(value: string) => {
        const it = JSON.parse(value);
        setSelect(it.acCompany || it.acPresident || it.ucAreaNo);
        onChange(it);
      }}
      value={select}
    >
      {memberIds.map(it => (
        <Option key={JSON.stringify(it)} value={JSON.stringify(it)}>
          {it.acCompany || it.acPresident || it.ucAreaNo}
        </Option>
      ))}
    </Select>
  );
}
