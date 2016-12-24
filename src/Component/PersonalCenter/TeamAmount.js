import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import AllIncomeComponent from '../../Component/PersonalCenter/AllIncomeComponent';
import '../../Stylesheets/App/personal.css';

export default class TeamAmount extends Component {
    render() {
        const {imgUrl,memberName,amount} = this.props.location.query
        return (
            <div className="containerNav allIncome_Img supplement">
                <div className="pa_top1 tc">
                <span className="di incomeImg">
                    <img className="border_ra50" src={imgUrl} alt=""/>
                </span>
                    <p className="f12 color9 mt5">{memberName}</p>
                    <p className="f25 color6 mt6"><span>+</span><span>{amount?amount:0}</span></p>
                </div>
            </div>
        );
    }
}