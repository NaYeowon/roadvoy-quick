import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import CallListComponent from './components/CallList/CallListComponent';
import map from './components/map/map';
import shop from './components/shop/shop';
import rider from './components/rider/rider';
import settlement from './components/settlement/AgencySettlement';
import Popup from './components/Popup/Popup';
import Login from './pages/shared/Login';
import file from './components/file/file';
import shopSignup from './components/shop/shopSignup';

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
            <Route path="/settlement" component={settlement}/>
            <Route path="/Popup" component={Popup}/>
            <Route path="/file" component={file}/>
            <Route path="/shopSignup" component={shopSignup}/>
            <Redirect from="/" to="/CallListComponent" />
        </Switch>
      </Router>
    );
  }
}

export default App;