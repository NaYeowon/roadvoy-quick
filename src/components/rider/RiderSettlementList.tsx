import React from 'react';
import { Col, Descriptions, Table , Button} from 'antd';

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
                dataIndex: '1DayTotalRevenue',
                key: '1DayTotalRevenue',
                width: 100
            },
            {
                title: '콜수수료',
                dataIndex: '1DayDeliCost',
                key: '1DayDeliCost',
                width:100
            },
            {
                title: '수입',
                dataIndex: '1DayDeliIncome',
                key: '1DayDeliIncome',
                width: 100
            }
        ],
    },
    {
        title: '심부름',
        children: [
            {
                title:'콜수',
                dataIndex: 'usDayDoneErrandSum',
                key: 'usDayDoneErrandSum',
                width: 60
            },
            {
                title: '배달비',
                dataIndex: '1DayErrandCharge',
                key: '1DayErrandCharge',
                width: 100
            },
            {
                title: '심부름 수수료',
                dataIndex: '1DayErrandFeeAgency',
                key: '1DayErrandFeeAgency',
                width: 100
            },
        ],
    },
    {
        title: '리스료',
        dataIndex: '1DayCycleLeaseCost',
        key: '1DayCycleLeaseCost',
        width:100
    },
    {
        title: '기사↔기사',
        children: [
            {
                title: '캐시입금',
                dataIndex: 'ulSubstituteCashPlus',
                key: 'ulSubstituteCashPlus',
                width: 100
            },
            {
                title: '캐시송금',
                dataIndex: 'ulSubstituteCashMinus',
                key: 'ulSubstituteCashMinus',
                width: 100
            },
        ],
    },
    {
        title: '기사↔가맹',
        children: [
            {
                title: '현금↔카드 입금',
                dataIndex: 'ulSubstituteInput',
                key: 'ulSubstituteInput',
                width: 100
            },
            {
                title: '카드↔현금 송금',
                dataIndex: 'ulSubstituteRefund',
                key: 'ulSubstituteRefund',
                width: 100
            },
            {
                title: '예치금송금',
                dataIndex: 'ulSubstituteDeposit',
                key: 'ulSubstituteDeposit',
                width: 100
            },
            {
                title: '현금건 완료시 자동송금',
                dataIndex: 'ulCashPaymentAutoTransferAmount',
                key: 'ulCashPaymentAutoTransferAmount',
                width: 100
            },
        ],
    },
    {
        title: '직권 회수 당한 예치금(지출)',
        dataIndex: 'ulSubstituteCashMinusByManager',
        key: 'ulSubstituteCashMinusByManager',
        width: 100
    },
    {
        title: '직권 회수 예치금(수입)',
        dataIndex: 'ulSubstituteCashPlusByManager',
        key: 'ulSubstituteCashPlusByManager',
        width:100
    },
    {
        title: '가상계좌입금',
        dataIndex: 'ulVirBankDeposit',
        key: 'ulVirBankDeposit',
        width:100
    },
    {
        title: '출금',
        children: [
            {
                title: '직접출금',
                dataIndex: 'ulReClaimAmount',
                key: 'ulReClaimAmount',
                width: 100
            },
            {
                title: '수수료',
                dataIndex: 'ulReClaimComm',
                key: 'ulReClaimComm',
                width: 100
            },
            {
                title: '본사출금',
                dataIndex: 'ulCreditAmount',
                key: 'ulCreditAmount',
                width: 100
            },
        ],
    },
    {
        title: '잔고',
        dataIndex: '1RealBalance',
        key: '1RealBalance',
        width: 100,
    },
    {
        title: '보증금',
        dataIndex: '1DayCourierDeposit',
        key: '1DayCourierDeposit',
        width: 100
    },
    {
        title: '출금가능액',
        dataIndex: '1ReclaimableBalance',
        key: '1ReclaimableBalance',
        width: 100
    },
    {
        title: '갚지못한금액',
        children: [
            {
                title: '콜수수료',
                dataIndex: '1NonDeliCost',
                key: '1NonDeliCost',
                width: 100
            },
            {
                title: '리스료',
                dataIndex: '1NonCycleLeaseCost',
                key: '1NonCycleLeaseCost',
                width: 100
            },
            {
                title: '전날까지누적 콜수수료',
                dataIndex: '1NonPrevNonDeliCost',
                key: '1NonPrevNonDeliCost',
                width: 100
            },
            {
                title: '전날까지누적 리스료',
                dataIndex: '1NonPrevNonCycleLeaseCost',
                key: '1NonPrevNonCycleLeaseCost',
                width: 100
            },
        ],
    },
    {
        title: '갚은금액',
        children: [
            {
                title: '콜수수료',
                dataIndex: '1RepayDeliCost',
                key: '1RepayDeliCost',
                width: 100
            },
            {
                title: '리스료',
                dataIndex: '1RepayCycleLeaseCost',
                key: '1RepayCycleLeaseCost',
                width: 100
            },
            {
                title: '전날콜수수료',
                dataIndex: '1RepayPrevNonDeliCost',
                key: '1RepayPrevNonDeliCost',
                width: 100
            },
            {
                title: '전날리스료',
                dataIndex: '1RepayPrevNonCycleLeaseCost',
                key: '1RepayPrevNonCycleLeaseCost',
                width: 100
            }
        ]
    }
]

const RiderSettlementList = () => {
    return (
        <div>
        <Col>
        <div>
            <span style={{float: 'left'}}>가맹명</span>
            <Button>다운로드</Button>
        </div>
        <Descriptions
            bordered
            column={{ xxl: 5, xl: 5, lg: 5, md: 3, sm: 2, xs: 1 }}
            size='small'
            >
            <Descriptions.Item label="배달콜수">0콜</Descriptions.Item>
            <Descriptions.Item label="배달비">0원</Descriptions.Item>
            <Descriptions.Item label="콜수수료">0원</Descriptions.Item>
            <Descriptions.Item label="퀵콜수">0원</Descriptions.Item>
            <Descriptions.Item label="퀵배달비">0원</Descriptions.Item>
            <Descriptions.Item label="퀵수수료">0원</Descriptions.Item>
            <Descriptions.Item label="기사 캐시입금">0원</Descriptions.Item>
            <Descriptions.Item label="기사 캐시송금">0원</Descriptions.Item>
            <Descriptions.Item label="현금→카드 송금">0원</Descriptions.Item>
            <Descriptions.Item label="카드→현금 송금">0원</Descriptions.Item>
            <Descriptions.Item label="예치금 송금">0원</Descriptions.Item>
            <Descriptions.Item label="가상계좌입금">0원</Descriptions.Item>
            <Descriptions.Item label="출금">0원</Descriptions.Item>
            <Descriptions.Item label="출금수수료">0원</Descriptions.Item>
            <Descriptions.Item label="본사출금">0원</Descriptions.Item>
            </Descriptions>
        </Col>

        <Col>
            <Table
                columns={columns}
                //dwataSource={}
                bordered
                pagination={false}
                size="small"
                scroll={{ x: 'calc(700px + 50%)', y: 650 }}
            />,
        </Col>
    </div>
    );
};

export default RiderSettlementList;