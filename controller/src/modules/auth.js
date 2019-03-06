import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Auth extends Component {

    uiConfig = {
        signInOptions: [
            this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID
        ]
    };

    render() {
        return (
            <div>
                <h4 className="headertext">Good to see you here!</h4>
                <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
            </div>
        );
    }

}

export default Auth;