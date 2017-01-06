/**
 * Created by asus on 2016/11/21.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {ToLogin} from '../../Action/auth'
import {saveToken,ErrorNum,ErrorPs} from '../../Action/rpc'

const icon = [
    require('../../Images/login/phone.png'),
    require('../../Images/login/psd.png'),
    require('../../Images/login/qq.png'),
    require('../../Images/login/wx.png'),
    require('../../Images/login/weibo.png'),
]

export default class SellerLogin extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }

    render(){
        return(
            <div>
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input
                        maxLength="11"
                        className="editorInput"
                        placeholder="请输入手机号"
                        ref = 'phoneNum'
                    />
                </div>

                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input
                        className="editorInput"
                        placeholder="请输入密码"
                        type="password"
                        ref = 'pwd'
                    />
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    123
                </div>
                <Link to="/entryStoreInformation">
                    <button className="toLogin tc"
                    >登 录</button>
                </Link>

                <div className="toRegister" style={{marginTop:20}}>
                    <Link to="/sellerForgetPwd">
                        <span>忘记密码？</span>
                    </Link>
                    <Link to="/sellerRegister">
                        <span>我要开店！</span>
                    </Link>
                </div>
                <div className="line-through">
                    第三方登录
                </div>
                <div className="loginMore df flex-pack-justify" style={{marginTop:30}}>
                    <div style={{width:52,height:52}}><Link to="/entryStoreInformation"><img src={icon[4]} alt=""/></Link></div>
                    <div style={{width:52,height:52}}><img src={icon[3]} alt=""/></div>
                    <div style={{width:52,height:52}}><img src={icon[2]} alt=""/></div>
                </div>
            </div>
        )
    }
}
