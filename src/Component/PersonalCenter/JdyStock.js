/**
 * Created by asus on 2016/12/12.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class JdyStock extends Component {

    render(){
        return(
            <div>
                <div className="stockBanner flex flex-align-center flex-pack-center flex-v">
                    <p className="font14 color_white">昨日分红</p>
                    <p className="font30 color_white">5000</p>
                </div>

                <div style={{height:10,backgroundColor:'#e5e5e5'}} />
            </div>
        )
    }
}