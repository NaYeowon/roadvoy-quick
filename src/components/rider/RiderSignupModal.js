import React, { Component } from 'react';
import { Modal } from 'antd'; 

class RigerSignupModal extends Component {

    constructor(props) {
        super(props);

        this.state = { isModalVisible : false };
    }

    handleOk = (e) => {
        console.log(this.state.isModalVisible,": 모달");
        this.setState({ isModalVisible : false});
        e.preventDefault();

        this.props.onOk(this.state.isModalVisible)
    };

    handleCancel = (e) => {
        console.log(this.props.isModalVisible, ": 취소");
        this.setState({ isModalVisible : false });
        e.preventDefault();

        this.props.onCancel(this.state.isModalVisible)
    };

    componentDidMount() {
        console.log(this.props.visible, "ddd");
    }
    render() {
        return (
            <>
                <Modal visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <p>ㅇㄴㅇㅁㄴㅇㅁㄴㅇㄴ</p>
                </Modal>
            </>
        );
    }
}

export default RigerSignupModal;