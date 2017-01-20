import React, { Component } from 'react';
import LeftImg from '../../Component/NewComponent/LeftImg'
import RightImg from '../../Component/NewComponent/RightImg'
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

//const imgUrl = [{imgUrl:require('../../Images/leftVoucher.png')},
//    {imgUrl:require('../../Images/rightTop.png')},{imgUrl:require('../../Images/rightBottom.png')}]
export default class Cell_3 extends Component {
    render() {
        const {imgUrl} = this.props
        return (
            <div className="width_100 border_top border_bottom" style={{height : SCREEN_WIDTH/2.3}}>
                <div className="width_50 fl height_all border_right tc pr">
                    <span className="di width_100" style={{height : SCREEN_WIDTH/2.3}}>
                        <img src={imgUrl[0].img} alt=""/>
                    </span>
                </div>
                <div className="width_50 fl height_all">
                    <div>
                        <span className="di width_100" style={{height : SCREEN_WIDTH/4.6}}>
                            <img src={imgUrl[1].img} alt=""/>
                        </span>
                    </div>
                    <div>
                        <span className="di width_100" style={{height : SCREEN_WIDTH/4.6}}>
                            <img src={imgUrl[2].img} alt=""/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
