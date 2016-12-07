/**
 * Created by asus on 2016/12/7.
 */
import React, { Component } from 'react';
import Search from '../../Component/NewComponent/Search';
import '../../Stylesheets/App/homePage.css';
import Tabscontrol from '../../Component/GoodsDetails/Tabscontrol';

const type = ['','','','','','','','']
export default class NearbyShop extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            index:''
        };
      }

    render(){
        return(
            <div className="containerNav">
                <Search
                    style = {{backgroundColor:'#fff',paddingLeft:10,paddingRight:10}}
                    _style = {{borderWidth:0.1,borderStyle:'solid',borderColor:'rgb(255, 138, 80)'}}
                    _location = {'洪浪北'}
                />

                <Tabscontrol>
                    <div name = '爱美食'>

                        <div className ="typeContainer flex flex-wrap">
                            {
                                type.map((el,index)=>{
                                    return(
                                        <div
                                            key = {index}
                                            onClick = {()=>this.setState({index:index})}
                                            className="typeItems font14"
                                            style={{
                                                color:this.state.index==index?'#ff5500':'#999',
                                                borderColor:this.state.index==index?'#ff5500':null
                                            }}
                                        >
                                            附近
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <div className="_order_height border_bottom pr plAll df">
                            <div className="_order_img height_all">
                                <img src={require('../../Images/storeClothes.png')} alt=""/>
                            </div>
                            <div className="flex1 font14 _order_margin">
                                <p className="color6 db">代理商的店</p>
                                <p className="color9 oh_height mt3">
                                    主营衣服
                                </p>
                                <p className="color9 distance_h mt3 pr">
                                    <span className="di positionImg mr"><img src={require('../../Images/location.png')} alt=""/></span>
                                    <span className="pa bottom0">据您1.0千米</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div name = '享酒店'>

                    </div>

                    <div name = '爱玩乐'>

                    </div>

                    <div name = '全部'>

                    </div>
                </Tabscontrol>
            </div>
        )
    }
}