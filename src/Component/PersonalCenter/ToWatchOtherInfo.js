import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';

export default class ToWatchOtherInfo extends Component {
    render() {
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="list-block m0">

                        <li className="item-content item-link pl" style={{minHeight:60}}>
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">聚朵云头像</div>
                                <div className="item-after pr headerImg" style={{maxHeight:40}}>
                                    <input
                                        className="pa top0"
                                        type="file"
                                        style={{left:0,width:40,height:40,padding:0,opacity:0}}
                                    />
                                    <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                                </div>
                            </div>
                        </li>

                </div>
                <div className="list-block m0">
                    <ul>
                        <li className="item-content item-link pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">会员名</div>
                                <div className="item-after color9">小燕子66</div>
                            </div>
                        </li>
                        <li
                            className="item-content item-link pl border_bottom"
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">性别</div>
                                <div className="item-after color9">女</div>
                            </div>
                        </li>
                        <li className="item-content item-link pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">我的二维码名片</div>
                                <div className="item-after color9">小燕子66</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">姓名</div>
                                <div className="fr f12 color9 tr">
                                    <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">邮箱</div>
                                <div className="fr f12 color9 tr">
                                    <span>969132451@qq.com</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">地区</div>
                                <div className="fr f12 color9 tr">
                                    <span>那开始的</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">详细信息</div>
                                <div className="fr f12 color9 tr">
                                    <span>在那遥远的地方</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
