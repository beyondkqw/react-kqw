import React, { Component } from 'react';
import '../../Stylesheets/App/shoppingCarts.css';

export default class CheckBox extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isChecked : false
        };
      }

    //实时得到父组件的数据
    componentWillReceiveProps(newProps) {
        console.log('newProps.selectAll============>',newProps.selectAll)
        this.setState({isChecked:newProps.selectAll==null?this.state.isChecked:newProps.selectAll})
    }

    //改变自身状态以及'全选'的状态
   async changeState(){
        const {onSelect} = this.props
        await this.setState({isChecked:!this.state.isChecked})
       console.log('this.state.isChecked====>',this.state.isChecked)
        onSelect&&onSelect(this.state.isChecked)
    }

    render() {
        const {selectAll,index} = this.props
        const {isChecked} = this.state
        return (
            <div className="fl height_all">
                <span className="di check_radius pr mr5">
                    <input
                        type="checkbox"
                        id={'index'+index}
                        onClick={()=>this.changeState()}
                        className="di isCheck"
                        checked={isChecked}
                    />
                    <label htmlFor={'index'+index}></label>
                </span>
            </div>
        );
    }
}
