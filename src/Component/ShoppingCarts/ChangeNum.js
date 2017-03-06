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


    componentWillMount() {
        const {num} = this.props
        this.setState({value:num?num:1})
    }

   /* componentWillReceiveProps(newProps){
        this.setState({value:newProps.num})
    }*/

    //数量减
    async changeNum(type){
        const {del,minus} = this.props
        const {value} = this.state
        if(type){
            await this.setState({value:++this.state.value});
            minus&&minus(this.state.value,type)
        }else{
            if(value==1){
                del&&del()
            }
            if(value>1){
                await this.setState({value:--this.state.value});
                minus&&minus(this.state.value,type)
            }
        }
    }


    async handleChange() {
        await this.setState({value:this.state.value});
        //const {add} = this.props
        //add&&add(this.state.value)
    }
    render() {
        return (
            <div className="di border_ra cartCount tc">
                <span className="di height_all bkg_e5 fl widthSpan" onClick={()=>this.changeNum(false)}>-</span>
                <input
                    readOnly="readonly"
                    className="di height_all borderno tc widthChange"
                    value={this.state.value}
                    //onChange={()=>this.handleChange()}
                />
                <span className="di height_all bkg_e5 fr widthSpan" onClick={()=>this.changeNum(true)}>+</span>
            </div>
        );
    }
}
