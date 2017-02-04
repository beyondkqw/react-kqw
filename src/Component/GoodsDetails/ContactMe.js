import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import LinkMe from '../../Component/CommonComponent/LinkMe'

export default class ContactMe extends Component {
    render() {
        const {mobile,qq,wechat} = this.props.location.query
        console.log(mobile+qq+wechat)
        return (
            <div>
                <LinkMe
                    mobile = {mobile}
                    qq = {qq}
                    wechat = {wechat}
                />
            </div>
        );
    }
}
