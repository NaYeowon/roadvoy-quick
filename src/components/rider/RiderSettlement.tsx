import axios from 'axios';
import React, { useEffect } from 'react';
import { useState } from 'react';
import Header from '../Layout/Header';
import LoginHelper from '../../pages/shared/LoginHelper'
import RiderSettlementList from './RiderSettlementList';
import { message, PageHeader, Table, Row, Col, DatePicker, Space, Button } from 'antd';

interface Rider {
    title: string;
    dataIndex: string;
    width: number;
}
const columns = [
{
    title: '이름',
    dataIndex: 'acPresident',
    key: 'acPresident'
},
{
    title: '콜수',
    dataIndex: 'usTotalDoneCallSum',
    key: 'usTotalDoneCallSum'
},
];

const { RangePicker } = DatePicker;

const RiderSettlement = () => {
    const [astManageRider, setAstManageRider] = useState<Rider[]>([])
  const fetchRiderList = async () =>
  {
      try 
      {
          const response = await axios(
          {
              method: 'get',
              url: 'https://api.roadvoy.net/agency/rider/manage/list.php',
              headers: 
              {
                'Authorization': `Bearer ${LoginHelper.getToken()}`
              }
          }); 

          setAstManageRider(response.data.astManageRider)
      } 
      catch(e) 
      {
          message.error(e.message);
      }
  }
  useEffect(() => {
      const delay = window.setInterval(fetchRiderList, 1000)
      return () => clearInterval(delay)
  }, []);
  
    return (
        <>
          <Header />
        <PageHeader>
        </PageHeader>
            <Row>
              <Col span={20} push={4} style={{paddingLeft:'20px', paddingRight:'20px'}}>
                <RiderSettlementList />
              </Col>
              <Col span={4} pull={20}>
                <Space direction='vertical' size={12} style={{paddingBottom:'10px', width:'100%'}} > 
                  <div style={{textAlign:'center'}}><b>조회기간</b></div>
                  <RangePicker style={{width:'100%'}} />
                  <Button style={{width:'100%'}}>다운로드</Button>
                </Space>
                <Table 
                    columns={columns}
                    style={{width:'100%', height:'100%', cursor:'pointer'}}
                    dataSource={astManageRider}
                    bordered
                    size={'small'}
                    pagination={false}
                    scroll={{ y:650 }}
                    />
              </Col>
            </Row>
        </>
    );
};

export default RiderSettlement;