/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {Link} from 'react-router';
import RankRow from './RankRow'

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
                    <Link to='/personalCenter/memberInfo'>
                        <div className="rank-head-cell font14 mr10">
                            我的排名:54名
                        </div>
                    </Link>
                    <Link to='/personalCenter/memberInfo'>
                        <div className="rank-head-cell font14 mr10">
                            我的总分:3444
                        </div>
                    </Link>

                </div>

                <RankRow num={1} vip={true}/>
                <RankRow num={4} vip={true}/>
            </div>
        )
    }
}