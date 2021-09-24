/* eslint-disable */

import { AutoComplete, Button, Input, message } from "antd";
import Form from "antd/lib/form";
import Search from "antd/lib/input/Search";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { formItemLayout } from "../Order/Popup/styles";
import { SearchAddress } from "../SearchAddress";
import { IAddress } from "../SearchAddress/SearchAddress";

export interface IPlace {
  acCompany: string;
  acCellNo: string;
  acMemo: string;
  ulLatiPos: number;
  ulLongPos: number;
  acOldAddress: string;
  acNewAddress: string;
  acAddressDesc: string;
}

interface IPlaceProps {
  prefix: string;
  place: IPlace;
  onChange: (place: IPlace) => void;
}

export default function Place(props: IPlaceProps) {
  const { prefix, place, onChange } = props;
  const [searchAddress, setSearchAddress] = useState(false);

  const switchSearchAddress = (bool: boolean) => {
    setSearchAddress(bool);
    setSearchAddress(!searchAddress)
  };
  return (
    <>
      <Form
        {...formItemLayout}
        initialValues={{
          "input-number": 3,
          "checkbox-group": ["A", "B"],
          rate: 3.5,
        }}
      >
        <Form.Item label={`${prefix} 업체명`}>
          <AutoComplete
            style={{ textAlign: "left" }}
            placeholder="업체명을 입력하세요"
            filterOption={(inputValue, option) =>
              option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
            }
            value={place.acCompany}
            onChange={value =>
              onChange({
                ...place,
                acCompany: value,
              })
            }
          />
        </Form.Item>
        <Form.Item label={`${prefix} 연락처`}>
          <Search
            placeholder="연락처를 입력하세요"
            enterButton="검색"
            value={place.acCellNo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...place,
                acCellNo: e.target.value
                  .replace(/[^0-9]/g, "")
                  .replace(
                    /(^02|^0504|^0508|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})/,
                    "$1-$2-$3"
                  )
                  .replace("--", "-"),
              });
            }}
          />
        </Form.Item>
        <Form.Item label={`${prefix} 주소`}>
          <Button type="primary" onClick={() => switchSearchAddress(true)} style={{ width: "100%" }}>
            주소검색
          </Button>
          <SearchAddress
            visible={searchAddress}
            onSuccess={(address: IAddress) => {
              onChange({
                ...place,
                acOldAddress: address.acOldAddress,
                acNewAddress: address.acNewAddress,
                acAddressDesc: address.acAddressDesc,
                ulLatiPos: address.ulLatiPos,
                ulLongPos: address.ulLongPos,
              });

              setSearchAddress(false);
            }}
            onFailure={(text: string) => {
              message.error(text);
              setSearchAddress(false);
            }}
          />
          {place.acOldAddress} {place.acAddressDesc}
        </Form.Item>
        <Form.Item label={`${prefix} 상세주소`}>
          <Input
            placeholder="상세주소를 입력하세요"
            value={place.acAddressDesc}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              onChange({
                ...place,
                acAddressDesc: e.target.value,
              });
            }}
          />
        </Form.Item>
        <Form.Item label={`${prefix} 요청사항`}>
          <TextArea
            rows={2}
            value={place.acMemo}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              onChange({
                ...place,
                acMemo: e.target.value,
              });
            }}
          />
        </Form.Item>
      </Form>
    </>
  );
}
