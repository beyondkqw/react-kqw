import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CellComponent from '../../Component/CommonComponent/CellComponent';
import RankRow from './RankRow'
import '../../Stylesheets/App/personal.css';
import {TeamList} from '../../Action/auth'


const List=[{name:1},{name:1},{name:1},{name:1},{name:1}];
export default class MyTeam extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow: [true,true,true,true,true],
            display:['none','none','none','none','none'],
            checked:'',
            teamList:[]
        };
        this.page=1
    }

    componentWillMount() {
        this.getTeamList()
    }

    async getTeamList(){
        await TeamList(this.page)
            .then(res=>{
                console.log('个人资料',res)
                this.setState({
                    teamList:res.resultList
                })
                console.log(this.state.teamList)
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    async toggle(index){
        let isshow=this.state.isShow;
        let display = this.state.display;
        isshow[index] = isshow[index]?false:true;
        display[index] = (display[index]=='none')?'block':'none';
        console.log(isshow+'==========='+display)
        await this.setState({
            isShow:isshow,
            display:display
        })
    }

    onChangeState(){
        this.setState({
            checked:(this.state.checked=='')?'checked':''
        })
    }

    render() {
        const {isShow,display,checked,teamList} = this.state;
        return (
            <div className="containerNav">
               {/* <ul>
                    {
                        List.map((el,index)=>{
                            return(
                                <li>
                                    <div className="rankRow flex flex-align-center flex-pack-justify"
                                         onClick={()=>this.toggle(index)}
                                    >
                                        <div className="flex flex-align-center">
                                            <div className="pr" style={{marginRight:10,height:40,width:40,borderRadius:20,backgroundColor:'#000'}}>
                                                <img className="border_ra50" src={require('../../Images/common/incomeToday.png')}/>
                                                /!*<div className="vipIcon pa"><span>V</span><span className="f10">{vipPoints?vipPoints:0}</span></div>*!/
                                            </div>
                                            <span className="di ml f16 color9">chen</span>
                                        </div>
                                       /!* 箭头图标*!/
                                        {
                                            isShow[index]?
                                                <span className="di" style={{width:9,height:16,fontSize:0}}>
                                                    <img src={require('../../Images/rightArrow.png')}/>
                                                </span>
                                                :
                                                <span className="di" style={{width:16,height:9,fontSize:0}}>
                                                    <img src={require('../../Images/bottomArrow2.png')}/>
                                                </span>
                                        }
                                    </div>
                                    <div style={{display:display[index],lineHeight:'60px',marginLeft:50}}>
                                        <span className="di f14"
                                              style={{marginLeft:'0.7rem',color:'#f00'}}
                                        >您的直推人数未满额，不能设置二级代理</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>*/}
                <ul>
                    {
                        teamList.map((el,index)=>{
                            return(
                                <li>
                                    <div className="rankRow flex flex-align-center flex-pack-justify">
                                        <div className="flex flex-align-center">
                                            <div className="pr" style={{marginRight:10,height:40,width:40,borderRadius:20,backgroundColor:'#000'}}>
                                                <img className="border_ra50" src={el.img}/>
                                                {/*<div className="vipIcon pa"><span>V</span><span className="f10">{vipPoints?vipPoints:0}</span></div>*/}
                                            </div>
                                            <span className="di ml f16 color9">{el.accName}</span>
                                        </div>
                                        <span className="di">{el.totalPay}</span>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>

        );
    }
}