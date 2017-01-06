/**
 * Created by asus on 2016/11/22.
 */
import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine'

export default class ToShip extends Component {

    render() {
        return (
            <div className="containerNav">
                <div style={{height:50}} className="flex flex-align-center border_bottom plr">
                    <span className="di mr10" style={{width:20,height:15,lineHeight:0}}>
                        <img src={require('../../Images/common/fahuo.png')} alt=""/>
                    </span>
                    <span className="font14">选择物流</span>
                </div>
                <div className="border_bottom" style={{height:90}}>
                    <ul style={{overflow:'auto'}} className='width100 height_all flex flex-align-center'>
                        <li className="tc ml20">
                            <div style={{width:50,height:50}}><img src={require('../../Images/tact.png')} alt="" /></div>
                            <span className="di f12 color6 mt3">申通</span>
                        </li>
                        <li className="tc ml20">
                            <div style={{width:50,height:50}}><img src={require('../../Images/tact.png')} alt="" /></div>
                            <span className="di f12 color6 mt3">圆通</span>
                        </li>
                    </ul>
                </div>
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        其他快递
                    </span>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入您需要的快递"/>
                </div>
                <SplitLine />
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <div>
                        <span className="di mr10" style={{width:20,height:17,lineHeight:0}}>
                            <img src={require('../../Images/common/num.png')} alt=""/>
                        </span>
                        <span className="font14 color6">
                            快递单号
                        </span>
                    </div>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入快递单号"/>
                </div>
                <SplitLine />
            </div>
        );
    }
}