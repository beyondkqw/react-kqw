/**
 * Created by asus on 2016/12/12.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class StockDetail extends Component {

    render(){
        return(
            <div>
                <div className="stockBanner flex flex-align-center flex-pack-center flex-v">
                    <p className="font14 color_white">昨日分红</p>
                    <p className="font30 color_white">5000</p>
                </div>

                <div style={{height:10,backgroundColor:'#f5f5f5'}} />

                <div
                    className="flex flex-align-center flex-pack-justify border_bottom"
                    style={{height:50,paddingLeft:10,paddingRight:10}}
                >
                    <span className="color6 font14">公司名称</span>
                    <span className="color9 font14">海瑞</span>
                </div>

                <div
                    className="flex flex-align-center flex-pack-justify border_bottom"
                    style={{height:50,paddingLeft:10,paddingRight:10}}
                >
                    <span className="color6 font14">持有股份</span>
                    <span className="color9 font14">100股</span>
                </div>

                <div
                    className="flex flex-align-center flex-pack-justify border_bottom"
                    style={{height:50,paddingLeft:10,paddingRight:10}}
                >
                    <span className="color6 font14">总共分红</span>
                    <span className="color9 font14">￥100</span>
                </div>

                <div
                    className="flex flex-align-center flex-pack-justify border_bottom"
                    style={{height:50,paddingLeft:10,paddingRight:10}}
                >
                    <span className="color6 font14">每股市价</span>
                    <span className="color9 font14">￥100</span>
                </div>
            </div>
        )
    }
}