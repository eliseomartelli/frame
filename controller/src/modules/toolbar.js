import React, { Component } from 'react';

class Toolbar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <header className="mdl-layout__header">
                <div className="mdl-layout__header-row">
                    <span className="mdl-layout-title">Frames</span>
                </div>
            </header>
        );
    }

}

export default Toolbar;