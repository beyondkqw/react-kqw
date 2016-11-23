/**
 * Created by asus on 2016/11/21.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';

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
            codeWord : '',
            disabled : false,
            isShowNewPwd:true,
            isShowSecPwd:true,
            typeN : false,
            typeS : false
        };
    }

    async getCode(){
        clearInterval(this._timer)
        await this.setState({codeWord:60,disabled:true})
        this._timer = self.setInterval(()=>this.timer(),1000)
        console.log('timer',this.state.codeWord)
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
                    <input maxLength="11" className="editorInput" placeholder="请输入手机号"/>
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

                <button style={{marginTop:30}} onClick={()=>this.setState({step:2})} className="toLogin">下一步</button>
            </div>
            :
            <div>
                {/*设置密码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input
                        className="editorInput"
                        placeholder="新密码"
                        ref = "newPwd"
                        type = {this.state.typeN?'password':'text'}
                        onChange={()=>this.onChange(this.refs.newPwd.value)}
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
                        className="editorInput"
                        placeholder="确认密码"
                        ref = "secPwd"
                        type = {this.state.typeS?'password':'text'}
                        onChange={()=>this.onChange(this.refs.secPwd.value)}
                    />
                    <span
                        onClick = {()=>this.changeShowPwd(2)}
                        style={{height:20,width:20}}
                    >
                        <img src = {this.state.isShowSecPwd?icon[3]:icon[4]}/>
                    </span>
                </div>

                <button style={{marginTop:30}} onClick={()=>this.setState({step:2})} className="toLogin">确 定</button>
            </div>
        )
    }
}
