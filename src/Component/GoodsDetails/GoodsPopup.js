import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';

export default class GoodsPopup extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            value:1
        };
    }
    //数量减
    minusNum(){
        if(this.state.value === 0){

        }else {
            this.setState({value:--this.state.value});
        }
    }
    //数量加
    addNum(){
        this.setState({value:++this.state.value});
    }
    handleChange() {
        this.setState({value:this.state.value});
    }

    render() {
        const {closePopUp} = this.props
        return (
                <div className="popupContainer pf bottom0 z_index bkg_color width_100 border_top pr">
                    <div className="pa close" onClick={closePopUp}><img src={require('../../Images/delete.png')} alt=""/></div>
                    <div className="pm_img plAll">
                        <span className="di productImg"><img src={require('../../Images/store.png')} alt=""/></span>
                        <span className="colorff f12 margin15">￥</span><span className="colorff font18">258</span>
                    </div>
                    <div className="plAll border_top">
                        <span className="font14 color6">颜色分类</span>
                        <div>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseType"/><label htmlFor="chooseType">白色</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox" className="chooseColor" id="chooseType1"/><label htmlFor="chooseType1">红色</label>
                            </span>
                            <span className="di  width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseType2"/><label htmlFor="chooseType2">橙色</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseType3"/><label htmlFor="chooseType3">橙色</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseType4"/><label htmlFor="chooseType4">橙色</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseType5"/><label htmlFor="chooseType5">橙色</label>
                            </span>
                        </div>
                    </div>
                   <div className="plAll border_top">
                        <span className="font14 color6">尺码大小</span>
                        <div>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseSize"/><label htmlFor="chooseSize">XS</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox" className="chooseColor" id="chooseSize1"/><label htmlFor="chooseSize1">S</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseSize2"/><label htmlFor="chooseSize2">M</label>
                            </span>
                            <span className="di width_20">
                                <input type="checkbox"  className="chooseColor" id="chooseSize3"/><label htmlFor="chooseSize3">L</label>
                            </span>
                        </div>
                    </div>
                    <div className="popupContainer bottom0 z_index bkg_color width_100 pr">
                        <div className="plAll border_top">
                            <span className="font14 color6">选择数量</span>
                            <div className="border_ra mt5 changeCount tc">
                                <span className="di width333 height_all bkg_e5 f25 lh13 fl" onClick={()=>this.minusNum()}>-</span>
                                <input className="di width333 height_all f17 borderno tc" value={this.state.value} onChange={this.handleChange}/>
                                <span className="di width333 height_all bkg_e5 f25 lh13 fr" onClick={()=>this.addNum()}>+</span>
                            </div>
                        </div>
                    </div>
                    <div className="width_100 commit bkg_ff color_white">
                        <button className="width_100 height_all">确定</button>
                    </div>
                </div>
        );
    }
}
