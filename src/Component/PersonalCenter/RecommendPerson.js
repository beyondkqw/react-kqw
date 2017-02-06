import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/personal.css';
import {UserInfo} from '../../Action/auth'

export default class RecommendPerson extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            recommendInfoMsg:[]
        };
      }
    componentWillMount() {
        this.recommendId = this.props.location.query.RecommendId
        console.log('RecommendId',this.recommendId)
        if(this.recommendId == ''){
            return
        }else{
            this.getMyRecommend(this.recommendId)
        }

    }
    //查看推荐人信息
    getMyRecommend(id){
        UserInfo(id)
            .then(res=>{
                this.setState({recommendInfoMsg:res})
            })
    }
    render() {
        const {recommendInfoMsg} = this.state
        return (
            <div className="containerNav">
                <SplitLine />
                {
                    this.recommendId == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'暂无推荐人哦'}
                        />
                :
                <div>
                    <div className="list-block m0">
                        <Link>
                            <li className="item-content pl" style={{minHeight:60}}>
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner font14">
                                    <div className="item-title color6">聚朵云头像</div>
                                    <div className="item-after pr headerImg" style={{maxHeight:40}}>
                                        <img className="border_ra50" src={recommendInfoMsg.IMAGE_URI} alt=""/>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </div>
                    <div className="list-block m0">
                        <ul>
                            <li className="item-content pl border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner font14">
                                    <div className="item-title color6">会员名</div>
                                    <div className="item-after fr tr">
                                        {recommendInfoMsg.MEMBER_NAME}
                                    </div>
                                </div>
                            </li>
                            <li className="item-content pl border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner font14">
                                    <div className="item-title color6">性别</div>
                                    <div className="item-after color9">{recommendInfoMsg.SEX==0?'男':'女'}</div>
                                </div>
                            </li>
                            <Link
                                to="/personalCenter/erweiCode"
                                query={{image:recommendInfoMsg.IMAGE_URI,memberName:recommendInfoMsg.MEMBER_NAME}}
                            >
                                <li className="item-content pl border_bottom">
                                    <div className="item-media"><i className="icon icon-f7"></i></div>
                                    <div className="item-inner">
                                        <div className="item-title color6  font14">我的二维码名片</div>
                                        <div className="item-after">
                                            <span className="di qrCode">
                                                <img src={require('../../Images/QrCode.png')} alt=""/>
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="fl color6">姓名</div>
                                    <div className="fr f12 color9 tr">
                                        <span className="di height_all">
                                            {recommendInfoMsg.REAL_NAME}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="fl color6">地区</div>
                                    <div className="fr f12 color9 tr">
                                        <span className="di height_all">
                                            {recommendInfoMsg.AREA}
                                        </span>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="userHeight border_bottom plr font14">
                                    <div className="fl color6">详细信息</div>
                                    <div className="fr f12 color9 tr">
                                        <span>
                                            {recommendInfoMsg.ADDRESS}
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                }
            </div>
        );
    }
}
