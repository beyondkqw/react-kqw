import React, { Component } from 'react';
import Cell_4 from '../../Component/NewComponent/Cell_4'
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
                <span className="di width_50" style={{height : SCREEN_WIDTH/3.41}}>
                    <img src="" alt=""/>
                </span>
                <span className="di width_50" style={{height : SCREEN_WIDTH/3.41}}>
                    <img src="" alt=""/>
                </span>
            </div>
            <Cell_4 />
        </div>
        );
    }
}
