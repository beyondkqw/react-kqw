/**
 * Created by asus on 2016/12/7.
 */
import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search';
import '../../Stylesheets/App/homePage.css';
import '../../Stylesheets/App/MsgListPage.css';
import {_NearByShop,AmapNearby} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {Link} from 'react-router';

const type = ['','','','','','','','']
export default class NearShop extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            latitude:'',
            longitude:'',
            address:'',
            shopList:'',
            index : 0,
            isShow:0,
            orderItems:[],
            agentList:[],
            list: [],
            disabled:false,
            display:'block',
            items: [],
            pullDownStatus: 3,
            pullUpStatus: 0,
            scrollTop:0,
            status:''
        };
      }


    async componentDidMount() {

        await this.setState({
                address:sessionStorage.getItem('address'),
                latitude:sessionStorage.getItem('latitude'),
                longitude:sessionStorage.getItem('longitude')
                })
            this.getShopList()
        }


    async getShopList(){
        const {latitude,longitude,address} = this.state
        await _NearByShop(latitude,longitude,address,this.page,'')
            .then(res=>{
                this.setState({shopList:res.datas})
                this.setState({status:res.status})
                if(this.page==Math.ceil(res.total/res.pageSize)){
                    this.over=true;
                    this.setState({
                        pullUpStatus: 4
                    });
                }else{
                    this.setState({
                        pullUpStatus: 3
                    });
                }
                this.dataList = this.dataList.concat(res.resultList);
                this.setState({shopList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
            })
            .catch(err=>{
                console.warn('_NearByShop',err)
            })
    }

    //搜索高德附近店铺
    async getNearbyShop(value){
        if(this.over){
            return
        }
        const {latitude,longitude,address} = this.state
        await _NearByShop(latitude,longitude,address,this.page,value)
            .then(res=>{
                this.setState({shopList:res.datas})
                this.setState({status:res.status})
                if(this.page==Math.ceil(res.total/res.pageSize)){
                    this.over=true;
                    this.setState({
                        pullUpStatus: 4
                    });
                }else{
                    this.setState({
                        pullUpStatus: 3
                    });
                }
                this.dataList = this.dataList.concat(res.resultList);
                this.setState({shopList:this.dataList,display:(this.dataList.length==0)?'none':'block'});
                this.iScrollInstance.refresh();
                this.page++;
            })
            .catch(err=>{
                console.warn('定位测试---',err)
            })
    }



    render(){
        const {shopList,status} = this.state
        return(
            <div>
                <Search
                    location = {true}
                    style = {{backgroundColor:'#ff5500',paddingLeft:10,paddingRight:10}}
                    onClick = {(value)=>this.getNearbyShop(value)}
                />
                <div id='ScrollContainer' style={{webkitTransform:'translate3d(0,0,0)',overflow:'hidden'}}>
                    <div id='ListOutsite' style={{height: window.innerHeight-44}}
                         onTouchStart={this.onTouchStart} onTouchEnd={this.onTouchEnd}
                         onTouchMove={this.onTouchMove}>

                        <ul id='ListInside'>
                            {/*<p ref="PullDown" id='PullDown'>{this.pullDownTips[this.state.pullDownStatus]}</p>*/}
                            <div className="flex flex-align-center" style={{padding:'5px 10px'}}>
                                <span className="di" style={{width:19,height:23,marginRight:10,lineHeight:0}}><img src={require('../../Images/path.png')} alt=""/></span>
                                <div className="font14 color9">{this.state.address?this.state.address:'暂未定位到当前地址'}</div>
                            </div>
                            {
                                (this.state.status ===  0 || this.state.shopList.length == 0)?
                                    <IsShowEmptyImg
                                        styleSheet={{width:69,height:72,marginTop:120}}
                                        title={'查询列表是空的哦~'}
                                    />:
                                shopList&&shopList.map(el=>{
                                    return(
                                        <Link to="/store" query={{storeId:el.storeId}}>
                                            <div className="_order_height border_bottom pr plAll df">
                                                <div className="_order_img height_all">
                                                    <img src={el.img} alt=""/>
                                                </div>
                                                <div className="flex1 font14 _order_margin">
                                                    <p className="color6 db">{el._name}</p>
                                                    <div className="color9 distance_h mt3 pr">
                                                        <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                                                        <span className="pa bottom0">据您{Math.round(el._distance)}米</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
                                    )
                                })
                            }
                            <p ref="PullUp" id='PullUp'
                               style={{display:this.state.display}}
                            >{this.pullUpTips[this.state.pullUpStatus]}</p>
                        </ul>
                    </div>
                    {
                        shopList&&shopList.map(el=>{
                            return(
                                <Link to="/store" query={{storeId:el.id}}>
                                    <div className="_order_height border_bottom pr plAll df">
                                        <div className="_order_img height_all">
                                            <img src={el.img} alt=""/>
                                        </div>
                                        <div className="flex1 font14 _order_margin">
                                            <p className="color6 db">{el.name}</p>
                                            <div className="color9 distance_h mt3 pr">
                                                <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                                                <span className="pa bottom0">据您{Math.round(el.distance)*1000}米</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        })
                    }

                </div>
            </div>
        )
    }
}