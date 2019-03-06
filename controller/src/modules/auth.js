import React, { Component } from 'react';
import firebase from 'firebase';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import config from '../config';

firebase.initializeApp(config);

class Auth extends Component {

    uiConfig = {
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    };

    render() {
        return (
            <div className="mdl-cell mdl-cell--4-col">
                <h4 className="text-align: center;">Good to see you here!</h4>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()}/>
            </div>
        );
    }

}

export default Auth;