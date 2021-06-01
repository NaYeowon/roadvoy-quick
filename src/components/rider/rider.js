import React, { Component } from 'react';
import Header from '../Layout/Header';
import { message, PageHeader, Table } from "antd";
import 'antd/dist/antd.css';
import axios from 'axios'; 
import LoginHelper from '../../pages/shared/LoginHelper';

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
          width: 80,
        },
        {
          title: '상태메세지',
          dataIndex: 'acStatusMessage',
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
class rider extends Component 
{   
  state = { astManageRider: [] }

  async fetchRiderList() 
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

          this.setState({
              astManageRider: response.data.astManageRider
          })
      } 
      catch(e) 
      {
          message.error(e.message);
      }
  }

  componentDidMount()
  {
    this.fetchRiderList = this.fetchRiderList.bind(this);
    setInterval(this.fetchRiderList, 1000);
  }

    render() {
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
                      <b>{this.state.astManageRider?.length}</b>개의 가맹점이 등록 되어있습니다.
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
                  dataSource={this.state.astManageRider}
                  bordered
                  //pagination={false} 페이징 삭제
                  pagination={{pageSize:'50'}}
                  size="small"
                  scroll={{ x: 'calc(700px + 50%)', y: 650 }}
                />,
            </div>
        )
    }
}
export default rider;