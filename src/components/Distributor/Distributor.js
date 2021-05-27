import React, { Component } from 'react';
import Header from '../Layout/Header';
import { PageHeader, Table } from "antd";
import 'antd/dist/antd.css';

class Distributor extends Component {
    render() {
        const columns = [
            {
              title: '계정정보',
              children: [
                {
                  title: '아이디',
                  dataIndex: 'ucMemCourId',
                  width: 70,
                },
                {
                  title: '총판명',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 70,
                },
                {
                  title: '사업자등록번호',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 70,
                },
                {
                  title: '대표자명',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 50,
                },
                {
                  title: '가입일자',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 50,
                },
                {
                  title: '세금계산서발행',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 80,
                },
                {
                  title: '구분',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 30,
                },
              ],
            },
            {
              title: '연락처',
              children: [
                {
                  title: '(업체)전화번호',
                  dataIndex: 'ulCustCallCnt',
                  key: 'ulCustCallCnt',
                  width: 80,
                },
                {
                  title: '(휴대)전화번호',
                  dataIndex: 'companyName',
                  key: 'companyName',
                  width:80,
                },
                {
                  title: '주소',
                  dataIndex: 'companyName',
                  key: 'companyName',
                  width:100,
                },
              ],
            },
            {
              title: 'Platform사용',
              children: [
                {
                  title: '경고',
                  dataIndex: 'usDeliDoneCntSum',
                  key: 'usDeliDoneCntSum',
                  width: 30,
                },
                {
                  title: '제한',
                  dataIndex: 'usMonthDeliDoneCntSum',
                  key: 'usMonthDeliDoneCntSum',
                  width:30,
                },
              ],
            },
            {
              title: '가상계좌',
              children: [
                {
                  title: '거래은행',
                  dataIndex: 'ulCurrentVirAccBalance',
                  key: 'ulCurrentVirAccBalance',
                  width: 50,
                },
                {
                  title: '계좌번호',
                  dataIndex: 'acVirtualAccount',
                  key: 'acVirtualAccount',
                  width:100,
                },
              ],
            },
            
          ];
          
          const data = [];
          for (let i = 0; i < 100; i++) {
            data.push({
             key: i,
             //ucMemCourId: '값',
             //ex) age: i+1
            });
          }
        return (
            <div>
                <div>
                <Header />
                </div>
                <PageHeader>
                  <span>
                      <b>0</b>개의 가맹점이 등록 되어있습니다.
                  </span>
                  <span style={{float:'right'}}>
                    
                  </span>
                </PageHeader>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    //pagination={false} 페이징 삭제
                    pagination={{pageSize:'50'}}
                    size="middle"
                    scroll={{ x: 'calc(700px + 50%)', y: 650 }}
                />,
            </div>
        )
    }
}
export default Distributor;