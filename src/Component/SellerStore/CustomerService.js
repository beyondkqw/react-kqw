import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import {StoreContact} from '../../Action/auth'
import {ErrorNum,QQTest,wechatTest} from '../../Action/rpc'

export default class CustomerService extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Reminder:''
        };
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
        await this.getEnterDetail(qqNum,wechatNum,phoneNum)
    }

    //修改资料
    async getEnterDetail(qq,wechat,mobile){
        await StoreContact(qq,wechat,mobile)
            .then(res=>{
                console.log('修改成功')
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //判断电话号码
    isNumTrue(value,param){
        if(value){
            console.log('hahahaha=========>',param == 'qq')
            if(param == 'qq'){
                console.log("qq")
                if (!QQTest(value)) {
                    this.setState({Reminder:'QQ号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }
            if(param == 'wechat'){
                console.log("wechat")
                if (!wechatTest(value)) {
                    this.setState({Reminder:'微信号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }
            if(param == 'phone'){
                console.log("phone")
                if (!ErrorNum(value)) {
                    this.setState({Reminder:'手机号码有误,请重新填写'})
                }else{
                    this.setState({Reminder:''})
                }
            }

        }
    }
    render() {
        return (
            <div>
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
                            onBlur = {()=>this.isNumTrue(this.refs.qqNum.value,'qq')}
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
                            onBlur = {()=>this.isNumTrue(this.refs.wechatNum.value,'wechat')}
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
                        <input
                            className="borderno tr"
                            type="text"
                            placeholder="输入您的电话号码"
                            ref="phoneNum"
                            onBlur = {()=>this.isNumTrue(this.refs.phoneNum.value,'phone')}
                        />
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
