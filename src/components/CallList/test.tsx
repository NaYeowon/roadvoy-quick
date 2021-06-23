import { message, Table } from 'antd';
import axios from 'axios';
import React, { Component } from 'react';
import Header from '../Layout/Header';
import LoginHelper from '../../pages/shared/LoginHelper';

const columns = [
    {
      title: "가맹명",
      dataIndex: "acDestCompany",
      key: "acDestCompany",
      width: 120,
    },
    {
      title: "접수",
      dataIndex: "acOrderDateTime",
      width: 50,
    
    },
    {
      title: "진행/조리",
      dataIndex: "ucLimitTime",
      width: 50,
    },
    {
      title: "주소",
      dataIndex: "acDestOldAddr",
      width: 200,
    },
    {
      title: "배달비",
      dataIndex: "ulErrandCharge",
      width: 100,
    },
    {
      title: "결제정보",
      dataIndex: "ucPaymentMode",
      width: 90,
    },
    {
      title: "기사",
      dataIndex: "acCourPresident",
      width: 90,
    },
    {
      title: "고객연락처",
      dataIndex: "acDestCellNo",
      width: 90,
    },
  ];

class CallListComponent extends Component 
{
    state = {
      astErrand: []
    }

    async fetchCallList() 
    {
        try 
        {
            const response = await axios(
            {
                method: 'get',
                url:'https://api.roadvoy.net/agency/errand/list.php',
                headers: 
                {
                  'Authorization': `Bearer ${LoginHelper.getToken()}`
                }, params: {
                    acErrandDate: "2019-03-21"
                   }
            }); 

            this.setState({
              astErrand: response.data.astErrand
            })
            } 
            catch(e) 
        {
            message.error(e.message);
        }
    }

    componentDidMount() 
    {
        this.fetchCallList = this.fetchCallList.bind(this);
        //setInterval(this.fetchCallList, 1000);
        this.fetchCallList();
        
    }
    
    render() {
    return (
        <>
            <Header />
            <Table 
                columns={columns}
                dataSource={this.state.astErrand}
                bordered
                pagination={{pageSize:50}}
                size="small"
                scroll={{ x: 'calc(700px + 50%)', y: 650 }}
            />
        </>
    )
    }
}

export default CallListComponent;