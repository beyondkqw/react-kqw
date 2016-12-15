import React, { Component } from 'react';
import AllIncomeComponent from '../../Component/PersonalCenter/AllIncomeComponent';
import '../../Stylesheets/App/personal.css';


export default class RetailingDetails extends Component {
    render() {
        const {imgUrl,memberName,amount,msg} = this.props.location.query
        return (
            <div className="containerNav">
                <AllIncomeComponent
                    imgUrl={imgUrl}
                    memberName={memberName}
                    amount = {amount}
                />
                <div className="userHeight plr border_bottom">
                    <span className="color6 font14">佣金来源</span>
                    <span className="color9 f12 fr">{msg}</span>
                </div>
                <div className="userHeight plr border_bottom">
                    <span className="color6 font14">创建时间</span>
                    <span className="color9 f12 fr">2016-11-20 11:30</span>
                </div>
            </div>
        );
    }
}
