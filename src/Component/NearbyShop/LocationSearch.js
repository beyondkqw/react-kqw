/**
 * Created by asus on 2016/12/6.
 */
import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search';
import '../../Stylesheets/App/homePage.css';

export default class LocationSearch extends Component {

    render(){
        return(
            <div className="containerNav" style={{backgroundColor:'#fff'}}>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-8 col-sm-offset-2 col-md-6 col-md-offset-3">
                            <Search
                                location = {true}
                                onClick = {()=>console.log('ssss')}
                            />

                            <div style={{height:10,backgroundColor:'#f5f5f5'}} />

                            <div className="">
                                <div
                                    className="location flex flex-align-center flex-pack-center color9 font14"
                                >
                                    <span style={{height:17,width:17,marginRight:5,lineHeight:0}}>
                                        <img src={require('../../Images/person/location.png')}/>
                                    </span>
                                    点击定位当前位置
                                </div>

                                <div className="location flex flex-v flex-pack-center" style={{paddingLeft:20}}>
                                    <p className="color6 font16">洪浪北</p>
                                    <p className="color9 f12">5号线</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}