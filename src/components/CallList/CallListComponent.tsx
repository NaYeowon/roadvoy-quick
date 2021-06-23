import * as React from 'react'
import { useState, useEffect  } from 'react'
import { message, Table, Checkbox } from 'antd';

import Header from '../Layout/Header';
import LoginHelper from '../../pages/shared/LoginHelper';
import axios from 'axios';
import { ColumnsType } from 'antd/lib/table';

const columns: ColumnsType<CallInfo> = [
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

  interface CallInfo {
      title: string,
      dataIndex: 'string',
      width: number,
  }
  const CallListComponent = () => {

    const [astErrand, setAstManageCall] = useState<CallInfo[]>([])

    const fetchCallList = async () => {

        try {
            const response = await axios({
                method: 'get',
                url:'https://api.roadvoy.net/agency/errand/list.php',
                headers: 
                    {
                      'Authorization': `Bearer ${LoginHelper.getToken()}`
                    }, 
                    params: {
                        acErrandDate: "2019-03-21"
                    }
            })
            console.log(response.data.astErrand)
            setAstManageCall(response.data.astErrand)
        } catch (e) {
            message.error(e.message)
        }
    }

    useEffect(() => {
      const delay = window.setInterval(fetchCallList, 1000)
      return () => clearInterval(delay)
    }, []);

    return(
        <>
            <Header />
            <Table 
                columns={columns}
                dataSource={astErrand}
                bordered
                pagination={false}
                size='small'
                scroll={{ x: 'calc(700px + 50%)', y: 650 }}
            />
        </>
    )

  }
  export default CallListComponent;