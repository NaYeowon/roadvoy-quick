import * as React from 'react'
import { useState, useEffect  } from 'react'
import { message, Table, Checkbox, Tag } from 'antd';
import styled from "styled-components"
import './Call.css'

import Header from '../Layout/Header';
import LoginHelper from '../../pages/shared/LoginHelper';
import axios from 'axios';
import { ColumnsType } from 'antd/lib/table';

import { costFormat, getCellNoFormat, getDateFormat} from '../../util/FormatUtil';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

interface CallInfo {
  title: string,
  dataIndex: string,
  width: number,
  ulGoodsPrice: number,
  ucLeadTime: number,
  ucLimitTime: number,
  ucDeliStatus: number,
  acDestCompany: string
}

const columns: ColumnsType<CallInfo> = [

    {
      title: "가맹명",
      dataIndex: "acDestCompany",
      key: "acDestCompany",
      className: 'deli-status',
      width: 120,
      render: (text:string, record: CallInfo) => {
        return record.acDestCompany 
        return record.ucDeliStatus
      }
    },
    {
      title: "접수",
      dataIndex: "acOrderDateTime",
      className: 'deli-status',
      width: 50,
     //render: ((date: string) => getDateFormat(date))  
     render:(data: string, record: CallInfo) => {
       return getDateFormat(data)
       return record.ucDeliStatus
     }
    },
    {
      title: "진행/조리",
      dataIndex: "ucLimitTime",
      className: 'deli-status',
      width: 50,
      render:(dataIndex: number, record) => { 
        return `분/${record.ucLimitTime}분`
      }
    },
    {
      title: "주소",
      dataIndex: "acDestOldAddr",
      className: 'deli-status',
      width: 200,
    },
    {
      title: "배달비",
      dataIndex: "ulErrandCharge",
      className: 'deli-status',
      width: 100,
      render: ((cost: number) => costFormat(cost))
    },
    {
      title: "결제정보",
      dataIndex: "ucPaymentMode",
      className: 'deli-status',
      width: 90,
      render: (dataIndex: number, record) => {
        console.log(record)
        let charge = Number(record.ulGoodsPrice).toLocaleString()
        switch (Number(dataIndex)) {
          case 2:
            return <>
              <Tag color='#2db7f5'>카드</Tag>ㅇ
              <span>{charge}원</span>
            </>
          case 3:
            return <>
              <Tag color='#87d068'>현금</Tag>
              <span>{charge}원</span>
            </>
          case 4:
            return <>
              <Tag color='#f50'>선결</Tag>
              <span>{charge.toLocaleString()}원</span>
            </>
        }
      }
    },
    {
      title: "기사",
      dataIndex: "acCourPresident",
      className: 'deli-status',
      width: 90,
    },
    {
      title: "고객연락처",
      dataIndex: "acDestCellNo",
      className: 'deli-status',
      width: 90,
      render: ((phone: string) => getCellNoFormat(phone))
    },
  ];

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
                        acErrandDate: "2021-06-30"
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
          <Checkbox.Group style={{width: '100%', display:'flex'}} onChange={onChange}>
            <CustomCheckbox 
              value="대기"
              style={{backgroundColor:"#00BCD4", width:"20%", padding:'5px', margin:'0px'}}
            >대기 0콜
            </CustomCheckbox>
            <CustomCheckbox 
              value="배차"
              style={{backgroundColor:"#FF8F00", width:"20%", padding:'5px', margin:'0px'}}
              >배차 0콜
            </CustomCheckbox>
            <CustomCheckbox 
              value="픽업"
              style={{backgroundColor:"#AA00FF", width:"20%", padding:'5px', margin:'0px'}}
              >픽업 0콜
            </CustomCheckbox>
            <CustomCheckbox
              value="완료"
              style={{backgroundColor:"#4CAF50", width:"20%", padding:'5px', margin:'0px'}}
              >완료 0콜
            </CustomCheckbox>
            <CustomCheckbox 
              value="취소"
              style={{backgroundColor:"#F44336", width:"20%", padding:'5px', margin:'0px'}}
              >취소 0콜
            </CustomCheckbox>
          </Checkbox.Group>
          <Table 
              columns={columns}
              dataSource={astErrand}
              bordered
              pagination={false}
              size='small'
              scroll={{y: 650 }}
              rowClassName={(record: CallInfo) => {
                const className: any = [];
                if(Number(record.ucDeliStatus) === 1){
                  className.push('deli-status-temp')
                }
                if(Number(record.ucDeliStatus) === 4) {
                  className.push('deli-status-wait')
                }
                if(Number(record.ucDeliStatus) === 8) {
                  className.push('deli-status-alloc')
                }
                if(Number(record.ucDeliStatus) === 16) {
                  className.push('deli-status-pkup')
                }
                if(Number(record.ucDeliStatus) === 32) {
                  className.push('deli-status-done')
                }
                if(Number(record.ucDeliStatus) === 64) {
                  className.push('deli-status-cancel')
                }
                console.log(typeof record.ucDeliStatus)
                return className.join('')
              }}
          />
      </>
    )

  }
  export default CallListComponent;

  const CustomCheckbox = styled(Checkbox)`
    color: white;
    font-size: 11pt;
    font-weight: bold`
