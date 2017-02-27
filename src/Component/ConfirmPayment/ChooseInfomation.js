import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import InformationComponent from '../../Component/ConfirmPayment/InformationComponent';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddressList} from '../../Action/auth'
import RPC from '../../Action/rpc'
import Subscribe from '../../Component/NewComponent/Subscribe'

export default class ChooseInfomation extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            addressList : []
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getAddressList()
    }

    choosePath(value){
        if(this.props.location.query.path){
            RPC.emit('choosePath',value,this.props.location.query.orderNo)
            this.context.router.push({pathname:'/comfirmPayMoney',query:{address:value.address,detail:value.detail,name:value.name,mobile:value.mobile,orderId:this.props.location.query.orderNo}});
        }

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

    choosePath(value){
        if(this.props.location.query.path){
            RPC.emit('choosePath',value,this.props.location.query.orderNo)
            this.context.router.push({pathname:'/comfirmPayMoney',query:{address:value.address,detail:value.detail,name:value.name,mobile:value.mobile,orderId:this.props.location.query.orderNo}});
        }

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
                                path={el.address?el.address:''+el.detail?el.detail:''}
                                onClick = {()=>this.choosePath(el)}
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
                            <Link to="/manageInformation" query={{choosePath:this.props.location.query.path}} className="flex1">
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
