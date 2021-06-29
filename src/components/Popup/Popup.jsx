import { Checkbox } from '@material-ui/core';
import { Form, Select, Radio, Button, Input, Col, Row } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import DaumAddress from '../../util/AdressUtil'

  const formItemLayout = {
    labelCol: {
      span: 7,
    },
    wrapperCol: {
      span: 14,
    },
  };
  
   
  const Popup = () => {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
  
    return (
      <>
      <Row justify="center">
        <Col span={12}>
          <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              'input-number': 3,
              'checkbox-group': ['A', 'B'],
              rate: 3.5,
            }}
          >
            <Form.Item label="심부름 종류" >
              <Checkbox /> 바로목적지로
            </Form.Item>
           
            <Form.Item label="픽업지 업체명">
              <Input placeholder="업체명을 입력하세요" />
            </Form.Item>

            <Form.Item label="픽업지 연락처">
              <Input 
                placeholder="연락처를 입력하세요" 
              />
            </Form.Item>

            <Form.Item label="픽업지 주소">
              <Button type="primary" block onClick=''>
                주소검색
              </Button>
            </Form.Item>

            <Form.Item label="픽업지 상세주소">
              <Input placeholder="상세주소를 입력하세요" />
            </Form.Item>

            <Form.Item label="픽업지 요청사항">
              <TextArea
                rows={2}
                name="acClientMemo"
                //onChange=''
                //value=''
              />
            </Form.Item>

            <Form.Item label="목적지 업체명">
              <Input placeholder="업체명을 입력하세요" />
            </Form.Item>

            <Form.Item label="목적지 연락처">
              <Input 
                placeholder="연락처를 입력하세요" 
              />
            </Form.Item>

            <Form.Item label="목적지 주소">
              <Button type="primary" block onClick=''>
                <DaumAddress />주소검색
              </Button>
            </Form.Item>

            <Form.Item label="목적지 상세주소">
              <Input placeholder="상세주소를 입력하세요" />
            </Form.Item>

            <Form.Item label="목적지 요청사항">
              <TextArea
                rows={2}
                name="acClientMemo"
                //onChange=''
                //value=''
              />
            </Form.Item>
          
            <Form.Item label="픽업 ↔ 목적지">
              <span>
                <b></b>
              </span>
            </Form.Item>

            {/* <Form.Item label="결제금액">
              <Form.Item name="input-number" noStyle>
                <InputNumber min={0} max={1000000} type="number"/>
              </Form.Item>
              <span className="ant-form-text"> 원</span>
            </Form.Item> */}

          </Form>
        </Col>
      <Col span={12} pull={1}>
      <Form
            name="validate_other"
            {...formItemLayout}
            onFinish={onFinish}
            initialValues={{
              'input-number': 3,
              'checkbox-group': ['A', 'B'],
              rate: 3.5,
            }}
          >
      <Form.Item name="" label="제한시간">
          <Radio.Group
            style={{ float:'left'}}
          >
            <Radio value="a">즉시</Radio>
            <Radio value="a">5분&nbsp;&nbsp;&nbsp;</Radio>
            <Radio value="b">10분</Radio>
            <Radio value="c">15분</Radio>
            <Radio value="d">20분</Radio>
            <Radio value="e">30분</Radio>
            <Radio value="f">40분</Radio>
            <Radio value="g">50분</Radio>
            <Radio value="h">60분</Radio>
            <Radio value="i">90분</Radio>
            <Radio value="j">120분</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="" label="주행유형">
            <Radio.Group
              style={{ float:'left'}}
              name="fareType"
              defaultValue=''
              buttonStyle="solid"
              onChange=''>
              <Radio value="11">편도</Radio>
              <Radio value="21">왕복</Radio>
              <Radio value="31">경유</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item name="" label="결제유형">
            <Radio.Group
              style={{ float: 'left' }}
            >
              <Radio value="12">현금</Radio>
              <Radio value="22">선결제</Radio>
              <Radio value="32">후결제</Radio>
              <Radio value="43">분할</Radio>
            </Radio.Group>
        </Form.Item>

        <Form.Item label="현금결제금액">
          <Input
            style={{width:'50%', float:'left'}}
            placeholder="0"
            type="number"
            value=''
            onChange=''
            disabled=''
          />
        </Form.Item>

        <Form.Item label="배달비"> 
          <Input 
            style={{width:'50%', float:'left'}}
            placeholder="0"
            type="number"
          />
        </Form.Item>
            
        <Form.Item name="" label="정산유형">
          <Radio.Group
            style={{float:'left'}}
          >
            <Radio value="13">수기정산</Radio>
            <Radio value="23">자동정산</Radio>
          </Radio.Group>
        </Form.Item>
        
        <Form.Item name="" label="대행 수수료">
          <Radio.Group
            style={{float:'left'}}
          >
            <Radio value="14">수수료 금액</Radio>
            <Radio value="24">수수료 율(%)</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="수수료(원)">
          <Input
            style={{width:'50%', float:'left'}}
            placeholder="0"
            type="number"
            value=''
            onChange=''
            disabled=''
          />
        </Form.Item>

        <Form.Item label="수수료 율(%)">
          <Input
            style={{width:'50%', float:'left'}}
            placeholder="0"
            type="number"
            value=''
            onChange=''
            disabled=''
          />
        </Form.Item>

        <Form.Item label="배차대행 수수료">
          <Input
            style={{width:'50%', float:'left'}}
            placeholder="0"
            type="number"
            value=''
            onChange=''
          />
        </Form.Item>

        <Form.Item label="직권배차">
          <Button type="primary" htmlType="submit" style={{width:'100%'}}>
            기사선택
          </Button>
        </Form.Item>
          </Form>
        </Col>
      </Row>
      </>
    );
  };
  
export default Popup;