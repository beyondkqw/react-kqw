import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import EnterPassword from '../../Component/CommonComponent/EnterPassword';
import Location from '../../Component/SellerStore/Location'
import '../../Stylesheets/App/personal.css';
import {Generate,HomeBanner} from '../../Action/auth';


export default class Recharge extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            toShowNav:false,
            showModal:false,
            indexNum:'',
            Reminder:'',
            showMap:false,
            provName:'',
            cityName:'',
            countysName:'',
            provId:'',
            cityId:'',
            countyId:'',
            priceList:[],
            rechargeNum:''
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getHomeBanner()
    }
    //得到地址信息
    getValue(provName,cityName,countysName,prov,city,county){
        if(provName&&cityName&&countysName){
            this.setState({
                provName:provName,
                cityName:cityName,
                countysName:countysName,
                showMap:false,
                provId:prov,
                cityId:city,
                countyId:county,
            })
        }

    }

    confirmOrder(){
        //非空校验
        if(this.refs.reChargeMoney.value == ''){
            this.setState({Reminder:'充值金额不能为空'})
            return
        }else{
            this.setState({Reminder:''})
        }

        if(this.props.location.query.chargeType == ''){
            this.setState({Reminder:'请选择充值方式'})
            return
        }else{
            this.setState({Reminder:''})
        }

        if(!this.state.provName || !this.state.cityName || !this.state.countysName){
            this.setState({Reminder:'请选择所在地区'})
            return
        }else{
            this.setState({Reminder:''})
        }


        this.getGenerate(this.state.provName+this.state.cityName+this.state.countysName,this.state.provId,this.state.cityId,this.state.countyId,this.refs.reChargeMoney.value,this.props.location.query.chargeType)
    }


    //获取充值列表
    async getHomeBanner(){
        await HomeBanner('RECHARGE',0,6)
            .then(res=>{
                this.setState({priceList:res})
            })
            .catch(err=>{
                console.warn('BANNER',err)
            })
    }

    async getGenerate(address,province,city,area,amount,chargeType){
        await Generate(address,province,city,area,amount,chargeType)
            .then(res=>{
                this.context.router.push({pathname:'/confirmPayment/surePayment',
                    query:{wayOfPay:this.props.location.query.wayOfPay,orderNos:res,money:this.refs.reChargeMoney.value,type:1}})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
                console.warn('err',err)
            })
    }

    copyValue(index,value){
        this.setState({toShowNav:true,indexNum:index,rechargeNum:value})
        this.refs.reChargeMoney.value = value
    }


    render() {
        const {toShowNav,indexNum,showModal,priceList,showMap,provName,cityName,countysName} = this.state
        const {chargeType,chargeWay,chooseImg} = this.props.location.query
        return (
            <div className="bkg_color containerNav">
                <Link to="/rechargeWay">
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                        <div style={{height:50}}  className="df flex-align-center">
                            {
                                chargeType?
                                    <span className="fl di" style={{width:30,height:30}}>
                                        <img className="border_ra50" src={chooseImg}
                                             alt=""/>
                                    </span>
                                    :
                                    null
                            }

                            <span className="di color6 ml5">{chargeType?chargeWay:'选择充值方式'}</span>
                        </div>
                        <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                            <img src={require('../../Images/rightArrow.png')} alt=""/>
                        </span>
                    </div>
                </Link>
                <SplitLine />
                <div className="plAll">
                    <p className="font14">
                        <span className="color6">充值金额</span>
                        <span className="color9"> ( 选择或自定义金额 ) </span>
                    </p>
                    <div className="mt5 mb1 f25 df">
                        <span className="flex-1">￥</span>
                        <input
                            className="borderno"
                            type="text"
                            placeholder="0.00"
                            ref = 'reChargeMoney'
                            onChange={()=>this.setState({rechargeNum:this.refs.reChargeMoney.value})}
                        />
                    </div>
                </div>
                {/*{
                    toShowNav?
                        <div>
                            <div className="plAll border_top border_bottom f12 color_yellow">
                                <span>赠送充值币</span>
                                <span>15</span>

                            </div>
                            <SplitLine />
                        </div>
                        :null
                }*/}
                <div className="border_top">
                    <ul className="font14 color6 width100">
                        {
                            priceList&&priceList.map((el,index)=>{
                                return(
                                        <li
                                            className={indexNum === index?
                                            "ptb tc di width_3333 border_right border_bottom color_yellow"
                                            :"ptb tc di width_3333 border_right border_bottom"
                                            }
                                            onClick={()=>this.copyValue(index,el.summary)}
                                        ><div>{el.summary}<span>元</span></div>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                </div>
                <SplitLine />
                <div
                    style={{flexDirection:'row',height:50}}
                    className="df flex-pack-justify flex-align-center border_bottom plr font14"
                    onClick = {()=>this.setState({showMap:true})}
                >
                    <span className="color6">所在地区</span>
                    <div>
                        <span className='color9'>{provName+cityName+countysName?provName+cityName+countysName:'请选择'}</span>
                            <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                <img src={require('../../Images/rightArrow.png')} alt=""/>
                            </span>
                    </div>

                </div>
                <div className="tc f12 color_red width_100 plr mtb loginHeight" style={{lineHeight:'36px'}}>
                    {this.state.Reminder}
                </div>
                <div>
                    <CommonBtn
                        title={'确认充值'}
                        onClick={()=>this.confirmOrder()}
                    />
                </div>
                <p className="f12 color6 tc mt5 pr">
                    <span className="di checkedRead pa">
                        <input
                            type="checkbox" id="isRead"
                            className="di toRead"
                        />
                        <label htmlFor="isRead"></label>
                    </span>
                    <span style={{marginLeft:20,marginRight:5}}>同意并接受聚朵云商综合体招商资质标准</span>
                    <Link to="/personalCenter/balanceCashRule">
                        <span className="di pa" style={{width:15,height:15,lineHeight:0}}>
                            <img src={require('../../Images/toRead.png')} alt=""/>
                        </span>
                    </Link>
                </p>
                {
                    showModal?
                        <EnterPassword />
                        :null
                }
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
                                        county:'110101',
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
