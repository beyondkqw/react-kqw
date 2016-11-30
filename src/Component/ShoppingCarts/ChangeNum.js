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
   async minusNum(){
        if(this.state.value === 0){

        }else {
          await this.setState({value:--this.state.value});
        }
       const {minus} = this.props
       minus&&minus(this.state.value)
    }

    componentWillMount() {
        const {num} = this.props
        this.setState({value:num?num:1})
    }

    componentWillReceiveProps(newProps){
        //console.log()
        this.setState({value:newProps.num})
    }

    //数量加
    async addNum(){
        const {add} = this.props
        await this.setState({value:++this.state.value});

        add&&add(this.state.value)
    }
    async handleChange() {
        await this.setState({value:this.state.value});
        //const {add} = this.props
        //add&&add(this.state.value)
    }
    render() {
        return (
            <div className="di border_ra cartCount tc">
                <span className="di height_all bkg_e5 fl widthSpan" onClick={()=>this.minusNum()}>-</span>
                <input readOnly="readonly" className="di height_all borderno tc widthChange" value={this.state.value} onChange={()=>this.handleChange()}/>
                <span className="di height_all bkg_e5 fr widthSpan" onClick={()=>this.addNum()}>+</span>
            </div>
        );
    }
}
