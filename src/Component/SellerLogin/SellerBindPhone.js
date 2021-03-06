/**
 * Created by asus on 2016/11/22.
 */
import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {ToBindPhone,BindSms} from '../../Action/auth'
import {ErrorNum,ErrorPs} from '../../Action/rpc'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class BindPhone extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            step : 1,
            codeWord : '',
            disabled : false,
            smsCode : '',
            Reminder : ''
        };
      }

    componentWillMount() {
        console.log('sss',this.context.router)
    }

    static contextTypes = {
        router:PropTypes.object
    }

    async getCode(){
        clearInterval(this._timer)
        if (!ErrorNum(this.refs.mobile.value)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
            return
        }
        await BindSms(this.refs.mobile.value)
        .then(res=>{
            console.log('获取验证码成功',res)
            this.setState({smsCode:res,codeWord:60,disabled:true})
            //倒计时
            this._timer = self.setInterval(()=>this.timer(),1000)
        })
        .catch(err=>{
            this.setState({Reminder:err.message})
        })
    }

    isTrue(value,parameter){
        this.setState({Reminder:''})
        if(value){
            if(parameter === 'phoneNum'){
                if (!ErrorNum(value)) {
                    this.setState({Reminder:'手机号码有误,请重新填写'})
                }
            }
            if(parameter === 'pwd'){
                if (!ErrorPs(value)) {
                    this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
                }
            }
        }
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

    async toBindPhoneNum(){
        if(this.refs.pwd.value==''){
            this.setState({Reminder:'密码不能为空'})
            return
        }
        if(this.refs.mobile.value==''){
            this.setState({Reminder:'手机号不能为空'})
            return
        }
        if(this.refs.code.value==''){
            this.setState({Reminder:'验证码不能为空'})
            return
        }
        if (!ErrorNum(this.refs.mobile.value)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
            return
        }
        if (!ErrorPs(this.refs.pwd.value)) {
            this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
            return
        }

        await ToBindPhone(this.refs.mobile.value,this.refs.pwd.value,this.state.smsCode,this.refs.code.value)
        .then(res=>{
            console.log('ToBindPhone',res)
            clearInterval(this._timer)
            this.context.router.goBack()
        })
        .catch(err=>{
            this.setState({Reminder:err.message})
        })
    }


    render(){
        return(
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'设置手机号'}
                />
                <div>
                    <div className='editorBox_100'>
                        <input
                            ref = 'pwd'
                            style={{flex:1}}
                            maxLength="11"
                            className="editorInput"
                            placeholder="请输入密码"
                            type="password"
                            onBlur = {()=>this.isTrue(this.refs.pwd.value,'pwd')}
                        />
                    </div>
                    <div className='editorBox_100'>
                        <input
                            ref = 'mobile'
                            maxLength="11"
                            className="editorInput"
                            placeholder="请输入手机号"
                            onBlur = {()=>this.isTrue(this.refs.mobile.value,'phoneNum')}
                        />
                    </div>

                    <div className='editorBox_100'>

                        <input
                            ref = 'code'
                            maxLength="6"
                            className="editorInput"
                            placeholder="请填写手机的验证码"
                        />
                        <input
                            id="bindCode"
                            type="button"
                            disabled={this.state.disabled}
                            onClick={()=>this.getCode()}
                            value={this.state.codeWord?this.state.codeWord+'秒':'点击获取验证码'}
                        />
                    </div>

                    <div className="tc f12 color_red width_100 plr mtb loginHeight">
                        {this.state.Reminder}
                    </div>

                    <button
                        onClick = {()=>this.toBindPhoneNum()}
                        className="toLogin"
                    >
                        确 定
                    </button>
                </div>
            </div>
        )
    }
}