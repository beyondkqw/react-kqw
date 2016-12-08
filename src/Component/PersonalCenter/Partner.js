import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import LiItem from '../../Component/CommonComponent/LiItem'
import PersonalInformation from '../../Component/PersonalCenter/PersonalInformation';
import '../../Stylesheets/App/personal.css';
import {MyPartner} from '../../Action/auth'

const partner = [
    {title:'我的推荐人',name:'老人与海',imgUrl:require('../../Images/myPatrner.png'),isShow:false,link:'personalCenter/userInfo'},
    {title:'我的客户',name:'50',imgUrl:require('../../Images/myapply.png'),isShow:true,link:'/personalCenter/myCustomer'}
]
export default class Partner extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            count : 0 ,
            recommendName : '',
            recommendId : ''
        };
      }

    componentWillMount() {
        this.getMyPartner()
    }

    getMyPartner(){
        MyPartner()
        .then(res=>{
            console.log('-----',res)
           //TEEM_MEMBER_COUNT RECOMMEND_NAME
            this.setState({
                count:res.TEEM_MEMBER_COUNT,
                recommendName:res.RECOMMEND_NAME,
                recommendId:res.RECOMMEND_ID
            })
        })
    }

    render() {
        const {count,recommendName,recommendId} = this.state
        return (
            <div>
                <div className ="list-block m0 font14">
                    <SplitLine />
                    <ul>
                        <Link to={'personalCenter/userInfo'}>
                            <li
                                className ={'item-content border_bottom isConfirmSet'}
                            >
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg"><img src={require('../../Images/myPatrner.png')} alt=""/></span>
                                        <span className="di margin15 color6">我的推荐人</span>
                                    </div>
                                    <div className="item-after color9 isSet">{recommendName}</div>
                                </div>
                            </li>
                        </Link>
                        <Link to={'/personalCenter/myCustomer'}>
                            <li
                                className ={'item-link item-content border_bottom isConfirmSet'}
                            >
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg"><img src={require('../../Images/myapply.png')} alt=""/></span>
                                        <span className="di margin15 color6">我的客户</span>
                                    </div>
                                    <div className="item-after color9 isSet">{count}</div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
}
