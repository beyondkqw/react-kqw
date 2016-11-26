import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import PersonInformation from '../../Component/CommonComponent/PersonInformation';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/cloudCard.css';

const CloudList = [
    {imgUrl:require('../../Images/total.png'),title:'总额',describing:'1256.26',link:''},
    {imgUrl:require('../../Images/payment.png'),title:'代付款',describing:'代付款项目',link:'/paymentOther'},
    {imgUrl:require('../../Images/used.png'),title:'已使用',describing:'125896.36',link:'/alreadyUsed'},
    {imgUrl:require('../../Images/diary.png'),title:'全部日志',describing:'待付款项目',link:'/diaryContainer'}
];
export default class CloudCard extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <PersonInformation />
                <SplitLine />
                <div className="recharge border_bottom plr">
                    <div className="color_yellow fl height_all">
                        <span className="f15">￥</span><span className="f25">5678</span>
                    </div>
                    <Link>
                        <button className="fr settleAccount border_ra color_white mt11">充值</button>
                    </Link>
                </div>
                <div className="clearAll">
                    {
                        CloudList.map((el,index)=>{
                            return (
                                <CellComponent
                                    className={index%2==0?'border_right':''}
                                    imgUrl={el.imgUrl}
                                    title={el.title}
                                    describing={el.describing}
                                    link={el.link}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
