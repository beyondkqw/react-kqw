import React, { Component } from 'react';
import {Link} from 'react-router';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';
const ItemDetail = [
    {name:'王小明',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'},
    {name:'王小传',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'}]
export default class ChooseInfomation extends Component {
    render() {
        return (
            <div>
                {
                    ItemDetail.map((el,index)=>{
                        return (
                            <InformationComponent
                                name={el.name}
                                phone={el.phone}
                                path={el.path}
                            />
                        )
                    })
                }
                <Link to="/manageInformation">
                    <CommonBtn
                        title={'管理'}
                    />
                </Link>
            </div>
        );
    }
}
