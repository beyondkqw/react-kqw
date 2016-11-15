import React, { Component } from 'react';
import Cell_4 from '../../Component/NewComponent/Cell_4'
import '../../Stylesheets/App/homePage.css';


const cellFour = [{title:'一元购全场',quality:{color:'#ff70dc'}},
    {title:'全国包邮',quality:{color:'#74d0ff'}},{title:'运气王',quality:{color:'#c893ff'}},
    {title:'网购神器',quality:{color:'#7e93ff'}}]
export default class Cell_6 extends Component {
    render() {
        return (
        <div>
            <div className="cellSix width100 border_top">
                <div className="height_all">
                    <div className="width_50 fl height_all  pr border_right pb">
                        <div className="di">
                            <div className="pl">
                                <span className="di f12 mt bkImg">聚划算</span>
                                <span className="db f12 mt cs_color">品牌联合19.9元起</span>
                            </div>
                            <div className="pr width100 hfour mt">
                                <div className="cellSixImg line_center">
                                    <img src={require('../../Images/leftClothes.png')}/>
                                </div>
                            </div>
                        </div>
                        <div className="di pa b3 right10">
                            <div className="cellSix_img">
                                <img src={require('../../Images/test.png')} alt=""/>
                            </div>
                        </div>
                    </div>

                    <div className="width_50 fl height_all  pr border_right pb">
                        <div className="di">
                            <div className="pl">
                                <span className="di f12 mt bkImg">天天特价</span>
                                <span className="db f12 mt cs_color">千款9.9包邮</span>
                            </div>
                            <div className="pr width100 hfour mt">
                                <div className="cellSixImg line_center">
                                    <img src={require('../../Images/leftClothes.png')}/>
                                </div>
                            </div>
                        </div>
                        <div className="di pa b3 right10">
                            <div className="cellSix_img">
                                <img src={require('../../Images/test.png')} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cell_4 />
        </div>
        );
    }
}
