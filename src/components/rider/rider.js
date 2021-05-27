import React, { Component } from 'react';
import Header from '../Layout/Header';
import { Link } from 'react-router-dom';
import { Button, PageHeader, Table } from "antd";
import 'antd/dist/antd.css';

class rider extends Component {
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
                  title: '이름',
                  dataIndex: 'acPresident',
                  key: 'acPresident',
                  width: 80,
                },
                {
                  title: '상태메세지',
                  dataIndex: 'acStatusMessage',
                  key: 'acStatusMessage',
                  width: 80,
                },
              ],
            },
            {
              title: '배달',
              children: [
                {
                  title: '콜수수료',
                  dataIndex: 'lCallUnitPrice',
                  key: 'lCallUnitPrice',
                  width: 80,
                },
                {
                  title: '당일',
                  dataIndex: 'usDayDoneCallSum',
                  key: 'usDayDoneCallSum',
                  width:80,
                },
                {
                  title: '당월',
                  dataIndex: 'usMonthDoneCallSum',
                  key: 'usMonthDoneCallSum',
                  width:100,
                },
              ],
            },
            {
                title: "출금가능액",
                dataIndex: "lAccountBalance",
                key: "lAccountBalance",
                width: 100,
              },
              {
                title: "보증금",
                dataIndex: "lCourierDeposit",
                key: "lCourierDeposit",
                width: 100,
              },
              {
                title: "리스료",
                children: [
                  {
                    title: "종류",
                    dataIndex: "ucCourierTag",
                    key: "ucCourierTag",
                    width: 100,
                  },
                  {
                    title: "차감(매일)",
                    dataIndex: "lCourierLease",
                    key: "lCourierLease",
                    width: 100,
                  },
                ],
              },
              {
                title: "패널티",
                children: [
                  {
                    title: "동시",
                    dataIndex: "ucConCallLimit",
                    key: "ucConCallLimit",
                    width: 80,
                    },
                  {
                    title: "지연",
                    dataIndex: "ucCallRtrvTime",
                    key: "ucCallRtrvTime",
                    width: 80,
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
                    {/* <Link to='#'>
                        <Button>기사별정산</Button>
                    </Link>
                    <Link to='#'>
                        <Button>기사등록</Button>
                    </Link> */}
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
export default rider;