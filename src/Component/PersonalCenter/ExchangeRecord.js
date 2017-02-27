import React, { Component } from 'react';
import RankRow from './RankRow'
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';
import {EecommendList} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'

export default class ExchangeRecord extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Eecommend:[]
        };
    }

    render() {
        const {Eecommend} = this.state
        return (
            <div className="containerNav">
                <div className="list-block m0">
                    <ul>
                        <div className="line"></div>
                        <li className="width100 f14 flex pt7">
                            <div className="flex-1 color_reduce pa_left1">-562</div>
                            <div className="flex-1 color_a">购物使用</div>
                            <div className="flex-1 color_a">2017-01-04 13:26</div>
                        </li>
                        <li className="width100 f14 flex pt7">
                            <div className="flex-1 color_add pa_left1">+562</div>
                            <div className="flex-1 color_a">购物使用</div>
                            <div className="flex-1 color_a">2017-01-04 13:26</div>
                        </li>
                        {/*{
                            Itemlist.map((el,index)=>{
                                return(
                                    <li>12</li>
                                )
                            })
                        }*/}
                    </ul>
                </div>
            </div>

        );
    }
}