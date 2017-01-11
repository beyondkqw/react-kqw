import React, { Component } from 'react';
import {StorectList} from '../../Action/auth'

export default class SearchOrder extends Component {
    render() {
        return (
            <div className="containerNav">
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        商品ID
                    </span>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入ID号"/>
                </div>
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        买家名称
                    </span>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入买家名称"/>
                </div>
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        宝贝昵称
                    </span>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入宝贝昵称"/>
                </div>
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        订单编号
                    </span>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入订单编号"/>
                </div>
                <div
                    className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                    style={{height:50,backgroundColor:'#ff5500'}}>
                    搜索
                </div>
            </div>
        );
    }
}