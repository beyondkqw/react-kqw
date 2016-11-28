import React, { Component } from 'react';
import {Link} from 'react-router';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList} from '../../Action/auth'

//const ItemDetail = [
//    {name:'王小明',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'},
//    {name:'王小传',phone:18123456789,path:'广东省深圳市宝安区新一代信息技术产业园C座618新一代信息技术产业园C座618'}]
export default class ChooseInfomation extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            addressList : []
        };
      }

    componentWillMount() {
        this.getAddressList()
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
            <div>
                {
                    addressList.map((el,index)=>{
                        return (
                            <InformationComponent
                                name={el.name}
                                phone={el.mobile}
                                path={el.address+el.detail}
                            />
                        )
                    })
                }
                <Link to="/manageInformation">
                    <CommonBtn
                        className = 'pf bottom0'
                        title={'管理'}
                    />
                </Link>
            </div>
        );
    }
}
