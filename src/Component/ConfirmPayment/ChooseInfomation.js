import React, { Component } from 'react';
import {Link} from 'react-router';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList} from '../../Action/auth'

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
                        addressList&&addressList.map((el,index)=>{
                        console.log(el.detail?el.detail:'')
                        return (
                            <InformationComponent
                                name={el.name}
                                phone={el.mobile}
                                path={el.address?el.address:''+el.detail?el.detail:''}
                            />
                        )
                    })
                }
                <div className="df pf width100" style={{bottom:40}}>
                    <Link to="/deliveredInformation" className="flex1">
                        <CommonBtn
                            title={'添加地址'}
                        />
                    </Link>
                    {
                        addressList == ''?
                            null:
                            <Link to="/manageInformation" className="flex1">
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
