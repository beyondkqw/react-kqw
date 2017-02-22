import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/cloudCard.css';

export default class CellComponent extends Component {
    render() {
        const {imgUrl,title,describing,link,className,accId,showRight} = this.props
        return (
            <div className={"fl width50  border_bottom height4"+' '+className}>
                <Link to={link} className="color6" query={{accId:accId}}>
                    <div className="mtl">
                        <div className="di fl">
                            <span className="di cloudImg"><img src={imgUrl} alt=""/></span>
                        </div>
                        <div className="di ml5 pr">
                            <span className="font14 color6">{title}</span>
                            {showRight?
                                <span className="di pa" style={{width:9,height:16,lineHeight:0,top:'0.9rem',marginLeft:'1rem'}}>
                                    <img src={require('../../Images/common/rightArrow.png')} alt=""/>
                                </span>
                                :null
                            }
                            <p className="f12 color9" style={{marginTop:5}}>{describing}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
