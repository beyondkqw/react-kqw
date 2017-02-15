import React, { Component } from 'react';
import TabBar from '../../Component/NewComponent/TabBar';
import OrderDetails from '../../Component/Orders/OrderDetails'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {GetOrderList} from '../../Action/auth';

export default class OrderList extends Component {

    // 构造
     constructor(props) {
       super(props);
       // 初始状态
       this.state = {
           index : 0,
           isShow:0,
           orderItems:[]
       };
     }

    componentWillMount(){
        let indexValue = this.props.location.query.index
        this.setState({index:indexValue?indexValue:0})
    }

    async onChange(index){
         this.setState({index:index})
        await this.setState({isShow:index})
            if(this.state.index == 0){
                this.getOrderList('0','')
            }else if(this.state.index == 1){
                this.getOrderList('1','')
            }else if(this.state.index == 2){
                this.getOrderList('2','')
            }else if(this.state.index == 3){
                this.getOrderList('4',0)
            }else if(this.state.index == 4){
                this.getOrderList('','')
            }else{
                this.getOrderList('0','')
            }
    }
    //订单列表
    async getOrderList(status,isComment){
        await GetOrderList(status,isComment)
            .then(res=>{
                this.setState({orderItems:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {orderItems} = this.state
        return (
            <div className="containerNav">
                <TabBar
                     index = {this.state.index}
                     onClick = {index=>this.onChange(index)}
                     contents={['待付款','待发货','待收货','待评价','全部订单']}
                />
                <SplitLine />
                {/*代付款*/}
                { this.state.index == 0?
                    <div>
                        <OrderDetails
                            debitPay = {()=>this.getOrderList('0')}
                            orderDetails = {orderItems}
                            toPay = {true}
                        />
                    </div>
                :null
                }
                {/*待发货*/}
                { this.state.index == 1?
                    <div>
                        <OrderDetails
                            orderDetails = {orderItems}
                            alreadyRated = {true}
                        />
                    </div>
                    :null
                }
                {/*待收货*/}
                { this.state.index == 2?
                    <div>
                        <OrderDetails
                            Receipt = {()=>this.getOrderList('2')}
                            orderDetails = {orderItems}
                            makeSure={true}
                        />
                    </div>
                    :null
                }
                {/*待评价*/}
                { this.state.index == 3?
                    <div>
                        <OrderDetails
                           orderDetails = {orderItems}
                           toRated = {true}
                           //query = {}
                        />
                    </div>
                    :null
                }
                {/*全部订单*/}
                { this.state.index == 4?
                    <div>
                        <OrderDetails
                            againSend = {()=>this.getOrderList('5')}
                            orderDetails = {orderItems}
                            allRated = {true}
                        />
                    </div>
                    :null
                }
            </div>
        );
    }
}
