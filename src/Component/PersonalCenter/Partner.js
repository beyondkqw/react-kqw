import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import LiItem from '../../Component/CommonComponent/LiItem'
import PersonalInformation from '../../Component/PersonalCenter/PersonalInformation';
import '../../Stylesheets/App/personal.css';

const partner = [
    {title:'我的推荐人',name:'老人与海',imgUrl:require('../../Images/myPatrner.png'),isShow:false,link:'personalCenter/userInfo'},
    {title:'我的客户',name:'50',imgUrl:require('../../Images/myapply.png'),isShow:true,link:'/personalCenter/myCustomer'}
]
export default class Partner extends Component {
    render() {
        return (
            <div>
                <div className ="list-block m0 font14">
                    <SplitLine />
                    <ul>
                        {
                            partner.map(el=>{
                                return(
                                    <LiItem
                                        title={el.title}
                                        link={el.link}
                                        name={el.name}
                                        imgUrl={el.imgUrl}
                                        isShow={el.isShow}
                                    />
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
