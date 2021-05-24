import React, { Component, PropTypes } from 'react';


class Popup extends Component {

    constructor(props)
    {
        super(props);
        this.state= 
        {
            acFranCompany: '', //가맹명
            // acOrderDateTime: '', //접수
            unLeadTime: '', //진행/조리
            address: '', //주소
            // unDeliChargeTotal: '', //배달비
            ulOrderAmount: '',//결제정보
            // acAcptCellNo: '', //기사
            acClientCellNo: '', //고객연락처
            // RadioTimeValue: {
            //     5: true,
            //     10: false,
            //     15: false,
            //     20: false,
            //     25: false,
            //     30: false,
            //     35: false,
            //     40: false,
            // },
            // RadioOAValue: {
            //     card: true,
            //     cash: false, 
            //     advaned_payment: false, 
            // },
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit = (e) => 
    {
        const {
            acFranCompany,
            acClientCellNo,
            address,
            ulOrderAmount,
            unLeadTime,            
        } = this.state

        e.preventDefault()

        this.props.onCreate({
            acFranCompany: acFranCompany,
            acClientCellNo: acClientCellNo,
            address: address,
            unLeadTime: unLeadTime,
            ulOrderAmount: ulOrderAmount
        })

        // this.setState({
        //     acFranCompany: '',
        //     acClientCellNo: '',
        //     address: '',
        //     unLeadTime: '',
        //     ulOrderAmount: ''
        // })

    }
    
    handleValueChange = (e) =>  
    {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        const {
            acFranCompany,
            acClientCellNo,
            address,
        } = this.state
        return (
            <form onSubmit={this.handleFormSubmit}>
                <div>
                    가맹: <input type="text" name="acFranCompany" value={acFranCompany} onChange={this.handleValueChange}/>
                </div>
                <div>
                    전화번호: <input type="text" name="acClientCellNo" value={acClientCellNo} onChange={this.handleValueChange}/>
                </div>
                <div> 
                    주소: <input type="text" name="address" value={address} onChange={this.handleValueChange}/>
                </div>
                <div>
                    조리시간: 
                    <input type="radio" name="unLeadTime" value={5}  onChange={this.handleValueChange}/>5분
                    <input type="radio" name="unLeadTime" value={10} onChange={this.handleValueChange}/>10분
                    <input type="radio" name="unLeadTime" value={15} onChange={this.handleValueChange}/>15분
                    <input type="radio" name="unLeadTime" value={20} onChange={this.handleValueChange}/>20분<br/>
                    <input type="radio" name="unLeadTime" value={25} onChange={this.handleValueChange}/>25분
                    <input type="radio" name="unLeadTime" value={30} onChange={this.handleValueChange}/>30분
                    <input type="radio" name="unLeadTime" value={35} onChange={this.handleValueChange}/>35분
                    <input type="radio" name="unLeadTime" value={40} onChange={this.handleValueChange}/>40분
                </div> 
                <div>
                    결제유형: 
                    <input type="radio" name="ulOrderAmount" value='card' onChange={this.handleValueChange}/>카드
                    <input type="radio" name="ulOrderAmount" value='cash' onChange={this.handleValueChange}/>현금
                    <input type="radio" name="ulOrderAmount" value='advanced_payment' onChange={this.handleValueChange}/>선결제
                </div>
                <div>
                   결제금액: <input type="text" name="payment" />
                </div>
                <div>
                    <textarea  />
                </div>
                <div>
                    <button type="submit">콜 등록</button>
                </div>
            </form>
        );
    }
}

export default Popup;