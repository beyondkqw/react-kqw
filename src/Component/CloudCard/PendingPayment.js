import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/cloudCard.css';
import {GetOrderList} from '../../Action/auth';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'

export default class PendingPayment extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            pendPayList:[]
        };
      }

    componentWillMount() {
        this.getOrderList()
    }
    //订单列表
    async getOrderList(){
        await GetOrderList(0,1)
            .then(res=>{
                this.setState({pendPayList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {pendPayList} = this.state
        return (
            <div>
                <Link to="/pendPaymentDetails">
                    {
                        pendPayList ==''?
                           <IsShowEmptyImg
                               styleSheet={{width:69,height:72,marginTop:120}}
                               title={'列表是空的哦~'}
                           />
                            :
                        pendPayList&&pendPayList.map(el=>{
                            return(
                                el.orderDetails.map(item=>{
                                    return(
                                        <div style={{height:50}} className="df flex-pack-justify flex-align-center border_bottom plr">
                                            <div>
                                                <div className="font14 color6">{item.productName}</div>
                                                <div className="f12 color9">{item.price}</div>
                                            </div>
                                            <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                                <img src={require('../../Images/rightArrow.png')} alt=""/>
                                            </span>
                                        </div>
                                    )
                                })
                            )
                        })
                    }

                </Link>

            </div>
        );
    }
}
