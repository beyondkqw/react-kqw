import React, { Component } from 'react';
import QuickRouter from '../../Component/NewComponent/QuickRouter'
import '../../Stylesheets/App/homePage.css';

const router = [
    {name:'商学院',imgUrl:'background-color:#0074d9',path:'cloudCartoon'},
    {name:'云卡通',imgUrl:'background-color:#00d95a',path:'cloudCartoon'},
    {name:'充值中心',imgUrl:'background-color:#0074d9',path:'cloudCartoon'},
    {name:'聚云廉',imgUrl:'background-color:#00d95a',path:'cloudCartoon'},
    {name:'旅行',imgUrl:'background-color:#0074d9',path:'cloudCartoon'},
    {name:'虚礼购物',imgUrl:'background-color:#0074d9'},
    {name:'社区超市',imgUrl:'background-color:#0074d9',path:'/personalCenter/nearbyShop'},
    {name:'分类',imgUrl:'background-color:#0074d9',path:'/goodsDetails/goodsCategory'}
]


export default class OtherApp extends Component {
    render() {
        return (
            <div className="oapp">
                <ul>
                    {
                        router.map((el,index)=>{
                            return(
                                <QuickRouter
                                    routerName={el.name}
                                    routerUrl={el.imgUrl}
                                    routerPath={el.path}
                                />
                            )
                        })
                    }

                </ul>
            </div>
        );
    }
}
