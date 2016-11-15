import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';
import '../../css/bootstrap.min.css';

export default class Carousel extends Component {
    render() {
        return (
            <div id="myCarousel" className="carousel slide carouselHeight">
                <ol className="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" className="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner height_all">
                    <div className="item active height_all">
                        <img src={require("../../Images/airConditioning.png")}/>
                    </div>
                    <div className="item">
                        <img src={require("../../Images/bowel.png")}/>
                    </div>
                    <div className="item">
                        <img src={require("../../Images/phone.png")}/>
                    </div>
                </div>
            </div>
        );
    }
}
