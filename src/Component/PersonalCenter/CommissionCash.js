import React, { Component} from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';

export default class CommissionCash extends Component {
    render() {
        return (
            <div className="bkg_color containerNav">
                <div className="wrap">
                    <RetailingItem
                        isShowDate={false}
                    />
                    <RetailingItem
                        isShowDate={false}
                    />
                </div>
            </div>
        );
    }
}
