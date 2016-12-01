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
        const {closePopUp,attr,onClick} = this.props
        return (
                <div className="popupContainer pf bottom0 z_index bkg_color width_100 border_top pr">
                    <div className="pa close" onClick={closePopUp}><img src={require('../../Images/delete.png')} alt=""/></div>
                    <div className="pm_img plAll">
                        <span className="di productImg"><img src={require('../../Images/store.png')} alt=""/></span>
                        <span className="colorff f12 margin15">￥</span><span className="colorff font18">258</span>
                    </div>
                    {
                        attr&&attr.map((el,inx)=>{
                            return(
                                <div className="plAll border_top">
                                    <span className="font14 color6">{el.NAME}</span>
                                    <div>
                                        {
                                            el.DETAILS&&el.DETAILS.map((detail,index)=>{
                                                return(
                                                    <span
                                                        onClick = {()=>onClick&&onClick(inx,detail.ID,el.IS_RADIO)}
                                                        className="di width_20"
                                                    >
                                                        <input type="radio" name = {el.DESC} className="chooseColor" id={`${inx}`+'ATTR_ID'+`${index}`}/>
                                                        <label htmlFor={`${inx}`+'ATTR_ID'+`${index}`}>{detail.VALUE}</label>
                                                    </span>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                            )
                        })
                    }
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
                    <div className="width_100 commit">
                        <button className="width50 height_all color_pink color_yellow">加入购物车</button>
                        <button className="width50 height_all bkg_ff color_white">立即购买</button>
                    </div>
                </div>
        );
    }
}
