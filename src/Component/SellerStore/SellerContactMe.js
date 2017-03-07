import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine'
import LinkMe from '../../Component/CommonComponent/LinkMe'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class SellerContactMe extends Component {
    render() {
        const {mobile,qq,wechat} = this.props.location.query
        const type = 1;
        return (
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'联系我'}
                />
                <LinkMe
                    mobile = {mobile}
                    qq = {qq}
                    wechat = {wechat}
                    type = {type}
                />
            </div>
        );
    }
}
