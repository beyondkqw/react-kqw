import React, { Component } from 'react';
import {Link} from 'react-router';
import PublishComment from '../../Component/CommonComponent/PublishComment'
import '../../Stylesheets/App/order.css';

export default class ViewEvaluation extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="df plAll border_bottom">
                    <div className="logoHeight">
                        <img className="border_ra" src={require('../../Images/storeClothes.png')} alt=""/>
                    </div>
                    <div className="flex1 ml5 font14 color6">
                        贺卡上大家哈谁惹贺岁的哈捂耳朵软哈维架构和萨
                    </div>
                </div>
                <Link to="/orderList/chaseRatings">
                    <PublishComment />
                </Link>
            </div>
        );
    }
}
