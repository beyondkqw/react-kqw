import React, { Component,PropTypes } from 'react';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList,DefaultAddress,DelAddress,SetAddress} from '../../Action/auth';
import {Link} from 'react-router';

export default class ManageInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            addressList : [],
            delAddress:false,
            addressId:''
           // isDefault : false
        };
    }

    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getAddressList()
    }

    setDefaultAddress(id){
        DefaultAddress(id)
        .then(res=>{
            if(this.props.location.query.choosePath){
                //this.context.router.push({pathname:'/comfirmPayMoney'})
                this.context.router.goBack()
            }
            this.getAddressList()
            console.log('设置默认地址成功',res)
        })
        .catch(err=>{
            console.warn('设置默认地址失败',err)
        })

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

    //删除地址
    async DeleteAddress(){
        await DelAddress(this.state.addressId)
            .then(res=>{
               this.setState({delAddress:false})
                this.getAddressList()
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
                    orderId:this.props.location.query.orderId,
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
            <div className="containerNav">
                {
                    addressList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'地址列表是空的哦~'}
                        />
                        :
                    addressList.map((el,index)=>{
                        return (
                            <div>
                                <InformationComponent
                                    name={el.name}
                                    phone={el.mobile}
                                    path={(el.address?el.address:'')+(el.detail?el.detail:'')}
                                    onClick = {()=>this.choosePath(el)}
                                />
                                <div className="f12 border_bottom lh20 plr color9">
                                    <div className="fl pr">
                                        <span className="di check_location pr mr5">
                                            {
                                                el.isDefault==0?
                                                    <img style={{marginBottom:26}} src = {require('../../Images/gou.png')}/>
                                                    :
                                                    <span
                                                        className="notCheck"
                                                        onClick = {()=>this.setDefaultAddress(el.id)}
                                                    />
                                            }
                                        </span>
                                        <span className="di mr15">默认地址</span>
                                    </div>
                                    <div className="fr pr">
                                        <div className="di width8"
                                            onClick={()=>this.setState({delAddress:true,addressId:el.id})}
                                        >
                                            <span className="di lh8" style={{marginRight:5}}>
                                                <img src={require('../../Images/detelename.png')} alt=""/>
                                            </span>
                                            <span className="di pa mt1">删除</span>
                                        </div>
                                        <Link to = '/deliveredInformation' query={el} >
                                            <div className="di mr20 width8">
                                                <span className="di lh8" style={{marginRight:5}}>
                                                    <img src={require('../../Images/modify.png')} alt=""/>
                                                </span>
                                                <span className="di pa mt1 color9">编辑</span>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                {
                    this.state.delAddress?
                        <Modal
                            title = {'确定删除该地址?'}
                            onClick = {()=>this.DeleteAddress()}
                            toHideModal={()=>this.setState({delAddress:false})}
                        />
                        :null
                }
            </div>
        );
    }
}
