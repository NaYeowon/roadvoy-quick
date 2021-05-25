import React, { useState } from 'react';

import { Form, Input, Button, Row, Col } from "antd";
import { PhoneOutlined } from '@ant-design/icons';

const riderSignup = () => {
    const [userId, setUserId] = useState('');
    const [president, setPresident] = useState('');
    const [password, setPassword] = useState('');
    const [teamName, setTeamName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [bankCode, setBankCode] = useState('');
    const [withdrawPassword, setWithdrawPassword] = useState('');
    const [courierTag, setCourierTag] = useState('');
    const [courierLease, setCourierLease] = useState('');
    const [courierDeposit, setCourierDeposit] = useState('');
    const [callUnitPrice, setCallUnitPrice] = useState('');
    const [conCallLimit, setConCallLimit] = useState('');
    const [managerFlag, setManagerFlag] = useState('');
   
    const onSubmit = () => {};
    const onChangeUserId = e => {
        setUserId(e.target.value);
    };
    const onChangePresident = e => {
        setPresident(e.target.value);
    };
    const onChangePassword = e => {
        setPassword(e.target.value);
    };
    const onChangeTeamName = e => {
        setTeamName(e.target.value);
    };
    const onChangePhoneNo = e => {
        setPhoneNo(e.target.value);
    };
    const onChangeBankCode = e => {
        setBankCode(e.target.value);
    };
    const onChangeWithdrawPassword = e => {
        setWithdrawPassword(e.target.value);
    };
    const onChangeCourierTag = e => {
        setCourierTag(e.target.value);
    };
    const onChangeCourierLease = e => {
        setCourierLease(e.target.value);
    };
    const CourierDepositonChange = e => {
        setCourierDeposit(e.target.value);
    };
    const onChangeCallUnitPrice = e => {
        setCallUnitPrice(e.target.value);
    };
    const onChangeConCallLimit = e => {
        setConCallLimit(e.target.value);
    };
    const onChangeManagerFlag = e => {
        setManagerFlag(e.target.value);
    };
    return (
        <>
        <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'100px'}}>
            <div style={{textAlign: 'center'}}>
                <h2 htmlFor="userId">로그인 아이디</h2>
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

export default riderSignup;