import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';
import {TeamMembers} from '../../Action/auth';


export default class MyCustomer extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberList:[]
        };
      }
    componentWillMount() {
        this.getMenbersList()
    }
    //成员列表
    async getMenbersList(){
        await TeamMembers()
            .then(res=>{
                this.setState({memberList:res.resultList})
            })
            .catch(err=>{
                console.warn('获取列表成功',err)
            })
    }
    render() {
        const {memberList} = this.state
        const {teemCount,teemAmount} = this.props.location.query
        return (
            <div className="containerNav">
                <div className="rankHeader flex flex-align-center flex-pack-justify-end">
                    <div>
                        <div className="di rank-head-cell font14 mr10">
                            团队人数:{teemCount?teemCount:0}名
                        </div>
                        <div className="di rank-head-cell font14 mr10">
                            团队消费:{teemAmount?teemAmount:0}
                        </div>
                    </div>
                </div>
                    <SplitLine />
                    {
                        memberList.length == 0?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'团队人数暂时为空哦~'}
                            />
                            :
                            memberList&&memberList.map(el=>{
                            return(
                                <Link to="/personalCenter/toWatchOtherInfo" query={{memberId:el.accId}}>
                                    <RankRow
                                        rightCursor={true}
                                        more={true}
                                        memberName = {el.memberName}
                                        imgUrl = {el.imageUri}
                                        vipPoints = {el.vipPoints?el.vipPoints:0}

                                    />
                                </Link>
                            )
                        })
                    }
            </div>
        );
    }
}
