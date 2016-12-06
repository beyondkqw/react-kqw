import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';

const ruleList=[
    {num:'1、',declaration:'推荐一人可得10分'},
    {num:'2、',declaration:'购买物品,一元为一份,取证'},
    {num:'3、',declaration:'分佣是低等级会员不能得到高级会员的分佣金额'},
    {num:'4、',declaration:'分佣金额分为为止'},
    {num:'5、',declaration:'结构连上为分完的分佣金额贵平台所有'}
];
export default class MemberIntroduction extends Component {
    render() {
        return (
            <div className="containerNav">
                <div className="vipBar">
                    <div className="pr">
                        <div>
                            <span className="di cellHeight width100"></span>
                        </div>
                        <div className="pa top0 width100 font14 color6">
                            <div className="fl width40 tc">
                                <span className="di  cellSize bkg_ff tc color_white border_ra50 z_index">V3</span>
                                <p className="mt3">10000</p>
                            </div>
                            <div className="fl width20 tc">
                                <span className="di bigSize bkg_ff tc color_white border_ra50 z_index">V4</span>
                                <div className="mt3">
                                    <div>总分</div>
                                    <p>21000</p>
                                </div>
                            </div>
                            <div className="fl width40 tc">
                                <span className="di cellSize bkg_ff tc color_white border_ra50 z_index">V5</span>
                                <p className="mt3">20000</p>
                            </div>
                        </div>
                    </div>
                </div>
                <SplitLine />
                <div className="font14 rule">
                    <p className="color6">规则说明</p>
                    <ul className="color9">
                        {
                            ruleList.map(el=>{
                                return(
                                    <li><span>{el.num}</span><span>{el.declaration}</span></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
