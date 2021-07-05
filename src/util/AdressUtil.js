/* eslint-disable */
import React, { Component } from "react";
import DaumPostCode from "react-daum-postcode";

class AdressUtil extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDaumPost: false
    };
  }

  handleOpenPost = () => {
    this.setState({
      isDaumPost: true
    });
  };

  handleAddress = data => {
    let AllAddress = data.address;
    let extraAddress = "";
    const zoneCodes = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress += extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      AllAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    this.setState({
      fullAddress: AllAddress,
      zoneCode: zoneCodes,
      isDaumPost: false
    });
  };

  render() {
    const { address, isDaumPost, fullAddress, zoneCode } = this.state;
    const width = 595;
    const height = 450;
    const modalStyle = {
      position: "absolute",
      top: 0,
      left: "-178px",
      zIndex: "100",
      border: "1px solid #000000",
      overflow: "hidden"
    };

    return (
      <div>
        {isDaumPost ? (
          <DaumPostCode
            onComplete={this.handleAddress}
            autoClose
            width={width}
            height={height}
            style={modalStyle}
            isDaumPost={isDaumPost}
          />
        ) : null}
      </div>
    );
  }
}

export default AdressUtil;
