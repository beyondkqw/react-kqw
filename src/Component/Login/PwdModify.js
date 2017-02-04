/**
 * Created by asus on 2016/11/22.
 */
import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/login.css';
import {ErrorPs} from '../../Action/rpc'
import {ResetPwd,ResetLoginPwd} from '../../Action/auth';

export default class PwdModify extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            codeWord : '',
            smsCode:'',
            Reminder:'',
            pwd:'',
            againPwd:'',
            code:''
        };
    }

    static contextTypes = {
        router:PropTypes.object
    }
    async getCode(){
        clearInterval(this._timer)
        const mobile = this.props.location.query.mobile
        this.getResetPwd(mobile)
        await this.setState({codeWord:60,disabled:true})
        this._timer = self.setInterval(()=>this.timer(),1000)
    }

    //获取验证码
    async getResetPwd(mobile){
        await ResetPwd(mobile,0)
            .then(res=>{
                this.setState({smsCode:res})
            })
            .catch(err=>{
                console.warn('获取验证码失败',err)
            })
    }
    //判断密码是否正确
    async isPsdTrue(value){
        this.setState({Reminder:''})
        if (!ErrorPs(value)) {
            this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
            return
        }
    }

    //提交
    async confirmBtn(){
        const {pwd,againPwd,smsCode,code} = this.state
        if(pwd !== againPwd){
            this.setState({Reminder:'两次密码不一致,请重新输入'})
            return
        }
        await ResetLoginPwd(pwd,smsCode,code)
            .then(res=>{
                alert('找回密码成功,请重新登录')
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('err',err)
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
                    <div className='editorBox_100' style={{justifyContent:'flex-start'}}>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 24}}>验证码</span>
                        <input
                            ref = 'code'
                            maxLength="6"
                            className="editorInput"
                            placeholder="填写验证码"
                        />
                        <input
                            style={{position:'absolute',right:10,top:10}}
                            id="code"
                            type="button"
                            disabled={this.state.disabled}
                            onClick={()=>this.getCode()}
                            value={this.state.codeWord?this.state.codeWord+'秒':'点击获取验证码'}
                        />
                    </div>

                    <div className='editorBox_100'>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 24}}>新密码</span>
                        <input
                            style={{flex:1}}
                            maxLength="11"
                            className="editorInput"
                            placeholder="填写新密码"
                            type = 'password'
                            ref="pwd"
                            onChange={()=>this.setState({pwd:this.refs.pwd.value})}
                            onBlur = {()=>this.isPsdTrue(this.refs.pwd.value)}
                        />
                    </div>
                    <div className='editorBox_100'>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 10}}>确认密码</span>
                        <input
                            style={{flex:1}}
                            maxLength="11"
                            className="editorInput"
                            placeholder="再次填写确认"
                            type = 'password'
                            ref="secPwd"
                            onChange={()=>this.setState({againPwd:this.refs.secPwd.value})}
                            onBlur = {()=>this.isPsdTrue(this.refs.secPwd.value)}
                        />
                    </div>

                    <div className="tc f12 color_red width_100 plr mtb loginHeight">
                        {this.state.Reminder}
                    </div>
                    <button className="toLogin" onClick={()=>this.confirmBtn()}>确 认</button>
                </div>
        )
    }
}