import React, { Component,PropTypes} from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class ReceivingTime extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            chooseTime:''
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
        this.context.router.push({pathname:'/comfirmPayMoney',
            query:{time:this.state.chooseTime,orderId:this.props.location.query.orderId}})

    }
    render() {
        return (
            <div>
                <div className="list-block m0">
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
                                onClick={()=>this.setState({chooseTime:'只休息日/节假日送货(工作日不送'})}
                            />
                            <label htmlFor="isCheckOne"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">只休息日/节假日送货</span>
                    </div>
                    <div className="pr lh25 personStore plr border_bottom">
                        <span className="di check_radius pr fl">
                            <input
                                type="radio"
                                id="isCheckTwo"
                                name="chooseTime"
                                className="di isConfirm"
                                onClick={()=>this.setState({chooseTime:'只工作日送货(双休/节假日不送)'})}
                            />
                            <label htmlFor="isCheckTwo"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl">只工作日送货</span>
                    </div>
                </div>
                <CommonBtn
                    title={'确定'}
                    onClick={()=>this.chooseOrderTime()}
                />
            </div>
        );
    }
}
