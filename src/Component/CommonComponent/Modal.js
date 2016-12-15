import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class Modal extends Component {
    render() {
        const {onClick,toHideModal,title} = this.props
        return (
            <div className="modalNav pf width_100 height_all font14">
                <div className="modal_body border_ra scale">
                    <p className="isCancel border_bottom tc">{title}</p>
                    <div className="chooseType">
                        <button className="w50 border_right color_yellow"
                            onClick = {onClick}
                        >确定</button>
                        <button className="w50"
                            onClick = {toHideModal}
                        >取消</button>
                    </div>
                </div>
            </div>
        );
    }
}
