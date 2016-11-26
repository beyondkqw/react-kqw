import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import PersonInformation from '../../Component/CommonComponent/PersonInformation';
import CellComponent from '../../Component/CommonComponent/CellComponent';
import '../../Stylesheets/App/personal.css';

const GivingList = [
    {imgUrl:require('../../Images/total.png'),title:'积分转赠',describing:'送积分予好友',link:'/personalCenter/pointGiving'},
    {imgUrl:require('../../Images/payment.png'),title:'余额转赠',describing:'余额转赠满满的爱',link:'/personalCenter/balanceGiving'}
];
export default class CommisionGiving extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <PersonInformation />
                <SplitLine />
                <div className="clearAll">
                    {
                        GivingList.map((el,index)=>{
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
                <div>

                </div>
            </div>
        );
    }
}
