import React, { Component } from 'react';
import TabBar from '../../Component/NewComponent/TabBar';
import SplitLine from '../../Component/NewComponent/SplitLine'
import OrderDetails from '../../Component/Orders/OrderDetails'
import '../../Stylesheets/App/order.css';

export default class OrderList extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            index : 0,
            isShow:0
        };
      }

    onChange(index){
        this.setState({index:index})
        this.setState({isShow:index})
    }

    render() {
        return (
            <div className="containerNav">
                <TabBar
                     onClick = {index=>this.onChange(index)}
                     contents={['待付款','待收货','待评价','已评价','全部订单']}
                />
                <SplitLine />
                {/*代付款*/}
                { this.state.index == 0?
                <div>
                    <OrderDetails
                        toPay = {true}
                    />
                    <SplitLine />
                </div>
                :null
                }
                {/*待收货*/}
                { this.state.index == 1?
                    <div>
                        <OrderDetails
                            makeSure={true}
                        />
                        <SplitLine />
                    </div>
                    :null
                }
                {/*待评价*/}
                { this.state.index == 2?
                    <div>
                        <OrderDetails
                           toRated = {true}
                        />
                        <SplitLine />
                    </div>
                    :null
                }
                {/*已评价*/}
                { this.state.index == 3?
                    <div>
                        <OrderDetails
                            alreadyRated = {true}
                        />
                        <SplitLine />
                    </div>
                    :null
                }
                {/*全部订单*/}
                { this.state.index == 4?
                    <div>
                        <OrderDetails
                            allRated = {true}
                        />
                        <SplitLine />
                    </div>
                    :null
                }
            </div>
        );
    }
}
