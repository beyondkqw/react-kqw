import React, { Component,PropTypes} from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/comfirmPayMoney.css';

const itemList = [{value:'送货时间不限'},{value:'只休息日/节假日送货(工作日不送)'},{value:'只工作日送货(节假日不送)'}]

export default class ReceivingTime extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chooseTime:'',
            index:''
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    chooseOrderTime(){
        if(this.state.chooseTime == ''){
            alert('请选择时间')
            return
        }

        //直接购买
        if(this.props.location.query.redirectPay){
            this.context.router.push({pathname:'/comfirmPayMoney',
                query:{
                    orderId:this.props.location.query.orderId,
                    isRedirectTime:true
                }}
            )
            sessionStorage.setItem('time',this.state.chooseTime)
        }

        //从订单过来的
        if(this.props.location.query.orderPayMoney){
            this.context.router.push({pathname:'/orders/orderFormDetails',
                query:{
                    orderId:this.props.location.query.orderId,
                    index:this.props.location.query.index,
                    isToPay:this.props.location.query.isToPay,
                    isOrderTime:true
                }}
            )
            sessionStorage.setItem('orderTime',this.state.chooseTime)
        }


    }
    render() {
        return (
            <div>
                {
                    itemList&&itemList.map((el,index)=>{
                        return(
                            <div
                                className="pr lh25 plr border_bottom"
                                onClick={()=>this.setState({chooseTime:el.value,index:index})}
                            >
                                <span className="di check_radius pr fl">
                                    <input
                                        type="radio"
                                        id="isCheck"
                                        name="chooseTime"
                                        className="di isConfirm"
                                        checked = {this.state.index === index?'checked':null}
                                    />
                                    <label htmlFor="isCheck"></label>
                                </span>
                                <span className="di font14 color6 ml5 fl">{el.value}</span>
                            </div>
                        )
                    })
                }
                {/*<div className="list-block m0">
                    <div className="pr lh25 plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input
                                type="radio"
                                id="isCheck"
                                name="chooseTime"
                                className="di isConfirm"
                                onClick={()=>this.setState({chooseTime:'送货时间不限'})}
                            />
                            <label htmlFor="isCheck"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">送货时间不限</span>
                    </div>
                    <div className="pr lh25 personStore plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input
                                type="radio"
                                id="isCheckOne"
                                name="chooseTime"
                                className="di isConfirm"
                                onClick={()=>this.setState({chooseTime:'只休息日/节假日送货(工作日不送)'})}
                            />
                            <label htmlFor="isCheckOne"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">只休息日/节假日送货(工作日不送)</span>
                    </div>
                    <div className="pr lh25 personStore plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input
                                type="radio"
                                id="isCheckTwo"
                                name="chooseTime"
                                className="di isConfirm"
                                onClick={()=>this.setState({chooseTime:'只工作日送货(节假日不送)'})}
                            />
                            <label htmlFor="isCheckTwo"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">只工作日送货(节假日不送)</span>
                    </div>
                </div>*/}
                <div style={{marginTop:30}}>
                    <CommonBtn
                        title={'确定'}
                        onClick={()=>this.chooseOrderTime()}
                    />
                </div>
            </div>
        );
    }
}
