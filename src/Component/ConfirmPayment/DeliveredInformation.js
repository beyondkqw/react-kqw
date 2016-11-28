import React, { Component,Context } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddAddress,EditAddress} from '../../Action/auth'

export default class DeliveredInformation extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            name : '',
            mobile : '',
            address : '',
            street : '',
            detail : ''
        };
      }

    componentDidMount() {
        console.log('----',window.location.search.substr(1))
    }

    async submit(){
        const {name,mobile,address,street,detail} = this.state
        console.log('新增地址',name,mobile,address,street+detail)
       await AddAddress(name,mobile,address+street,detail)
        .then(res=>{
            console.log('添加地址成功',res)
        })
        .catch(err=>{
            console.warn('添加地址失败',err)
        })
    }

    render() {
        return (
            <div>
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">收货人</div>
                                <div className="item-after color9">
                                    <input
                                        ref = 'name'
                                        className="borderno tr "
                                        type="\"
                                        placeholder="收货人姓名"
                                        onChange={()=>this.setState({name:this.refs.name.value})}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">联系电话</div>
                                <div className="item-after color9">
                                    <input
                                        ref = 'mobile'
                                        className="borderno tr"
                                        type="\"
                                        placeholder="电话号码"
                                        onChange={()=>this.setState({mobile:this.refs.mobile.value})}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className="item-content item-link pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">所在地区</div>
                                <div className="item-after color9">
                                    <input
                                        ref = 'address'
                                        className="borderno tr"
                                        type="\"
                                        placeholder="请选择"
                                        onChange={()=>this.setState({address:this.refs.address.value})}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className="item-content item-link pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">街道</div>
                                <div className="item-after color9">
                                    <input
                                        ref = 'street'
                                        className="borderno tr"
                                        type="\"
                                        placeholder="请选择所在区域"
                                        onChange = {()=>this.setState({street:this.refs.street.value})}
                                    />
                                </div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">详细信息</div>
                                <div className="item-after color9">
                                    <input
                                        ref = 'detail'
                                        className="borderno tr"
                                        type="\"
                                        placeholder=""
                                        onChange = {()=>this.setState({detail:this.refs.detail.value})}
                                    />
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <CommonBtn
                    onClick = {()=>this.submit()}
                    title={'确定'}
                />
            </div>
        );
    }
}
