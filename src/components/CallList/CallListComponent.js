import React, { Component } from 'react';
import Header from '../Layout/Header';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import { TableHead } from '@material-ui/core';
import Popup from '../Popup/Popup';

class CallListComponent extends Component {
    
    id = 0
    state = {
        list: []
    }


    handleCreate = (data) => {
        const { list } = this.state
        this.setState({
            list: list.concat({
                ...data,
                id: this.id++
            })
        })
    }

    render() {
        const { list } = this.state;
    return (
        <div>
            <Header />
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>가맹명</TableCell>
                        <TableCell>접수</TableCell>
                        <TableCell>진행/조리</TableCell>
                        <TableCell>주소</TableCell>
                        <TableCell>배달비</TableCell>
                        <TableCell>결제정보</TableCell>
                        <TableCell>기사</TableCell>
                        <TableCell>고객연락처</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>{JSON.stringify(list)}</TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                    </TableRow>
                </TableBody>
                
            </Table>
        </div>
    )
    }
}

export default CallListComponent;