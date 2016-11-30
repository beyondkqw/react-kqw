import React, { Component } from 'react';
import {Link} from 'react-router';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';

const Itemlist =[{name:'账号与安全',link:'/personalCenter/savety'},
    {name:'帮助与反馈',link:'/personalCenter/feedback'},{name:'关于聚朵云',link:'/personalCenter/aboutDemo'}];
export default class Setting extends Component {
    render() {
        return (
            <div className="list-block m0">
                <ul>
                    {
                        Itemlist.map((el,index)=>{
                            return(
                                <Link to={el.link}>
                                    <li className="item-content item-link pl  border_bottom">
                                        <div className="item-media"><i className="icon icon-f7"></i></div>
                                        <div className="item-inner margin0">
                                            <div className="item-title color6 font14">
                                                {el.name}
                                            </div>
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
        );
    }
}
