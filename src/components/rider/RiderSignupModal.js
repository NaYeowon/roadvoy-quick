import React, { Component } from 'react';
import { Modal } from 'antd'; 
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import { Checkbox } from '@material-ui/core';


const { Option } = Select;

class RigerSignupModal extends Component {

    constructor(props) {
        super(props);

        this.state = { isModalVisible : false };
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
        console.log(this.props.visible, "ddd");
    }
    render() {
        return (
            <>
            <Modal width="700px" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'50px'}}>
            <div style={{textAlign: 'center'}}>
            <h2 htmlFor="company-name">기사등록</h2>
            <Form onSubmit=''>
            <div style={{textAlign: 'center', margin: '0 auto'}}>
                <Row gutter={[16, 48]} justify="center" >
                    <Col span={4}>
                        <label>로그인아이디&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                        <Input />
                    </Col>
                </Row>
                <Row justify="center" gutter={[16, 48]}>
                    <Col span={4}>
                        <label>이름&nbsp;:</label>
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
                        <Input />
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
                        <label>소속&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                        <Input />
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={4}>
                        <label>출금은행&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                    <Select
                        name="bankCode"
                        value=''
                        onChange=''
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