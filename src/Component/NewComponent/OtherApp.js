import React, { Component } from 'react';
import QuickRouter from '../../Component/NewComponent/QuickRouter'
import '../../Stylesheets/App/homePage.css';
import {TagList} from '../../Action/auth'

const router = [
    {name:'商学院',imgUrl:'background-color:#0074d9',path:'cloudCartoon'},
    {name:'云卡通',imgUrl:'background-color:#00d95a',path:'cloudCartoon'},
    {name:'充值中心',imgUrl:'background-color:#0074d9',path:'cloudCartoon'},
    {name:'聚云廉',imgUrl:'background-color:#00d95a',path:'cloudCartoon'},
    {name:'旅行',imgUrl:'background-color:#0074d9',path:'cloudCartoon'},
    {name:'虚礼购物',imgUrl:'background-color:#0074d9'},
    {name:'附近店铺',imgUrl:'background-color:#0074d9',path:'/nearbyShop/locationSearch'},
    {name:'分类',imgUrl:'background-color:#0074d9',path:'/goodsDetails/goodsCategory'}
]

export default class OtherApp extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tagItem:[]
        };
      }
    componentWillMount() {
        this.getTagList()
    }
    //首页导航栏
    async getTagList(){
        await TagList(1)
            .then(res=>{
                this.setState({tagItem:res.resultList})
            })
            .catch(err=>{
                console.warn('getHomeMoudle',err)
            })
    }
    render() {
        const {tagItem} = this.state
        return (
            <div className="oapp">
                <ul>
                    {
                        tagItem&&tagItem.map((el,index)=>{
                            return(
                                <QuickRouter
                                    routerName={el.name}
                                    routerUrl={el.img}
                                    routerPath={el.link}
                                />
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}
