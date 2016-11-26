import React, { Component } from 'react';
import '../../Stylesheets/App/homePage.css';
import {Link} from 'react-router';

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

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.history = []
        this.state = {
            display : false,
            history : [],
            value : ''
        };
      }

    async componentWillReceiveProps(newProps) {
        const {display} = this.props
        await this.setState({display:display})
        console.log('newP',newProps)
    }

    render() {
        const {onClick,onFocus,onBlur} = this.props
       /* let bColor = this.state.bg ? this.state.bg : 'transprent';
        console.log(this.state.bg);*/
        return (
            <div>
                <div id="search">
                    <div className="search pr">
                        <div className="frc pr di">
                            <span className="searchicon pa"></span>
                            <input
                                ref = "input"
                                className="searcInput"
                                placeholder="搜索宝贝"
                                type="text"
                                onFocus={()=>{
                                    this.setState({display:true})
                                    onFocus&&onFocus(this.state.display)
                                }}


                                //onBlur={()=>{
                                //    //this.setState({display:false})
                                //    onBlur&&onBlur(this.state.display)
                                //}}
                            />
                            <Link to="/GoodsDetail/SearchPage"  >
                                <button
                                    className="searchBtn"
                                    onClick={()=>{
                                        onClick&&onClick()
                                        if(this.history.length<10){
                                            this.history.push(this.refs.input.value)
                                            this.setState({history:this.history,display:false})
                                        }else{
                                            this.history.shift()
                                            this.history.push(this.refs.input.value)
                                            this.setState({history:this.history})
                                        }
                                    }}
                                >搜索</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {
                    this.state.display?
                        <div className="history pf">
                            <span>历史记录</span>
                            <span className="deletHistory fr">
                                <img src = {require('../../Images/detelename.png')}/>
                            </span>
                            <div className="historyContainer">
                                {
                                    this.state.history.map(el=>{
                                        return(
                                            <div
                                                onClick = {()=>{
                                                    this.setState({display:false})
                                                    this.refs.input.value = el
                                                }}
                                                className="history-items"
                                            >{el}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        :null
                }

            </div>
        );
    }
}
