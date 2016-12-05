import React, { Component } from 'react';
import {Link} from 'react-router';
import PersonalInformation from '../../Component/PersonalCenter/PersonalInformation';
import '../../Stylesheets/App/personal.css';

const clienteleDetail = [
    {name:'全部客户',num:1000,color:'#ff0000',link:''},
    {name:'一层客户',num:50,color:'#999',link:'/levelPartner'},
    {name:'二层客户',num:200,color:'#999',link:'/levelPartner'},
    {name:'三层客户',num:70,color:'#999',link:'/levelPartner'}
]
export default class Partner extends Component {
    render() {
        return (
            <div>
                <PersonalInformation style={{backgroundColor:'#fff5f0'}}/>
                <div className="line"></div>
                <div className="list-block m0">
                    <ul>
                        {
                            clienteleDetail.map(el=> {
                                return (
                                    <Link to={el.link}>
                                        <li className="item-content item-link pl border_bottom">
                                            <div className="item-media"><i className="icon icon-f7"></i></div>
                                            <div className="item-inner font14">
                                                <div className="item-title color6">{el.name}</div>
                                                <div className="item-after" style={{color:el.color}}>{el.num}</div>
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
