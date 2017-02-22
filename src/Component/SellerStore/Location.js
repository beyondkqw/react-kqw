import React, { Component,PropTypes } from 'react';
import {areaData} from '../../Action/areaData'

export default class Location extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.provName=[]
        this.countysName=[]
        this.cityName=[]
        this.state = {
            prov: this.props.options.prov?this.props.options.prov:'110000',
            city: this.props.options.city?this.props.options.city:'110100',
            county: this.props.options.county?this.props.options.county:'110101',
            defaultText:['省份','城市','区县'],
            provIndex:0,
            cityIndex:0,
            countyIndex:0
        };
      }

    selectProv= (evt)=> {
        this.setState({
            prov: evt.target.value,
            city: '',
            county: '',
            provIndex:document.getElementById('selectProvName').selectedIndex
        })

    }
    selectCity= (evt)=>{
        this.setState({
            city: evt.target.value,
            county: '',
            cityIndex:document.getElementById('selectCityName').selectedIndex

        })
    }
    selectCounty= (evt)=>{
        this.setState({
            county: evt.target.value,
            countysIndex:document.getElementById('selectcountysName').selectedIndex
        })
    }

    getName(provName,cityName,countysName,prov,city,county){
        const {getInfomation} = this.props
        getInfomation&&getInfomation(provName,cityName,countysName,prov,city,county)

    }
    render() {
        var data = areaData,
            options = {
                defaultName:['provinceId','cityId','countyId'],
                defaultText:['请选择','请选择','请选择'],
                ...this.props.options}
        var provs = [], citys = [], countys = []
        for(var i in data.provinces){
            provs.push([i,data.provinces[i].name])
        }
        //获取到选中的省份
         this.provName = provs[parseInt(this.state.provIndex)-1]&&provs[parseInt(this.state.provIndex)-1][1]

        provs = provs.map(function(item){
            return <option value={item[0]}>{item[1]}</option>
        })

        if(this.state.prov){
            for(var i in data.provinces[this.state.prov].citys){
                citys.push([i,data.provinces[this.state.prov].citys[i].name])
            }

            //获取到选中的市
            this.cityName = citys[parseInt(this.state.cityIndex)-1]&&citys[parseInt(this.state.cityIndex)-1][1]

            citys = citys.map(function(item){
                return <option value={item[0]}>{item[1]}</option>
            })
        }
        if(this.state.prov && this.state.city){
            for(var i in data.provinces[this.state.prov].citys[this.state.city].countys){
                countys.push([i,data.provinces[this.state.prov].citys[this.state.city].countys[i].name])
            }

            //获取到选中的区
            this.countysName = countys[parseInt(this.state.countysIndex)-1]&&countys[parseInt(this.state.countysIndex)-1][1]

            countys = countys.map(function(item){
                return <option value={item[0]}>{item[1]}</option>
            })
        }

        const {hiddenModal} = this.props
        return(
        <div>
            <div className="color_yellow flex flex-pack-justify flex-align-center border_bottom padd15" style={{height:40}}>
                <span onClick = {hiddenModal}>取消</span>
                <span
                    onClick = {()=>this.getName(this.provName,this.cityName,this.countysName,this.state.prov,this.state.city,this.state.county)}
                >确定</span>
            </div>
            <div className="J_area_selector flex padd15" style={{marginBottom:30,marginTop:20}}>
                <select className="J_area_prov" id="selectProvName"  style={{height:30,width:'33.3%'}} name={options.defaultName[0]} value={this.state.prov} onChange={this.selectProv}>
                    <option>{options.defaultText[0]}</option>
                    {provs}
                </select>
                <select className="J_area_city" id="selectCityName" style={{height:30,width:'33.3%'}} name={options.defaultName[1]} value={this.state.city} onChange={this.selectCity}>
                    <option value="">{options.defaultText[1]}</option>
                    {citys}
                </select>
                <select className="J_area_county" id="selectcountysName" style={{height:30,width:'33.3%'}} name={options.defaultName[2]} value={this.state.county} onChange={this.selectCounty}>
                    <option value="">{options.defaultText[2]}</option>
                    {countys}
                </select>
            </div>

        </div>
        )
        ;
    }

}

