/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import Search from '../../Component/NewComponent/Search';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol';
import StoreDetails from '../../Component/GoodsDetails/StoreDetails'

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',price:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',price:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',price:291,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',price:289,imgUrl:require('../../Images/clothes1.png')},
]


export default class SearchPage extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.compositor = ['默认排序','价格从低到高','价格从高到低']
        this.state = {
            isChoose : 0,
            display_0 : false,
            display_2 : false
        };
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
                                    onClick={()=>this.setState({isChoose:index})}
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
                        <input placeholder="最低价"/>
                        <div className="line" />
                        <input placeholder="最高价"/>
                    </div>

                    <div>
                        <input className="reset" type="button" value="重置"/>
                        <div className="blank" />
                        <input className="makesure" type="button" value="确定"/>
                    </div>
                </div>
                :null
        )
    }

    //tab切换
    onChange(index){
        const {display_0,display_2} = this.state
        //console.log('display',display_0)
        if(index==0){
            this.setState({display_0:!display_0,display_2:false})
        }else if(index==2){
            this.setState({display_2:!display_2,display_0:false})
        }else{
            this.setState({display_2:false,display_0:false})
        }

    }

    render(){
        const {isChoose,display_0,display_2} = this.state
        return(
            <div className="containerNav" >
                <div className = 'searchContainer' style={{height:display_0||display_2?null:75}}>
                    <Search />

                    {/*todo scroll滚动时置顶fixed*/}
                    <Tabscontrol
                        onClick = {(index)=>this.onChange(index)}
                    >
                        {/*综合排序tag*/}
                        <div name="综合排序">
                            {
                                this.chooseSortOrder()
                            }
                        </div>

                        {/*销量优先---tag*/}
                        <div name="销量优先" ></div>

                        {/*筛选tab*/}
                        <div
                            name={<span><img src={require('../../Images/screen.png')} className = 'screenImg'/>筛选</span> }
                        >
                            {  this.toScreen() }
                        </div>
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

                /*商品列表---最下层*/
                <div className="goodListContainer">
                    <div className="imgContainer width_100">
                        {
                            storeDetail.map((el,index)=>{
                                return (
                                    <StoreDetails
                                        float = {index%2==0?'left':'right'}
                                        title = {el.title}
                                        price = {el.price}
                                        imgurl = {el.imgUrl}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}