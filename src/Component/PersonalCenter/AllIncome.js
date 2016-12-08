import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import AllIncomeComponent from '../../Component/PersonalCenter/AllIncomeComponent';
import '../../Stylesheets/App/personal.css';

export default class AllIncome extends Component {
    render() {
        return (
            <div className="containerNav allIncome_Img supplement">
                <AllIncomeComponent />
            </div>
        );
    }
}
