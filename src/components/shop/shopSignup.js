import React, { useState } from 'react';
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from "antd";

const ShopSignup = () => {
    const [company, setCompany] = useState('');
    const [president, setPresident] = useState('');
    const [password, setPassword] = useState('');
    const [cellNo, setCellNo] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [bizRegNo, setBizRegNo] = useState('');
    const [resRegNo, setResRegNo] = useState('');
    const [addrDesc, setAddrDesc] = useState('');
    const [allocRemark, setAllocRemark] = useState('');
    const [remark, setRemark] = useState('');
    const [cpPresident, setCpPresident] = useState('');
    const [cpCellNo, setCpCellNo] = useState('');
    const [baseDist, setBaseDist] = useState('');
    const [baseFare, setBaseFare] = useState('');
    const [extraDist, setExtraDist] = useState('');
    const [extraFare, setExtraFare] = useState('');

    const onSubmit = () => {};
    const onChangeCompany = e => {
        setCompany(e.target.value);
    };
    const onChangePresident = e => {
        setPresident(e.target.value);
    };
    const onChangePassword = e => {
        setPassword(e.target.value);
    };
    const onChangeCellNo = e => {
        setCellNo(e.target.value);
    };
    const onChangePhoneNo = e => {
        setPhoneNo(e.target.value);
    };
    const onChangeBizRegNo = e => {
        setBizRegNo(e.target.value);
    };
    const onChangeResRegNo = e => {
        setResRegNo(e.target.value);
    };
    const onChangeAddrDesc = e => {
        setAddrDesc(e.target.value);
    };
    const onChangeAllocRemark = e => {
        setAllocRemark(e.target.value);
    };
    const onChangeRemark = e => {
        setRemark(e.target.value);
    };
    const onChangeCpPresident = e => {
        setCpPresident(e.target.value);
    };
    const onChangeCpCellNo = e => {
        setCpCellNo(e.target.value);
    };
    const onChangeBaseDist = e => {
        setBaseDist(e.target.value);
    };
    const onChangeBaseFare= e => {
        setBaseFare(e.target.value);
    };
    const onChangeExtraDist = e => {
        setExtraDist(e.target.value);
    };
    const onChangeExtraFare = e => {
        setExtraFare(e.target.value);
    };
    return (
        <>
       <Head>
            <title>NodeBird</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.js"></script>
        </Head>
        <Form onSubmit={onSubmit}>
            <div>
                <label htmlFor="company-name">가맹점명</label>
            </div>
        </Form>
        </>
    );
};

export default ShopSignup;