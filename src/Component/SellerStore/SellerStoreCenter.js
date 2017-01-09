import React, { Component } from 'react';
import {Link} from 'react-router';
import OrderDetails from '../../Component/Orders/OrderDetails'
import '../../Stylesheets/App/personal.css';
import {MyInfo} from '../../Action/auth'

const ItemList = [
    {name:'销售统计',imgUrl:require('../../Images/partner.png'),link:'/salesStatistics'},
    {name:'订单管理',imgUrl:require('../../Images/change.png'),link:'/sellerOrderList'},
    {name:'店铺首页',imgUrl:require('../../Images/enshirne.png'),link:'/shopHome'},
    {name:'产品管理',imgUrl:require('../../Images/balance.png'),link:'/productManagement'},
    {name:'客服设置',imgUrl:require('../../Images/micro.png'),link:'/customerService'},
    {name:'分佣比例设置',imgUrl:require('../../Images/path.png'),link:'/storeSubCommission'}
]
export default class SellerStoreCenter extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeDetails:''
        };
    }

    componentWillMount() {
        this.getMyInfo()
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({storeDetails:res})
            })
    }

    render() {
        const {storeDetails} = this.state
        return (
            <div>
                <section className="pr tc center_bkImg" style={{height:130,paddingTop:20}}>
                    <Link to="/sellerSetting" query={{storeId:storeDetails.STORE_ID}}>
                        <div className="personLogo">
                            <img className="border_ra50" src={storeDetails.IMAGE_URI} alt=""/>
                        </div>
                    </Link>
                    <div className="pa setUp">
                        <Link
                            to="/sellerStoreSetting"
                            query={{mobile:storeDetails.MOBILE,storeId:storeDetails.STORE_ID}}>
                            <span className="di" style={{width:15,height:15,lineHeight:0,marginRight:5}}>
                                <img src={require('../../Images/common/shezhi.png')} alt=""/>
                            </span>
                            <span className="font14 color_white">设置</span>
                        </Link>
                    </div>
                    <div className="font14 color_white" style={{marginTop:20,height:15}}>{storeDetails.MEMBER_NAME}</div>
                </section>
                <div className="line"></div>
                <div className="width_100 countDiv">
                    {
                        ItemList&&ItemList.map((item,index)=>{
                            return(
                                <Link
                                    to={item.link}
                                    className="di width_third width_100"
                                    query={{storeId:storeDetails.STORE_ID}}
                                >
                                    <div className={index%3==0||index%3==1?
                                    "separateRow tc di border_bottom  border_right":
                                    "separateRow tc di border_bottom"}>
                                        <p>
                                            <span className="di separateRowImg"><img src={item.imgUrl} alt=""/></span>
                                        </p>
                                        <p className="f12 m_top color6">{item.name}</p>
                                    </div>
                                </Link>
                            )
                        })
                    }
                </div>
                <div className="footerHidden"></div>
            </div>
        );
    }
}
