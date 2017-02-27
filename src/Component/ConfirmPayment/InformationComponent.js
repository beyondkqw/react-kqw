import React, { Component } from 'react';
import '../../Stylesheets/App/comfirmPayMoney.css';

export default class InformationComponent extends Component {
    render() {
        const {name,phone,path,onClick} = this.props
        return (
            <div>
                <div
                    className="ChooseHeight font14 border_bottom"
                    onClick = {onClick}
                >
                    <div className="color6">
                        <span>{name}</span>
                        <span className="di ml5">{phone}</span>
                    </div>
                    <p className="color9 mt">{path}</p>
                </div>
            </div>
        );
    }
}
