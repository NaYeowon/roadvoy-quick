import { Form, Button, Upload, } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import Header from '../Layout/Header';

const normFile = (e) => {
  console.log('Upload event:', e);

  if (Array.isArray(e)) {
    return e;
  }

  return e && e.fileList;
};

const FileUpload = () => {
 

  return (
    <>
    <Header />
    <Form >
      <Form.Item>
        <Form.Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} style={{padding:'100px'}}>
          <Upload.Dragger name="files" action="/upload.do" >
            <p className="ant-upload-drag-icon">
              <InboxOutlined
                style={{ height:'150px'}}
              />
            </p>
            <p className="ant-upload-text">Click or Drag File</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Upload.Dragger>
        </Form.Item>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 7,
        }}
      >
        <Button type="primary" htmlType="submit">
          파일 업로드
        </Button>
      </Form.Item>
    </Form>
    </>
  );
};

export default FileUpload;