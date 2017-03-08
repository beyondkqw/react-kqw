import React, { Component,PropTypes } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';
import wx from 'weixin-js-sdk';
import {Process,InitWxJsSDk} from '../../Action/auth'
import RPC from '../../Action/rpc'
import Subscribe from '../../Component/NewComponent/Subscribe'

export default class SurePayment extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.payStatus;
        this.state = {
            Reminder:'',
            wxParam:'',
            isRepeat:false,
            showDelay:false
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        //获取支付信息
        this.payStatus = this.props.location.query.wayOfPay
        this.InitWx()
    }
    //初始化微信Jssdk
    async InitWx(){
        await InitWxJsSDk(encodeURIComponent(location.href.split('#')[0]))
            .then(res=>{
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: res.appId, // 必填，公众号的唯一标识
                    timestamp: res.timestamp, // 必填，生成签名的时间戳
                    nonceStr: res.nonceStr, // 必填，生成签名的随机串
                    signature: res.signature,// 必填，签名，见附录1
                    jsApiList: ["openLocation","getLocation","chooseWXPay","onMenuShareTimeline","onMenuShareAppMessage",
                        "chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                });
            })
            .catch(err=>{
                console.warn('getHomeMoudle',err)
            })
    }


    //确认支付
       async confirmPayMoney(){
           switch(this.payStatus) {
               //余额支付
               case 'balance' :this.getPayMoney(this.props.location.query.type,4);break;
               //微信支付
               case 'wxpay' :this.wxPay();break;
               //云卡通支付
               case 'cloudCartoon' :this.getPayMoney(this.props.location.query.type,3);break;
               default:return '';break;
           }
    }

    async getPayMoney(type,channel){
        //防重复提交
        this.setState({isRepeat:true})

        const playRecetiveTime = this.props.location.query.planReceiveTime
        await Process(type,channel,
            JSON.stringify({
                planReceiveTime:playRecetiveTime?playRecetiveTime:'送货时间不限',
                payType:channel,
                orderNos:this.props.location.query.orderNos
            })
        )
            .then(res=>{
                switch(this.payStatus) {
                    //余额支付
                    case 'balance' :this.context.router.push('/paymentSuccess');break;
                    //微信支付
                    case 'wxpay' :this.setState({wxParam:res});break;
                    //云卡通支付
                    case 'cloudCartoon' :this.context.router.push('/paymentSuccess');break;
                    default:return '';break;
                }
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }

    //支付成功的处理
    wXPaySuccess = (res)=>{
        if(res.errMsg == "chooseWXPay:ok") {
            //支付成功处理

            this.setState({isRepeat:false})
            this.context.router.push('/paymentSuccess')
        } else {
            //支付失败处理
            this.setState({isRepeat:false})
        }
    };

    //支付失败或取消
    wxPayCancel = ()=>{
        this.setState({isRepeat:false})
    }

    //微信支付
    async wxPay(){
        //出现延迟加载
        //this.setState({showDelay:true})

        await this.getPayMoney(this.props.location.query.type,1)
         wx.ready(async()=> {
            await wx.chooseWXPay({
                 timestamp: this.state.wxParam.timeStamp, // 支付签名时间戳，
                 nonceStr: this.state.wxParam.nonceStr, // 支付签名随机串，不长于 32 位
                 package: this.state.wxParam.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                 signType: this.state.wxParam.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                 paySign: this.state.wxParam.signature, // 支付签名
                 success: (res)=>{this.wXPaySuccess(res)},
                 cancel: ()=>{this.wxPayCancel()},
                 fail: ()=>{this.wxPayCancel()}
            });
        });
    }

    changeModal=()=>{
        //this.setState({showDelay:false})
    }

    render() {
        const {showDelay,isRepeat} = this.state
        const {money,orderNos} = this.props.location.query
        return (
            <div className="containerNav">
                <Subscribe target={RPC} eventName="modal" listener={this.changeModal} />
                <div className="plAll tc bkg_fadeff">
                    <p className="color9 font14">聚朵云-订单编号{orderNos}</p>
                    <p className="mt5 color6 f20"><span>￥</span><span>{money}</span></p>
                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight" style={{lineHeight:'36px'}}>
                    {this.state.Reminder}
                </div>
                <CommonBtn
                    title={'确认付款'}
                    toShowRepeat = {isRepeat}
                    onClick={()=>this.confirmPayMoney()}
                />
                {
                    //延迟加载
                    showDelay?
                        <div>
                            <div className="modalNav pa width_100 height_all font14">
                                <span className="di pa" style={{width:32,height:32,left:0,right:0,top:0,bottom:0,margin:'auto'}}>
                                    <img src={require('../../Images/common/delay.gif')} alt=""/>
                                </span>
                            </div>
                        </div>
                        :
                        null
                }

            </div>
        );
    }
}
