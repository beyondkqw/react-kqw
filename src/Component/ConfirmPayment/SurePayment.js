import React, { Component } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';
import {Process} from '../../Action/auth'

export default class SurePayment extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
      }

    //确认支付
       async confirmPayMoney(){
        console.log('planReceiveTime==========>',this.props.location.query.planReceiveTime)
        console.log('orderNosArray==========>',this.props.location.query.orderNos.split(','))
        await Process(0,4,
            JSON.stringify({
                planReceiveTime:this.props.location.query.planReceiveTime,
                payType:4,
                orderNos:this.props.location.query.orderNos
            })
        )
            .then(res=>{

            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        return (
            <div className="containerNav">
                <div className="plAll tc bkg_fadeff">
                    <p className="color9 font14">聚朵云-订单编号4453546458</p>
                    <p className="mt5 color6 f20"><span>￥</span><span>258</span></p>
                </div>
                <CommonBtn
                    title={'确认付款'}
                    onClick={()=>this.confirmPayMoney()}
                />
            </div>
        );
    }
}
