import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

export default class RetailingItem extends Component {
    render() {
        const {isShowDate,changeAmount,extraMsg,imgUrl,ymd,time} = this.props
        return (
            <div className="height_charge plAll border_bottom">
                <span className="fl di headerImg">
                    <img className="border_ra50" src={imgUrl} alt=""/>
                </span>
                <div className="fl" style={{marginLeft:15}}>
                    <div className="font14 color6">
                        {
                            isShowDate?
                                <span>+</span>
                                :null
                        }
                        <span>{changeAmount}</span>
                    </div>
                    <p className="f12 color9 mt1">{extraMsg}</p>
                </div>
                {
                    isShowDate?
                        <div className="fr f12 color9">
                            <div>{ymd}</div>
                            <p className="mt3" style={{float:'right'}}>{time}</p>
                        </div>
                        :null
                }

            </div>
        );
    }
}
