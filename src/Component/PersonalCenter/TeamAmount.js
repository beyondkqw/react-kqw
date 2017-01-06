import React, { Component } from 'react';
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';

export default class TeamAmount extends Component {
    render() {
        const {palyMoney,amount,memberName,imgUrl,toChange} = this.props.location.query
        return (
                toChange?
                    <div className="containerNav allIncome_Img supplement">
                        <div className="pa_top1 tc">
                            <span className="di incomeImg">
                                <img className="border_ra50" src={imgUrl} alt=""/>
                            </span>
                            <p className="f12 color9 mt5">{memberName}</p>
                            <p className="f25 color6 mt6"><span>+</span><span>{amount?amount:0}</span></p>
                        </div>
                    </div>
                    :
                    <div className="pr">
                        <div className="rankHeader flex flex-align-center flex-pack-justify-end">
                            <div>
                                <div className="di rank-head-cell font14 mr10">
                                    直推人数:{amount?amount:0}名
                                </div>
                                <div className="di rank-head-cell font14 mr10">
                                    直推消费:{palyMoney?palyMoney:0}
                                </div>
                            </div>
                        </div>
                        <RankRow
                            _vipPoints={123}
                            imgUrl={'test'}
                            memberName={'束带结发'}
                            num={2}
                            more={true}
                            vipPoints={3}
                        />
                    </div>
        );
    }
}