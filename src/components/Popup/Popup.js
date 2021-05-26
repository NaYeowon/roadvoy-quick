import { Form, Select, InputNumber, Radio, Button, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
  const formItemLayout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 10,
    },
  };
  
   
  const Popup = () => {
    const onFinish = (values) => {
      console.log('Received values of form: ', values);
    };
  
    return (
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
        <Form.Item label="가맹명">
          <Input placeholder="가맹명을 입력하세요" />
        </Form.Item>

        <Form.Item label="전화번호">
          <Input 
            placeholder="전화번호를 입력하세요" 
          />
        </Form.Item>

        <Form.Item label="주소검색">
          <Button type="primary" block onClick=''>
            주소검색
          </Button>
        </Form.Item>
        
        <Form.Item label="배달거리">
          <span>
            <b></b>
          </span>
        </Form.Item>

        <Form.Item label="상세주소">
          <Input placeholder="상세주소를 입력하세요" />
        </Form.Item>

        <Form.Item name="" label="조리시간">
          <Radio.Group>
            <Radio value="a">5분&nbsp;&nbsp;</Radio>
            <Radio value="b">10분</Radio>
            <Radio value="c">15분</Radio>
            <Radio value="c">20분</Radio><br/>
            <Radio value="c">25분</Radio>
            <Radio value="c">30분</Radio>
            <Radio value="c">35분</Radio>
            <Radio value="c">40분</Radio><br/>
            <Radio value="c">45분</Radio>
            <Radio value="c">50분</Radio>
            <Radio value="c">55분</Radio>
            <Radio value="c">60분</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.Item name="" label="결제유형">
          <Radio.Group>
            <Radio value="">카드&nbsp;&nbsp;</Radio>
            <Radio value="">현금&nbsp;&nbsp;</Radio>
            <Radio value="">선결제&nbsp;&nbsp;</Radio>
          </Radio.Group>
        </Form.Item>
  
        {/* <Form.Item label="결제금액">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={0} max={1000000} type="number"/>
          </Form.Item>
          <span className="ant-form-text"> 원</span>
        </Form.Item> */}

        <Form.Item label="결제금액">
          <Input
            placeholder="결제금액을 입력하세요"
            style={{ width: "50%" }}
            name="orderAmount"
            type="number"
            //value=''
            //onChange=''
          />
        </Form.Item>

        <Form.Item label="배달비">
          <span>
            <b></b>
          </span>
        </Form.Item>

        <Form.Item label="고객요청사항">
          <TextArea
            rows={2}
            placeholder="고객요청사항을 입력하세요"
            name="acClientMemo"
            //onChange=''
            //value=''
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            콜 등록
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
export default Popup;