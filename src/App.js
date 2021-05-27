import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import CallListComponent from './components/CallList/CallListComponent';
import map from './components/map/map';
import shop from './components/shop/shop';
import rider from './components/rider/rider';
import Popup from './components/Popup/Popup';
import Login from './pages/shared/Login';
import file from './components/file/file';
import shopSignup from './components/shop/shopSignup';
import riderSignup from './components/rider/riderSignup';
import Agency from './components/AgencySettlement/Agency';
import AgencySettlement from './components/AgencySettlement/AgencySettlement';
import HeadOffice from './components/HeadOffice/HeadOffice';
import Distributor from './components/Distributor/Distributor';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/CallListComponent" component={CallListComponent}/>
            <Route path="/map" component={map}/>
            <Route path="/shop" component={shop}/>
            <Route path="/rider" component={rider}/>
            <Route path="/Popup" component={Popup}/>
            <Route path="/file" component={file}/>
            <Route path="/shopSignup" component={shopSignup}/>
            <Route path="/riderSignup" component={riderSignup}/>
            <Route path="/Agency" component={Agency}/>
            <Route path="/AgencySettlement" component={AgencySettlement}/>
            <Route path="/HeadOffice" component={HeadOffice}/>
            <Route path="/Distributor" component={Distributor}/>
            <Redirect from="/" to="/CallListComponent" />
        </Switch>
      </Router>
    );
  }
}

export default App;