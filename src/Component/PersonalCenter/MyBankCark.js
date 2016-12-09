import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';


export default class MyBankCark extends Component {
    render() {
        return (
            <div className="containerNav ChooseHeight">
                <Link to="/personalCenter/bankInformation">
                    <div className="BankHeight df supplement border_ra pa_top pa_left1">
                        <span className="store_img"><img src={require('../../Images/bank.png')} alt=""/></span>
                        <div className="flex-1 color_white font14 ml5">
                            <span className="di" style={{marginTop:2}}>中国银行</span>
                            <p>储蓄卡</p>
                            <div style={{marginTop:25}}>
                                <span>****</span>
                                <span className="di ml5">****</span>
                                <span className="di ml5">****</span>
                                <span className="di ml5">1234</span>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
