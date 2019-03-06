import React, { Component } from 'react';
import './App.css';
import '../node_modules/material-design-lite/material.min.js';
import '../node_modules/material-design-lite/material.min.css';

import Toolbar from './modules/toolbar.js'
import Auth from './modules/auth.js'

import firebase from 'firebase';
import config from './config.js';

firebase.initializeApp(config);

class App extends Component {

  state = {
    isSignedIn: false // Local signed-in state.
  };

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({isSignedIn: !!user})
    );
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    var toshow = ((this.state.isSignedIn) ?
                  <Auth firebase={firebase}/> : '');
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