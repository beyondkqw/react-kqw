import React, { Component } from 'react';
import Cell_4 from '../../Component/NewComponent/Cell_4'
import '../../Stylesheets/App/homePage.css';

export default class Cell_7 extends Component {
    render() {
        return (
            <div>
                <div className="voucherNav border_top">
                    <div className="width_50 fl height_all border_right pr">
                        <div className="pl">
                            <span className="di f12 mt">天天特价</span>
                            <span className="db f12 cs_color">千款9.9包邮</span>
                        </div>
                        <div className="pr width100 mt cellHeight">
                            <div className="cellsevenImg line_center">
                                <img src={require('../../Images/clothes.png')}/>
                            </div>
                        </div>
                    </div>
                    <div className="width_50 fl height_all">
                        <div className="border_bottom halfHeight pr">
                            <div className="di">
                                <div className="pl">
                                    <span className="di f12 mt">全球时尚</span>
                                    <span className="db f12 cs_color">大牌精致时尚</span>
                                </div>
                                <div className="pr width100 height2">
                                    <div className="cellRightImg line_center">
                                        <img src={require('../../Images/airConditioning.png')}/>
                                    </div>
                                </div>
                            </div>
                            <div className="di pa b3 right10">
                                <div className="cellSix_img">
                                    <img src={require('../../Images/bowel.png')} alt=""/>
                                </div>
                            </div>
                        </div>
                        <div className="halfHeight pr">
                            <div className="di">
                                <div className="pl">
                                    <span className="di f12 mt">全球时尚</span>
                                    <span className="db f12 cs_color">大牌精致时尚</span>
                                </div>
                                <div className="pr width100 height2">
                                    <div className="cellRightImg line_center">
                                        <img src={require('../../Images/airConditioning.png')}/>
                                    </div>
                                </div>
                            </div>
                            <div className="di pa b3 right10">
                                <div className="cellSix_img">
                                    <img src={require('../../Images/bowel.png')} alt=""/>
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
