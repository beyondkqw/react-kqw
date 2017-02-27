import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import PaymoneyComponent from '../../Component/ConfirmPayment/PaymoneyComponent';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {ListByOrderNo,Points} from '../../Action/auth'
import RPC from '../../Action/rpc'
import Subscribe from '../../Component/NewComponent/Subscribe'

export default class ComfirmPayMoney extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.orderNoArray=[]
        this.state = {
            PaymentDetails:[],
            now_point:'',
            touch_amount:'',
            timer:'',
            itemAmount:[],
            carriage:[],
            summaryAmount:[],
            summaryCarriage:[],
            getAll:0,
            checked:false

        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    async componentWillMount() {
        await this.getOrderInfor()
        this.setState({timer:this.props.location.query.time})
        this.getPoints()
        this.state.getAll = this.getSumAmount()
        const {address,detail,name,mobile} = this.props.location.query
        if(address && detail && name && mobile){
            this.changeAddress();
        }
    }

   async getOrderInfor(){
        console.log('orderId',this.props.location.query.orderId)
        await ListByOrderNo(this.props.location.query.orderId)
        .then(res=>{
            console.log('订单资料',res)
            this.setState({PaymentDetails:res})
            this.setState({address:res[0].address +res[0].address_detail})
            this.setState({name:res[0].name})
            this.setState({mobile:res[0].mobile})
            console.log(this.state.address+this.state.name+this.state.mobile)
            res.map(el=>{
                this.orderNoArray.push(el.order_no)
                this.state.itemAmount.push(el.amount)
                this.state.carriage.push(el.postage)
            })
        })
        .catch(err=>{
            console.warn('getOrderInfor',err)
        })
    }


    //可用积分查询
    async getPoints() {
        await Points()
            .then(res=>{
                this.setState({now_point:res.NOW_POINTS,touch_amount:res.TOUCH_AMOUNT})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    getSumAmount(){
        this.state.itemAmount.map(el=>{
            this.state.summaryAmount += el
        })
        this.state.carriage.map(el=>{
            this.state.summaryCarriage += el
        })
        return parseFloat(this.state.summaryAmount)+parseFloat(this.state.summaryCarriage)
    }

    changeAddress=(value)=>{
        const {address,detail,name,mobile} = this.props.location.query
        this.setState({address:address+detail})
        this.setState({name:name})
        this.setState({mobile:mobile})
    }
    render() {
        const {PaymentDetails,now_point,touch_amount,timer,getAll,address,name,mobile} = this.state
        return (
            <div className="containerNav oa">
                <Subscribe target={RPC} eventName="choosePath" listener={()=>this.changeAddress()} />
                {
                    PaymentDetails&&PaymentDetails.map(item=>{
                        return(
                            <div>
                                <div className="list-block m0">
                                    <ul>
                                        <Link to='/chooseInfomation' query={{path:true,orderNo:item.order_no}}>
                                            <li className="item-content item-link item-link pl  border_bottom">
                                                <div className="item-media">
                                                    <span className="fl di positionImg" style={{lineHeight:0}}>
                                                        <img src={require('../../Images/location.png')} alt=""/>
                                                    </span>
                                                </div>
                                                <div className="item-inner" style={{marginLeft:15}}>
                                                    {
                                                        ((address == ''||address == null)&& (address ==''||address == null))?

                                                            <div className="item-title">
                                                                <span className="color6 font14">完善收货信息</span>
                                                            </div>:
                                                            <div className="item-title-row">
                                                                <div className="item-title font14 color6">{address}</div>
                                                                <div className="f12 color9">
                                                                    <span>{name}</span>
                                                                    <span className="di margin15">{mobile}</span>
                                                                </div>
                                                            </div>
                                                    }
                                                </div>
                                            </li>
                                        </Link>
                                        <Link to="/receivingTime" query={{orderId:this.props.location.query.orderId}}>
                                            <li className="item-content item-link pl border_bottom">
                                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                                <div className="item-inner margin0">
                                                    <div className="item-title">
                                                        <span className="di mr6 timeImg"><img src={require('../../Images/time.png')} alt=""/></span>
                                                        {
                                                            timer ==''||timer ==undefined ?
                                                                <span className="color6 font14">送货时间不限</span>
                                                                :
                                                                <span className="color6 font14">{this.state.timer}</span>

                                                        }

                                                    </div>
                                                </div>
                                            </li>
                                        </Link>
                                    </ul>
                                </div>
                                <div className="line"></div>
                                <div>
                                    <Link to="/chooseInfomation">
                                        <div className="paymargin">
                                            <div className="di payImgSize mr"><img src={item.img} alt=""/></div>
                                            <span className="color6 font14">{item.store_name}</span>
                                        </div>
                                    </Link>
                                    {
                                        item.orderDetails&&item.orderDetails.map((el,index)=>{
                                            return (
                                                <Link to="/goodsDescription" query={{id:el.productId}}>
                                                    <PaymoneyComponent
                                                        title={el.productName}
                                                        num={el.num}
                                                        attr={el.attrDesc}
                                                        imgurl={el.productImage}
                                                        price={el.price}
                                                    />
                                                </Link>
                                            )
                                        })
                                    }
                                    <div className="plr lh25 border_bottom clearAll">
                                        <span className="color6 font14">商品金额</span>
                                        <label htmlFor="" className="colorff fr">
                                            <span className="f12">￥</span><span className="font14">{item.amount}</span>
                                        </label>
                                    </div>
                                    <div className="plr lh25 border_bottom clearAll">
                                        <span className="color6 font14">运费</span>
                                        <label htmlFor="" className="colorff fr">
                                            <span className="f12">￥</span><span className="font14">{item.postage}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                <SplitLine />
                <section className="plr lh25">
                    {
                        now_point == 0?
                            <div className="fl color6 font14">暂无积分可使用</div>
                            :
                            <div>
                                <div className="fl color6 font14">可用
                                    <span>{now_point}</span>积分抵用
                                    <span>{touch_amount}</span>元</div>
                                <span className="di check_radius pr fr">
                                    <input
                                        type="checkbox" id="isChoose"
                                        className="di toChoose"
                                        onClick={()=>{this.setState({
                                            checked:!this.state.checked
                                        })}}
                                    />
                                    <label htmlFor="isChoose"></label>
                                </span>
                            </div>
                    }
                </section>
                <div className="lh25 plr border_top">
                    <div className="fr">
                        <span className="font14">实付款 :</span>
                        <span className="colorff f12">￥</span>
                        <span className="colorff f15">{(this.state.checked)?((getAll-touch_amount>0)?(getAll-touch_amount):0):getAll}</span>
                        <Link
                            to="/confirmPayment/choosePayment"
                            query={{
                            planReceiveTime:timer,
                            orderNos:this.orderNoArray.join(','),
                            payMuchMoney :(this.state.checked)?((getAll-touch_amount>0)?(getAll-touch_amount):0):getAll
                            }}>
                            <button className="settleAccount border_ra color_white margin15">支付</button>
                        </Link>

                    </div>
                </div>
            </div>
        );
    }
}
