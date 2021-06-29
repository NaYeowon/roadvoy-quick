import * as React from 'react'
import { useState, useEffect  } from 'react'
import { message, Table, Checkbox, Tag } from 'antd';
import styled from "styled-components"

import Header from '../Layout/Header';
import LoginHelper from '../../pages/shared/LoginHelper';
import axios from 'axios';
import { ColumnsType } from 'antd/lib/table';

import { costFormat, getCellNoFormat, getDateFormat} from '../../util/FormatUtil';

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const columns: ColumnsType<CallInfo> = [
    {
      title: "가맹명",
      dataIndex: "acFranCompany",
      key: "acFranCompany",
      width: 120,
    },
    {
      title: "접수",
      dataIndex: "acOrderDateTime",
      width: 50,
      render: ((date: string) => getDateFormat(date))
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
      render: ((cost: number) => costFormat(cost))
    },
    {
      title: "결제정보",
      dataIndex: "ucPaymentMode",
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
      width: 90,
    },
    {
      title: "고객연락처",
      dataIndex: "acDestCellNo",
      width: 90,
      render: ((phone: string) => getCellNoFormat(phone))
    },
  ];

  interface CallInfo {
      title: string,
      dataIndex: 'string',
      width: number,
      ulGoodsPrice: number
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
          <Checkbox.Group style={{width: '100%', display:'flex'}} onChange={onChange}>
            <CustomCheckbox 
              value="대기"
              style={{backgroundColor:"#00BCD4", width:"20%", padding:'1px', margin:'0px'}}
            >대기 0콜
            </CustomCheckbox>
            <CustomCheckbox 
              value="배차"
              style={{backgroundColor:"#FF8F00", width:"20%", padding:'1px', margin:'0px'}}
              >배차 0콜
            </CustomCheckbox>
            <CustomCheckbox 
              value="픽업"
              style={{backgroundColor:"#AA00FF", width:"20%", padding:'1px', margin:'0px'}}
              >픽업 0콜
            </CustomCheckbox>
            <CustomCheckbox
              value="완료"
              style={{backgroundColor:"#4CAF50", width:"20%", padding:'1px', margin:'0px'}}
              >완료 0콜
            </CustomCheckbox>
            <CustomCheckbox 
              value="취소"
              style={{backgroundColor:"#F44336", width:"20%", padding:'1px', margin:'0px'}}
              >취소 0콜
            </CustomCheckbox>
          </Checkbox.Group>
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

  const CustomCheckbox = styled(Checkbox)`
    color: white;
    font-size: 11pt;
    font-weight: bold`
