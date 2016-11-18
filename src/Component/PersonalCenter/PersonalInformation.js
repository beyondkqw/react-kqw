import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class PersonalInformation extends Component {
    render() {
        return (
            <div className="ptlb border_bottom pr" style={this.props.style}>
                <div className="infoImg pa">
                    <img className="border_ra50" src={require('../../Images/store.png')} alt=""/>
                </div>
                <div className="ml4 font14 color6">
                    <p><span>会员ID:</span><span>30909100</span></p>
                    <p><span>微信昵称:</span><span>洁</span></p>
                    <p><span>推荐人:</span><span>卢俊成</span></p>
                </div>
            </div>
        );
    }
}
