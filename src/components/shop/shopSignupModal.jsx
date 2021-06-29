import React, { Component } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import { Form, Input, Button, Row, Col } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import DaumPostCode from "react-daum-postcode";
import './shopSign.css'


class shopSignupModal extends Component {

    constructor(props) {
        super(props);

        this.state = { isModalVisible : false };

        this.state = {
            acCompany: '',
            acPresident: '',
            acPassword: '',
            acCellNo: '',
            acPhoneNo: '',
            acBizRegNo: '',
            acResRegNo: '',
            acAddressDesc: '',
            allocRemark: '',
            remark: '',
            cpPresident: '',
            cpCellNo: '',
            baseDist: '',
            baseFare: '',
            extraDist: '',
            extraFare: '',
            address: "",
            zoneCode : "",
            fullAddress : "",
            isDaumPost : false,
            isRegister : false,
            register: [],
        }
        

        this.onSingupData = this.onSingupData.bind(this)
    }

    handleOpenPost = () => {
        this.setState({
            isDaumPost : true,
        })
    }

    handleCancel = (e) => {
        this.setState({ isModalVisible : false, isDaumPost : false, fullAddress: ''  });
        e.preventDefault();

        this.props.onCancel(this.state.isModalVisible)
    };


    handleAddress = (data) => {
        let AllAddress = data.address;
        let extraAddress = ''; 
        let zoneCodes = data.zonecode;
        
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          AllAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        this.setState ({
            fullAddress: AllAddress,
            zoneCode : zoneCodes,
            isDaumPost: false
        })
      }

    onAcCompany = (e) => {
        this.setState({ acCompany: e.target.value })
    }

    onAcpresident = (e) => {
        this.setState({ acPresident: e.target.value })
    }

    onAcpassword = (e) => {
        this.setState({ password: e.target.value })
    }

    onAccellNo = (e) => {
        this.setState({ acCellNo: e.target.value })
    }

    onAcphoneNo = (e) => {
        this.setState({ acPhoneNo: e.target.value })
    }

    onAcbizRegNo = (e) => {
        this.setState({ acBizRegNo: e.target.value })
    }

    onAcresRegNo = (e) => {
        this.setState({ acResRegNo: e.target.value })
    }



    onAcAddressDesc = (e) => {
        this.setState({ acAddressDesc: e.target.value })
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

    componentDidMount = () => {
        //console.log(this.props.visible, "ddd");
    }

    async onSingupData(e) 
    {
        try 
        {
            const form = new FormData();
            const { acCompany, acPresident, acPassword, acCellNo, acPhoneNo, acBizRegNo, acResRegNo, acAddressDesc, allocRemark, remark, cpPresident, cpCellNo, baseDist, baseFare, extraDist, extraFare, } = this.state
            
            form.append("acCompany", acCompany);
            form.append("acPresident", acPresident);
            form.append("acPassword", acPassword);
            form.append("acCellNo", acCellNo);
            form.append("acPhoneNo", acPhoneNo);
            form.append("acBizRegNo", acBizRegNo);
            form.append("acResRegNo", acResRegNo);
            form.append("acAddressDesc", acAddressDesc);
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
        const { isModalShow, isModalClose } = this.props;
        
        const
        {
            acCompany, 
            acPresident, 
            acPassword, 
            acCellNo, 
            acPhoneNo, 
            acBizRegNo, 
            acResRegNo, 
            acAddressDesc, 
            allocRemark, 
            remark, 
            cpPresident,
            cpCellNo, 
            baseDist,
            baseFare, 
            extraDist, 
            extraFare,address, isDaumPost, fullAddress, zoneCode, isRegister
        } = this.state;

        const width = 595;
        const height = 450;
        const modalStyle = {
            position: "absolute",
            top: 0,
            left: "-178px",
            zIndex: "100",
            border: "1px solid #000000",
            overflow: "hidden"
        }

        return (
            <>
                <Modal width="700px" visible={this.props.visible} onCancel={this.handleCancel}>
                <div style={{maxWidth: '700px', margin: '0 auto', paddingTop:'100px'}}>
                <div style={{textAlign: 'center'}}>
                <h2 htmlFor="company-name">가맹등록</h2>
                <Form onSubmit='handleOk'>
                <div style={{textAlign: 'center', margin: '0 auto'}}>
                    <Row gutter={[16, 48]} justify="center" >
                        <Col span={4}>
                            <label>가맹점명&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input
                                name="acCompany"
                                value={acCompany}
                                onChange={this.onAcCompany}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16, 48]}>
                        <Col span={4}>
                            <label>대표자명&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="acPresident"
                                value={acPresident}
                                onChange={this.onAcpresident}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>비밀번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="acPassword"
                                value={acPassword}
                                onChange={this.onAcpassword}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>휴대폰번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                prefix={<PhoneOutlined />} 
                                name="acCellNo"
                                value={acCellNo}
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
                                name="acPhoneNo" 
                                value={acPhoneNo}
                                onChange={this.onAcphoneNo}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>사업자번호&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                name="acBizRegNo"
                                value={acBizRegNo}
                                onChange={this.onBizRegNo}/>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>생년월일&nbsp;:</label>
                        </Col>
                        <Col span={4}>
                            <Input 
                                name="acResRegNo"
                                value={acResRegNo}
                                onChange={this.onAcresRegNo}/>
                        </Col>
                        <Col span={4}>
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>가맹점주소&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Button 
                                type="primary" 
                                onClick={this.handleOpenPost}
                                style={{width: '100%'}}>
                                주소검색
                            </Button>
                            {
                                isDaumPost ?
                                <DaumPostCode
                                    onComplete={this.handleAddress}
                                    autoClose
                                    width={width}
                                    height={height}
                                    style={modalStyle}
                                    isDaumPost={isDaumPost}
                                />
                                : null
                            }
                            <div className="address">{fullAddress}</div> 
                        </Col>
                    </Row>
                    <Row justify="center" gutter={[16], [16]}>
                        <Col span={4}>
                            <label>상세주소&nbsp;:</label>
                        </Col>
                        <Col span={8}>
                            <Input 
                                placeholder="상세 주소를 입력하세요"
                                name="acAddressDesc"
                                value={acAddressDesc}
                                onChange={this.onAcAddressDesc} />
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