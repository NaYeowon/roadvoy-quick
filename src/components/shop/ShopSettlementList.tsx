import React from 'react';
import { Col, Descriptions, Table , Button} from 'antd';

const dataSource = [
    {
      key: '1',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '2',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '3',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '4',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '5',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '6',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
    {
      key: '7',
      acBizDate: 'dd',
      usDayDoneCallSum: 1,
    },
  ];


const columns = [
    {
        title: '영업일',
        dataIndex: 'acBizDate',
        key: 'acBizDate',
        width: 100
    },
    {
        title: '배달',
        children: [
            {
                title: '콜수',
                dataIndex: 'usDayDoneCallSum',
                key: 'usDayDoneCallSum',
                width: 60,
            },
            {
                title: '배달비',
                dataIndex: 'ulDayTotalDeliFee',
                key: 'ulDayTotalDeliFee',
                width: 100
            },
            {
                title: '콜당 수수료',
                dataIndex: 'ulDayCallCntFee',
                key: 'ulDayCallCntFee',
                width:100
            },
        ],
    },
    {
        title: '관리비 충전',
        dataIndex: '1DayReChargeAmount',
        key: '1DayReChargeAmount',
        width: 100
    },
    {
        title: '기사 가맹간 캐시',
        children: [
            {
                title:'카드→현금 입금',
                dataIndex: 'ulSubstituteInput',
                key: 'ulSubstituteInput',
                width: 100
            },
            {
                title: '현금→카드 송금',
                dataIndex: 'ulSubstituteRefund',
                key: 'ulSubstituteRefund',
                width: 100
            },
            {
                title: '기사가 예치금 입금',
                dataIndex: 'ulSubstituteDeposit',
                key: 'ulSubstituteDeposit',
                width: 100
            },
            {
                title: '현금건 완료시 자동송금',
                dataIndex: 'ulCashPaymentAutoReansferAmount',
                key: 'ulCashPaymentAutoReansferAmount',
                width: 100
            },
        ],
    },
    {
        title: '캐시 관리자 직권회수',
        dataIndex: 'ulSubstituteCashMinusByManager',
        key: 'ulSubstituteCashMinusByManager',
        width:100
    },
    {
        title: '가상계좌',
        children: [
            {
                title: '입금',
                dataIndex: 'ulVirBankDeposit',
                key: 'ulVirBankDeposit',
                width: 100
            },
            {
                title: '수수료',
                dataIndex: 'ulVirBankFee',
                key: 'ulVirBankFee',
                width: 100
            }
        ]
    }
]

const ShopSettlementList = () => {
    return (
        <div>
            <Col>
            <div>
                <span style={{float: 'left'}}>가맹명</span>
                <Button>다운로드</Button>
            </div>
            <Descriptions
                bordered
                column={{ xxl: 5, xl: 4, lg: 4, md: 3, sm: 2, xs: 1 }}
                size='small'
                >
                <Descriptions.Item label="배달콜수">0콜</Descriptions.Item>
                <Descriptions.Item label="배달비">0원</Descriptions.Item>
                <Descriptions.Item label="콜당수수료">0원</Descriptions.Item>
                <Descriptions.Item label="현금→카드 송금">0원</Descriptions.Item>
                <Descriptions.Item label="카드→현금 입금">0원</Descriptions.Item>
                <Descriptions.Item label="기사가 캐시입금">0원</Descriptions.Item>
                <Descriptions.Item label="캐시 관리자 직권회수">0원</Descriptions.Item>
                <Descriptions.Item label="가상계좌 입금">0원</Descriptions.Item>
                <Descriptions.Item label="가상계좌 수수료">0원</Descriptions.Item>
                </Descriptions>
            </Col>

            <Col>
                <Table
                    columns={columns}
                    dataSource={dataSource}
                    bordered
                    pagination={false}
                    size="small"
                    scroll={{ x: 'calc(700px + 50%)', y: 580 }}
                />,
            </Col>
        </div>
    );
};

export default ShopSettlementList;