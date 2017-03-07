/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

const icon = [
    require('../../Images/person/third.png'),
    require('../../Images/person/second.png'),
    require('../../Images/person/first.png')

]

export default class RankRow extends Component {
    render(){
        const {num,more,vip,isShow,rightCursor,memberName,imgUrl,vipPoints,_vipPoints,totalPay} = this.props
        return(
            <div className="rankRow flex flex-align-center flex-pack-justify">
                <div className="flex flex-align-center">
                    {/*皇冠*/}
                    {
                        num<4?
                            <span className="rankIcon mr10">
                                <img src={num==1?icon[0]:num==2?icon[1]:num==3?icon[2]:null}/>
                            </span>
                            :
                            num>0?
                                <span className="rankNum font14 tc mr10">{num}</span>
                                :null

                    }

                    <div className="pr" style={{marginRight:10,height:40,width:40,borderRadius:20,backgroundColor:'#000'}}>
                        <img className="border_ra50" src={imgUrl}/>
                        {
                            more?
                                <div className="vipIcon pa"><span>V</span><span className="f10">{vipPoints?vipPoints:0}</span></div>
                                :null
                        }
                        {
                            vip?
                                <span className="rankIcon pa " style={{top:-9,left:10}}>
                                    <img src={vip==1?icon[0]:vip==2?icon[1]:vip==3?icon[2]:null}/>
                                </span>
                                :null
                        }

                    </div>
                    <span className="di ml f12 color9">{memberName}</span>
                </div>
                {
                    rightCursor?
                        <span className="rightCursor"><img src={require("../../Images/rightArrow.png")} alt=""/></span>
                        :<span className="font14 color9">{isShow?'总分 : ':null}{totalPay?totalPay:0}</span>
                }
            </div>

        )
    }
}