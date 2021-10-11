/* eslint-disable */
import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import CallListComponent from "./components/CallList/CallListComponent";
import map from "./components/map/map";
import AreaSetting from "./components/map/AreaSetting";
import shop from "./components/shop/shop";
import CallHistory from "./components/CallList/CallHistory";
import rider from "./components/rider/rider";
import Login from "./pages/shared/Login";
import FileUpload from "./components/file/FileUpload";
import shopSignupModal from "./components/shop/shopSignupModal";
import riderSignupModal from "./components/rider/RiderSignupModal";
import Agency from "./components/AgencySettlement/Agency";
import AgencySettlement from "./components/AgencySettlement/AgencySettlement";
import ShopSettlement from "./components/shop/ShopSettlement";
import HeadOffice from "./components/HeadOffice/HeadOffice";
import Distributor from "./components/Distributor/Distributor";
import ShopSettlementList from "./components/shop/ShopSettlementList";
import ShopHistory from "./components/shop/ShopHistory";
import RiderHistory from "./components/rider/RiderHistory";
import RiderSettlement from "./components/rider/RiderSettlement";
import RiderSettlementList from "./components/rider/RiderSettlementList";
import Board from "./components/Board/Board";
import Writing from "./components/Board/Writing";
import BoardDetail from "./components/Board/BoardDetail";
import DistributorStatistics from "./components/Distributor/DistributorStatistics";
import DistributorSignUpModal from "./components/Distributor/DistributorSignUpModal";
import AgencySiginupModal from "./components/AgencySettlement/AgencySiginupModal";
import DistributorSettlement from "./components/Distributor/DistributorSettlement";
import DistributorApproval from "./components/HeadOffice/DistributorApproval";

import { CallFee } from "./components/Distributor/CallFee";
import { CallQuantity } from "./components/Distributor/CallQuantity";
import { ProgramUsageFee } from "./components/Distributor/ProgramUsageFee";
import RiderCallHistory from "./components/rider/RiderCallHistory";
import ShopCallHistory from "./components/shop/ShopCallHistory";
import { OrderPopup } from "./components/Order/Popup";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/CallListComponent" component={CallListComponent} />
          <Route path="/CallHistory" component={CallHistory} />
          <Route path="/map" component={map} />
          <Route path="/AreaSetting" component={AreaSetting} />
          <Route path="/shop" component={shop} />
          <Route path="/rider" component={rider} />
          <Route path="/order/popup" component={OrderPopup} />
          <Route path="/shopSignupModal" component={shopSignupModal} />
          <Route path="/order/update/popup/:ulErrandSeqNo" component={OrderPopup} />
          <Route path="/fileUpload" component={FileUpload} />
          <Route path="/ShopHistory" component={ShopHistory} />
          <Route path="/shopSignupModal" component={shopSignupModal} />
          <Route path="/riderSignupModal" component={riderSignupModal} />
          <Route path="/Agency" component={Agency} />
          <Route path="/AgencySettlement" component={AgencySettlement} />
          <Route path="/ShopSettlement" component={ShopSettlement} />
          <Route path="/HeadOffice" component={HeadOffice} />
          <Route path="/Distributor" component={Distributor} />
          <Route path="/ShopSettlementList" component={ShopSettlementList} />
          <Route path="/RiderSettlement" component={RiderSettlement} />
          <Route path="/RiderSettlementList" component={RiderSettlementList} />
          <Route path="/RiderHistory" component={RiderHistory} />
          <Route path="/Board" component={Board} />
          <Route path="/Writing" component={Writing} />
          <Route path="/BoardDetail" component={BoardDetail} />
          <Route path="/DistributorStatistics" component={DistributorStatistics} />
          <Route path="/DistributorSignUpModal" component={DistributorSignUpModal} />
          <Route path="/CallFee" component={CallFee} />
          <Route path="/CallQuantity" component={CallQuantity} />
          <Route path="/ProgramUsageFee" component={ProgramUsageFee} />
          <Route path="/AgencySiginupModal" component={AgencySiginupModal} />
          <Route path="/DistributorSettlement" component={DistributorSettlement} />
          <Route path="/DistributorApproval" component={DistributorApproval} />
          <Route path="/RiderCallHistory" component={RiderCallHistory} />
          <Route path="/ShopCallHistory" component={ShopCallHistory} />
          <Redirect from="/" to="/CallListComponent" />
        </Switch>
      </Router>
    );
  }
}

export default App;
