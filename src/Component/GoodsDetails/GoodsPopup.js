import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import $ from 'jquery';

export default class GoodsPopup extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.attrIds = []
        this.risePrice=[];
        this.state = {
            value:1,
            total:this.props.price
        };
        this.kind={}
    }
    //数量减
    minusNum(){
        if(this.state.value === 1){

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

    ensure(type,typeParam,inx,rise){
        if(type==2){
            this.kind[inx]=rise;
            let priceTotal = this.props.price
            for(var j in this.kind){
                priceTotal += this.kind[j];
                this.setState({
                    total:priceTotal
                })
            }
        }

        this.attrIds = [];
        const {ensurePress} = this.props
        let radios = document.getElementsByClassName('chooseColor')
        for(let i =0;i<radios.length;i++){
            if(radios[i].checked){
                this.attrIds.push(radios[i].value)
            }
        }
        if(type==1){
            ensurePress&&ensurePress(this.attrIds,this.state.value,typeParam)
        }
    }

    render() {
        const {closePopUp,attr,onClick,isOnly,typeParam,price,image} = this.props
        return (
            <div className="modalNav pa width_100 height_all font14" style={{zIndex:100}}>
                <div className="popupContainer pf bottom0 z_index bkg_color wrap border_top pr" style={{zIndex:1050}}>
                    <div className="pa close" onClick={closePopUp}><img src={require('../../Images/common/delModal.png')} alt=""/></div>
                    <div className="pm_img plAll">
                        <span className="di productImg"><img src={image} alt=""/></span>
                        <span className="colorff f12 margin15">￥</span><span className="colorff font18">{this.state.total}</span>
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
                                                        onClick = {()=>this.ensure(2,'',inx,detail.RISE_PRICE)}
                                                        className="di mr10"
                                                    >
                                                        <input
                                                            //ref = {`${inx}`+'ATTR_ID'+`${index}`}
                                                            type="radio"
                                                            value = {detail.ID}
                                                            name = {el.DESC}
                                                            className="chooseColor"
                                                            id={`${inx}`+'ATTR_ID'+`${index}`}
                                                        />
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
                    {
                        isOnly?
                            <div className="width_100 commit bkg_ff color_white">
                                <button
                                    className="width_100 height_all"
                                    onClick = {()=>{this.ensure(1)}}
                                >
                                    确定
                                </button>
                            </div>
                            :
                            <div className="width_100 commit">
                                <button
                                    className="width50 height_all color_pink color_yellow"
                                    onClick = {()=>this.ensure(1,1)}
                                >
                                    加入购物车
                                </button>
                                <button
                                    className="width50 height_all bkg_ff color_white"
                                    onClick = {()=>this.ensure(1,2)}
                                >
                                    立即购买
                                </button>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
