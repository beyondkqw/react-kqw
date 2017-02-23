import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search'
import TabBar from '../../Component/NewComponent/TabBar';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';
import {StoreType,StoreList} from '../../Action/auth'
import Footer from '../../Component/NewComponent/Footer';

export default class CloudComplex extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.StoreTypeItem = [];
        this.StoreTypeId = [];
        this.state = {
            index:0,
            id:this.StoreTypeId[0]
        };
    }

    async componentWillMount() {

        await this.getStoreType()
        this.changTab(0,this.StoreTypeId[0])

    }

    //获取店铺类型
    async getStoreType(){
        await  StoreType()
            .then(res=>{
                res.map(item=>{
                    this.StoreTypeItem.push(item.name)
                    this.StoreTypeId.push(item.id)
                })
                this.setState({torender:1})

            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }

    //请求列表接口
    async getStoreList(type,name){
        await StoreList(type,name)
            .then(res=>{
                this.setState({storeDetail:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    //交换
    changTab(index,id){
        this.setState({id:id})
        this.getStoreList(id,'')
    }

    //搜索
    searchStore(value){
        this.getStoreList(this.state.id,value)
    }

    render() {
        const {storeDetail} = this.state
        return (
            <div style={{position:'absolute',top:0,right:0,left:0,bottom:0,overflow:'auto'}}>
                <div className="flex pf t0 width100" style={{zIndex:2,transform: 'translate3d(0,0,0)',left:0}}>
                    <div className="flex1">
                        <Search
                            style={{backgroundColor:'#ff5500'}}
                            location = {true}
                            onClick={(value)=>this.searchStore(value)}
                        />
                    </div>
                </div>
                {/*<div style={{marginTop:'2.2rem'}}>
                    <TabBar
                        willdo = {true}
                        index = {0}
                        onClick = {index=>this.changTab(index,this.StoreTypeId[index])}
                        contents={this.StoreTypeItem}
                    />
                </div>*/}
                <div style={{marginTop:'2.2rem'}}>
                    <Tabscontrol
                        onClick = {index=>this.changTab(index,this.StoreTypeId[index])}
                    >
                        {
                            this.StoreTypeItem&&this.StoreTypeItem.map(el=>{
                                return (
                                    <div name={el}></div>
                                )
                            })
                        }
                    </Tabscontrol>
                </div>
                <div className="pr" style={{marginBottom:54,marginTop:'-25'}}>
                {
                    storeDetail == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'列表是空的哦~'}
                        />
                        :
                    storeDetail&&storeDetail.map(el=>{
                        return(
                            <Link to="/store" query={{storeId:el.id}}>
                                <div className="_order_height border_bottom pr plAll df">
                                    <div className="_order_img height_all">
                                        <img src={el.img} alt=""/>
                                    </div>
                                    <div className="flex1 font14 _order_margin">
                                        <p className="color6 db">{el.name}</p>
                                        {/*<p className="color9 oh_height mt3">
                                            主营衣服
                                        </p>*/}
                                        <p className="color9 distance_h mt3 pr">
                                            <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                                            <span className="pa bottom0">据您{el.distance}千米</span>
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                </div>
                <Footer
                    index = {1}
                />

            </div>
        );
    }
}
