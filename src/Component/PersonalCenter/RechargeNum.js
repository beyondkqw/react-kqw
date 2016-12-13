import React, { Component} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';

export default class RechargeNum extends Component {
    render() {
        return (
            <div className="bkg_color">
                <RetailingItem
                    isShowDate={false}
                />
                <RetailingItem
                    isShowDate={false}
                />
            </div>
        );
    }
}
