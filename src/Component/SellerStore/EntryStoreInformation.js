/**
 * Created by asus on 2016/11/21.
 */
import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/sellerStore.css';

export default class EntryStoreInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {

        };
    }

    render(){
        return(
            <div>
                <div className="flex1">
                    <div className="lh60 border_bottom plr font14">
                        <span className="color6">店铺头像</span>
                        <div className="pr storeHeaderImg fr">
                            <input type="file" />
                            <img className="" src={require("../../Images/uploadImg.png")} alt=""/>
                        </div>
                    </div>
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center plr font14">
                        <span className="color6">店铺名称</span>
                        <div>
                            <input
                                className="tr borderno"
                                placeholder="输入您的店铺名称"
                            />
                        </div>
                    </div>
                    <SplitLine />
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                        <span className="color6">店铺地址</span>
                        <div style={{width:9,height:16,lineHeight:0}}>
                            <img src={require('../../Images/rightArrow.png')} alt=""/>
                        </div>
                    </div>
                    <Link to="/sellerSearchLocation">
                        <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center plr font14">
                            <span className="color6">定位店铺位置</span>
                            <div style={{width:33,height:17,lineHeight:0}}>
                                <img src={require('../../Images/qq.png')} alt=""/>
                            </div>
                        </div>
                    </Link>
                    <SplitLine />
                    <div className="upload">
                        <div className="font14">
                            <span className="di mr10" style={{width:36,height:18}}><img src={require('../../Images/qq.png')} alt=""/></span>
                            <span>上传营业执照</span>
                        </div>
                        <p className="f12 color9 mt5">
                            上传的图片<span className="color_yellow">清晰</span>,能清楚的看见
                            <span className="color_yellow">注册号</span>
                        </p>
                        <div className="uploadFile marging_s">
                            <input type="file" />
                            <img className="educationImg" src={require("../../Images/uploadImg.png")} />
                        </div>
                    </div>
                    <SplitLine />
                    <div className="upload">
                        <div className="font14">
                            <span className="di mr10" style={{width:36,height:18}}><img src={require('../../Images/qq.png')} alt=""/></span>
                            <span>上传身份证正反面</span>
                        </div>
                        <p className="f12 color9 mt5">
                            上传的图片<span className="color_yellow">清晰</span>,能清楚的看见
                            <span className="color_yellow">身份证号和有效时间</span>
                        </p>
                        <div className="uploadFile marging_s">
                            <input type="file" />
                            <img className="educationImg" src={require("../../Images/uploadImg.png")} />
                        </div>
                    </div>
                </div>
                <Link to="/storeNext">
                    <div
                        className="flex color9 flex-pack-center flex-align-center"
                        style={{height:50,backgroundColor:'#e5e5e5'}}>
                        确定,下一步
                    </div>
                </Link>
            </div>
        )
    }
}