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
          this.amount = 0
        this.select = []
          this.selectNum = []
          this.selectDel = []
        this.state = {
            selectAll:false,
            toRender:1,
            shopCarList:[],
            amount : 0 ,
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }


    componentWillMount() {
        this.getShopCarList()
    }

    async getShopCarList(){
       await ShopCarList(1)
        .then(res=>{
            const {resultList} = res
            this.setState({shopCarList:resultList})
        })
    }

    componentDidUpdate(aa) {
        let a = document.getElementById('aa')
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

        this.countAmount()
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
        this.countAmount()
        this.setState({toRender:1})
    }

    async editShopNum(id,count,type){
        await EditShopNum(id,count)
            .then(res=>{
                let num = this.selectNum[id]?this.selectNum[id]:0
                if(type){
                    this.selectDel[id] = false
                    this.selectNum[id] = num + 1
                }else{
                    console.log('count',count)
                    if(count>0){
                        if(!this.selectDel[id]){
                            this.selectNum[id] = num -1
                        }
                    }
                }
                this.countAmount()
            })
            .catch(err=>{
                console.warn('更新购物车失败',err)
            })
    }

    //计算总价
    countAmount() {
        this.state.shopCarList.map(el=>{
            let num = this.selectNum[el.CAR_ID]?this.selectNum[el.CAR_ID]:0
            this.select.map(item=>{
                if(el.CAR_ID==item){
                    this.amount += el.PRICE*el.PRODUCT_NUM + el.PRICE*num
                }
                console.log('el.PRICE*el.PRODUCT_NUM===>',(el.PRICE)*(el.PRODUCT_NUM))
                console.log('el.PRICE*num===>',el.PRICE*num)
                console.log('this.amount===>',el.PRICE*el.PRODUCT_NUM + el.PRICE*num)
            })
        })
        console.log('this.amount============>',this.amount)
        this.setState({amount:this.amount})
        this.amount = 0
    }

    //删除购物车
    async Del(id){
        this.selectDel[id] = true
        if(confirm("确定删除商品？")){
            await DelShopCar([id])
                .then(res=>{
                    this.getShopCarList()
                    this.countAmount()
                })
        }else{
            this.getShopCarList()
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
    }

    render() {
        const {shopCarList,amount} = this.state
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
                                        changeNum ={(value,type)=>this.editShopNum(el.CAR_ID,value,type)}
                                        del={value=>this.Del(el.CAR_ID,value)}
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
                                <span className="colorff f12">￥</span><span className="colorff font18">{amount}</span>
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
