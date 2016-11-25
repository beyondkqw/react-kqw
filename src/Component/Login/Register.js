/**
 * Created by asus on 2016/11/21.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {SMSCode,Register} from '../../Action/auth'

const icon = [
    require('../../Images/login/phone.png'),
    require('../../Images/login/psd.png'),
    require('../../Images/login/code.png'),
]

export default class Register extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this._timer
        this.state = {
            codeWord : '',
            disabled : false,
            mobile : '',
            smsCode : ''
        };
      }

    //获取短信验证码
    async getCode(){
        const {mobile} = this.state
        console.log('mobile',mobile)
        clearInterval(this._timer)
        await this.setState({codeWord:60,disabled:true})
        this._timer = self.setInterval(()=>this.timer(),1000)
        console.log('timer',this.state.codeWord)
        await SMSCode(mobile)
        .then(res=>{
            console.log('获取手机验证码成功',res)
            this.setState({smsCode:res})
        })
        .catch(err=>{
            console.log('err',err)
        })

    }

    //获取短信验证码倒计时
    timer(){
        if(this.state.codeWord>0){
            this.setState({codeWord:this.state.codeWord-1})
        }else{
            this.setState({codeWord:'',disabled:false})
            clearInterval(this._timer)
        }
    }

    render(){
        return(
            <div>
                {/*手机号*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input
                        ref = 'mobile'
                        maxLength="11"
                        className="editorInput"
                        placeholder="请输入手机号"
                        onChange={()=>{this.setState({mobile:this.refs.mobile.value})}}
                    />
                </div>

                {/*设置密码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input className="editorInput" placeholder="设置您的密码"/>
                </div>

                {/*手机验证码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[2]}/>
                    </span>
                    <input maxLength="6" className="editorInput" placeholder="填写手机的验证码"/>
                    <input
                        id="code"
                        type="button"
                        disabled={this.state.disabled}
                        onClick={()=>this.getCode()}
                        value={this.state.codeWord?this.state.codeWord+'秒':'点击获取验证码'}/>
                </div>

                <div className="agreement">
                    点击注册，代表您同意遵守聚朵云的<Link><span style={{color:'#ff5500'}}>《用户协议》</span></Link>
                </div>

                <button style={{marginTop:45}} className="toLogin">注 册</button>

                <div className="backToLogin">
                    <Link to = '/Login/Login' style={{fontSize:14,color:'#999'}}>已经有账号？登录</Link>
                </div>
            </div>
        )
    }
}