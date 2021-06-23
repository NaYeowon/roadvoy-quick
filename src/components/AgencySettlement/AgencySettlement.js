import React from 'react';
import { DatePicker, Space, Descriptions } from 'antd';
import Header from '../Layout/Header';


const { RangePicker } = DatePicker;

const AgencySettlement = () => {
  return (
    <div>
      <Header />
      <div style={{padding:'50px'}}>
        <Space direction="vertical" size={12} style={{ width: 'auto', display:'table', marginRight:'auto', marginLeft:'auto' }}>
          <RangePicker />
        </Space>
        
        <Descriptions bordered size='small' column={1} style={{ width: '400px', marginTop:'8px', display:'table', marginRight:'auto', marginLeft:'auto' }}>
          <Descriptions.Item label='가맹콜수'>
            <a href='/ShopSettlement'>0</a>
          </Descriptions.Item>
          <Descriptions.Item label='기사 수행콜수'>
            <a href='/RiderSettlement'>0</a>
          </Descriptions.Item>
        </Descriptions>

        <Descriptions bordered size='small' column={1} style={{ width: '400px', marginTop:'8px', display:'table', marginRight:'auto', marginLeft:'auto' }}>
          <Descriptions.Item label='콜 수수료'>0</Descriptions.Item>
          <Descriptions.Item label='심부름 접수 대행수수료'>0</Descriptions.Item>
          <Descriptions.Item label='기사소속 대행수수료'>0</Descriptions.Item>
          <Descriptions.Item label='관리비'>0</Descriptions.Item>
          <Descriptions.Item label='콜 당 수수료'>0</Descriptions.Item>
          <Descriptions.Item label='기사 일차감 총액'>0</Descriptions.Item>
          <Descriptions.Item label='기사 일차감 실수입'>0</Descriptions.Item>
        </Descriptions>
        
        <Descriptions bordered size='small' column={1} style={{ width: '400px', marginTop:'8px', display:'table', marginRight:'auto', marginLeft:'auto' }}>
          <Descriptions.Item label='탈퇴 가맹 환불액'>0</Descriptions.Item>
          <Descriptions.Item label='탈퇴 기사 환불액'>0</Descriptions.Item>
        </Descriptions>

        <Descriptions bordered size='small' column={1} style={{ width: '400px', marginTop:'8px', display:'table', marginRight:'auto', marginLeft:'auto' }}>
          <Descriptions.Item label='기사→대행 캐시송금'>0</Descriptions.Item>
          <Descriptions.Item label='가상계좌 입금'>0</Descriptions.Item>
          <Descriptions.Item label='가상계좌 수수료'>0</Descriptions.Item>
        </Descriptions>

        <Descriptions bordered size='small' column={1} style={{ width: '400px', marginTop:'8px', display:'table', marginRight:'auto', marginLeft:'auto' }}>
          <Descriptions.Item label='프로그램 사용료'>0</Descriptions.Item>
          <Descriptions.Item label='본사직권 출금'>0</Descriptions.Item>
          <Descriptions.Item label='출금'>0</Descriptions.Item>
          <Descriptions.Item label='출금수수료'>0</Descriptions.Item>
          <Descriptions.Item label='관리자가 회수한 캐시'>0</Descriptions.Item>
        </Descriptions>
      </div>
    </div>

  );
};

export default AgencySettlement;
