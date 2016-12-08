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
    }

    render() {
        const {onClick,onFocus,style,location,_style,_location} = this.props
       /* let bColor = this.state.bg ? this.state.bg : 'transprent';
        console.log(this.state.bg);*/
        return (
            <div className="flex">
                <div id="search" style={style}>
                    <div className="search pr">
                        <div style={_style} className="frc pr df">
                            <span className="searchicon"></span>
                            <input
                                ref = "input"
                                className="searcInput flex1"
                                placeholder={location?'请输入地址':"搜索宝贝"}
                                type="text"
                                onFocus={()=>{
                                    this.setState({display:true})
                                    onFocus&&onFocus(this.state.display)
                                }}
                            />

                            {
                                location?
                                    <button
                                        className="searchBtn"
                                        onClick={()=>{
                                        onClick&&onClick(this.refs.input.value)
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
                                    :
                                    <Link to="/GoodsDetail/SearchPage"  className="di height_all">
                                        <button
                                            className="searchBtn"
                                            onClick={()=>{
                                        onClick&&onClick(this.refs.input.value)
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
                            }
                        </div>
                    </div>
                </div>

                {
                    _location?
                        <div className="flex flex-align-center flex-pack-center mr5 f12">
                            <span style={{height:12.5,width:8.5,lineHeight:0}}>
                                <img src={require('../../Images/common/location.png')}/>
                            </span>

                            <span style={{color:'#ff5500',marginLeft:5,marginRight:5}}>{location}</span>

                            <span style={{height:6.5,width:11,lineHeight:0}}>
                                <img src={require('../../Images/common/down.png')}/>
                            </span>
                        </div>
                        :null
                }


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
