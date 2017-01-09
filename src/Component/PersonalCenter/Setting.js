import React, { Component } from 'react';
import {Link} from 'react-router';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import LiComponent from '../../Component/CommonComponent/LiComponent'
import '../../Stylesheets/App/personal.css';

const Itemlist =[
    {name:'个人资料',link:'/personalCenter/userInfo',imgurl:require('../../Images/common/information.png')},
    {name:'账户与安全',link:'/personalCenter/savety',imgurl:require('../../Images/common/account.png')},
    {name:'帮助与反馈',link:'/personalCenter/feedback',imgurl:require('../../Images/common/helpReturn.png')},
    {name:'关于聚朵云',link:'/personalCenter/aboutDemo',imgurl:require('../../Images/common/about.png')}
];
export default class Setting extends Component {
    render() {
        return (
        <div className="containerNav">
            <div className="list-block m0">
                <ul>
                    {
                        Itemlist.map((el,index)=>{
                            return(
                                <Link to={el.link} query={{mobile:this.props.location.query.resetMobile}}>
                                    <li>
                                        <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                            <div>
                                                <span className="di" style={{width:20,height:20}}>
                                                    <img src={el.imgurl} alt=""/>
                                                </span>
                                                <span className="di color6 ml5">{el.name}</span>
                                            </div>
                                            <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                                <img src={require('../../Images/rightArrow.png')} alt=""/>
                                            </span>
                                        </div>
                                    </li>
                                </Link>
                            )
                        })
                    }
                </ul>
                <CommonBtn
                    title = {'退出登录'}
                />
            </div>
        </div>
        );
    }
}
