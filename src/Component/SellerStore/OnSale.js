/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine';
import Search from '../../Component/NewComponent/Search';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import ManageRow from '../../Component/SellerStore/ManageRow';
import {Link} from 'react-router'
import {StoreDetailItem,StorectList} from '../../Action/auth'

export default class OnSale extends Component {
    componentWillMount() {
        this.storeId = this.props.location.query.storeId
        this.getOrderList('',this.storeId,'p.create_time','')
    }

    onChangeTab(index){
        if(index == 0){
            //最新上架
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }else if(index == 1){
            //人气排行
            this.getOrderList('',this.storeId,'desc','p.CLICK_COUNT')
        }else if(index == 2){
            //最高价
            this.getOrderList('',this.storeId,'desc','p.CURRENT_PRICE')
        }else{
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }
    }

    //请求列表接口
    async getOrderList(paramOne,paramTwo,paramThree,paramFour){
        await StorectList(paramOne,paramTwo,paramThree,paramFour)
            .then(res=>{
                this.setState({storeDetail:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    render(){
        return(
            <div className="containerNav">
                {/*todo scroll滚动时置顶fixed*/}
                <Tabscontrol
                    style={{height:40,lineHeight:'40px'}}
                    onClick={(index)=>this.onChangeTab(index)}
                >
                    <div name="上架时间"></div>
                    <div name="价格"></div>
                    <div name="销售总量">
                    </div>
                </Tabscontrol>
                <div style={{marginTop:-28}}>
                    <SplitLine />
                </div>
                {/*商品列表---最下层*/}
                <div>
                    <ManageRow />
                </div>
                <div className="footerHidden"></div>
                <div className="width_100 commit pf bottom0">
                    <Link to="/offTheShelf">
                        <button className="width50 height_all bkg_fadeff color_yellow">下架</button>
                    </Link>
                    <Link to="/searchGoods">
                        <button className="width50 height_all bkg_ff color_white">搜索宝贝</button>
                    </Link>
                </div>
            </div>
        )
    }
}