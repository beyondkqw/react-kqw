/**
 * Created by asus on 2016/12/12.
 */
import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import '../../Stylesheets/App/personal.css';
import {EquityList} from '../../Action/auth'

export default class JdyStock extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.TotalDividends=0
        this.state = {
            itemList:[],
            renderAgain:1
        };
      }

    componentWillMount() {
        this.getEquityList()
    }

    async getEquityList() {
        await EquityList()
            .then(res=> {
                this.setState({itemList:res.resultList})
                if(res.resultList){
                    res.resultList.map(el=>{
                        console.log('el.holdShares',el.holdShares)
                        this.TotalDividends += parseInt(el.holdShares)
                    })
                }
                this.setState({renderAgain:1})
            })
            .catch(err=> {
                this.setState({Reminder:err.message})
            })
    }

    render(){
        const {itemList} = this.state
        console.log('TotalDividends===>',this.TotalDividends)
        return(
            <div className="containerNav">
                <div className="wrap">
                    <div className="stockBanner flex flex-align-center flex-pack-center flex-v">
                        <p className="font14 color_white">总共分红</p>
                        <p className="font30 color_white">{this.TotalDividends}</p>
                    </div>
                    {/*<SplitLine />
                    <div className="userHeight plr font14">
                        <div className="fl color6">总共分红</div>
                        <div className="fr f12 color9 tr">
                            <span>￥</span><span>5678</span>
                        </div>
                    </div>*/}
                    <SplitLine />
                    <div className ="list-block m0 font14">
                        <ul>
                            {
                                itemList&&itemList.map(el=>{
                                    return(
                                        <Link
                                            to="/equityDetails"
                                            query={{
                                            companyName:el.company,
                                            holdShares:el.holdShares,
                                            allHoldShares:this.TotalDividends,
                                            price:el.price
                                            }}
                                        >
                                            <li className ='item-content item-link border_bottom isConfirmSet'>
                                                <div className="item-inner">
                                                    <div className="item-title height_all">
                                                        <span className="di listimg">
                                                            <img className="border_ra50" src={el.img} alt=""/>
                                                        </span>
                                                        <span className="di margin15 color6">{el.company}</span>
                                                    </div>
                                                    <div className="item-after color9 isSet">持{el.holdShares}股</div>
                                                </div>
                                            </li>
                                        </Link>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}