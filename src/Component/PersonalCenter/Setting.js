import React, { Component } from 'react';
import {Link} from 'react-router';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import LiComponent from '../../Component/CommonComponent/LiComponent'
import '../../Stylesheets/App/personal.css';

const Itemlist =[{name:'账号与安全',link:'/personalCenter/savety'},
    {name:'帮助与反馈',link:'/personalCenter/feedback'},{name:'关于聚朵云',link:'/personalCenter/aboutDemo'}];
export default class Setting extends Component {
    render() {
        return (
        <div className="containerNav">
            <div className="list-block m0">
                <div className="wrap">
                    <ul>
                        {
                            Itemlist.map((el,index)=>{
                                return(
                                    <LiComponent
                                       name = {el.name}
                                       link = {el.link}
                                    />
                                )
                            })
                        }
                    </ul>
                    <CommonBtn
                        title = {'退出登录'}
                    />
                </div>
            </div>
        </div>
        );
    }
}
