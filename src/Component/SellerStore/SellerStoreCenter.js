import React, { Component } from 'react';
import {Link} from 'react-router';
import OrderDetails from '../../Component/Orders/OrderDetails'
import '../../Stylesheets/App/personal.css';
import '../../Stylesheets/App/lyrmrCss.css';
import {MyStore,MyInfo} from '../../Action/auth';
import LYReactMobileRefresh from '../../Component/CommonComponent/LYReactMobileRefresh'

const ItemList = [
    {name:'销售统计',imgUrl:require('../../Images/common/SalesStatistics.png'),link:'/salesStatistics'},
    {name:'订单管理',imgUrl:require('../../Images/common/OrderManagement.png'),link:'/sellerOrderList'},
    {name:'店铺首页',imgUrl:require('../../Images/common/ShopHome.png'),link:'/shopHome'},
    {name:'产品管理',imgUrl:require('../../Images/common/productManagement.png'),link:'/productManagement'},
    {name:'客服设置',imgUrl:require('../../Images/common/CustomerService.png'),link:'/customerService'},
    {name:'分佣比例设置',imgUrl:require('../../Images/common/SubCommission.png'),link:'/storeSubCommission'},
    {name:'资金管理',imgUrl:require('../../Images/common/balanceMan.png'),link:'/sellerBalanceMan'},
    {name:'佣金转赠',imgUrl:require('../../Images/diary.png'),link:'/personalCenter/commisionGiving'}
]

export default class SellerStoreCenter extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeDetails: '',
            Now_Amount: '',
            frozen: '',
            index: 0
        };
    }

    refresh(callback){
        this.getMyStore()
        this.getMyInfo()
        if(callback){
            callback()
        }
    };
    componentWillMount() {
        this.getMyStore()
        this.getMyInfo()
    }

    async getMyStore(){
        await MyStore()
            .then(res=>{
                this.setState({storeDetails:res.store})
            })
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({
                    Now_Amount : res.NOW_AMOUNT,
                    frozen:res.FROZEN
                })
            })
    }

    render() {
        const {storeDetails,Now_Amount,frozen} = this.state
        return (
            <div className="containerNav">
                <LYReactMobileRefresh refreshing={()=>this.refresh()}>
                    <section className="pr tc center_bkImg" style={{height:170,paddingTop:20}}>
                        <Link to="/sellerSetting" query={{storeId:storeDetails.id}}>
                            <div className="personLogo">
                                <img className="border_ra50" src={storeDetails.img} alt=""/>
                            </div>
                        </Link>
                        <div className="pa setUp">
                            <Link
                                to="/sellerStoreSetting"
                                query={{mobile:storeDetails.mobile,storeId:storeDetails.id}}>
                                <span className="di" style={{width:15,height:15,lineHeight:0,marginRight:5}}>
                                    <img src={require('../../Images/common/shezhi.png')} alt=""/>
                                </span>
                                <span className="font14 color_white">设置</span>
                            </Link>
                        </div>
                        <div className="font14 color_white" style={{marginTop:20,height:15}}>{storeDetails.name}</div>
                        <div className="flex flex-pack-justify color_white" style={{margin:'10px 3.5rem 0'}}>
                            <div className="flex flex-v">
                                <span className="font16">{frozen}</span>
                                <span className="font14">冻结金额</span>
                            </div>
                            <div className="flex flex-v">
                                <span className="font16">{Now_Amount}</span>
                                <span className="font14">可用余额</span>
                            </div>
                        </div>
                    </section>
                    <div className="line"></div>
                    <div className="width_100 countDiv">
                        {
                            ItemList&&ItemList.map((item,index)=>{
                                return(
                                    <Link
                                        to={item.link}
                                        className="di width_third width_100"
                                        query={{storeId:storeDetails.id,Now_Amount:Now_Amount,frozen:frozen}}
                                    >
                                        <div className={index%3==0||index%3==1?
                                        "separateRow tc di border_bottom  border_right":
                                        "separateRow tc di border_bottom"}>
                                            <p>
                                                <span className="di separateRowImg"><img src={item.imgUrl} alt=""/></span>
                                            </p>
                                            <div className="f12 m_top color6">{item.name}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                    <div className="footerHidden"></div>
                </LYReactMobileRefresh>
            </div>
        );
    }
}
