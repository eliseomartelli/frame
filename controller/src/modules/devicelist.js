import React, { Component } from 'react';

class DeviceList extends Component {

    state = {
        deviceList: []
    };

    componentDidMount() {
        var listref = this.props.firebase.database().ref('/framesOf/' + this.props.user);
        listref.on('value', (snapshot) => {
            this.state.deviceList = []; // reset the list
            snapshot.forEach(element => {
                this.setState(state => {
                    const list = state.deviceList.push({key: element.key});
                    return {
                        list
                    }
                })
            });
        });

        console.log(this.props.history);
    }
    
    render() {
        return (
            <div>
                {this.state.deviceList.map(item => (
                    <li className="mdl-list__item" onClick=
                    {() => this.props.history.push('controller/' + item.key)}>
                        <i class="material-icons mdl-list__item-icon">person</i>
                        <span className="mdl-list__item-primary-content">
                            {item.key}
                        </span>
                    </li>
                ))}
            </div>
        );
    }

}

export default DeviceList;