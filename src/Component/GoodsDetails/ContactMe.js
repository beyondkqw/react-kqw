import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';

export default class ContactMe extends Component {
    render() {
        const {mobile,qq,wechat} = this.props.location.query
        console.log(mobile+qq+wechat)
        return (
            <div>
                <div
                    className="df width100 plr border_bottom"
                    style={{justifyContent:'space-between',height:80,lineHeight:80,alignItems:'center'}}
                >
                    <div style={{width:34,height:40,lineHeight:0}}>
                        <img src={require('../../Images/contactQQ.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{qq?qq:''}</div>
                </div>
                <div
                    className="df width100 plr border_bottom"
                    style={{justifyContent:'space-between',height:80,lineHeight:80,alignItems:'center'}}
                >
                    <div style={{width:34,height:34,lineHeight:0}}>
                        <img src={require('../../Images/wxNum.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{wechat?wechat:''}</div>
                </div>
                <div
                    className="df width100 plr border_bottom"
                    style={{justifyContent:'space-between',height:80,lineHeight:80,alignItems:'center'}}
                >
                    <div style={{width:34,height:30,lineHeight:0}}>
                        <img src={require('../../Images/phoneNum.png')} alt=""/>
                    </div>
                    <div className="font16 color9">{mobile?mobile:''}</div>
                </div>
            </div>
        );
    }
}
