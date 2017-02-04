import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import EnterPassword from '../../Component/CommonComponent/EnterPassword';
import '../../Stylesheets/App/personal.css';
import {Generate} from '../../Action/auth';


export default class Recharge extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.monetList = [100,200,300,400,500,600]
        this.state = {
            toShowNav:false,
            showModal:false,
            indexNum:'',
            Reminder:''
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    async getGenerate(address,province,city,area,amount,chargeType){
        await Generate(address,province,city,area,amount,chargeType)
            .then(res=>{
                console.log('this.props.location.query.wayOfPay',this.props.location.query.wayOfPay)
                this.context.router.push({pathname:'/confirmPayment/surePayment',
                    query:{wayOfPay:this.props.location.query.wayOfPay,orderNos:res}})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
                console.warn('err',err)
            })
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

        this.getGenerate('深圳宝安','1000','1000','1000',this.refs.reChargeMoney.value,this.props.location.query.chargeType)
    }

    render() {
        const {toShowNav,indexNum,showModal} = this.state
        const {chargeType,chargeWay} = this.props.location.query
        return (
            <div className="bkg_color containerNav">
                <Link to="/rechargeWay">
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                        <div style={{height:50}}  className="df flex-align-center">
                            {
                                chargeType?
                                    <span className="fl di headerImg">
                                        <img className="border_ra50" src={require('../../Images/headerImg.jpg')}
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
                        />
                    </div>
                </div>
                {
                    toShowNav?
                        <div>
                            <div className="plAll border_top border_bottom f12 color_yellow">
                                <span>赠送充值币</span>
                                <span>15</span>

                            </div>
                            <SplitLine />
                        </div>
                        :null
                }
                <div className="border_top">
                    <ul className="font14 color6 width100">
                        {
                            this.monetList.map((el,index)=>{
                                return(
                                        <li
                                            className={indexNum === index?
                                            "ptb tc di width_3333 border_right border_bottom color_yellow"
                                            :"ptb tc di width_3333 border_right border_bottom"
                                            }
                                            onClick={()=>this.setState({toShowNav:true,indexNum:index})}
                                        ><div>{el}<span>元</span></div>
                                            <p className="color9 f12">赠送<span>5</span>元充值币</p>
                                        </li>
                                    )
                            })
                        }
                    </ul>
                </div>
                <SplitLine />
                <div className ="list-block m0 font14">
                    <ul>
                        <li className ='item-content item-link border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                    <span className="di listimg">
                                        <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                    </span>
                                    <span className="di margin15 color6">省份</span>
                                </div>
                                <div className="item-after color9">广东省</div>
                            </div>
                        </li>
                        <li className ='item-content item-link border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                    <span className="di listimg">
                                        <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                    </span>
                                    <span className="di margin15 color6">城市</span>
                                </div>
                                <div className="item-after color9">深圳</div>
                            </div>
                        </li>
                        <li className ='item-content item-link border_bottom isConfirmSet'>
                            <div className="item-inner">
                                <div className="item-title height_all">
                                    <span className="di listimg">
                                        <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                    </span>
                                    <span className="di margin15 color6">区县</span>
                                </div>
                                <div className="item-after color9">宝安区</div>
                            </div>
                        </li>
                    </ul>
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

            </div>
        );
    }
}
