import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine'

export default class ContactMe extends Component {
    render() {
        const {mobile,qq,wechat} = this.props.location.query
        console.log(mobile+qq+wechat)
        return (
            <div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-end flex-align-center"
                    style={{height:70}}
                >
                    <div style={{width:34,height:40,lineHeight:0}}>
                        <img src={require('../../Images/contactQQ.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{qq?qq:''}</div>
                </div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-end flex-align-center"
                    style={{height:70}}
                >
                    <div style={{width:34,height:34,lineHeight:0}}>
                        <img src={require('../../Images/wxNum.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{wechat?wechat:''}</div>
                </div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-end flex-align-center"
                    style={{height:70}}
                >
                    <div style={{width:34,height:30,lineHeight:0}}>
                        <img src={require('../../Images/phoneNum.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{mobile?mobile:''}</div>
                </div>
                <SplitLine />
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-end flex-align-center"
                    style={{height:70}}
                >
                    <div style={{width:34,height:30,lineHeight:0}}>
                        <img src={require('../../Images/address.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{mobile?mobile:''}</div>
                </div>
            </div>
        );
    }
}
