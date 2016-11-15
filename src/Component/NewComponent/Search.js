import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';

export default class Search extends Component {

    // 构造
    /* constructor(props) {
        super(props);
        // 初始状态
        this.state = {bg: "transparent"};
    }
    getInitialState() {
        return {
            bg: "transparent",
        }
    }*/
    /*componentWillMount() {

        window.onscroll = (event) => {

            let realHeight = document.documentElement.scrollTop || document.body.scrollTop;
            let optatic = 0.8 * (realHeight / 142);
            if (optatic <= 0.8) {
                console.log("optatic------",optatic);
                this.setState({
                    bg: `rgba(234, 44, 44, ${optatic})`,
                })
            }
        }
    }*/
    render() {
       /* let bColor = this.state.bg ? this.state.bg : 'transprent';
        console.log(this.state.bg);*/
        return (
            <div id="search">
                <div className="search pr">
                    <div className="frc pr di">
                        <span className="searchicon pa"></span>
                        <input className="searcInput" placeholder="搜索宝贝" type="text"/>
                        <button className="searchBtn">搜索</button>
                    </div>
                </div>
            </div>
        );
    }
}
