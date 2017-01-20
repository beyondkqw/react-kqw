import React, { Component } from 'react';

export default class CommonBtn extends Component {
    render() {
        const {title,onClick,toShowRepeat} = this.props
        return (
            <div className="plr">
                <button
                    disabled = {toShowRepeat?'disabled':''}
                    onClick = {onClick}
                    className={toShowRepeat?'comfirmBtn border_ra color9 colore5 width_100':'comfirmBtn border_ra color_white bkg_ff width_100'}
                >
                    {title}
                </button>
            </div>
        );
    }
}
