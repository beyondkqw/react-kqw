import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';

export default class Tabscontrol extends Component {
    constructor(){
        super();
        this.state={
            currentIndex : 0
        };
    }

    check_tittle_index(index){
        return index===this.state.currentIndex ? "Tab_tittle active" : "Tab_tittle";
    }

    check_item_index(index){
        return index===this.state.currentIndex ? "Tab_item isShow" : "Tab_item";
    }

    render() {
        return (
            <div>
                {/*动态生成Tab导航*/}
                <div style={this.props.style} className="border_bottom tabchange width_100 font14">
                    { React.Children.map( this.props.children , (element,index) => {
                        return(
                            /*箭头函数没有自己的this，这里的this继承自外围作用域，即组件本身*/
                            <div onClick={ () => {
                                this.props.onClick&&this.props.onClick(index)
                                this.setState({currentIndex : index}) } } className={ this.check_tittle_index(index) }>{ element.props.name }</div>
                        );
                    }) }
                </div>
                {/*Tab内容区域*/}
                <div className="">
                    {React.Children.map(this.props.children,(element,index)=>{
                        return(
                            <div className={ this.check_item_index(index) }>{ element }</div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
