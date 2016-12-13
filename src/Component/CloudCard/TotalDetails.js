import React, { Component } from 'react';
import AllIncomeComponent from '../../Component/PersonalCenter/AllIncomeComponent';
import '../../Stylesheets/App/cloudCard.css';

export default class TotalDetails extends Component {
    render() {
        return (
            <div className="containerNav allIncome_Img supplement">
                <AllIncomeComponent />
            </div>
        );
    }
}
