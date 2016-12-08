import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
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
                                    <Link to={el.link}>
                                        <li
                                            className ={ el.isShow?'item-link item-content border_bottom isConfirmSet':'item-content border_bottom isConfirmSet'}
                                        >
                                            <div className="item-inner">
                                                <div className="item-title height_all">
                                                    <span className="di listimg"><img src={el.imgUrl} alt=""/></span>
                                                    <span className="di margin15 color6">{el.title}</span>
                                                </div>
                                                <div className="item-after color9 isSet">{el.name}</div>
                                            </div>
                                        </li>
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
