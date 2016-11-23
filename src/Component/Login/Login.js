/**
 * Created by asus on 2016/11/21.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';


const icon = [
    require('../../Images/login/phone.png'),
    require('../../Images/login/psd.png'),
    require('../../Images/login/qq.png'),
    require('../../Images/login/wx.png'),
    require('../../Images/login/weibo.png'),
]

export default class Login extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name:'aaa'
        };
      }

    render(){
        return(
            <div>
                {/*
                 <header>
                 <h4>登录</h4>
                 </header>
                */}


                {/*账号密码输入编辑框*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input maxLength="11" className="editorInput" placeholder="请输入手机号"/>
                </div>

                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input className="editorInput" placeholder="请输入密码"/>
                </div>

                <button className="toLogin">登 录</button>

                <div className="toRegister">
                    <Link to="/Login/ForgetPwd">
                        <span>忘记密码？</span>
                    </Link>

                    <Link to="/Login/Register">
                        <span>没有账号，注册</span>
                    </Link>
                </div>
            </div>
        )
    }
}
