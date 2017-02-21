import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import {StoreContact,StoreDetailItem} from '../../Action/auth'
import {ErrorNum,QQTest,wechatTest} from '../../Action/rpc'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class CustomerService extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Reminder:'',
            qqNum:'',
            weChat:'',
            mobileNum:''
        };
      }

    async componentWillMount() {
        //获取默认的信息
      await StoreDetailItem(this.props.location.query.storeId)
        .then(res=>{
            this.setState({qqNum:res.store.qq})
            this.setState({weChat:res.store.wechat})
            this.setState({mobileNum:res.store.mobile})
        })
        .catch(err=>{
            console.warn('获取商品属性失败',err)
        })
    }


    async toEdit(){
        this.setState({Reminder:''})
        const qqNum = this.refs.qqNum.value;
        const wechatNum = this.refs.wechatNum.value;
        const phoneNum = this.refs.phoneNum.value;
        if(qqNum){
            if (!QQTest(qqNum)) {
                this.setState({Reminder:'QQ号码有误,请重新填写'})
                return
            }
        }
        if(phoneNum) {
            if (!ErrorNum(phoneNum)) {
                this.setState({Reminder: '手机号码有误,请重新填写'})
                return
            }
        }
        if(wechatNum){
            if (!wechatTest(wechatNum)) {
                this.setState({Reminder: '微信号码有误,请重新填写'})
                return
            }
        }
        if(!qqNum||!phoneNum||!wechatNum){
            alert('请填写资料')
            return
        }
        await this.getEnterDetail(qqNum,wechatNum,phoneNum)
    }

    //修改资料
    async getEnterDetail(qq,wechat,mobile){
        await StoreContact(qq,wechat,mobile)
            .then(res=>{
                alert('修改成功')
                window.history.go(-1)
                console.log('修改成功')
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //判断电话号码
    isNumTrue(value,param){
        if(value){
            if(param == 'qq'){
                if (!QQTest(value)) {
                    this.setState({Reminder:'QQ号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }
            if(param == 'wechat'){
                if (!wechatTest(value)) {
                    this.setState({Reminder:'微信号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }
            if(param == 'phone'){
                if (!ErrorNum(value)) {
                    this.setState({Reminder:'手机号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }

        }
    }
    render() {
        const {qqNum,weChat,mobileNum}  = this.state
        return (
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'客服设置'}
                />
                <SplitLine />
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        {/*<span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="qq"
                            />
                            <label htmlFor='qq'></label>
                        </span>*/}
                        <div style={{width:34,height:40,lineHeight:0}}>
                            <img src={require('../../Images/contactQQ.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input
                            className="borderno tr"
                            type="text"
                            placeholder="输入您的QQ号"
                            ref="qqNum"
                            value={qqNum}
                            onBlur = {()=>this.isNumTrue(this.refs.qqNum.value,'qq')}
                            onChange={()=>this.setState({qqNum:this.refs.qqNum.value})}
                        />
                    </div>
                </div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        {/* <span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="wx"
                            />
                            <label htmlFor='wx'></label>
                        </span>*/}
                        <div style={{width:34,height:34,lineHeight:0}}>
                            <img src={require('../../Images/wxNum.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input
                            type="text"
                            className="borderno tr"
                            placeholder="输入您的微信号"
                            ref="wechatNum"
                            value = {weChat}
                            onBlur = {()=>this.isNumTrue(this.refs.wechatNum.value,'wechat')}
                            onChange={()=>this.setState({weChat:this.refs.wechatNum.value})}
                        />
                    </div>
                </div>
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        {/*<span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="phonenum"
                            />
                            <label htmlFor='phonenum'></label>
                        </span>*/}
                        <div style={{width:34,height:30,lineHeight:0}}>
                            <img src={require('../../Images/phoneNum.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <a href={`tel:${mobileNum}`}>
                            <input
                                className="borderno tr color9"
                                type="text"
                                placeholder="输入您的电话号码"
                                ref="phoneNum"
                                value = {mobileNum}
                                onBlur = {()=>this.isNumTrue(this.refs.phoneNum.value,'phone')}
                                onChange={()=>this.setState({mobileNum:this.refs.phoneNum.value})}
                            />
                        </a>
                    </div>
                </div>
                {/* <SplitLine />
                <div
                    className="df width100 plr border_bottom flex-pack-justify flex-align-center"
                    style={{height:70}}
                >
                    <div className="df flex-align-center">
                        <span className="di pr mr5" style={{height:20,width:20}}>
                            <input
                                type="checkbox"
                                className="di isCheck"
                                id="address"
                            />
                            <label htmlFor='address'></label>
                        </span>
                        <div style={{width:34,height:30,lineHeight:0}}>
                            <img src={require('../../Images/address.png')} alt=""/>
                        </div>
                    </div>
                    <div className="font16 color9">
                        <input className="borderno tr" type="text" placeholder="输入您的地址"/>
                    </div>
                </div>*/}
                <div className="tc f12 color_red width_100 plr mtb loginHeight">
                    {this.state.Reminder}
                </div>
                <div>
                    <CommonBtn
                        title = {'确定'}
                        onClick={()=>this.toEdit()}
                    />
                </div>
            </div>
        );
    }
}
