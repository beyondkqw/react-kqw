import React, { Component,PropTypes } from 'react';
import Search from '../../Component/NewComponent/Search'
import {countryData} from '../../Action/countryArea'
import NavBar from '../../Component/CommonComponent/NavBar'

const cityList = ['上海','北京','广州','深圳','武汉','天津','西安','南京','杭州','成都','重庆']
export default class ChooseCity extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            address:''
        };
      }
    componentWillMount() {
        this.setState({address:sessionStorage.getItem('city')})
    }

    static contextTypes = {
        router:PropTypes.object
    }

    chooseCity(value){
        this.context.router.push({pathname:'/cloudComprehensive',query:{value:value}})
    }
    render() {
        return (
            <div>
                <NavBar
                    title = {'城市列表'}
                    renderBack = {true}
                />
                <div className="containerNav overScroll" style={{top:45}}>
                    <div style={{padding:'0 10px'}}>
                        <div className="font14 color9 mt5">定位城市</div>
                        <span
                            className="di font14 color3 mt5 border_ye border_ra"
                            style={{padding:'5px 10px'}}
                            onClick = {()=>this.chooseCity(this.state.address)}
                        >{this.state.address?this.state.address:'暂未定位到当前位置'}</span>
                        <div className="font14 color9 mt5" style={{marginTop:20}}>热门城市</div>
                    </div>
                    <div style={{marginBottom:15}}>
                        {
                            cityList&&cityList.map(el=>{
                                return(
                                    <span
                                        className="di font14 color3 mt5 border_ye border_ra"
                                        style={{padding:'5px 10px',marginLeft:10}}
                                        onClick = {()=>this.chooseCity(el)}
                                    >{el}</span>
                                )
                            })
                        }
                    </div>
                    <div className="font14 color9 border_bottom" style={{padding:'5px 10px'}}>城市列表</div>

                    {
                        countryData&&countryData.map(el=>{
                            return(
                                <div
                                    className="border_bottom font14"
                                    style={{paddingLeft:10,height:45,lineHeight:'45px'}}
                                    onClick = {()=>this.chooseCity(el.name)}
                                >
                                    {el.name}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        );
    }
}
