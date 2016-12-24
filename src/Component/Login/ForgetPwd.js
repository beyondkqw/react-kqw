/**
 * Created by asus on 2016/11/21.
 */
import React, { Component,PropTypes} from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {ErrorNum,ErrorPs} from '../../Action/rpc'
import {ForgetCode,UpdateLoginPwd} from '../../Action/auth';

const icon = [
    require('../../Images/login/phone.png'),
    require('../../Images/login/psd.png'),
    require('../../Images/login/code.png'),
    require('../../Images/login/show.png'),
    require('../../Images/login/hide.png'),
]


export default class ForgetPwd extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this._timer
        this.state = {
            step : 1,
            mobile:'',
            newPwd:'',
            secPwd:'',
            Reminder:'',
            code:'',
            codeWord : '',
            smsCode:'',
            disabled : false,
            isShowNewPwd:true,
            isShowSecPwd:true,
            typeN : false,
            typeS : false,
            isTrue : false,
            isPwdTrue:false
        };
    }

    static contextTypes = {
        router:PropTypes.object
    }
    //判断手机号是否正确
   async isNumTrue(value){
        this.setState({Reminder:''})
        if (!ErrorNum(value)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
        }else{
           await this.setState({isTrue:true})
        }

    }

    //判断密码是否正确
    async isPsdTrue(value){
        this.setState({Reminder:''})
        if (!ErrorPs(value)) {
            this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
        }else{
            await this.setState({isPwdTrue:true})
        }

    }

    async getCode(){
        clearInterval(this._timer)
        let mobile = this.state.mobile
        if(this.state.isTrue){
            this.getForgetCode(mobile)
        }else{
            return
        }
        await this.setState({codeWord:60,disabled:true})
        this._timer = self.setInterval(()=>this.timer(),1000)
    }
    //获取验证码
    async getForgetCode(param){
        await ForgetCode(param)
            .then(res=>{
                this.setState({smsCode:res})
            })
            .catch(err=>{
                console.warn('获取验证码失败',err)
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

   async changeShowPwd(index){
        if(index==1){
            await this.setState({isShowNewPwd:!this.state.isShowNewPwd,typeN:!this.state.typeN})
        }else if(index==2){
            await this.setState({isShowSecPwd:!this.state.isShowSecPwd,typeS:!this.state.typeS})
        }

    }

    async confirmSubmit(){
        const {mobile,newPwd,secPwd,smsCode,code} = this.state
        if(newPwd !== secPwd){
            this.setState({Reminder:'两次密码不一致,请重新输入'})
            return
        }
        await UpdateLoginPwd(mobile,newPwd,smsCode,code)
            .then(res=>{
                alert('找回密码成功,请重新登录')
                this.context.router.push('/Login/Login')
                console.log('找回密码成功',res)
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }



    onChange(a){
        console.log('a',a)
    }

    render(){
        return(
        this.state.step==1?
            <div>
                {/*手机号*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input
                        key = '1'
                        maxLength="11"
                        className="editorInput"
                        placeholder="请输入手机号"
                        ref = "forgetNum"
                        onChange={()=>this.setState({mobile:this.refs.forgetNum.value})}
                        onBlur = {()=>this.isNumTrue(this.refs.forgetNum.value)}
                    />
                </div>

                {/*手机验证码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[2]}/>
                    </span>
                    <input
                        key = '2'
                        maxLength="6"
                        className="editorInput"
                        ref="code"
                        placeholder="填写手机的验证码"
                        onChange = {()=>this.setState({code:this.refs.code.value})}
                    />
                    <input
                        id="code"
                        type="button"
                        disabled={this.state.disabled}
                        onClick={()=>this.getCode()}
                        value={this.state.codeWord?this.state.codeWord+'秒':'点击获取验证码'}/>
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <button onClick={()=>{this.setState({step:2})}} className="toLogin">下一步</button>
            </div>
            :
            <div>
                {/*设置密码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input
                        key = '3'
                        className="editorInput"
                        placeholder="新密码"
                        ref = "newPwd"
                        type = {this.state.typeN?'password':'text'}
                        value = {this.state.newPwd}
                        onChange={()=>this.setState({newPwd:this.refs.newPwd.value})}
                        onBlur = {()=>this.isPsdTrue(this.refs.newPwd.value)}
                    />
                    <span
                        onClick = {()=>this.changeShowPwd(1)}
                        style={{height:20,width:20}}
                    >
                        <img src = {this.state.isShowNewPwd?icon[3]:icon[4]}/>
                    </span>
                </div>

                {/*设置密码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input
                        key = '4'
                        className="editorInput"
                        placeholder="确认密码"
                        ref = "secPwd"
                        value = {this.state.secPwd}
                        type = {this.state.typeS?'password':'text'}
                        onChange={()=>this.setState({secPwd:this.refs.secPwd.value})}
                        onBlur = {()=>this.isPsdTrue(this.refs.secPwd.value)}
                    />
                    <span
                        onClick = {()=>this.changeShowPwd(2)}
                        style={{height:20,width:20}}
                    >
                        <img src = {this.state.isShowSecPwd?icon[3]:icon[4]}/>
                    </span>
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <button
                        className="toLogin"
                        onClick={()=>this.confirmSubmit()}
                >确 定</button>
            </div>
        )
    }
}
