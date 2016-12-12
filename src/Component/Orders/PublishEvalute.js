import React, { Component } from 'react';
import {Link} from 'react-router';
import PublishComment from '../../Component/CommonComponent/PublishComment'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';

export default class PublishEvalute extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="df plAll">
                    <div className="logoHeight">
                        <img className="border_ra" src={require('../../Images/storeClothes.png')} alt=""/>
                    </div>
                    <div className="flex1 ml5 font14 color6 height3">
                        <textarea
                            className="height_all borderno"
                            name=""
                            placeholder="评价一下吧。。。"
                            cols="30"
                            rows="10"
                        ></textarea>
                    </div>
                </div>
                <div className=" border_bottom">
                    <div className="filediv tc mt5 plAll">
                        <input type="file" name=""/>
                        <img className="border_ra" src={require('../../Images/camera.png')}/>
                    </div>
                </div>
                <SplitLine/>
                {/*<div>
                    <ul className="font14">
                        <li className="plr evalute_h border_bottom">
                            <div className="fl">
                                店铺评分
                            </div>
                            <div className="fr">
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                            </div>
                        </li>
                        <li className="plr evalute_h border_bottom">
                            <div className="fl">
                                商家服务态
                            </div>
                            <div className="fr">
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                            </div>
                        </li>
                    </ul>
                </div>*/}
                <Link to="/orderList/chaseRatings">
                    <PublishComment />
                </Link>
            </div>
        );
    }
}
