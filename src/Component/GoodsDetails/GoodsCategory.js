/**
 * Created by asus on 2016/11/23.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';
import TabBarColumn from '../../Component/NewComponent/TabBarColumn'
import RightCell from './RightCell'

export default class GoodsCategory extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            leftTags:[
                '热门分类',
                '热门分类',
                '热门分类',
                '热门分类',
                '聚朵云卡通',
                '云商城',
                '全球购',
                '云综合体',
                '充值中心',
                '一元夺宝',
                '虚拟购物',
                '旅行',
                '社区超市',
                '超实惠',
                '特色好货',
                '热门市场',
                '聚朵云商家入驻',
            ]
        };
      }



    render(){
        const {leftTags} = this.state
        return(
            <div className="width_100 font14 color6 height_all fl cateContainer pf" style={{display:'flex'}}>
                <TabBarColumn
                    className = {'f12'}
                    contents = {leftTags}
                />

                <RightCell />
            </div>
        )
    }
}

const styles = {
    onfocus:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'#666',
        mineight:40,
        flexWrap:'wrap'
    },
    onblur:{
        display:'flex',
        backgroundColor:'#ffddcc',
        justifyContent:'center',
        alignItems:'center',
        color:'#ff5500',
        height:40,
        paddingRight:3,
        borderLeftWidth:3,
        borderLeftStyle:'solid',
        borderLeftColor:'#ff5500',
        flexWrap:'wrap'
    }
}