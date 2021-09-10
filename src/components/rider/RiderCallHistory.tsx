/* eslint-disable */

import React, { Component } from "react";
import { CallInfo } from "../CallList/CallListComponent";
import Header from "../Layout/Header";

interface IProps {
  location: any;
}

interface IState {
  astCall: CallInfo[];
}

class RiderCallHistory extends Component<IProps, IState> {
  render() {
    return (
      <>
        <Header />
      </>
    );
  }
}

export default RiderCallHistory;
