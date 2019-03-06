import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

class Auth extends Component {

    render() {
        return (
            <div>
                <h4 className="headertext">Good to see you here!</h4>
                <StyledFirebaseAuth uiConfig={this.props.uiConfig} firebaseAuth={this.props.firebase.auth()}/>
            </div>
        );
    }

}

export default Auth;