import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';

export default class TakenDetails extends Component {
    render() {
        return (
            <div>
                <SplitLine />
                <RetailingItem />
            </div>
        );
    }
}
