/**
 * Created by asus on 2016/12/7.
 */
import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search';
import '../../Stylesheets/App/homePage.css';
import '../../Stylesheets/App/MsgListPage.css';
import {_NearByShop,AmapNearby} from '../../Action/auth'
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
            shopList:''
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
        await _NearByShop(latitude,longitude,address)
            .then(res=>{
                this.setState({shopList:res})
            })
            .catch(err=>{
                console.warn('_NearByShop',err)
            })
    }

    //搜索高德附近店铺
    /*getNearbyShop(value){
        if(this.over){
            return
        }
        const {latitude,longitude} = this.state
        AmapNearby('6d68610961e69ad429d0f1613d08674f','58ad33b77bbf195ae874e289',1,value?value:'',longitude,latitude)
            .then(res=>{
                const {datas} = res
                if(datas.length==0){
                    this.over = true
                }else{
                    this.dataList = this.dataList.concat(datas)
                    this.setState({shopList:this.dataList})
                }
                console.warn('定位测试',this.dataList)
            })
            .catch(err=>{
                console.warn('定位测试---',err)
            })
    }
*/
    render(){
        const {shopList} = this.state
        return(
            <div>
                <Search
                    location = {true}
                    style = {{backgroundColor:'#ff5500',paddingLeft:10,paddingRight:10}}
                    onClick = {(value)=>this.getNearbyShop(value)}
                />
                <div className="bkg_color overScroll" style={{position:'absolute',top:'2.2rem',bottom:0,overflow:'auto'}}>
                    <div className="flex flex-align-center" style={{padding:'5px 10px'}}>
                        <span className="di" style={{width:19,height:23,marginRight:10,lineHeight:0}}><img src={require('../../Images/path.png')} alt=""/></span>
                        <div className="font14 color9">{this.state.address?this.state.address:'暂未定位到当前地址'}</div>
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