import React, { Component } from 'react';
import {Link} from 'react-router';
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
                <Link to={imgUrl[0]&&imgUrl[0].webUrl}>
                    <div className="width_50 fl height_all border_right tc pr">
                        <span className="di width_100" style={{height : SCREEN_WIDTH/2.3}}>
                            <img src={imgUrl[0]&&imgUrl[0].img} alt=""/>
                        </span>
                    </div>
                </Link>
                <div className="width_50 fl height_all">
                    <Link to={imgUrl[1]&&imgUrl[1].webUrl}>
                        <div>
                            <span className="di width_100" style={{height : SCREEN_WIDTH/4.6}}>
                                <img src={imgUrl[1]&&imgUrl[1].img} alt=""/>
                            </span>
                        </div>
                    </Link>
                    <Link to={imgUrl[2]&&imgUrl[2].webUrl}>
                        <div>
                            <span className="di width_100" style={{height : SCREEN_WIDTH/4.6}}>
                                <img src={imgUrl[2]&&imgUrl[2].img} alt=""/>
                            </span>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}
