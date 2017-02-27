/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {Link} from 'react-router';
import RankRow from './RankRow'
import {CountryRankList} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import iScroll from 'iscroll/build/iscroll-probe';
import $ from 'jquery';



export default class CountryRank extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            countryRank : []
        };

      }

    render(){
        return(
            <div className="containerNav allIncome_Img supplement">
                <div className="pa_top1 tc f20" style={{color:'#ccc'}}>
                    <p style={{marginTop:'1.5rem'}}>购物1200次</p>
                    <p className="mt5">购物返现2000元</p>
                    <p className="mt5">我的积分1000</p>
                    <p className="mt5">我的直推会员100人</p>
                    <div style={{width:100,height:100,display:'block',border:'1px solid gray',margin:'2rem auto 0'}} className="tc">
                    </div>
                    <p className="f12 color9 mt5">扫一扫，加入我</p>
                </div>
            </div>
        )
    }
}