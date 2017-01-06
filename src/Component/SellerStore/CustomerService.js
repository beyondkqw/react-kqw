import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine'

export default class CustomerService extends Component {
    render() {
        const {mobile,qq,wechat} = this.props.location.query
        console.log(mobile+qq+wechat)
        return (
            <div>
                <SplitLine />
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        <span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="qq"
                            />
                            <label htmlFor='qq'></label>
                        </span>
                        <div style={{width:34,height:40,lineHeight:0}}>
                            <img src={require('../../Images/contactQQ.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input className="borderno tr" type="text" placeholder="输入您的QQ号"/>
                    </div>
                </div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        <span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="wx"
                            />
                            <label htmlFor='wx'></label>
                        </span>
                        <div style={{width:34,height:34,lineHeight:0}}>
                            <img src={require('../../Images/wxNum.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input type="text" className="borderno tr" placeholder="输入您的微信号"/>
                    </div>
                </div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        <span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="phonenum"
                            />
                            <label htmlFor='phonenum'></label>
                        </span>
                        <div style={{width:34,height:30,lineHeight:0}}>
                            <img src={require('../../Images/phoneNum.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input className="borderno tr" type="text" placeholder="输入您的电话号码"/>
                    </div>
                </div>
                <SplitLine />
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        <span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="address"
                            />
                            <label htmlFor='address'></label>
                        </span>
                        <div style={{width:34,height:30,lineHeight:0}}>
                            <img src={require('../../Images/address.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input className="borderno tr" type="text" placeholder="输入您的地址"/>
                    </div>
                </div>
            </div>
        );
    }
}
