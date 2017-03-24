/**
 * Created by asus on 2016/11/21.
 */
import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';
import {SellerToLogin,MyInfo} from '../../Action/auth'
import {saveSellerToken,ErrorNum,ErrorPs,loadSellerToken,getSellerToken,clearSellerToken} from '../../Action/rpc'
import NavBar from '../../Component/CommonComponent/NavBar'

const icon = [
    require('../../Images/login/phone.png'),
    require('../../Images/login/psd.png'),
    require('../../Images/login/qq.png'),
    require('../../Images/login/wx.png'),
    require('../../Images/login/weibo.png'),
]

export default class SellerLogin extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Reminder:'',
            accName:'',
            pwd:''
        };
    }

    static contextTypes = {
        router:PropTypes.object
    }

  async componentWillMount() {
       let token = await loadSellerToken()
      if(sessionStorage.getItem('loginName') != '' && sessionStorage.getItem('loginPsd') != ''){
          this.setState({accName:sessionStorage.getItem('loginName')})
          this.setState({pwd:sessionStorage.getItem('loginPsd')})
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
            if(parameter === 'psword'){
                if (!ErrorPs(value)) {
                    this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
                }
            }
        }
    }

    //登录
    async sellerToLogin(){
        const {accName,pwd} = this.state
        if(accName ==''||pwd == ''){
            this.setState({Reminder:'登录名或密码不能为空'})
            return
        }
        //判断用户名和密码是否正确
        if (!ErrorNum(accName)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
            return
        }
        if (!ErrorPs(pwd)) {
            this.setState({Reminder:'密码格式错误，请输入6～16位字符，至少包含数字、大写字母、小写字母、符号中的两种!'})
            return
        }

        await SellerToLogin(accName,pwd)
            .then(async res=>{
                //卖家登录
                sessionStorage.setItem('role','seller')
                await saveSellerToken(res)
                this.getMyInfo(accName)
                //存储信息
                sessionStorage.setItem('loginName',accName)
                sessionStorage.setItem('loginPsd',pwd)
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }

    async getMyInfo(accName){
        await MyInfo()
            .then(res=>{
                if(res.STORE_ID == ''|| res.STORE_ID == null){
                    console.log('denl====',accName)
                    this.context.router.push({pathname:'/entryStoreInformation',query:{registerMobile:accName}})
                }else{
                    if(res.STORE_STATUS = false){
                        this.setState({Reminder:'店铺正在审核中'})
                        return
                    }else{
                        window.location.href = '/sellerStoreCenter'
                    }
                }
            })
    }

    render(){
        return(
            <div>
                <NavBar
                    title = {'登录'}
                />
                <div className='editorBox'>
                    <span className="editorImg">
                        <img src={icon[0]}/>
                    </span>
                    <input
                        value={this.state.accName}
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
                        value={this.state.pwd}
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

                <button
                    className="toLogin tc"
                    onClick={()=>this.sellerToLogin()}
                >登 录</button>

                <div className="toRegister" style={{marginTop:20}}>
                    <Link to="/sellerForgetPwd">
                        <span>忘记密码？</span>
                    </Link>
                    <Link to="/sellerRegister">
                        <span>我要开店！</span>
                    </Link>
                </div>
                {/*<div className="line-through">
                    第三方登录
                </div>
                <div className="loginMore df flex-pack-justify" style={{marginTop:30}}>
                    <div style={{width:52,height:52}}><Link to="/entryStoreInformation"><img src={icon[4]} alt=""/></Link></div>
                    <div style={{width:52,height:52}}><img src={icon[3]} alt=""/></div>
                    <div style={{width:52,height:52}}><img src={icon[2]} alt=""/></div>
                </div>*/}
            </div>
        )
    }
}
