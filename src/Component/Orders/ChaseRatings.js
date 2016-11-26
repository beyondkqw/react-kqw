import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import PublishComment from '../../Component/CommonComponent/PublishComment'
import '../../Stylesheets/App/order.css';

export default class ChaseRatings extends Component {
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
                <div className="plAll">
                    <p>追加评论</p>
                    <div className="mt5 font14 width_100 height3">
                        <textarea className="width_100 height_all borderno"  name="" id="" placeholder="您还有什么想说的">
                        </textarea>
                    </div>
                    <div className="filediv tc mt5">
                        <input type="file" name=""/>
                        <img className="border_ra" src={require('../../Images/camera.png')}/>
                    </div>
                </div>
                <SplitLine />
                <PublishComment />
            </div>
        );
    }
}
