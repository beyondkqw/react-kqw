import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';
import {UserInfo} from '../../Action/auth'

export default class ToWatchOtherInfo extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            memberId:'',
            userInfoMsg:[]
        };
      }
    async componentWillMount() {
        await this.setState({memberId:this.props.location.query.memberId})
        this.getMemberInfo(this.state.memberId)
    }
    //成员信息
    async getMemberInfo(accId){
        await UserInfo(accId)
            .then(res=>{
                this.setState({userInfoMsg:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {userInfoMsg} = this.state
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="list-block m0">
                    <li className="item-content pl" style={{minHeight:60}}>
                        <div className="item-media"><i className="icon icon-f7"></i></div>
                        <div className="item-inner font14">
                            <div className="item-title color6">聚朵云头像</div>
                            <div className="item-after pr headerImg" style={{maxHeight:40}}>
                                <input
                                    className="pa top0"
                                    type="file"
                                    style={{left:0,width:40,height:40,padding:0,opacity:0}}
                                />
                                <img className="border_ra50" src={userInfoMsg.IMAGE_URI} alt=""/>
                            </div>
                        </div>
                    </li>
                </div>
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">会员名</div>
                                <div className="item-after color9">{userInfoMsg.MEMBER_NAME}</div>
                            </div>
                        </li>
                        <li
                            className="item-content pl border_bottom"
                        >
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">性别</div>
                                <div className="item-after color9">{userInfoMsg.SEX==0?'男':'女'}</div>
                            </div>
                        </li>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">我的二维码名片</div>
                                <div className="item-after color9">小燕子66</div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">姓名</div>
                                <div className="fr f12 color9 tr">
                                    <span>{userInfoMsg.REAL_NAME}</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">邮箱</div>
                                <div className="fr f12 color9 tr">
                                    <span>{userInfoMsg.EMAIL}</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">地区</div>
                                <div className="fr f12 color9 tr">
                                    <span>{userInfoMsg.AREA}</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="userHeight border_bottom plr font14">
                                <div className="fl color6">详细信息</div>
                                <div className="fr f12 color9 tr">
                                    <span>{userInfoMsg.ADDRESS}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
