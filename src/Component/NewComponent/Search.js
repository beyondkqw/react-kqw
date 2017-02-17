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
        const {onClick,onFocus,style,location,_style,_location,toChange} = this.props
       /* let bColor = this.state.bg ? this.state.bg : 'transprent';
        console.log(this.state.bg);*/
        return (

            <div className="flex">
                <div id="searchNav" style={style}>
                    <div className="search pr">
                        <div style={_style} className="frc pr df">
                            <span className="searchicon">
                                {
                                    toChange?
                                        <img src={require('../../Images/search_gray.png')} alt=""/>
                                        :
                                        <img src={require('../../Images/search.png')} alt=""/>
                                }
                            </span>
                            <input
                                ref = "input"
                                className={toChange?"searcInputOther flex1":"searcInput flex1"}
                                placeholder={location?'请输入内容':"请输入搜索内容"}
                                type="text"
                                onFocus={()=>{
                                    this.setState({display:true})
                                    onFocus&&onFocus(this.state.display)
                                }}
                            />
                            <span className="di deleteImg"
                                  onClick={()=>{this.refs.input.value = ''}}
                            >
                                <img src={require('../../Images/delete.png')} alt=""/>
                            </span>

                            {
                                location?
                                    <button
                                        className={toChange?"searchBtn color6":"searchBtn color_yellow"}
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
                                            className={toChange?"searchBtn color6":"searchBtn color_yellow"}
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

                            <span
                                className="_location"
                                style={{color:'#ff5500',marginLeft:5,marginRight:5}}
                            >
                                {_location}
                            </span>

                            <span style={{height:6.5,width:11,lineHeight:0}}>
                                <img src={require('../../Images/common/down.png')}/>
                            </span>
                        </div>
                        :null
                }


                {
                    this.state.display?
                        <div className="history pf" style={{zIndex:100,top:44}}>
                            <span>历史记录</span>
                            <span className="deletHistory fr"
                                onClick={()=>this.setState({history:[]})}
                            >
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
