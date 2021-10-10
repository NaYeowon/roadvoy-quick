import { Select, Spin } from "antd";
import { MemberIdDto } from "../../../domain/Member/model";

const { Option } = Select;

interface MemberIdProps {
  memberIds: MemberIdDto[];
  onChange: (memberId: MemberIdDto) => void;
}

export default function MemberIdSelector(props: MemberIdProps) {
  const { memberIds, onChange } = props;

  return (
    <Select
      defaultValue={"선택하세요"}
      onChange={(value: string) => {
        onChange(JSON.parse(value));
      }}
    >
      {memberIds.map(it => (
        <Option key={JSON.stringify(it)} value={JSON.stringify(it)}>
          {it.acCompany || it.acPresident || it.ucAreaNo}
        </Option>
      ))}
    </Select>
  );
}
