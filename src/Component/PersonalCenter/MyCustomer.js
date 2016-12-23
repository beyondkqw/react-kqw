import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';
import {TeamMembers} from '../../Action/auth';


export default class MyCustomer extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberList:[],
            isEmptyMember:false
        };
      }
    componentWillMount() {
        this.getMenbersList()
    }
    //成员列表
    async getMenbersList(){
        await TeamMembers()
            .then(res=>{
                if(res.resultList == ''||res.resultList == null){
                    this.setState({isEmptyMember:true})
                    console.log('-----------+++++++++++++',this.state.isEmptyMember)
                }
                this.setState({memberList:res.resultList})
            })
            .catch(err=>{
                console.warn('获取列表成功',err)
            })
    }
    render() {
        const {memberList,isEmptyMember} = this.state
        return (
            <div className="containerNav">
                <div className="wrap">
                    <SplitLine />
                    {
                        memberList.map(el=>{
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
            </div>
        );
    }
}
