import React, { Component } from 'react';
import { Input, Col, Row, Button, Card } from "antd";
import axios from 'axios';
import LoginHelper from './LoginHelper';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            areaNo: '',
            distripId: '',
            agencyId: '',
            memCourId: '',
            password: ''
        }

        this.onAreaNo = this.onAreaNo.bind(this)
        this.onAgencyId = this.onAgencyId.bind(this)
        this.onDistripId = this.onDistripId.bind(this)
        this.onMemCourId = this.onMemCourId.bind(this)
        this.onPassword = this.onPassword.bind(this)

        this.onViewData = this.onViewData.bind(this)
      }
  
        onAreaNo(event) 
        {
            this.setState({
                areaNo: event.target.value
            })
        }

        onDistripId(event) 
        {
            this.setState({
                distripId: event.target.value
            })
        }

        onAgencyId(event) 
        {
            this.setState({
                agencyId: event.target.value
            })
        }

        onMemCourId(event) 
        {
            this.setState({
                memCourId: event.target.value
            })
        }

        onPassword(event) 
        {
            this.setState({
                password: event.target.value
            })
        }

        async onViewData(e)
        {
            // ===============================.
            // This is communication logic for interworking with the Server program.
            // from here
            try {
                const form = new FormData();
                const { areaNo, distripId, agencyId, memCourId, password } = this.state
                const acMemberId = `${areaNo}-${distripId}-${agencyId}-${memCourId}`

                form.append("acMemberId", acMemberId);
                form.append("acPassword", password);
                form.append("acUuId", 'dummy');
                form.append("acDeviceModel", 'dummy');
                const response = await axios(
                {
                    method: 'post',
                    url: 'https://api.roadvoy.net/shared/login.php',
                    data: form,
                    headers: 
                    {
                        "Content-Type": "multipart/form-data"
                    }
                  }); 
                  console.log(response);

                // ===============================.
                // Server API 에서 보내준 Browser Token 정보를 저장하는 부분
                // 이 부분은 Login 화면에서만 사용한다.
                const { data } = response;
                LoginHelper.setToken(data.stLoginSession.acAuthToken);
                this.props.history.push('/CallListComponent');
                // 이 부분은 Login 화면에서만 사용한다.
                // Server API 에서 보내준 Browser Token 정보를 저장하는 부분
                // ===============================.

                // ===============================.
                // 필요시에 사용자에게 완료 여부를 공유하기 위한 Alert 창 띄운다.
                // ===============================.
              }
            catch (error) 
            {
                // 200 >= < 300
                // StatusCode = 400. 
                if (error.response && error.response.data && error.response.data.msg) 
                {
                    throw new Error(error.response.data.msg);
                } 
                else 
                {
                    throw new Error("서버에서 응답을 받지 못했습니다");
                }
            }
            // until here
            // This is communication logic for interworking with the Server program.
            // ===============================.
        }
  
        // onViewData(e)
        // {
        //     const CompreData = `${this.state.areaNo}-${this.state.distripId}-${this.state.agencyId}-${this.state.memCourId}`
        //     const pw = `${this.state.password}`
        //     if(pw === '1234' && CompreData === '88-A1-1-0') 
        //     {
        //         alert('로그인 성공');
                
        //         return (this.props.history.push('/CallListComponent'))
        //     } 
        //     else 
        //     {
        //         alert('아이디 또는 비밀번호가 틀립니다.')
        //     }
        // }

        onKeyPress = (e) => 
        {
            if(e.key ==='Enter') {
                this.onViewData();
            }
        }

        render() 
        {
            const 
            {
                areaNo,
                distripId,
                agencyId,
                memCourId,
                password
            } = this.state;

            return(
                <Row type="flex" justify="center" align="middle" style={{ height: "100%", paddingTop:'300px' }}>
                  <Card style={{ width: "360px" }}>
                    <Row style={{ marginBottom: "12px" }}>
                      <Col span={24}>
                        <center>
                          <img
                            src="data:image/png;base64,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"
                            style={{ width: "160px" }}
                          />
                        </center>
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "12px" }}>
                      <Col span={6} style={{ paddingRight: "4px" }}>
                        <Input
                          size="large"
                          name="areaNo"
                          value={this.state.areaNo}
                          onChange={this.onAreaNo}
                          onKeyPress={this.onKeyPress}
                        />
                      </Col>
                      <Col span={6} style={{ paddingRight: "4px" }}>
                        <Input
                          size="large"
                          name="distribId"
                          value={this.state.distribId}
                          onChange={this.onDistripId}
                          onKeyPress={this.onKeyPress}
                        />
                      </Col>
                      <Col span={6} style={{ paddingRight: "4px" }}>
                        <Input
                          size="large"
                          name="agencyId"
                          value={this.state.agencyId}
                          onChange={this.onAgencyId}
                          onKeyPress={this.onKeyPress}
                        />
                      </Col>
                      <Col span={6}>
                        <Input
                          size="large"
                          name="memCourId"
                          value={this.state.memCourId}
                          onChange={this.onMemCourId}
                          onKeyPress={this.onKeyPress}
                        />
                      </Col>
                    </Row>
                    <Row style={{ marginBottom: "12px" }}>
                      <Input.Password
                        size="large"
                        name="password"
                        value={this.state.password}
                        placeholder="비밀번호"
                        onChange={this.onPassword}
                        onKeyPress={this.onKeyPress}
                      />
                    </Row>
                    <Row style={{ marginBottom: "12px" }}>
                      <Button type="primary" size="large" onClick={this.onViewData} block>
                        로그인
                      </Button>
                    </Row>
                  </Card>
                </Row>
            )
        }
    }
    
export default Login;