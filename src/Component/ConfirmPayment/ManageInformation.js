import React, { Component,PropTypes } from 'react';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList,DefaultAddress,DelAddress} from '../../Action/auth';
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
                this.context.router.push({pathname:'/comfirmPayMoney'})
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
                                    path={el.address?el.address:''+el.detail?el.detail:''}
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
                                            <span className="di lh8 mr5">
                                                <img src={require('../../Images/detelename.png')} alt=""/>
                                            </span>
                                            <span className="di pa mt1">删除</span>
                                        </div>
                                        <Link to = '/deliveredInformation' query={el} >
                                            <div className="di mr20 width8">
                                                <span className="di lh8 mr5">
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
                            title = {'确定删除浏览记录?'}
                            onClick = {()=>this.DeleteAddress()}
                            toHideModal={()=>this.setState({delAddress:false})}
                        />
                        :null
                }
            </div>
        );
    }
}
