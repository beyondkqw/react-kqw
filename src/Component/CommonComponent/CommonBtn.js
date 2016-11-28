import React, { Component } from 'react';

export default class CommonBtn extends Component {
    render() {
        const {title,onClick} = this.props
        return (
            <div className="plr">
                <button
                    onClick = {onClick}
                    className="comfirmBtn border_ra color_white bkg_ff width_100"
                >
                    {title}
                </button>
            </div>
        );
    }
}
