import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/common.css';
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList,SetAddress} from '../../Action/auth'
//import RPC from '../../Action/rpc'
//import Subscribe from '../../Component/NewComponent/Subscribe'

export default class ChooseInfomation extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            addressList : [],
            render:''
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getAddressList()
    }

    async getAddressList(){
       await AddressList()
        .then(res=>{
            const {resultList} = res
            this.setState({addressList:resultList})
        })
        .catch(err=>{
            console.warn('获取地址列表错误',err)
        })
    }

    async choosePath(value){
        //直接购买
        if(this.props.location.query.path){
            //RPC.emit('choosePath',value,this.props.location.query.orderNo)
            await this.SetAddressOrder(this.props.location.query.orderArrays,value.id)
            sessionStorage.setItem('getAddress',value.address)
            sessionStorage.setItem('getDetail',value.detail)
            sessionStorage.setItem('getName',value.name)
            sessionStorage.setItem('getMobile',value.mobile)
            this.context.router.push({pathname:'/comfirmPayMoney',
                query:{
                    orderId:this.props.location.query.orderNo,
                    isRedirectCh:true
                }});

        }
        //订单进来的
        if(this.props.location.query.orderPath){
            await this.SetAddressOrder(this.props.location.query.orderId,value.id)

            sessionStorage.setItem('getOrderAddress',value.address)
            sessionStorage.setItem('getOrderDetail',value.detail)
            sessionStorage.setItem('getOrderName',value.name)
            sessionStorage.setItem('getOrderMobile',value.mobile)
            this.context.router.push({pathname:'/orders/orderFormDetails',
                query:{
                    orderId:this.props.location.query.orderId,
                    index:this.props.location.query.index,
                    isToPay:this.props.location.query.isToPay,
                    isOrder:true
                }});

        }

    }

    async SetAddressOrder(orderNos,addressId){
        await SetAddress(orderNos,addressId)
            .then(res=>{
                const {resultList} = res
                this.setState({addressList:resultList})
            })
            .catch(err=>{
                console.warn('获取地址列表错误',err)
            })
    }


    render() {
        const {addressList} = this.state
        return (
            <div className="containerNav" style={{height:'100%'}}>
                {
                    addressList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'地址列表是空的哦~'}
                        />
                        :
                        addressList&&addressList.map((el,index)=>{
                        console.log(el.detail?el.detail:'')
                        return (
                            <InformationComponent
                                name={el.name}
                                phone={el.mobile}
                                path={(el.address?el.address:'')+(el.detail?el.detail:'')}
                                onClick = {()=>this.choosePath(el)}
                            />
                        )
                    })
                }
                <div className="df pf width_100" style={{bottom:40}}>
                    <Link to="/deliveredInformation" className="flex1">
                        <CommonBtn
                            title={'添加地址'}
                        />
                    </Link>
                    {
                        addressList == ''?
                            null:
                            <Link
                                to="/manageInformation"
                                query={{
                                    choosePath:this.props.location.query.path,
                                    path:this.props.location.query.path,
                                    orderPath:this.props.location.query.orderPath,
                                    orderId:this.props.location.query.orderNo,
                                    index:this.props.location.query.index,
                                    isToPay:this.props.location.query.isToPay,
                                    orderArrays:this.props.location.query.orderArrays
                                }}
                                className="flex1">
                                <CommonBtn
                                    title={'管理'}
                                />
                            </Link>
                    }

                </div>
            </div>
        );
    }
}
