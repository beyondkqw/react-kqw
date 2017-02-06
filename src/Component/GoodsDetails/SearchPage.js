/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import Search from '../../Component/NewComponent/Search';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol';
import StoreDetails from '../../Component/GoodsDetails/StoreDetails';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import {ProductList} from '../../Action/auth';
import {Link} from 'react-router'

export default class SearchPage extends Component {

      // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.compositor = ['默认排序','价格从低到高','价格从高到低']
        this.state = {
            isChoose : 0,
            display_0 : false,
            display_2 : false,
            showByColumn : false,
            history : false,
            orderName:'',
            order:'',
            goodsList:[],
            minPrice:'',
            maxPrice:''
        };
      }
    async componentWillMount(){
        await this.getOrder('','','','','')
    }
    //搜索
    async SearchBtn(value){
        console.log('value',value);
        await this.getOrder(value,'','','','');
    }
    //排序的列表
    async SelectSortOrder(index){
        this.setState({isChoose:index})
        await    this.ChooseOneorder(index)
        this.getOrder('',this.state.order,this.state.orderName,'','');
        this.setState({display_0:false})
    }

    //设置价格区间
    async comfirmPrice(){
        await this.getOrder('','','',this.state.minPrice,this.state.maxPrice)
        this.setState({display_2:false})
    }

    //销量优先
    async SalesPreferred(){
        await this.getOrder('','asc','p.SALES','','')
    }

    //上下排序
    //async upDownOrder(){
    //    await this.getOrder('','','','','')
    //}

    //请求列表接口
    async getOrder(name,order,orderName,minPrice,maxPrice){
        await ProductList(name,order,orderName,minPrice,maxPrice)
        .then(res=>{
            this.setState({goodsList:res.resultList})
            console.log('res.resultList=======>',res.resultList)
        })
        .catch(err=>{
            console.warn('err',err)
        })
    }
    //选择某种排序方式
    ChooseOneorder(index){
        this.setState({orderName:'p.CURRENT_PRICE'});
        if(index === 0){
            this.setState({order:''});
            this.setState({orderName:''});
        }else if(index === 1){
            this.setState({order: 'asc'});
        }else if(index === 2){
            this.setState({order: 'desc'});
        }else{
            this.setState({order: ''});
        }
    }
    //选择排序方式
    chooseSortOrder(){
        const {display_0,isChoose} = this.state
        return(
            display_0?
                <ul className='compositor'>
                    {
                        this.compositor.map((el,index)=>{
                            return(
                                <li
                                    key = {index}
                                    onClick={()=>this.SelectSortOrder(index)}
                                    style={{background:isChoose==index?'#fff5f0':'#fff'}}
                                >
                                    <span style={{color:isChoose==index?'#ff5500':'#666'}}>{el}</span>
                                    {
                                        isChoose==index?
                                            <img src={require('../../Images/choose.png')} />
                                            :null
                                    }

                                </li>
                            )
                        })
                    }
                </ul>
                :null
        )
    }

    //筛选内容
    toScreen(){
        const {display_2} = this.state
        return(
            display_2?
                <div className="screen">
                    <p>价格范围选择</p>

                    <div>
                        <input placeholder="最低价"
                           ref="minPrice"
                           onChange={()=>this.setState({minPrice:this.refs.minPrice.value})}
                        />
                        <div className="liner" />
                        <input placeholder="最高价"
                           ref="maxPrice"
                           onChange={()=>this.setState({maxPrice:this.refs.maxPrice.value})}
                        />
                    </div>

                    <div>
                        <input
                            className="reset"
                            type="button"
                            value="重置"
                            onClick={()=>{this.refs.minPrice.value = '',this.refs.maxPrice.value = ''}}
                        />
                        <div className="blank" />
                        <input
                            className="makesure"
                            type="button"
                            value="确定"
                            onClick={()=>this.comfirmPrice()}
                        />
                    </div>
                </div>
                :null
        )
    }

    //tab切换
    onChange(index){
        const {display_0,display_2,showByColumn} = this.state
        //console.log('display',display_0)
        if(index==0){
            this.setState({display_0:!display_0,display_2:false})
        }else if(index==1){
            this.SalesPreferred()
            this.setState({display_0:false,display_2:false})
        }else if(index==2){
            this.setState({display_2:!display_2,display_0:false})
        }else if(index==3){
            //this.upDownOrder()
            this.setState({showByColumn:!showByColumn,display_2:false,display_0:false})
        }else{
            this.setState({display_2:false,display_0:false})
        }
    }

    render(){
        const {showByColumn,display_0,display_2,history,goodsList} = this.state
        return(
            <div className="containerNav"
                 style={{backgroundColor: showByColumn?'#fff':'rgb(245,245,245)'}}
            >
                <div className = 'searchContainer' style={{height:display_0||display_2?null:75}}>
                    <Search
                        //onFocus = {()=>this.setState({history:true})}
                        //onBlur = {()=>this.setState({history:false})}
                        onClick = {(value)=>this.SearchBtn(value)}
                        display = {this.state.history}
                        style={{backgroundColor:'#ff5500'}}
                    />
                    {/*todo scroll滚动时置顶fixed*/}
                    <Tabscontrol
                        index = {2}
                        onClick = {(index)=>this.onChange(index)}
                    >
                        {/*综合排序tag*/}
                        <div name="综合排序">
                            {
                                this.chooseSortOrder()
                            }
                        </div>

                        {/*销量优先---tag*/}
                        <div name="销量优先"
                            onClick={()=>this.SalesPreferred()}
                        >
                        </div>

                        {/*筛选tab*/}
                        <div
                            name={<span><img src={require('../../Images/screen.png')} className = 'screenImg'/>筛选</span> }
                        >
                            {  this.toScreen() }
                        </div>

                        {/*切换显示方式*/}
                        <div name={<img src={require('../../Images/array.png')} className='arrayImg'/>}>
                        </div>
                    </Tabscontrol>

                    {/*modal遮罩层*/}
                    {
                        display_0||display_2?
                            <div
                                className="cover"
                                onClick = {()=>this.setState({display_0:false,display_2:false})}
                            ></div>
                            :null
                    }
                </div>


                {/*商品列表---最下层*/}
                <div
                    onClick = {()=>this.setState({history:false})}
                    className="goodListContainer"
                >
                    <div className="imgContainer width_100">
                        {
                            goodsList == ''?
                                <IsShowEmptyImg
                                    styleSheet={{width:69,height:72,marginTop:120}}
                                    title={'查询列表是空的哦~'}
                                />
                                :
                            goodsList&&goodsList.map((el,index)=>{
                                return (
                                    showByColumn?
                                        <Link to = {'/goodsDescription/'} query = {{id:el.ID}}>
                                            <StoreRow
                                                title = {el.NAME}
                                                price = {el.CURRENT_PRICE}
                                                imgurl = {el.IMAGE}
                                            />
                                        </Link>
                                        :
                                        <Link to = {'/goodsDescription/'} query = {{id:el.ID}}>
                                            <StoreDetails
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
            </div>
        )
    }
}