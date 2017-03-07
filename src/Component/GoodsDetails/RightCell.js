/**
 * Created by asus on 2016/11/23.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';

export default class RightCell extends Component {

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
                    {/*<div>云商城</div>*/}
                    <div className="df items-cell" >
                        {
                            rightValue.map(el=>{
                                return(
                                    <Link to="/GoodsDetail/SearchPage" query={{type:el.id}}>
                                        <div style={{margin:'15px 10px 10px 0'}}>
                                            <div className="right-img">
                                                <img src={el.img}/>
                                            </div>
                                            <div className="color9 tc right-img"
                                                 style={{overflow:'hidden',textOverflow:"ellipsis",
                                                 whiteSpace: 'nowrap',height:20}}>{el.name}</div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}