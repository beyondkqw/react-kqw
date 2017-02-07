/**
 * Created by asus on 2016/11/21.
 */
import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {SMSCode,SellerToRegister} from '../../Action/auth'
import {ErrorNum,ErrorPs,GetQueryString,ChinaChar,EnglishChar,specialChar} from '../../Action/rpc'
import NavBar from '../../Component/CommonComponent/NavBar'

const icon = [
    require('../../Images/login/phone.png'),
    require('../../Images/login/psd.png'),
    require('../../Images/login/code.png'),
    require('../../Images/login/person.png'),
]

export default class SellerRegister extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            recommendId:'',
            codeWord : '',
            Reminder:'',
            disabled : false,
            sellerMobile : '',
            smsCode : '',
            code:'',
            sellerPwd:'',
            storeName:'',
            name:'',
            role:1
        };
    }
    static contextTypes = {
        router:PropTypes.object
    }
    componentWillMount() {

    }

    //获取短信验证码
    async getCode(){
        const {sellerMobile} = this.state
        clearInterval(this._timer)
        await SMSCode(sellerMobile,1)
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

    //校验用户名
    toJudge(value){
        if(value){
            if (!ChinaChar(value)&&!EnglishChar(value)) {
                this.setState({Reminder:"店铺名只允许出现中英文,请修改"});
                return false;
            }else if(!specialChar(value)){
                this.setState({Reminder:"店铺名不能出现标点符号"});
                return false
            }else{
                this.setState({Reminder:""});
            }
        }
    }

    //注册
    async toSubmit(){
        const {sellerMobile,sellerPwd,smsCode,code,storeName,role} = this.state
        //非空校验
        if(sellerMobile ==''||sellerPwd == ''){
            this.setState({Reminder:'手机号或密码不能为空'})
            return
        }
        if(code == ''){
            this.setState({Reminder:'验证码不能为空'})
            return
        }
        //验证手机是否正确
        if (!ErrorNum(sellerMobile)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
        }
        //密码
        if (!ErrorPs(sellerPwd)) {
            this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
        }

        //用户名
        if (!ChinaChar(storeName)&&!EnglishChar(storeName)) {
            this.setState({Reminder:"店铺名只允许出现中英文,请修改"});
            return false;
        }
        if(!specialChar(storeName)) {
            this.setState({Reminder: "店铺名不能出现标点符号"});
            return false
        }
        await SellerToRegister(sellerMobile,sellerPwd,smsCode,code,storeName,role)
            .then(res=>{
                this.context.router.goBack()
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
                console.warn('err',err)
            })
    }

    render(){
        return(
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'注册商铺'}
                />
                {/*店铺，名称*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[3]}/>
                    </span>
                    <input
                        ref = 'storeName'
                        maxLength="11"
                        className="editorInput"
                        placeholder="请输入店铺名称"
                        onChange={()=>{this.setState({storeName:this.refs.storeName.value})}}
                        onBlur = {()=>this.toJudge(this.state.storeName)}
                    />
                </div>

                {/*手机号*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input
                        ref = 'sellerMobile'
                        maxLength="11"
                        className="editorInput"
                        placeholder="请输入手机号"
                        onChange={()=>{this.setState({sellerMobile:this.refs.sellerMobile.value})}}
                        onBlur = {()=>this.isTrue(this.state.sellerMobile,'phoneNum')}
                    />
                </div>

                {/*设置密码*/}
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[1]}/>
                    </span>
                    <input
                        ref = 'sellerPwd'
                        className="editorInput"
                        placeholder="设置您的密码"
                        onChange = {()=>this.setState({sellerPwd:this.refs.sellerPwd.value})}
                        onBlur = {()=>this.isTrue(this.state.sellerPwd,'pwd')}
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
                        style={{minWidth:100}}
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
                    <Link to = '/sellerLogin' style={{fontSize:14,color:'#999'}}>已经有账号？登录</Link>
                </div>
            </div>
        )
    }
}