import React, { Component } from 'react';
import './App.css';
import '../node_modules/material-design-lite/material.min.js';
import '../node_modules/material-design-lite/material.min.css';

import Toolbar from './modules/toolbar.js'
import Auth from './modules/auth.js'

class App extends Component {
  render() {
    return (
      <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <Toolbar />
        <main className="mdl-layout__content">
          <div className="page-content">
            <Auth />
          </div>
        </main>
      </div>
    );
  }
}

export default App;