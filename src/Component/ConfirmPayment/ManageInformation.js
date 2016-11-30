import React, { Component } from 'react';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList,DefaultAddress} from '../../Action/auth';
import {Link} from 'react-router';

const ItemDetail = [
    {name:'王小明',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'},
    {name:'王小传',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'}]
export default class ManageInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            addressList : [],
           // isDefault : false
        };
    }

    componentWillMount() {
        this.getAddressList()
    }

    setDefaultAddress(id){
        DefaultAddress(id)
        .then(res=>{
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
                console.log('地址列表',res)
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
                    addressList.map((el,index)=>{
                        return (
                            <div>
                                <InformationComponent
                                    name={el.name}
                                    phone={el.mobile}
                                    path={el.address+el.detail}
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
                                        <div className="di width8">
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
            </div>
        );
    }
}
