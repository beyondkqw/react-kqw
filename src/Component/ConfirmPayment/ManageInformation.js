import React, { Component } from 'react';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import '../../Stylesheets/App/comfirmPayMoney.css';

const ItemDetail = [
    {name:'王小明',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'},
    {name:'王小传',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'}]
export default class ManageInformation extends Component {
    render() {
        return (
            <div>
                {
                    ItemDetail.map((el,index)=>{
                        return (
                            <div>
                                <InformationComponent
                                    name={el.name}
                                    phone={el.phone}
                                    path={el.path}
                                />
                                <div className="f12 border_bottom lh20 plr color9">
                                    <div className="fl pr">
                                        <span className="di check_location pr mr5">
                                            <input type="radio" id={'index'+index} name="chooseLocation"  className="di isCheck"/>
                                            <label htmlFor={'index'+index}></label>
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
                                        <div className="di mr20 width8">
                                            <span className="di lh8 mr5">
                                                <img src={require('../../Images/modify.png')} alt=""/>
                                            </span>
                                            <span className="di pa mt1">编辑</span>
                                        </div>
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
