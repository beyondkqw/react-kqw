import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';

export default class LiItem extends Component {
    render() {
        const {link,isShow,imgUrl,name,title,onClick,ID,showID}=this.props
        return (
            <Link to={link}>
                <li
                    className ={isShow?'item-link item-content border_bottom isConfirmSet':'item-content border_bottom isConfirmSet'}
                    onClick={onClick}
                >
                    <div className="item-inner">
                        <div className="item-title height_all">
                            <span className="di listimg"><img className="border_ra50" src={imgUrl?imgUrl:require('../../Images/common/default.png')} alt=""/></span>
                            <span className="di margin15 color6">{title?title:''}</span>
                        </div>
                        <div className="item-after color9 isSet">
                            <span>{name}</span>
                            {
                                showID?
                                    <span>会员ID:{ID}</span>:null
                            }
                        </div>
                    </div>
                </li>
            </Link>
        );
    }
}