/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {Link} from 'react-router';
import RankRow from './RankRow'
import {CountryRankList} from '../../Action/auth'
//import $ from '../../js/jquery.min'

const icon = [
    require('../../Images/person/first.png'),
    require('../../Images/person/second.png'),
    require('../../Images/person/third.png')

]


export default class CountryRank extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            countryRank : []
        };
      }

    componentWillMount() {
        this.getCountryRank()
    }

    async getCountryRank(){
        await CountryRankList()
        .then(res=>{
            console.log('CountryRankList',res)
            const {resultList} = res

            this.setState({countryRank:resultList})
        })
    }

    render(){
        const {countryRank} = this.state
        return(
            <div>
                <div className="rankHeader flex flex-align-center flex-pack-justify-end">
                    <Link to='/personalCenter/memberInfo'>
                        {/*
                         <div className="rank-head-cell font14 mr10">
                         我的排名:54名
                         </div>
                        */}
                    </Link>
                    <Link to='/personalCenter/memberInfo'>
                        <div className="rank-head-cell font14 mr10">
                            我的总分:{this.props.location.query.point}
                        </div>
                    </Link>

                </div>

                {
                    countryRank.map((el,index)=>{
                        return(
                            <RankRow
                                _vipPoints={el.vipPoints}
                                imgUrl={el.imageUri}
                                memberName={el.memberName}
                                num={index+1}
                                more={true}
                                vipPoints={el.lv}
                            />
                        )
                    })
                }

            </div>
        )
    }
}