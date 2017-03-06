import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';
import '../../css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import autoPlay from 'react-swipeable-views/lib/autoPlay';
import SwipeableViews from 'react-swipeable-views';
import {Link} from 'react-router';

//just for test 2

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
export default class Carousel extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.image = [{url:require('../../Images/bowel.png')},{url:require('../../Images/bowel.png')},{url:require('../../Images/bowel.png')}]
      }

    render() {
        const {images} = this.props
        return (
            <AutoPlaySwipeableViews
                interval = {2000}
            >
                {
                    images&&images.map((el,index)=>{
                        return(
                            <Link to='/toWebView' query={{url:el.URL}}>
                                <img className="carouselImg" src = {el.picture_url}/>
                            </Link>
                        )
                    })
                }
            </AutoPlaySwipeableViews>
        );
    }
}
