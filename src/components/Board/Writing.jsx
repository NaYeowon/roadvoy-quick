import React from 'react';
import Header from '../Layout/Header';
import { Descriptions, Input, Form, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useHistory } from 'react-router-dom';

const Writing = () => {
    const [form] = Form.useForm();
    const history = useHistory();

    const onCancle = () => {
        history.goBack();
    };

    return (
        <>
          <Header />
          <div style={{ width:'1000px', marginRight:'auto', marginLeft:'auto', marginTop:'130px' }}>
            <Descriptions bordered size='small' title="게시판 글쓰기">
                <Descriptions.Item label="제목" span={3}>
                    <Input placeholder="제목을 입력해 주세요"></Input>
                </Descriptions.Item>
                <Descriptions.Item label="작성자">ㅇㅇㅇ</Descriptions.Item>
                <Descriptions.Item label="ㅇㅇㅇ">ㅇㅇㅇ</Descriptions.Item>
                <Descriptions.Item label="작성일">2021-06-22</Descriptions.Item>
                <Descriptions.Item label="내용" span={3}>
                    <TextArea rows={8} placeholder="내용을 입력해 주세요"></TextArea>
                </Descriptions.Item>
            </Descriptions>
            <div style={{ textAlign:'center', paddingTop:'10px' }}>
                <Button onClick={onCancle}>취소</Button>
            </div>
         </div>
        </>
    );
};

export default Writing;