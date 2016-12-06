import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import GivingList from '../../Component/CommonComponent/GivingList';
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';

const MemberList = [
    {title:'自己消费金额',describing:'5000.00',link:''},
    {title:'直推人数',describing:'54',link:'/paymentOther'},
    {title:'直推消费金额',describing:'12',link:'/alreadyUsed'},
    {title:'团队人数',describing:'4658748',link:'/diaryContainer'},
    {title:'团队消费金额',describing:'4658748',link:'/diaryContainer'}
];
export default class MemberInfo extends Component {
    render() {
        return (
            <div className="containerNav">
                <RankRow  more={true} num={1} isShow={true}/>
                <SplitLine />
                <div className="clearAll" style={{height:'160'}}>
                    {
                        MemberList.map((el,index)=>{
                            return (
                                <GivingList
                                    isShow={index==0||index==2?'di':'dn'}
                                    title={el.title}
                                    describing={el.describing}
                                />
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
