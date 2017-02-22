import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

export default class Cell_7 extends Component {
    render() {
        const {imgUrl} = this.props
        return (
            <div>
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
                <div className="width100 border_top border_bottom" style={{height:SCREEN_WIDTH/3.45}}>
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
                    <Link to={imgUrl[6]&&imgUrl[6].webUrl}>
                        <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                            <div className="pr width100 height_all">
                                <img src={imgUrl[6]&&imgUrl[6].img} alt=""/>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        );
    }
}
