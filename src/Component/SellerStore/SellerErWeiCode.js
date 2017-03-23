import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import QRCode from 'qrcode.react';
import {Process,MyInfo} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class SellerErWeiCode extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            infoDetails:''
        };
      }
    componentWillMount() {
        this.getMyInfo()
        this.getPayMoney(0,5)
    }
    async getPayMoney(type,channel){
        const playRecetiveTime = this.props.location.query.planReceiveTime
        await Process(type,channel,
            JSON.stringify({
                planReceiveTime:playRecetiveTime?playRecetiveTime:'送货时间不限',
                payType:channel,
                orderNos:this.props.location.query.orderNos
            })
        )
            .then(res=>{
                this.setState({qzCode:res.QR_CODE_URL})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({infoDetails:res})
            })
    }
    render() {
        const {infoDetails,qzCode} = this.state
        return (
            <div className="containerNav allIncome_Img supplement" style={{height:'100%'}}>
                <NavBar
                    renderBack = {true}
                    title = {'支付二维码'}
                />
                <div className="pa_top1 tc">
                    <span className="di incomeImg">
                        <img className="border_ra50" src={infoDetails.IMAGE_URI?infoDetails.IMAGE_URI:require('../../Images/common/default.png')} alt=""/>
                    </span>
                    <div className="f12 color6 mt5">{infoDetails.MEMBER_NAME}</div>
                </div>
                <div className="width100 tc mt25">
                    <span className="di erWeiCode">
                        <QRCode
                            value={qzCode}
                            size={128}
                            fgColor={'#000000'}
                            bgColor={'#ffffff'}
                        />
                    </span>
                </div>
            </div>
        );
    }
}
