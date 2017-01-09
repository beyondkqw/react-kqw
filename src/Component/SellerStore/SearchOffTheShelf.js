/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine';
import ManageRow from '../../Component/SellerStore/ManageRow';
import {Link} from 'react-router'

export default class SearchOffTheShelf extends Component {

    render(){
        return(
            <div className="containerNav">
                <SplitLine />
                <ManageRow
                    isCheck = {true}
                />
                <div className="footerHidden"></div>
                <div className="width_100 commit">
                    <button style={{backgroundColor:'#f5f5f5'}} className="width100 height_all color9">确定下架</button>
                </div>
                <div className="width_100 commit pf bottom0">
                    <button className="width100 height_all bkg_ff color_white">确定下架</button>
                </div>
            </div>
        )
    }
}