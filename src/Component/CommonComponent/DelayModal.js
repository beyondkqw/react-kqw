import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class DelayModal extends Component {
    render() {
        return (
            <div className="modalNav pf width_100 height_all font14" style={{top:45}}>
                <div className="modal_body border_ra scale" style={{backgroundColor:'transparent'}}>
                    <div style={{width:30,height:30,margin:'auto'}}>
                        <img src={require('../../Images/person/delay.gif')} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}
