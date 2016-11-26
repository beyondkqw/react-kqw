import React, { Component } from 'react';
import GivingList from '../../Component/CommonComponent/GivingList';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/personal.css';

const PointGivingList = [
    {title:'积累数量',describing:200},
    {title:'可有数量',describing:5688.28},
    {title:'不可用数量',describing:0},
    {title:'获赠人ID',describing:'点击确认后会提示昵称'}
];
export default class PointGiving extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="clearAll">
                    {
                        PointGivingList.map((el,index)=>{
                            return (
                                <GivingList
                                    style={index==0?'color_yellow':''}
                                    backgroundColor={index==0?'bkg_fadeff':''}
                                    isShow={index==0||index==1?'di':'dn'}
                                    title={el.title}
                                    describing={el.describing}
                                />
                            )
                        })
                    }
                </div>
                <div className="height_charge border_bottom plAll font14">
                    <div className="fl lh2 color6">转赠数量</div>
                    <div className="fr lh2 f12 color9 tr">
                        <span><input className="borderno tr" type="text" value="0"/></span>
                    </div>
                </div>
                <CommonBtn
                    title={'确认转账'}
                />
            </div>
        );
    }
}
