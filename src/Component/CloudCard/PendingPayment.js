import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/cloudCard.css';

export default class PendingPayment extends Component {
    render() {
        return (
            <div>
                <Link to="/pendPaymentDetails">
                    <RetailingItem
                        isShowDate={true}
                    />
                </Link>
                <RetailingItem
                    isShowDate={true}
                />
            </div>
        );
    }
}
