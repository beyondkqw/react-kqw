import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class RetailingItem extends Component {
    render() {
        const {isShowDate} = this.props
        return (
            <div className="height_charge plAll border_bottom">
                <span className="fl di headerImg">
                    <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                </span>
                <div className="fl" style={{marginLeft:15}}>
                    <div className="font14 color6">
                        {
                            isShowDate?
                                <span>+</span>
                                :null
                        }
                        <span>中国银行</span>
                    </div>
                    <p className="f12 color9 mt1">尾号1234的卡</p>
                </div>
                {
                    isShowDate?
                        <div className="fr f12 color9">
                            <div>2016-11-25</div>
                            <p className="mt3">11:30</p>
                        </div>
                        :null
                }

            </div>
        );
    }
}
