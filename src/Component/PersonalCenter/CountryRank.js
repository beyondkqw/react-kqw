/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {FollowList,Follow} from '../../Action/auth';
import RankRow from './RankRow'
//import $ from '../../js/jquery.min'

const icon = [
    require('../../Images/person/first.png'),
    require('../../Images/person/second.png'),
    require('../../Images/person/third.png')

]


export default class CountryRank extends Component {




        render(){
        return(
            <div>
                <div className="rankHeader flex flex-align-center flex-pack-justify-end">
                    <div className="rank-head-cell font14 mr10">
                        我的排名:54名
                    </div>

                    <div className="rank-head-cell font14 mr10">
                        我的总分:3444
                    </div>
                </div>

                <RankRow num={1} vip={true}/>
                <RankRow num={4} vip={true}/>
                <RankRow vip={true}/>
            </div>
        )
    }
}