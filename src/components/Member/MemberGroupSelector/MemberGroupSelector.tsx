import { message, Row } from "antd";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import useLocalStorage from "src/hooks/useLocalStorage";
import { LoginForm } from "src/pages/shared/Login";
import api from "../../../config/axios";
import { MemberIdDto } from "../../../domain/Member/model";
import { MemberIdSelector } from "../MemberIdSelector";

export default function MemberGroupSelector() {
  const [areas, setAreas] = useState<MemberIdDto[]>([]);
  const [distribs, setDistribs] = useState<MemberIdDto[]>([]);
  const [agencies, setAgencies] = useState<MemberIdDto[]>([]);
  const [riders, setRiders] = useState<MemberIdDto[]>([]);
  const [shops, setShops] = useState<MemberIdDto[]>([]);

  const getAreaList = async () => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/get-areas.php",
      });

      const items = response.data.lstUcAreaNo as number[];

      setAreas(
        items.map(it => ({
          ucAreaNo: it,
          ucDistribId: 0,
          ucAgencyId: 0,
          ucMemCourId: 0,
          acPresident: undefined,
          acCompany: undefined,
        }))
      );
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const findDistribList = async (memberId: MemberIdDto) => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/find-distribs-by-area.php",
        params: {
          ucAreaNo: memberId.ucAreaNo,
        },
      });

      const items = response.data.lstMember as MemberIdDto[];

      setDistribs(items);
      setAgencies([]);
      setRiders([]);
      setShops([]);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const findAgencyList = async (memberId: MemberIdDto) => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/find-agencies-by-distrib.php",
        params: {
          ucAreaNo: memberId.ucAreaNo,
          ucDistribId: memberId.ucDistribId,
        },
      });

      const items = response.data.lstMember as MemberIdDto[];

      setAgencies(items);
      setRiders([]);
      setShops([]);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const findRiderList = async (memberId: MemberIdDto) => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/find-riders-by-agency.php",
        params: {
          ucAreaNo: memberId.ucAreaNo,
          ucDistribId: memberId.ucDistribId,
          ucAgencyId: memberId.ucAgencyId,
        },
      });

      const items = response.data.lstMember as MemberIdDto[];

      setRiders(items);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  const findShopList = async (memberId: MemberIdDto) => {
    try {
      const response = await api({
        method: "get",
        url: "/hq/member/process-query/find-shops-by-agency.php",
        params: {
          ucAreaNo: memberId.ucAreaNo,
          ucDistribId: memberId.ucDistribId,
          ucAgencyId: memberId.ucAgencyId,
        },
      });

      const items = response.data.lstMember as MemberIdDto[];

      setShops(items);
    } catch (e) {
      const error = e as AxiosError;
      message.error(error.message);
    }
  };

  useEffect(() => {
    getAreaList();
  }, []);

  const handleChangeArea = (memberId: MemberIdDto) => {
    findDistribList(memberId);
  };

  const handleChangeDistrib = (memberId: MemberIdDto) => {
    findAgencyList(memberId);
  };

  const handleChangeAgency = (memberId: MemberIdDto) => {
    findRiderList(memberId);
    findShopList(memberId);
  };

  const handleChangeShop = (memberId: MemberIdDto) => {};

  const handleChangeRider = (memberId: MemberIdDto) => {};

  return (
    <Row>
      <MemberIdSelector
        memberType="AREA"
        key="area"
        memberIds={areas}
        onChange={handleChangeArea}
      />
      <MemberIdSelector
        memberType="DISTRIB"
        key="distrib"
        memberIds={distribs}
        onChange={handleChangeDistrib}
      />
      <MemberIdSelector
        memberType="AGENCY"
        key="agency"
        memberIds={agencies}
        onChange={handleChangeAgency}
      />
      <MemberIdSelector
        memberType="SHOP"
        key="shop"
        memberIds={shops}
        onChange={handleChangeShop}
      />
      <MemberIdSelector
        memberType="RIDER"
        key="rider"
        memberIds={riders}
        onChange={handleChangeRider}
      />
    </Row>
  );
}
