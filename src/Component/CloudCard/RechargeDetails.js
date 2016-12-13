import React, { Component } from 'react';
import DetailsRow from '../../Component/CloudCard/DetailsRow'
import '../../Stylesheets/App/cloudCard.css';

export default class RechargeDetails extends Component {
    render() {
        return (
            <div className="containerNav">
                <DetailsRow
                    toShowBtn = {false}
                />
            </div>
        );
    }
}
