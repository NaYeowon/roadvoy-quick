/* eslint-disable */
import { Select } from "antd";
import { useState } from "react";

const { Option } = Select;
const provinceData = ["전체", "북수원총판", "동수원총판"];
const selectData = {
  전체: ["전체", "대행1", "대행2"],
  북수원총판: ["전체", "대행1", "대행2"],
  동수원총판: ["전체", "대행1", "대행2"]
};

const SelectPage = () => {
  const [distributor, setDistributor] = useState(selectData[provinceData[0]]);
  const [agency, setAgency] = useState(selectData[provinceData[0]][0]);

  const handleProvinceChange = value => {
    setDistributor(selectData[value]);
    setAgency(selectData[value][0]);
  };

  const onSecondCityChange = value => {
    setAgency(value);
  };

  return (
    <>
      <Select
        defaultValue={provinceData[0]}
        style={{ width: 120, marginRight: "5px" }}
        onChange={handleProvinceChange}
      >
        {provinceData.map(province => (
          <Option value={province}>{province}</Option>
        ))}
      </Select>
      <Select style={{ width: 120 }} value={agency} onChange={onSecondCityChange}>
        {distributor.map(city => (
          <Option value={city}>{city}</Option>
        ))}
      </Select>
    </>
  );
};
export default SelectPage;
