import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import Footer from '../../Component/NewComponent/Footer';
import ItemDetails from '../../Component/ShoppingCarts/ItemDetails';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import '../../Stylesheets/App/shoppingCarts.css';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {ShopCarList,EditShopNum,DelShopCar,SettlementShopCar} from '../../Action/auth'

const ItemDetail = [
    {id:0,title:'拼接雪纺连衣裙小清收到回复奇偶is飞机哦添加',price:288,color:'红色',size:'36',imgUrl:require('../../Images/storeClothes.png')},
    {id:1,title:'拼接驾驶的海外时间',price:289,color:'绿色',size:'38',imgUrl:require('../../Images/storeShoes.png')}]

export default class ShoppingCart extends Component {

      // 构造
      constructor(props) {
        super(props);
        // 初始状态
          //是否使用全选按钮
          this.isUseSelectAll = false
        this.select = []
        this.state = {
            selectAll:false,
            toRender:1,
            shopCarList:[]
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }


    componentWillMount() {
        this.getShopCarList()
        console.log('-----',this.context.router)
    }

    async getShopCarList(){
       await ShopCarList(1)
        .then(res=>{
            const {resultList} = res
            this.setState({shopCarList:resultList})
            console.log('购物车列表',res)
        })
    }

    componentDidUpdate(aa) {
        //console.log('didUpdata',aa)
        let a = document.getElementById('aa')
        console.log('aaaa',a.scrollTop)
    }
    //全选/反选
    async onChangeState(){
        this.isUseSelectAll = true
        this.setState({selectAll:!this.state.checked});
        if(this.select.length<this.state.shopCarList.length){
            this.select = []
            await this.setState({selectAll:true})
            this.state.shopCarList.map(el=>{
                this.select.push(el.CAR_ID)
            })
            console.log('this.select',this.select)
        }else{
            this.setState({selectAll:false})
            this.select = []
        }

        console.log('------',this.state.shopCarList.length)
        this.setState({toRender:1})
        console.log('selected',this.select)
    }
    //单选
    getSelect(state,id){
        this.isUseSelectAll = false
        console.log('state',state)
        if(state){
            this.select.push(id)
        }else{
            this.select = this.select.filter(el=>{
                if(el==id){
                    return false
                }
                return true
            })
        }
        this.setState({toRender:1})
        console.log('selectIndex',this.select)
    }

    async editShopNum(id,count){
        if(count>0){
            await EditShopNum(id,count)
                .then(res=>{
                    console.log('更新购物车成功',res)
                })
                .catch(err=>{
                    console.warn('更新购物车失败',err)
                })
        }else{
            if(confirm("确定删除商品？")){
            await DelShopCar([id])
                .then(res=>{
                    console.log('删除成功',res)
                    this.getShopCarList()
                })
            }else{
                this.getShopCarList()
            }
        }

    }

    async toSubmit(){
        if(this.select.length>0){
            await SettlementShopCar(this.select)
                .then(res=>{
                    console.log('购物车结算成功')
                    this.context.router.push({pathname:'/comfirmPayMoney',query:{orderId:res}})
                })
        }else{
            alert('请选择商品')
        }
       ///comfirmPayMoney
    }

    render() {
        const {shopCarList} = this.state
        return (
            <div id='aa'  className="containerNav bkg_color">
                <div className="wrap">
                    {
                        shopCarList == ''?
                           <IsShowEmptyImg
                               styleSheet={{width:69,height:72,marginTop:120}}
                               title={'列表是空的哦~'}
                           />
                            :
                        shopCarList&&shopCarList.map((el,index)=>{
                                return (
                                    <div className="plAll proPlay border_bottom">
                                    <CheckBox
                                        selectAll = {this.isUseSelectAll?this.state.selectAll:null}
                                        index={index}
                                        onSelect = {(state)=>this.getSelect(state,el.CAR_ID)}
                                    />
                                    <ItemDetails
                                        price={el.PRICE}
                                        title={el.NAME}
                                        attr={el.ATTR_DESC}
                                        imgurl={el.IMAGE}
                                        num={el.PRODUCT_NUM}
                                        minus={value=>this.editShopNum(el.CAR_ID,value)}
                                        add={value=>this.editShopNum(el.CAR_ID,value)}
                                    />
                                    </div>
                                )
                        })
                   }
                    <div className="height5 wrap"></div>
                    <div className="pf bottomCount wrap plr">
                        <span className="di check_radius pr fl">
                            <input
                                type="checkbox" id="checkAll"
                                checked={this.select.length==this.state.shopCarList.length?true:false}
                                onClick={()=>this.onChangeState()}
                                className="di isCheck"
                            />
                            <label htmlFor="checkAll"></label>
                        </span>
                        <span className="di font14 color6 ml5 fl height_all lh25">全选</span>
                        <div className="di ml5 pr">
                            <div className="mt2">
                                <label className="f12">合计</label>
                                <span className="colorff f12">￥</span><span className="colorff font18">258</span>
                            </div>
                            <span className="di pa f10">不含运费</span>
                        </div>
                        <button
                            onClick={()=>this.toSubmit()}
                            className="fr mt5 settleAccount border_ra color_white"
                        >
                            结算
                        </button>
                    </div>
                </div>
                <div className="wrap">
                    <div className="pf bottom0 wrap" style={{zIndex:100}}>
                        <nav className="bar-tab bkg_color wrap">
                            <Footer
                                index = {2}
                            />
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}
