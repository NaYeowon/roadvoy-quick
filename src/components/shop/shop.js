import React, { Component } from 'react';
import Header from '../Layout/Header';
import { Link } from 'react-router-dom';
import { Button, Table } from "antd";
import 'antd/dist/antd.css';

class shop extends Component {
    render() {
        const columns = [
            {
              title: '계정정보',
              children: [
                {
                  title: '아이디',
                  dataIndex: 'ucMemCourId',
                  width: 120,
                },
                {
                  title: '가맹명',
                  dataIndex: 'acCompany',
                  key: 'acCompany',
                  width: 160,
                },
              ],
            },
            {
              title: '관리정보',
              children: [
                {
                  title: '콜수',
                  dataIndex: 'ulCustCallCnt',
                  key: 'ulCustCallCnt',
                  width: 100,
                },
                {
                  title: '관리비',
                  dataIndex: 'companyName',
                  key: 'companyName',
                  width:100,
                },
                {
                  title: '충전예정일',
                  dataIndex: 'companyName',
                  key: 'companyName',
                  width:100,
                },
              ],
            },
            {
              title: '콜수',
              children: [
                {
                  title: '당일',
                  dataIndex: 'usDeliDoneCntSum',
                  key: 'usDeliDoneCntSum',
                  width: 80,
                  sorter: (a, b) => a.usDeliDoneCntSum - b.usDeliDoneCntSum,
                },
                {
                  title: '당월',
                  dataIndex: 'usMonthDeliDoneCntSum',
                  key: 'usMonthDeliDoneCntSum',
                  width:80,
                  sorter: (a, b) => a.usMonthDeliDoneCntSum - b.usMonthDeliDoneCntSum,
                },
              ],
            },
            {
              title: '가상계좌',
              children: [
                {
                  title: '잔액',
                  dataIndex: 'ulCurrentVirAccBalance',
                  key: 'ulCurrentVirAccBalance',
                  width: 120,
                },
                {
                  title: '가상계좌',
                  dataIndex: 'acVirtualAccount',
                  key: 'acVirtualAccount',
                  width:200,
                },
              ],
            },
            {
              title: '할증',
              children: [
                {
                  title: '시간',
                  dataIndex: 'ucTimeExtraFareType',
                  key: 'ucTimeExtraFareType',
                  width: 30,
                },
                {
                  title: '심야',
                  dataIndex: 'ucNightExtraFare',
                  key: 'ucNightExtraFare',
                  width:30,
                },
                {
                  title: '우천',
                  dataIndex: 'ucRainyExtraFare',
                  key: 'ucRainyExtraFare',
                  width:30,
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
                <div>
                  <span>
                      <b>0</b>개의 가맹점이 등록 되어있습니다.
                  </span>
                  <span>
                    <Link to='#'>
                        <Button>가맹별정산</Button>
                    </Link>
                    <Link to='#'>
                        <Button>구역설정</Button>
                    </Link>
                    <Link to='#'>
                        <Button>가맹등록</Button>
                    </Link>
                  </span>
                </div>
                <Table
    columns={columns}
    dataSource={data}
    bordered
    size="middle"
    //scroll={{ x: 'calc(700px + 50%)', y: 500 }}
  />,
            </div>
        )
    }
}
export default shop