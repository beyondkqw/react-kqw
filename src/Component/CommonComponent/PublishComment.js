import React, { Component } from 'react';
import '../../Stylesheets/App/order.css';

export default class PublishComment extends Component {
    render() {
        const {onClick} = this.props
        return (
            <div className="width_100 commit bkg_ff pf bottom0">
                <button
                    onClick={onClick}
                    className="width_100 height_all color_white"
                >发表评论</button>
            </div>
        );
    }
}
