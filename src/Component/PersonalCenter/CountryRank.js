/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {Link} from 'react-router';
import RankRow from './RankRow'
import {CountryRankList} from '../../Action/auth'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'

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
        await CountryRankList('')
        .then(res=>{
            console.log('CountryRankList',res)
            const {resultList} = res

            this.setState({countryRank:resultList})
        })
    }

    render(){
        const {countryRank} = this.state
        const {toShowTeam,teemCount,teemAmount} = this.props.location.query
        return(
            <div className="containerNav">
                <div className="rankHeader flex flex-align-center flex-pack-justify-end">
                    {
                        toShowTeam?
                            <div>
                                <div className="di rank-head-cell font14 mr10">
                                    团队人数:{teemCount?teemCount:0}名
                                </div>
                                <div className="di rank-head-cell font14 mr10">
                                    团队消费:{teemAmount?teemAmount:0}
                                </div>
                            </div>
                            :
                            <div>
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
                    }

                </div>
                <div className="pr">
                    {
                        countryRank == ''?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'查询列表是空的哦~'}
                            />:
                        countryRank&&countryRank.map((el,index)=>{
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

            </div>
        )
    }
}