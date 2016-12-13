/**
 * Created by asus on 2016/12/12.
 */
import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import '../../Stylesheets/App/personal.css';

export default class JdyStock extends Component {

    render(){
        return(
            <div>
                <div className="stockBanner flex flex-align-center flex-pack-center flex-v">
                    <p className="font14 color_white">昨日分红</p>
                    <p className="font30 color_white">5000</p>
                </div>
                <SplitLine />
                <div className="userHeight plr font14">
                    <div className="fl color6">总共分红</div>
                    <div className="fr f12 color9 tr">
                        <span>￥</span><span>5678</span>
                    </div>
                </div>
                <SplitLine />
                <div className ="list-block m0 font14">
                    <ul>
                        <li className ='item-content item-link border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                    <span className="di margin15 color6">保洁集团</span>
                                </div>
                                <div className="item-after color9 isSet">持100股</div>
                            </div>
                        </li>
                        <li className ='item-content item-link border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                    <span className="di margin15 color6">玉海建筑</span>
                                </div>
                                <div className="item-after color9 isSet">持100股</div>
                            </div>
                        </li>
                        <li className ='item-content item-link border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                    <span className="di margin15 color6">绿之源</span>
                                </div>
                                <div className="item-after color9 isSet">持100股</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}