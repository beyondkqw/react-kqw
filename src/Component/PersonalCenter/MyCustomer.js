import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';

const customer = [
    {img:require('../../Images/headerImg.jpg'),name:'哇喔哇哦'},
    {img:require('../../Images/headerLogo.png'),name:'666'},
    {img:require('../../Images/myPatrner.png'),name:'9999'}
]
export default class MyCustomer extends Component {
    render() {
        return (
            <div className="containerNav">
                <SplitLine />
                {
                    customer.map(el=>{
                        return(
                            <Link to="/personalCenter/userInfo">
                                <RankRow
                                    rightCursor={true}
                                    more={true}
                                />
                            </Link>
                        )
                    })
                }

            </div>
        );
    }
}
