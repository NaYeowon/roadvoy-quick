import React, { useState } from 'react';
// import Head from 'next/head';

import { Form, Input, Button, Row, Col } from "antd";
import { PhoneOutlined } from '@ant-design/icons';
import './shopSign.css'

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
       {/* <Head>
            <title>NodeBird</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.css" />
            <script src="https://cdnjs.cloudflare.com/ajax/libs/antd/3.18.1/antd.js"></script>
        </Head> */}
            <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'100px'}}>
                <div style={{textAlign: 'center'}}>
                <h2 htmlFor="company-name">가맹등록</h2>
                <Form onSubmit={onSubmit}>
                <div style={{textAlign: 'center', margin: '0 auto'}}>
                    <Row gutter={[16, 48]} justify="center" >
                        <Col span={4}>
                            <label>가맹점명&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 48]}>
                        <Col span={4}>
                            <label>대표자명&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>비밀번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input prefix={<PhoneOutlined />} />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>휴대폰번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input prefix={<PhoneOutlined />} />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>전화번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>사업자번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>생년월일&nbsp;:</label>
                        </Col>
                        <Col span={4}>
                            <Input />
                        </Col>
                        <Col span={4}>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>가맹점주소&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Button type="primary" style={{width: '100%'}}>
                                주소검색
                            </Button>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>상세주소&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input placeholder="상세 주소를 입력하세요" />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>배차특이사항&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>가맹특이사항&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>담당관리자&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>관리자연락처&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input prefix={<PhoneOutlined />} />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={6}>
                            <label>기본료&nbsp;:</label>
                        </Col>
                        <Col span={10}>
                            <Row gutter={[48]}>
                                <Col span={12}>
                                    <Input addonAfter="m"/>
                                </Col>
                                <Col span={12}>
                                    <Input addonAfter="m"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={6}>
                            <label>거리할증&nbsp;:</label>
                        </Col>
                        <Col span={10}>
                            <Row gutter={[48]}>
                                <Col span={12}>
                                    <Input addonAfter="원"/>
                                </Col>
                                <Col span={12}>
                                    <Input addonAfter="원"/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row id="sign-up-submit">
                    <Button type="primary" htmlType="submit" block>
                        가맹등록
                    </Button>
                    </Row>
                    </div>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default ShopSignup;