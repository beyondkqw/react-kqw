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

export default class Login extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name:'aaa',
            Reminder:'',
            accName:'',
            pwd:''
        };
      }
    //判断登录名,密码是否正确
     isTrue(value,parameter){
        this.setState({Reminder:''})
         if(parameter === 'phoneNum'){
             if (!ErrorNum(value)) {
                 this.setState({Reminder:'手机号码有误,请重新填写'})
             }
         }
         if(parameter === 'psword'){
             if (!ErrorPs(value)) {
                 this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
             }
         }

    }
    //登录
    async toSubmit(){
        const {accName,pwd} = this.state
        console.log('aaa',accName,pwd)
        if(accName ==''||pwd == ''){
            this.setState({Reminder:'登录名或密码不能为空'})
            return
        }
        await ToLogin(accName,pwd)
            .then(res=>{
                saveToken(res)
                console.log('登录成功',res)
                window.location.href = '/home'
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
                console.warn('err',err)
            })
    }

    render(){
        return(
            <div className="wrap">
                {/*
                 <header>
                 <h4>登录</h4>
                 </header>
                */}

                {/*账号密码输入编辑框*/}
                <div className='editorBox form-group'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input
                        maxLength="11"
                        className="editorInput"
                        placeholder="请输入手机号"
                        ref = 'phoneNum'
                        onChange={()=>this.setState({accName:this.refs.phoneNum.value})}
                        onBlur = {()=>this.isTrue(this.state.accName,'phoneNum')}
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
                        onChange={()=>this.setState({pwd:this.refs.pwd.value})}
                        onBlur = {()=>this.isTrue(this.state.pwd,'psword')}
                    />
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <button className="toLogin tc"
                        onClick = {()=>this.toSubmit()}
                >登 录</button>

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
