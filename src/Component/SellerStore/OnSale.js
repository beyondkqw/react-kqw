/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine';
import Search from '../../Component/NewComponent/Search';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import ManageRow from '../../Component/SellerStore/ManageRow';
import {Link} from 'react-router'
import {StoreDetailItem,StorectList} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'


export default class OnSale extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.storeId = this.props.location.query.storeId
        this.state = {
            onSaleDetails:[]
        };
      }

    componentWillMount() {
        this.getOrderList('',this.storeId,'p.create_time','')
    }

    onChangeTab(index){
        if(index == 0){
            //上架时间
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }else if(index == 1){
            //价格
            this.getOrderList('',this.storeId,'desc','p.CURRENT_PRICE')
        }else if(index == 2){
            //销售总量
            this.getOrderList('',this.storeId,'desc','p.CLICK_COUNT')
        }else{
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }
    }

    //请求列表接口
    async getOrderList(name,storeId,order,orderName){
        await StorectList(name,storeId,order,orderName)
            .then(res=>{
                console.log('res=========>',res.resultList)
                this.setState({onSaleDetails:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    render(){
        const {onSaleDetails} = this.state
        return(
            <div className="containerNav">
                {/*todo scroll滚动时置顶fixed*/}
                <NavBar
                    renderBack = {true}
                    title = {'出售中的宝贝'}
                />
                <Tabscontrol
                    style={{height:40,lineHeight:'40px'}}
                    onClick={(index)=>this.onChangeTab(index)}
                >
                    <div name="上架时间"></div>
                    <div name="价格"></div>
                    <div name="销售总量"></div>
                </Tabscontrol>
                <div style={{marginTop:-28}}>
                    <SplitLine />
                </div>
                {/*商品列表---最下层*/}
                <div className="pr">
                    {
                        onSaleDetails == ''?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'查询列表是空的哦~'}
                            />
                            :
                        onSaleDetails&&onSaleDetails.map(el=>{
                            return(
                                <div>
                                    <ManageRow
                                        name = {el.NAME}
                                        price = {el.CURRENT_PRICE}
                                        no = {el.GB_CODE}
                                    />
                                </div>
                            )
                        })
                    }
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