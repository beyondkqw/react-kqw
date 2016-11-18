import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

const LevelList = [
    {name:'从你家啥都会',level:1,imgUrl:require('../../Images/store.png')},
    {name:'山东矿机',level:1,imgUrl:require('../../Images/store.png')},
    {name:'是的覅',level:1,imgUrl:require('../../Images/store.png')},
    {name:'大家的撒手了',level:1,imgUrl:require('../../Images/store.png')}
]
export default class LevelPartner extends Component {
    render() {
        return (
            <div className="list-block media-list inset m0">
                <ul>
                    {
                        LevelList.map(el=> {
                            return(
                                <li className="border_bottom font14 color6">
                                    <a href="#" className="item-link item-content">
                                        <div className="item-media mr5">
                                            <img className="border_ra50" src={el.imgUrl}/>
                                        </div>
                                        <div className="item-inner">
                                            <div className="item-title-row">
                                                <div className="item-title">{el.name}</div>
                                            </div>
                                            <div className="item-subtitle">
                                                <span>层级:</span>
                                                <span>{el.level}</span>
                                            </div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }
}
