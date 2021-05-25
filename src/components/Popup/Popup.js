import {
    Form,
    Select,
    InputNumber,
    Radio,
    Button,
    Input
  } from 'antd';
  import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
  const { Option } = Select;
  const formItemLayout = {
    labelCol: {
      span: 6,
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
        <Form.Item label="Field A">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item label="Field B">
          <Input placeholder="input placeholder" />
        </Form.Item>

        <Form.Item label="InputNumber">
          <Form.Item name="input-number" noStyle>
            <InputNumber min={1} max={1000000} />
          </Form.Item>
          <span className="ant-form-text"> machines</span>
        </Form.Item>
  
        <Form.Item name="radio-group" label="Radio.Group">
          <Radio.Group>
            <Radio value="a">item 1</Radio>
            <Radio value="b">item 2</Radio>
            <Radio value="c">item 3</Radio>
          </Radio.Group>
        </Form.Item>
  
        <Form.Item
          wrapperCol={{
            span: 12,
            offset: 6,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  };
  
export default Popup;