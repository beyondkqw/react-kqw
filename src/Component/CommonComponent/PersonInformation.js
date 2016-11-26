import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import '../../Stylesheets/App/cloudCard.css';

export default class PersonInformation extends Component {
    render() {
        return (
            <div className="plAll cloudInformation">
                <div className="fl mr5 height_all header_img">
                    <img className="border_ra50" src={require('../../Images/store.png')} alt=""/>
                </div>
                <div className="font14 mt3 color6">
                    <p><span>会员ID :</span><span>123456</span></p>
                    <p><span>微信昵称 :</span><span>洁</span></p>
                </div>
            </div>
        );
    }
}
