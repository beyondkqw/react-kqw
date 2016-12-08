/**
 * Created by asus on 2016/11/21.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {SMSCode,ToRegister} from '../../Action/auth'
import {ErrorNum,ErrorPs} from '../../Action/rpc'

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
        this.state = {
            codeWord : '',
            Reminder:'',
            disabled : false,
            mobile : '',
            smsCode : '',
            code:'',
            pwd:'',
            name:''
        };
      }

    //获取短信验证码
    async getCode(){
        const {mobile} = this.state
        clearInterval(this._timer)
        await SMSCode(mobile)
        .then(res=>{
            console.log('获取手机验证码成功',res)
            this.setState({smsCode:res,codeWord:60,disabled:true})
            //倒计时
            this._timer = self.setInterval(()=>this.timer(),1000)
        })
        .catch(err=>{
            this.setState({Reminder:err.message})
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
    //判断登录名,密码是否正确
    isTrue(value,parameter){
        this.setState({Reminder:''})
        if(parameter === 'phoneNum'){
            if (!ErrorNum(value)) {
                this.setState({Reminder:'手机号码有误,请重新填写'})
                console.log('---------',this.state.Reminder);
            }
        }
        if(parameter === 'pwd'){
            if (!ErrorPs(value)) {
                this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
            }
        }
    }

    //注册
    async toSubmit(){
        const {mobile,pwd,smsCode,code,memberName='1'} = this.state
        console.log('aaa',mobile,pwd,smsCode,code,memberName)
        if(memberName ==''||pwd == ''){
            this.setState({Reminder:'登录名或密码不能为空'})
            return
        }
        await ToRegister(mobile,pwd,smsCode,code,memberName)
        .then(res=>{
            console.log('注册成功',res)
        })
        .catch(err=>{
            this.setState({Reminder:err.message})
            console.warn('err',err)
        })
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
                        onBlur = {()=>this.isTrue(this.state.mobile,'phoneNum')}
                    />
                </div>

                {/*设置密码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input
                        ref = 'pwd'
                        className="editorInput"
                        placeholder="设置您的密码"
                        onChange = {()=>this.setState({pwd:this.refs.pwd.value})}
                        onBlur = {()=>this.isTrue(this.state.pwd,'pwd')}
                    />
                </div>

                {/*手机验证码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[2]}/>
                    </span>
                    <input
                        ref = 'code'
                        maxLength="6"
                        className="editorInput"
                        placeholder="填写手机的验证码"
                        onChange = {()=>this.setState({code:this.refs.code.value})}
                    />
                    <input
                        id="code"
                        type="button"
                        disabled={this.state.disabled}
                        onClick={()=>this.getCode()}
                        value={this.state.codeWord?this.state.codeWord+'秒':'点击获取验证码'}
                    />
                </div>

                <div className="agreement">
                    点击注册，代表您同意遵守聚朵云的<Link><span style={{color:'#ff5500'}}>《用户协议》</span></Link>
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <button
                    className="toLogin"
                    onClick = {()=>this.toSubmit()}
                >注 册</button>

                <div className="backToLogin">
                    <Link to = '/Login/Login' style={{fontSize:14,color:'#999'}}>已经有账号？登录</Link>
                </div>
            </div>
        )
    }
}