import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';
import {MyInfo} from '../../Action/auth'

const UserItem = [
    {name:'会员名',inforamation:'小燕子666',link:''},
    {name:'性别',inforamation:'男',link:''},
    {name:'我的二维码名片',inforamation:'额娃儿啊',link:''}
];

const PersonItem = [
    {name:'姓名',inforamation:'编辑'},
    {name:'手机号',inforamation:'编辑'},
    {name:'邮箱',inforamation:'编辑'},
    {name:'地区',inforamation:'编辑'},
    {name:'详细信息',inforamation:'编辑'}
];

export default class UserInfo extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
      }

    componentWillMount() {
        this.getMyInfo()
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                console.log('个人资料',res)
                this.setState({
                    name : res.MEMBER_NAME,
                    amount : res.NOW_AMOUNT,
                    point : res.NOW_POINTS,
                    lv : res.LV,
                    vip_point : res.VIP_POINTS,
                    headImg:res.IMAGE_URI
                })
            })
    }

    render() {
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="list-block m0">
                    <Link>
                        <li className="item-content item-link pl" style={{minHeight:60}}>
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">聚朵云头像</div>
                                <div className="item-after headerImg" style={{maxHeight:40}}>
                                    <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                                </div>
                            </div>
                        </li>
                    </Link>
                </div>
                <div className="list-block m0">
                    <ul>
                    {
                        UserItem.map(el=>{
                            return(
                                <Link to={el.link}>
                                    <li className="item-content item-link pl border_bottom">
                                        <div className="item-media"><i className="icon icon-f7"></i></div>
                                        <div className="item-inner font14">
                                            <div className="item-title color6">{el.name}</div>
                                            <div className="item-after color9">{el.inforamation}</div>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                    </ul>
                </div>
                <div>
                    <ul>
                        {
                            PersonItem.map(el=>{
                                return(
                                    <Link to={el.link}>
                                        <div className="userHeight border_bottom plr font14">
                                            <div className="fl color6">{el.name}</div>
                                            <div className="fr f12 color9 tr">
                                                <span><input className="tr borderno" type="text" placeholder="编辑"/></span>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
