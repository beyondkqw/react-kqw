import React, { Component } from 'react';
import TabBar from '../../Component/NewComponent/TabBar';
import SellerGoodDetails from '../../Component/SellerStore/SellerGoodDetails'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {GetSellerOrderList} from '../../Action/auth';
import NavBar from '../../Component/CommonComponent/NavBar'

export default class SellerOrderList extends Component {

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
       /* let indexValue = this.props.location.query.index
        console.log('indexValue========>',indexValue)
        this.setState({index:indexValue?indexValue:0})*/
    }

    //点击切换状态
    async onChange(index){
        this.setState({index:index})
        await this.setState({isShow:index})
        if(this.state.index == 0){
            this.getOrderList('0')
        }else if(this.state.index == 1){
            this.getOrderList('1')
        }else if(this.state.index == 2){
            this.getOrderList('2')
        }
        else if(this.state.index == 3){
            this.getOrderList('6')
        }else if(this.state.index == 4){
            this.getOrderList('4')
        }else{
            this.getOrderList('0')
        }
    }
    //订单列表
    async getOrderList(param){
        await GetSellerOrderList(param)
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
                <NavBar
                    renderBack = {true}
                    title = {'订单'}
                />
                <TabBar
                    index = {this.state.index}
                    onClick = {index=>this.onChange(index)}
                    contents={['待付款','待发货','已发货','退款中','已完成']}
                />
                <SplitLine />
                {/*待付款*/}
                { this.state.index == 0?
                    <div>
                        <SellerGoodDetails
                            debitPay = {()=>this.getOrderList('0')}
                            sellerOrderDetails = {orderItems}
                            toPay = {true}
                            isShowWhat = {true}
                        />
                    </div>
                    :null
                }
                {/*待发货*/}
                { this.state.index == 1?
                    <div>
                        <SellerGoodDetails
                            Receipt = {()=>this.getOrderList('2')}
                            sellerOrderDetails = {orderItems}
                            deliverGoods={true}
                            isShowWhat = {true}
                        />
                    </div>
                    :null
                }
                {/*已发货*/}
                { this.state.index == 2?
                    <div>
                        <SellerGoodDetails
                            Receipt = {()=>this.getOrderList('2')}
                            sellerOrderDetails = {orderItems}
                            //deliverGoods={true}
                            isShowWhat = {true}
                        />
                    </div>
                    :null
                }
                {/*退款中*/}
                { this.state.index == 3?
                    <div>
                        <SellerGoodDetails
                            sellerOrderDetails = {orderItems}
                            Refund = {true}
                            isShowWhat = {true}
                            //query = {}
                        />
                    </div>
                    :null
                }
                {/*已完成*/}
                { this.state.index == 4?
                    <div>
                        <SellerGoodDetails
                            sellerOrderDetails = {orderItems}
                            alreadyRated = {true}
                            isShowWhat = {true}
                        />
                    </div>
                    :null
                }
            </div>
        );
    }
}
