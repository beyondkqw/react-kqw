import React, { Component } from 'react';
import '../../Stylesheets/App/cloudCard.css';

const DiaryList = [
    {title:'微信充值',name:'代付款',price:'200',date:'2016-11-13'},
    {title:'微信充值',name:'已使用',price:'200',date:'2016-11-13'},
    {title:'微信充值',name:'已使用',price:'200',date:'2016-11-13'},
    {title:'微信充值',name:'已使用',price:'200',date:'2016-11-13'}]
export default class DiaryContainer extends Component {
    render() {
        return (
            <div>
                {
                    DiaryList.map((item,index)=>{
                        return(
                            <div className="height_charge border_bottom plAll">
                                <div className="fl color6">
                                    <div className="color6 font14"><span>{item.title}</span></div>
                                    <div className="color9 mt f12">{item.name}</div>
                                </div>
                                <div className="fr f12 tr">
                                    <div className="color6"><span>+</span><span>{item.price}</span></div>
                                    <div className="color9 mt">{item.date}</div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
