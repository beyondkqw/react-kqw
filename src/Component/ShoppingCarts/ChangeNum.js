import React, { Component } from 'react';
import '../../Stylesheets/App/shoppingCarts.css';

export default class ChangeNum extends Component {
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
        return (
            <div className="di border_ra cartCount tc">
                <span className="di height_all bkg_e5 fl widthSpan" onClick={()=>this.minusNum()}>-</span>
                <input className="di height_all borderno tc widthChange" value={this.state.value} onChange={this.handleChange}/>
                <span className="di height_all bkg_e5 fr widthSpan" onClick={()=>this.addNum()}>+</span>
            </div>
        );
    }
}
