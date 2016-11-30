/**
 * Created by asus on 2016/11/23.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';

export default class GoodsCategory extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
      }

    render(){
        const {rightValue,name} = this.props
        return(
            <div className="rightContainer color9">
                <div className="right-title df alignItem-center">{name}</div>
                <div className="r-content-container">
                    <div>云商城</div>
                    <div className="df items-cell" >
                        {
                            rightValue.map(el=>{
                                return(
                                    <div>
                                        <div className="right-img">
                                            <img src={el.img}/>
                                        </div>
                                        <div>{el.name}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}