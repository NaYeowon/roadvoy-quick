import { Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { MemberIdDto } from "../../../domain/Member/model";

const { Option } = Select;

interface MemberIdProps {
  memberIds: MemberIdDto[];
  onChange: (memberId: MemberIdDto) => void;
}

export default function MemberIdSelector(props: MemberIdProps) {
  const { memberIds, onChange } = props;

  const [select, setSelect] = useState<string>("선택하세요");

  useEffect(() => {
    setSelect("선택하세요");
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
