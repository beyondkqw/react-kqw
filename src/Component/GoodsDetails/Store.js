import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search'
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import StoreDetails from '../../Component/GoodsDetails/StoreDetails'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import Carousel from '../NewComponent/Carousel'
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';
import {StoreDetailItem,StorectList} from '../../Action/auth'

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',price:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',price:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',price:291,imgUrl:require('../../Images/clothes1.png')}];

export default class Store extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeDetails:[],
            storeBanner:[],
            storeDetail:[],
            tableIndex:0
        };
      }

    componentWillMount() {
        this.storeId = this.props.location.query.storeId
        this.getStoreDetails(this.storeId)
        this.getOrderList('',this.storeId,'p.create_time','')
    }
    //获取店铺详情
    async getStoreDetails(storeId){
        await  StoreDetailItem(storeId)
            .then(res=>{
                this.setState({storeDetails:res.store})
                this.setState({storeBanner:res.banner})
            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }
    //店铺导航切换
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
        }else if(index == 3){
            //最低价
            this.getOrderList('',this.storeId,'asc',' p.CURRENT_PRICE')
        }else{
            this.getOrderList('',this.storeId,'desc','p.create_time')
        }
    }
    //搜索
    searchList(value){
        this.getOrderList(value,this.storeId,'','')
    }

    render() {
        const {storeDetails,storeBanner,storeDetail} = this.state
        return (
            <div className="containerNav bkg_gray">
               <Search
                    style={{backgroundColor:'#ff5500'}}
                    location = {true}
                    onClick={(value)=>this.searchList(value)}
               />
                <div className="plAll storeDetail df" style={{justifyContent:'space-between'}}>
                    <div className="df">
                        <div className="mr" style={{height:40,width:40}}>
                            <img src={storeDetails.img} alt=""/>
                        </div>
                        <div className="color_white f12" style={{width:100,height:36,overFlow:'hidden',marginTop:7}}>
                            <p>来自{storeDetails.wechat}的分享</p>
                        </div>
                    </div>
                    <Link
                        to="/contactMe"
                        query={{wechat:storeDetails.wechat,mobile:storeDetails.mobile,qq:storeDetails.qq}}>
                        <div style={{height:20,width:63.5,lineHeight:0,marginTop:18}}>
                            <img src={require('../../Images/contactMe.png')} alt=""/>
                        </div>
                    </Link>
                </div>
                <div className="carouselHeight">
                    <Carousel
                        images = {storeBanner}
                    />
                </div>
                <Tabscontrol
                    onClick={(index)=>this.onChangeTab(index)}
                >
                    <div name="最新上架"></div>
                    <div name="人气排行"></div>
                    <div name="最高价"></div>
                    <div name="最低价"></div>
                </Tabscontrol>

                <div className="imgContainer width_100 pr" style={{marginTop:-25}}>
                    {
                        storeDetail == ''?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'查询列表是空的哦~'}
                            />
                            :
                        storeDetail&&storeDetail.map((el,index)=>{
                            return (
                                <Link to="/goodsDescription" query={{id:el.ID}}>
                                    <StoreDetails
                                        key = {index}
                                        float = {index%2==0?'left':'right'}
                                        title = {el.NAME}
                                        price = {el.CURRENT_PRICE}
                                        imgurl = {el.IMAGE}
                                    />
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
