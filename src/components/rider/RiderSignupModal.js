import React, { Component } from 'react';
import { Modal } from 'antd'; 
import { Form, Input, Button, Row, Col, Select } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';


const { Option } = Select;

class RigerSignupModal extends Component {

    constructor(props) {
        super(props);

        this.state = { isModalVisible : false };
    }

    handleOk = (e) => {
        console.log(this.state.isModalVisible,": 모달");
        this.setState({ isModalVisible : false});
        e.preventDefault();
        
        this.props.onOk(this.state.isModalVisible)
    };

    handleCancel = (e) => {
        console.log(this.props.isModalVisible, ": 취소");
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
            <Modal visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
            <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'100px'}}>
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
                        <label>소속&nbsp;:</label>
                    </Col>
                    <Col span={8}>
                        <Input />
                    </Col>
                </Row>
                <Row justify="center" gutter={[16], [16]}>
                    <Col span={4}>
                        <label>출금은행&nbsp;:</label>
                        <Option>신한은행</Option>
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
                        <label>계좌번호&nbsp;:</label>
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
        </Modal>
    </>
    );
    };
}
    
    
export default RigerSignupModal;