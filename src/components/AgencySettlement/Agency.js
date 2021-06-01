import React, { Component } from 'react';
import Header from '../Layout/Header';
import { message ,PageHeader, Table } from "antd";
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
          key: 'ucMemCourId',
          width: 70,
        },
        {
          title: '총판명',
          dataIndex: 'acCompany',
          width: 70,
        },
        {
          title: '사업자등록번호',
          dataIndex: 'acBizRegNo',
          width: 70,
        },
        {
          title: '대표자명',
          dataIndex: 'acPresident',
          width: 50,
        },
        {
          title: '가입일자',
          dataIndex: 'acEntryDateTime',
          width: 50,
        },
        {
          title: '세금계산서발행',
          dataIndex: 'ucTaxInvoType',
          width: 80,
        },
        {
          title: '구분',
          dataIndex: 'ucDistribId',
          width: 30,
        },
      ],
    },
    {
      title: '연락처',
      children: [
        {
          title: '(업체)전화번호',
          dataIndex: 'acPhoneNo',
          width: 80,
        },
        {
          title: '(휴대)전화번호',
          dataIndex: 'acCellNo',
          width:80,
        },
        {
          title: '주소',
          dataIndex: 'acOldAddress'+'acAddressDesc',
          width:100,
        },
      ],
    },
    {
      title: 'Platform사용',
      children: [
        {
          title: '경고',
          dataIndex: 'cDelayWarning',
          width: 30,
        },
        {
          title: '제한',
          dataIndex: 'cUseRight',
          width:30,
        },
      ],
    },
    {
      title: '가상계좌',
      children: [
        {
          title: '거래은행',
          dataIndex: 'usVirtualBank',
          width: 50,
        },
        {
          title: '계좌번호',
          dataIndex: 'acVirtualAccount',
          width:100,
        },
      ],
    },
    
  ];

class Agency extends Component 
{
  state = { astManageAgency: [] }

async fetchAgencyList() 
{
    try 
    {
        const response = await axios(
        {
            method: 'get',
            url: 'https://api.roadvoy.net/agency/errand/list.php',
            headers: 
            {
              'Authorization': `Bearer ${LoginHelper.getToken()}`
            }, params: {
              acErrandDate: "2020-02-01"
             }
        }); 

        this.setState({
            astManageAgency: response.data.astManageAgency
        })
    } 
    catch(e) 
    {
        message.error(e.message);
    }
}

componentDidMount()
{
  this.fetchAgencyList = this.fetchAgencyList.bind(this);
  //setInterval(this.fetchAgencyList, 1000);
  this.fetchAgencyList();
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
                      <b>{this.state.astManageAgency?.length}</b>개의 가맹점이 등록 되어있습니다.
                  </span>
                  <span style={{float:'right'}}>
                    
                  </span>
                </PageHeader>
                
                <Table
                  columns={columns}
                  bordered
                  dataSource={this.state.astManageAgency}
                  //pagination={false} 페이징 삭제
                  pagination={{pageSize:'50'}}
                  size="small"
                  scroll={{ x: 'calc(700px + 50%)', y: 650 }}
                />,
            </div>
        )
    }
}
export default Agency;