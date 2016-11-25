import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import '../../css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import SwipeableViews from 'react-swipeable-views';
import ActiveTitle from '../../Component/NewComponent/ActiveTitle'

//just for test 2

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class NearbyShop extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.image = [
            {url:require('../../Images/clothes.png')},
            {url:require('../../Images/bowel.png')},
            {url:require('../../Images/clothesDetails.png')}]
        this.state = {

        };
    }

    render() {
        return (
            <div>
                <AutoPlaySwipeableViews
                    interval = {2000}
                >
                    {
                        this.image.map((el,index)=>{
                            return(
                                <img className="carouselImg" src = {el.url}/>
                            )
                        })
                    }
                </AutoPlaySwipeableViews>
                <ActiveTitle style={{backgroundColor:'#fff5f0'}}/>

                <div className="order_height border_bottom pr plAll df">
                    <div className="order_img height_all">
                        <img src={require('../../Images/storeClothes.png')} alt=""/>
                    </div>
                    <div className="flex1 font14 order_margin">
                        <p className="color6 db">代理商的店</p>
                        <p className="color9 oh_height mt3">
                            主营衣服
                        </p>
                        <p className="color9 distance_h mt3 pr">
                            <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                            <span className="pa bottom0">据您1.0千米</span>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}
