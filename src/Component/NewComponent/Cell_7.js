import React, { Component } from 'react';
import Cell_4 from '../../Component/NewComponent/Cell_4'
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

export default class Cell_7 extends Component {
    render() {
        return (
            <div>
                <div className="width_100 border_top border_bottom" style={{height : SCREEN_WIDTH/2.3}}>
                    <div className="width_50 fl height_all border_right tc pr">
                        <span className="di width_100" style={{height : SCREEN_WIDTH/2.3}}>
                            <img src='' alt=""/>
                        </span>
                    </div>
                    <div className="width_50 fl height_all">
                        <div>
                            <span className="di width_100" style={{height : SCREEN_WIDTH/4.6}}>
                                <img src='' alt=""/>
                            </span>
                        </div>
                        <div>
                            <span className="di width_100" style={{height : SCREEN_WIDTH/4.6}}>
                                <img src='' alt=""/>
                            </span>
                        </div>
                    </div>
                </div>
                <Cell_4 />
            </div>
        );
    }
}
