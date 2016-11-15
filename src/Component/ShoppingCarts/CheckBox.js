import React, { Component } from 'react';
import '../../Stylesheets/App/shoppingCarts.css';

export default class CheckBox extends Component {
    render() {
        const {index} = this.props
        return (
            <div className="fl height_all">
                <span className="di check_radius pr mr5">
                    <input type="checkbox" id={'index'+index}  className="di isCheck"/>
                    <label htmlFor={'index'+index}></label>
                </span>
            </div>
        );
    }
}
