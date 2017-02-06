import React, { Component} from 'react';
import '../../Stylesheets/App/personal.css';

export default class IsShowEmptyImg extends Component {
    render() {
        const {title,styleSheet} = this.props
        return (
            <div className="pa tc" style={{top:40,left:0,right:0,bottom:0}}>
                <span className="di" style={styleSheet}>
                    <img src={require('../../Images/empty.png')} alt=""/>
                </span>
                <p className="font14 color9">{title}</p>
            </div>
        );
    }
}
