import React, { Component,PropTypes } from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {AddAddress,EditAddress} from '../../Action/auth'
import Location from '../../Component/SellerStore/Location'
import {ErrorNum} from '../../Action/rpc'
import {context} from 'react-router'

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
            detail : '',
            type : false,
            id : '',
            showMap:false,
            Reminder:'',
            provName:'',
            cityName:'',
            countysName:'',
            provId:'',
            cityId:'',
            countyId:''
        };
      }

    async componentDidMount() {
        //type false 为创建 true是编辑
        console.log('******',this.props.location.query)
        if(this.props.location.query){
            console.log('----*-*-*-*-')
            const query = this.props.location.query
              await this.setState({
                    mobile:query.mobile,
                    address:query.address,
                    name:query.name,
                    detail:query.detail,
                    type:query.id?true:false,
                    id:query.id

                })
                this.refs.name.value = query.name?query.name:''
                //this.refs.address.value = query.address?query.address:''
                this.refs.detail.value = query.detail?query.detail:''
                this.refs.mobile.value = query.mobile?query.mobile:''
        }
    }

    static contextTypes = {
        router:PropTypes.object
    }

    //得到地址信息
    async getValue(provName,cityName,countysName,prov,city,county){
        //改变默认值
        if(prov == '110000' || prov =='120000' || prov =='310000' || prov =='500000'){
            //改变初始化的内容
            if((provName == ''|| provName == null) && (countysName != '' || countysName != null)&& countysName != undefined){
                await this.setState({provName:'北京市',cityName:'',countysName:countysName,provId:'110000',cityId:'0',countyId:county,showMap:false})
                this.setState({address:this.state.provName+''+this.state.cityName+this.state.countysName})
                return
            }
            if(countysName == '' || countysName == null || countysName== undefined){
                alert('请选择对应的城市和区县')
                return
            }
            if((provName != ''|| provName != null) && (county != '' || county != null)){
                await this.setState({provName:provName,cityName:'',countysName:countysName,provId:prov,cityId:'0',countyId:county,showMap:false})
                this.setState({address:this.state.provName+''+this.state.cityName+this.state.countysName})
                return
            }

        }else if(prov == '710000' || prov =='810000' || prov =='820000'){
            await this.setState({provName:provName,cityName:'',countysName:'',provId:prov,cityId:'0',countyId:'0',showMap:false})
            this.setState({address:this.state.provName+''+this.state.cityName+this.state.countysName})
            return
        }else if(prov != '' && city != '' && county != ''){
            await this.setState({
                provName:provName,
                cityName:cityName,
                countysName:countysName,
                showMap:false,
                provId:prov,
                cityId:city,
                countyId:county,
            })
            this.setState({address:this.state.provName+this.state.cityName+this.state.countysName})
        }else{
            alert('地址请选择完整')
        }
    }

    async submit(){
        const {name,mobile,address,detail,type,id,provId,cityId,countyId} = this.state
        console.log('新增地址',address)
        if (!ErrorNum(mobile)) {
            this.setState({Reminder:'手机号码有误,请重新填写'})
            return
        }

        if(!name || !mobile  || !address  || !detail){
            this.setState({Reminder:'所填数据不能为空。。。'})
            return
        }else{
            this.setState({Reminder:''})
        }

        if(type){
          await EditAddress(name,mobile,address,detail,id)
            .then(res=>{
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('修改地址失败',err)
            })
        }else{
            await AddAddress(name,mobile,address,detail,provId,cityId,countyId)
                .then(res=>{
                    this.context.router.goBack()
                })
                .catch(err=>{
                    console.warn('添加地址失败',err)
                })
        }
    }

    render() {
        const {showMap,address} = this.state
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
                                        maxLength="11"
                                        ref = 'mobile'
                                        className="borderno tr"
                                        type="\"
                                        placeholder="电话号码"
                                        onChange={()=>this.setState({mobile:this.refs.mobile.value})}
                                    />
                                </div>
                            </div>
                        </li>
                        <li
                            className="item-content item-link pl border_bottom"
                            onClick = {()=>this.setState({showMap:true})}
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">所在地区</div>
                                <div className="item-after color9">
                                    {address}
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
                <div className="tc f12 color_red width_100 plr mtb loginHeight" style={{lineHeight:'36px'}}>
                    {this.state.Reminder}
                </div>
                <CommonBtn
                    onClick = {()=>this.submit()}
                    title={'确定'}
                />
                {
                    showMap?
                        <div className="locationModal pa width_100 font14 flex flex-v" style={{zIndex:100}}>
                            <div
                                className="shadowNav flex-1"
                            >
                            </div>
                            <div className="bkg_color width_100">
                                <Location
                                    getInfomation = {(provName,cityName,countysName,prov,city,county)=>this.getValue(provName,cityName,countysName,prov,city,county)}
                                    hiddenModal = {()=>this.setState({showMap:false})}
                                    options= {{
                                        prov:'110000',
                                        city:'110100',
                                        county:'0',
                                        defaultText:['省份','城市','区县']
                                    }}
                                />
                            </div>
                        </div>
                        :null
                }

            </div>
        );
    }
}
