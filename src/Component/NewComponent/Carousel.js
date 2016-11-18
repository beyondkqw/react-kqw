import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';
import '../../css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import SwipeableViews from 'react-swipeable-views';

//just for test

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class Carousel extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.image = [{url:require('../../Images/bowel.png')},{url:require('../../Images/bowel.png')},{url:require('../../Images/bowel.png')}]
        this.state = {

        };
      }

    render() {
        return (
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

        );
    }
}
