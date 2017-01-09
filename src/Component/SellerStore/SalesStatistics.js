/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/sellerStore.css';
import SplitLine from '../../Component/NewComponent/SplitLine';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import {Link} from 'react-router'
import {MonthSale,DaySale} from '../../Action/auth'

export default class SalesStatistics extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.monryAccount=0
        this.state = {
            show:false,
            monthMoney:'',
            monthDay:'',
            chooseIndex:'',
            renderState:1
        };
      }

    componentWillMount() {
        this.getMonthSale()
    }

    //请求月份的销售金额
    async getMonthSale(){
        await MonthSale()
            .then(res=>{
                this.setState({monthMoney:res})
                res.map(el=>{
                    this.monryAccount += parseInt(el.AMOUNT)
                })
                this.setState({renderState:1})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //请求天的销售金额
    async getDayMoney(month,index){
        console.log('index',index)
        await DaySale(month)
            .then(res=>{
                this.setState({chooseIndex:index})
                this.setState({monthDay:res})
                this.setState({show:!this.state.show})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }
    render(){
        const {show,monthMoney,monthDay,chooseIndex} = this.state
        return(
            <div className="containerNav">
                <div className="color_white flex flex-v flex-align-center flex-pack-center salesAll" style={{height:110}}>
                    <p className="f25">{this.monryAccount}</p>
                    <p className="font14">总销售金额</p>
                </div>
                <SplitLine />
                {
                    monthMoney == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'查询列表为空哦~'}
                        />
                        :
                    monthMoney&&monthMoney.map((el,index)=>{
                        return(
                                <div>
                                    <div className="width_100">
                                        <div
                                            className="df flex-pack-justify flex-align-center flex-pack-justify plr"
                                            style={{height:50}}
                                            onClick={()=>this.getDayMoney(el.CREATE_TIME,index)}
                                        >
                                            <div className="df">
                                                <span className="di mr10" style={{width:20,height:20,lineHeight:0}}>
                                                    <img src={require("../../Images/common/record.png")} alt=""/>
                                                </span>
                                                <p className="color6 font14">{el.CREATE_TIME}</p>
                                            </div>

                                            <div className="df color_yellow font14">
                                                <p>
                                                    <span>￥</span><span>{el.AMOUNT}</span>
                                                    {show && chooseIndex == index?
                                                    <span className="di ml" style={{width:13,height:7,lineHeight:0}}>
                                                            <img src={require("../../Images/bottomArrow.png")} alt=""/>
                                                        </span>
                                                        :
                                                        <span className="di ml" style={{width:9,height:16,lineHeight:0}}>
                                                            <img src={require("../../Images/rightArrow.png")} alt=""/>
                                                        </span>
                                                    }

                                                </p>

                                            </div>
                                        </div>

                                        {
                                            show && chooseIndex == index?
                                                <ul className="font14 salesList">
                                                    {
                                                        chooseIndex == index ?
                                                        monthDay && monthDay.map(item=> {
                                                            return (
                                                                <li className="df flex-pack-justify border_top flex-align-center color9">
                                                                    <p>{item.AMOUNT}</p>
                                                                    <p><span>￥</span><span>{item.CREATE_TIME}</span></p>
                                                                </li>
                                                            )
                                                        })
                                                            :null
                                                    }
                                                </ul>
                                                :
                                                null

                                        }
                                    </div>
                                    <SplitLine />
                                </div>

                            )

                    })
                }
            </div>
        )
    }
}