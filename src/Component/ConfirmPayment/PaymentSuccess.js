import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';

export default class PaymentSuccess extends Component {

    render() {
        let SCREEN_WIDTH = window.screen.width
        console.log('SCREEN_WIDTH==========>',SCREEN_WIDTH)
        return (
            <div className="containerNav">
                <div className="width100" style={{height:SCREEN_WIDTH / 2.2}}>
                    <img src={require("../../Images/paymenSuccess.png")} alt=""/>
                </div>
                <div className="font14 df flex-pack-center" style={{marginTop:20}}>
                    <Link to="/home">
                        <button className="border_all color9 paySuccess border_ra">返回首页</button>
                    </Link>
                    <Link to="/orderList">
                        <button className="border_all color9 paySuccess border_ra ml20">查看订单</button>
                    </Link>
                </div>
            </div>
        );
    }
}
