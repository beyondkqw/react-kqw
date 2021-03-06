import React, { Component } from 'react';
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';
import {EecommendList} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'

export default class TeamAmount extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Eecommend:[]
        };
      }

    componentWillMount() {
        this.getEecommendList()
    }

    async getEecommendList(){
        await EecommendList()
            .then(res=>{
                this.setState({Eecommend:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {palyMoney,amount,memberName,imgUrl,toChange} = this.props.location.query
        const {Eecommend} = this.state
        return (
                toChange?
                    <div className="containerNav allIncome_Img supplement" style={{height:'100%'}}>
                        <div className="pa_top1 tc">
                            <span className="di incomeImg">
                                <img className="border_ra50" src={imgUrl} alt=""/>
                            </span>
                            <div className="f12 color9 mt5">{memberName}</div>
                            <div className="f25 color9 mt6"><span>+</span><span>{amount?amount:0}</span></div>
                        </div>
                    </div>
                    :
                    <div className="pr">
                        <div className="rankHeader flex flex-align-center flex-pack-justify-end">
                            <div>
                                <div className="di rank-head-cell font14 mr10">
                                    粉丝:{amount?amount:0}名
                                </div>
                                <div className="di rank-head-cell font14 mr10">
                                    直推消费:{palyMoney?palyMoney:0}元
                                </div>
                            </div>
                        </div>
                        {
                            Eecommend == ''?
                                <IsShowEmptyImg
                                    styleSheet={{width:69,height:72,marginTop:120}}
                                    title={'查询列表为空哦~'}
                                />
                                :
                            Eecommend&&Eecommend.map((el,index)=>{
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
        );
    }
}