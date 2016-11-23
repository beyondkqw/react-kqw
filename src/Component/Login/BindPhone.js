/**
 * Created by asus on 2016/11/22.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';

export default class BindPhone extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            step : 1,
            codeWord : '',
            disabled : false,
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

    render(){
        return(
            this.state.step==1?
                <div>
                    <div className='editorBox_100'>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 10}}>密码</span>
                        <input style={{flex:1}} maxLength="11" className="editorInput" placeholder="请输入手机号"/>
                    </div>

                    <button style={{marginTop:30}} onClick={()=>this.setState({step:2})} className="toLogin">下一步</button>
                </div>
                :
                <div>
                    <div className='editorBox_100'>
                        <input maxLength="11" className="editorInput" placeholder="请输入手机号"/>
                    </div>

                    <div className='editorBox_100'>

                        <input maxLength="6" className="editorInput" placeholder="请填写手机的验证码"/>
                        <input
                            id="bindCode"
                            type="button"
                            disabled={this.state.disabled}
                            onClick={()=>this.getCode()}
                            value={this.state.codeWord?this.state.codeWord+'秒':'点击获取验证码'}/>
                    </div>

                    <button style={{marginTop:30}}  className="toLogin">确 定</button>
                </div>
        )
    }
}