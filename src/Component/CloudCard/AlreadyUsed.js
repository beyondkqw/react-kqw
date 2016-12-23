import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/cloudCard.css';

export default class AlreadyUsed extends Component {
    render() {
        return (
            <div>
                <div className="wrap">
                    <Link to="/alreadyUsedDetails">
                        <RetailingItem
                            isShowDate={true}
                        />
                    </Link>
                    <RetailingItem
                        isShowDate={true}
                    />
                </div>
            </div>
        );
    }
}
