import React, { Component } from 'react';
import DetailsRow from '../../Component/CloudCard/DetailsRow'
import '../../Stylesheets/App/cloudCard.css';

export default class PaymentDetails extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="wrap">
                    <DetailsRow
                        toShowBtn = {true}
                    />
                </div>
            </div>
        );
    }
}
