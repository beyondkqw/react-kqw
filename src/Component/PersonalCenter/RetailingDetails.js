import React, { Component } from 'react';
import AllIncomeComponent from '../../Component/PersonalCenter/AllIncomeComponent';
import '../../Stylesheets/App/personal.css';


const RetailsDetail = [
    {name:'佣金来源',title:'多云云爱神的箭开讲'},
    {name:'待收货',title:'2016-11-20 11:30'}
]
export default class RetailingDetails extends Component {
    render() {
        return (
            <div className="containerNav">
                <AllIncomeComponent />
                {
                    RetailsDetail.map(el=>{
                        return(
                            <div className="userHeight plr border_bottom">
                                <span className="color6 font14">{el.name}</span>
                                <span className="color9 f12 fr">{el.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
