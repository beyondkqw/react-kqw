/**
 * Created by asus on 2016/12/5.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';

const icon = [
    require('../../Images/person/first.png'),
    require('../../Images/person/second.png'),
    require('../../Images/person/third.png')

]

export default class RankRow extends Component {

    render(){
        const {num,more,vip,isShow,rightCursor} = this.props
        return(
            <div className="rankRow flex flex-align-center flex-pack-justify">
                <div className="flex flex-align-center">
                    {/*皇冠*/}
                    {
                        num<4?
                            <span className="rankIcon mr10">
                                <img src={icon[0]}/>
                            </span>
                            :
                            num>0?
                                <span className="rankNum font14 tc mr10">{num}</span>
                                :null

                    }

                    <div className="pr" style={{marginRight:10,height:40,width:40,borderRadius:20,backgroundColor:'#000'}}>
                        <img className="border_ra50" src={icon[0]}/>
                        {
                            more?
                                <div className="vipIcon pa">V8</div>
                                :null
                        }
                        {
                            vip?
                                <span className="rankIcon pa " style={{top:-9,left:10}}>
                                    <img src={icon[0]}/>
                                </span>
                                :null
                        }

                    </div>
                    <span className="f12 color9">朵云云的天堂</span>
                </div>
                {
                    rightCursor?
                        <span className="rightCursor pa"><img src={require("../../Images/rightArrow.png")} alt=""/></span>
                        :<span className="font14 color9">{isShow?'总分 : ':null}159999</span>
                }
            </div>

        )
    }
}