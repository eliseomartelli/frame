import React, { Component } from 'react';
import createHistory from 'history/createBrowserHistory'

import './App.css';
import '../node_modules/material-design-lite/material.min.js';
import '../node_modules/material-design-lite/material.min.css';

import Toolbar from './modules/toolbar.js'
import Auth from './modules/auth.js'
import DeviceList from './modules/devicelist';


import firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);
const history = createHistory();

class App extends Component {

  state = {
    isSignedIn: false,
    currentUser: null
  };

  handleNavigation(location) {
    this.setState({location: location});
  }

  componentDidMount() {
    this.handleNavigation(history.location);
    history.listen(this.handleNavigation);

    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({
            isSignedIn: !!user, 
            currentUser: user.uid
          }
        )

        if (this.state.isSignedIn === true) {
          history.push('/app');
        }
      }
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  
  uiConfig = {
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInSuccessUrl: '/app'
  };

  render() {
    var toshow = ((this.state.isSignedIn) ?
                  <DeviceList history={history} firebase={firebase} user={this.state.currentUser}/> : <Auth firebase={firebase} uiConfig={this.uiConfig}/>);
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Toolbar />
        <main className="mdl-layout__content">
          <div className="page-content">
            <div className="mdl-grid">
              <div className="mdl-layout-spacer"></div>
              <div className="mdl-cell mdl-cell--4-col">
                {toshow}
              </div>
              <div className="mdl-layout-spacer"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

export default App;