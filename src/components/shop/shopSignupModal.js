import React, { Component } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import { Form, Input, Button, Row, Col } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import './shopSign.css'
class shopSignupModal extends Component {

    constructor(props) {
        super(props);

        this.state = { isModalVisible : false };

        this.state = {
            company: '',
            president: '',
            password: '',
            cellNo: '',
            phoneNo: '',
            bizRegNo: '',
            resRegNo: '',
            addrDesc: '',
            allocRemark: '',
            remark: '',
            cpPresident: '',
            cpCellNo: '',
            baseDist: '',
            baseFare: '',
            extraDist: '',
            extraFare: ''
        }

        this.onSingupData = this.onSingupData.bind(this)
    }

    onCompany = (e) => {
        this.setState({ company: e.target.value })
    }

    onPresident = (e) => {
        this.setState({ president: e.target.value })
    }

    onPassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onCellNo = (e) => {
        this.setState({ cellNo: e.target.value })
    }

    onPhoneNo = (e) => {
        this.setState({ phoneNo: e.target.value })
    }

    onBizRegNo = (e) => {
        this.setState({ bizRegNo: e.target.value })
    }

    onResRegNo = (e) => {
        this.setState({ resRegNo: e.target.value })
    }

    onAddrDesc = (e) => {
        this.setState({ addrDesc: e.target.value })
    }

    onAllocRemark = (e) => {
        this.setState({ allocRemark: e.target.value })
    }

    onRemark = (e) => {
        this.setState({ remark: e.target.value })
    }

    onCpPresident = (e) => {
        this.setState({ cpPresident: e.target.value })
    }

    onCpCellNo = (e) => {
        this.setState({ cpCellNo: e.target.value })
    }

    onBaseDist = (e) => {
        this.setState({ baseDist: e.target.value })
    }

    onBaseFare = (e) => {
        this.setState({ baseFare: e.target.value })
    }

    onExtraDist = (e) => {
        this.setState({ extraDist: e.target.value })
    }

    onExtraFare = (e) => {
        this.setState({ extraFare: e.target.value })
    }

    handleOk = (e) => {
        this.setState({ isModalVisible : false});
        e.preventDefault();
        this.props.onOk(this.state.isModalVisible)
    };

    handleCancel = (e) => {
        this.setState({ isModalVisible : false });
        e.preventDefault();

        this.props.onCancel(this.state.isModalVisible)
    };

    componentDidMount = () => {
        //console.log(this.props.visible, "ddd");
    }

    async onSingupData(e) 
    {
        try 
        {
            const form = new FormData();
            const { company, president, password, cellNo, phoneNo, bizRegNo, resRegNo, addrDesc, allocRemark, remark, cpPresident, cpCellNo, baseDist, baseFare, extraDist, extraFare } = this.state
            
            form.append("company", company);
            form.append("president", president);
            form.append("password", password);
            form.append("cellNo", cellNo);
            form.append("phoneNo", phoneNo);
            form.append("bizRegNo", bizRegNo);
            form.append("resRegNo", resRegNo);
            form.append("addrDesc", addrDesc);
            form.append("allocRemark", allocRemark);
            form.append("remark", remark);
            form.append("cpPresident", cpPresident);
            form.append("cpCellNo", cpCellNo);
            form.append("baseDist", baseDist);
            form.append("baseFare", baseFare);
            form.append("extraDist", extraDist);
            form.append("extraFare", extraFare);

            const response = await axios (
                {
                    method: 'post',
                    url: 'https://api.roadvoy.net/agency/shop/signup.php',
                    data: form,
                    headers: 
                    {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
        } catch(error)
        {
            if(error.response && error.response.data && error.response.data.msg)
            {
                throw new Error(error.response.data.msg);
            }
            else 
            {
                throw new Error("서버에서 응답을 받지 못했습니다.");
            }
        }
    }
    render() {
        const
        {
            company, 
            president, 
            password, 
            cellNo, 
            phoneNo, 
            bizRegNo, 
            resRegNo, 
            addrDesc, 
            allocRemark, 
            remark, 
            cpPresident,
            cpCellNo, 
            baseDist,
            baseFare, 
            extraDist, 
            extraFare
        } = this.state;
        return (
            <>
                <Modal width="700px" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'100px'}}>
                <div style={{textAlign: 'center'}}>
                <h2 htmlFor="company-name">가맹등록</h2>
                <Form onSubmit='handleOk' onSubmit={this.onSingupData}>
                <div style={{textAlign: 'center', margin: '0 auto'}}>
                    <Row gutter={[16, 48]} justify="center" >
                        <Col span={4}>
                            <label>가맹점명&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input
                                name="company"
                                value={company}
                                onChange={this.onCompany}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 48]}>
                        <Col span={4}>
                            <label>대표자명&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="president"
                                value={president}
                                onChange={this.onPresident}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>비밀번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="password"
                                value={password}
                                onChange={this.onPassword}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>휴대폰번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                prefix={<PhoneOutlined />} 
                                name="CellNo"
                                value={cellNo}
                                onChange={this.onCellNo}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>전화번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input
                                prefix={<PhoneOutlined />} 
                                name="phoneNo" 
                                value={phoneNo}
                                onChange={this.onPhoneNo}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>사업자번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="bizRegNo"
                                value={bizRegNo}
                                onChange={this.onBizRegNo}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>생년월일&nbsp;:</label>
                        </Col>
                        <Col span={4}>
                            <Input 
                                name="resRegNo"
                                value={resRegNo}
                                onChange={this.onResRegNo}/>
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
                            <Input 
                                placeholder="상세 주소를 입력하세요"
                                name="addrDesc"
                                value={addrDesc}
                                onChange={this.onAddrDesc} />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>배차특이사항&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input
                                name="allocRemark" 
                                value={allocRemark}
                                onChange={this.onAllocRemark}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>가맹특이사항&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                           <Input 
                                name="remark"
                                value={remark}
                                onChange={this.onRemark}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>담당관리자&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="cpPresident"
                                value={cpPresident}
                                onChange={this.onCpPresident}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>관리자연락처&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                prefix={<PhoneOutlined />}
                                name="cpCellNo"
                                value={cpCellNo}
                                onChange={this.onCpCellNo} />
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={6}>
                            <label>기본료&nbsp;:</label>
                        </Col>
                        <Col span={10}>
                            <Row gutter={[48]}>
                                <Col span={12}>
                                     <Input 
                                        addonAfter="m"
                                        name="baseDist"
                                        value={baseDist}
                                        onChange={this.onBaseDist}/>
                                </Col>
                                <Col span={12}>
                                    <Input 
                                        addonAfter="m"
                                        name="baseFare"
                                        value={baseFare}
                                        onChange={this.onBaseFare}/>
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
                                   <Input 
                                        addonAfter="원"
                                        name="extraDist"
                                        value={extraDist}
                                        onChange={this.onExtraDist}/>
                                </Col>
                                <Col span={12}>
                                    <Input 
                                        addonAfter="원"
                                        name="extraFare"
                                        value={extraFare}
                                        onChange={this.extraFare}/>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row id="sign-up-submit">
                    <Button type="primary" size="large" onClick={this.onSingupData} block>
                        가맹등록
                      </Button>
                    </Row>
                    </div>
                    </Form>
                </div>
            </div>
                </Modal>
            </>
        );
    }
}

export default shopSignupModal;