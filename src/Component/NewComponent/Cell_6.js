import React, { Component } from 'react';
import Cell_4 from '../../Component/NewComponent/Cell_4'
import {Link} from 'react-router';
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'


const cellFour = [{title:'一元购全场',quality:{color:'#ff70dc'}},
    {title:'全国包邮',quality:{color:'#74d0ff'}},{title:'运气王',quality:{color:'#c893ff'}},
    {title:'网购神器',quality:{color:'#7e93ff'}}]
export default class Cell_6 extends Component {
    render() {
        const {imgUrl} = this.props
        return (
        <div>
            <div className="width_100 border_top border_bottom" style={{height : SCREEN_WIDTH/3.41}}>
                <Link to={imgUrl[0]&&imgUrl[0].webUrl}>
                    <span className="di width_50" style={{height : SCREEN_WIDTH/3.41}}>
                        <img src={imgUrl[0]&&imgUrl[0].img} alt=""/>
                    </span>
                </Link>
                <Link to={imgUrl[1]&&imgUrl[1].webUrl}>
                    <span className="di width_50" style={{height : SCREEN_WIDTH/3.41}}>
                        <img src={imgUrl[1]&&imgUrl[1].img} alt=""/>
                    </span>
                </Link>
            </div>
            <div className="width100 border_top border_bottom" style={{height:SCREEN_WIDTH/3.45}}>
                <Link to={imgUrl[2]&&imgUrl[2].webUrl}>
                    <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                        <div className="pr width100 height_all">
                            <img src={imgUrl[2]&&imgUrl[2].img} alt=""/>
                        </div>
                    </div>
                </Link>
                <Link to={imgUrl[3]&&imgUrl[3].webUrl}>
                    <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                        <div className="pr width100 height_all">
                            <img src={imgUrl[3]&&imgUrl[3].img} alt=""/>
                        </div>
                    </div>
                </Link>
                <Link to={imgUrl[4]&&imgUrl[4].webUrl}>
                    <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                        <div className="pr width100 height_all">
                            <img src={imgUrl[4]&&imgUrl[4].img} alt=""/>
                        </div>
                    </div>
                </Link>
                <Link to={imgUrl[5]&&imgUrl[5].webUrl}>
                    <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                        <div className="pr width100 height_all">
                            <img src={imgUrl[5]&&imgUrl[5].img} alt=""/>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
        );
    }
}
