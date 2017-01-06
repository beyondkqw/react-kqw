import React, { Component } from 'react';
import DetailsRow from '../../Component/CloudCard/DetailsRow'
import '../../Stylesheets/App/cloudCard.css';

export default class AlreadyUsedDetails extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="wrap">
                    <DetailsRow
                        toShowBtn = {false}
                    />
                </div>
            </div>
        );
    }
}
