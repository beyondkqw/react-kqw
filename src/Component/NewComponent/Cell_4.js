import React, { Component } from 'react';
import Cell_4children from '../../Component/NewComponent/Cell_4children'
import '../../Stylesheets/App/homePage.css';


const cellFour = [{title:'一元购全场',quality:{color:'#ff70dc'}},
    {title:'全国包邮',quality:{color:'#74d0ff'}},{title:'运气王',quality:{color:'#c893ff'}},
    {title:'网购神器',quality:{color:'#7e93ff'}}]
export default class Cell_4 extends Component {
    render() {
        return (
            <div className="cellFour width100 border_top border_bottom">
                {
                    cellFour.map(el=>{
                        return (
                            <Cell_4children
                                title = {el.title}
                                color = {el.quality}
                            />
                        )
                    })
                }
            </div>
        );
    }
}
