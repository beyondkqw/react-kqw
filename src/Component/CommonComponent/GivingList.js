import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class GivingList extends Component {
    render() {
        const {title,describing,style,backgroundColor,isShow} = this.props
        return (
            <div className={"height_charge border_bottom plAll font14"+' '+backgroundColor}>
                <div className="fl lh2 color6">{title}</div>
                <div className={"fr lh2 f12 color9 tr"+' '+ style}>
                   <span className={isShow}>￥</span><span>{describing}</span>
                </div>
            </div>
        );
    }
}
