import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/cloudCard.css';

export default class CellComponent extends Component {
    render() {
        const {imgUrl,title,describing,link,className,accId} = this.props
        return (
            <div className={"fl width50  border_bottom height4"+' '+className}>
                <Link to={link} className="color6" query={{accId:accId}}>
                    <div className="mtl">
                        <div className="di fl">
                            <span className="di cloudImg"><img src={imgUrl} alt=""/></span>
                        </div>
                        <div className="di ml5">
                            <span className="font14 color6">{title}</span>
                            <p className="f12 color9">{describing}</p>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}
