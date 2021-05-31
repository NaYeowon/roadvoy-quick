import React, { Component } from 'react';
import { Modal, Form, Input, Row, Col, Select } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { Checkbox } from '@material-ui/core';
import axios from 'axios';

const { Option } = Select;

class RigerSignupModal extends Component {

    constructor(props) {
        super(props);

        this.state = { isModalVisible : false };

        this.state = {
            userId: '',
            president: '',
            password: '',
            cellNo: '',
            teamName: '',
            bankCode: '',
            withdrawPassword: '',
            courierTag: '',
            courierLease: '',
            courierDeposit: '',
            callUnitPrice: '',
            conCallLimit: '',
            managerFlag: '',
        }
    }

    onUserId = (e) => {
        this.setState({ userId: e.target.value })
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

    onTeamName = (e) => {
        this.setState({ teamName: e.target.value })
    }

    onBankCode = (e) => {
        this.setState({ bankCode: e.target.value })
    }

    onWithdrawPassword = (e) => {
        this.setState({ withdrawPassword: e.target.value })
    }

    onCourierTag = (e) => {
        this.setState({ courierTag: e.target.value })
    }

    onCourierLease = (e) => {
        this.setState({ courierLease: e.target.value })
    }

    onCourierDeposit = (e) => {
        this.setState({ courierDeposit: e.target.value })
    }
   
    onCallUnitPrice = (e) => {
        this.setState({ callUnitPrice: e.target.value })
    }
   
    onConCallLimit = (e) => {
        this.setState({ conCallLimit: e.target.value })
    }
   
    onManagerFlag = (e) => {
        this.setState({ managerFlag: e.target.value })
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

    componentDidMount() {
        //console.log(this.props.visible, "ddd");
    }

    async onSignData(e)
    {
        try 
        {
            const form = new FormData();
            const { userId, president , password, cellNo, teamName, bankCode, withdrawPassword, courierTag, courierLease, courierDeposit, callUnitPrice, conCallLimit, managerFlag } = this.state

            form.append("userId", userId);
            form.append("president", president);
            form.append("password", password);
            form.append("cellNo", cellNo);
            form.append("teamName", teamName);
            form.append("bankCode", bankCode);
            form.append("withdrawPassword", withdrawPassword);
            form.append("courierTag", courierTag);
            form.append("courierLease", courierLease);
            form.append("courierDeposit", courierDeposit);
            form.append("callUnitPrice", callUnitPrice);
            form.append("conCallLimit", conCallLimit);
            form.append("managerFlag", managerFlag);

            const response = await axios (
                {
                    method: 'post',
                    url: 'https://api.roadvoy.net/agency/rider/signup.v2.php',
                    data: form,
                    headers:
                    {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );
        } 
        catch(error)
        {
            if(error.response && error.response.data && error.response.data.msg)
            {
                throw new Error(error.response.data.msg);
            }
            else
            {
                throw new Error('서버에서 응답을 받지 못했습니다.');
            }
        }
    }
    render() {
        const { 
            userId, 
            president , 
            password, 
            cellNo, 
            teamName,
            bankCode, 
            withdrawPassword, 
            courierTag, 
            courierLease, 
            courierDeposit, 
            callUnitPrice, 
            conCallLimit,
             managerFlag } = this.state
        return (
            <>
            <Modal width="700px" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'50px'}}>
            <div style={{textAlign: 'center'}}>
            <h2 htmlFor="company-name">기사등록</h2>
            <Form onSubmit={(e)=> {
                const data = new FormData(e.target);
            }}>
            <div style={{textAlign: 'center', margin: '0 auto'}}>
                <Row gutter={[16, 48]} justify="center" >
                    <Col span={4}>
                        <label>로그인아이디&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                        <Input
                            name="userId"
                            value={userId}
                            onChange={this.onUserId}/>
                    </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                    <Col span={4}>
                        <label>이름&nbsp;:</label>
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
                        <Input prefix={<PhoneOutlined />} 
                            name="cellNo"
                            value={cellNo}
                            onChange={this.onCellNo}/>
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={4}>
                        <label>소속&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                        <Input
                            name="teamName"
                            value={teamName}
                            onChange={this.onTeamName} />
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={4}>
                        <label>출금은행&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                    <Select
                        name="bankCode"
                        value={bankCode}
                        onChange={this.onBankCode}
                        style={{ width: "100%" }}
                    >
                        <Option value="88">신한은행</Option>
                        <Option value="4">국민은행</Option>
                        <Option value="3">기업은행</Option>
                        <Option value="20">우리은행</Option>
                        <Option value="90">카카오뱅크</Option>
                        <Option value="89">케이뱅크</Option>
                        <Option value="11">농협중앙회</Option>
                        <Option value="2">산업은행</Option>
                        <Option value="23">SC제일은행</Option>
                        <Option value="81">KEB하나은행</Option>
                        <Option value="27">씨티뱅크</Option>
                        <Option value="7">수협은행</Option>
                        <Option value="31">대구은행</Option>
                        <Option value="32">부산은행</Option>
                        <Option value="34">광주은행</Option>
                        <Option value="35">제주은행</Option>
                        <Option value="37">전북은행</Option>
                        <Option value="39">경남은행</Option>
                    </Select>
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={4}>
                        <label>출금비밀번호&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                        <Input />
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={4}>
                        <label>기사구분&nbsp;:</label>
                    </Col>
                    <Col span={4}>
                        <Select
                          name=""
                          value=''
                          onChange=''
                          style={{ width: "100%" }}>
                            <Option>지입</Option>
                            <Option>리스</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={5}>
                        <label>1일 리스료&nbsp;:</label>
                    </Col>
                    <Col span={5}>
                        <Input 
                          name=""
                          value=""
                        />
                    </Col> 원&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col span={3}></Col>
                </Row><Row justify="center" gutter={[16], [16]}>
                    <Col span={5}>
                        <label>보증금&nbsp;:</label>
                    </Col>
                    <Col span={5}>
                        <Input 
                          name=""
                          value=""
                        />
                    </Col> 원&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col span={3}></Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={5}>
                        <label>콜수수료&nbsp;:</label>
                    </Col>
                    <Col span={5}>
                        <Input 
                          name=""
                          value=""
                        />
                    </Col> 원&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col span={3}></Col>
                </Row>
                <Row justify="center">
                <Col pull={3}>
                &nbsp;&nbsp;<label>관리자모드&nbsp;:</label>&nbsp;&nbsp;
                    <Checkbox
                    
                    />
                </Col>

                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={5} >
                        <label>콜 동시 접수 제한&nbsp;:</label>
                    </Col>
                    <Col span={5}>
                        <Input 
                          name=""
                          value=""
                        />
                    </Col>건&nbsp;&nbsp;&nbsp;&nbsp;
                    <Col span={3}></Col>
                </Row>
                </div>
                </Form>
            </div>
        </div>
        </Modal>
    </>
    );
    };
}
    
    
export default RigerSignupModal;