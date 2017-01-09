import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {UpdatePerc} from '../../Action/auth'

export default class StoreSubCommission extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }
    static contextTypes = {
        router:PropTypes.object
    }

    async getPerc(){
        if(!this.refs.updatePerc.value){
            alert("输入的分佣比例不能为空")
            return
        }
        await UpdatePerc(this.refs.updatePerc.value)
            .then(res=>{
                this.context.router.push({pathname:'/sellerStoreCenter'})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }
    render(){
        return(
            <div className="containerNav">
                <SplitLine />
                <div className="flex flex-v flex-pack-center flex-align-center" style={{height:100}}>
                    <p>
                        <input
                            style={{width:80}}
                            className="borderno f25 tr color9"
                            type="text"
                            placeholder="0.00"
                            ref='updatePerc'
                        />
                        <span className="f15">%</span>
                    </p>
                    <span className="font14 color6">佣金比例设置</span>
                </div>
                <SplitLine />
                <div className="pl1 color6 mb50">
                    <p className="font14 tc">分佣规则说明</p>
                    <ul className="f12 mt55">
                        <li style={{marginTop:10}}>1、公众平台暗红色的巨舒服是的收到回复蜀都赋都还在疯狂收到货开发有是</li>
                        <li style={{marginTop:10}}>2、公众平台暗红色的巨舒服是的收到回复</li>
                        <li style={{marginTop:10}}>3、公众平台暗红色的巨舒服是的收到回复</li>
                    </ul>
                </div>
                <div
                    className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                    style={{height:50,backgroundColor:'#ff5500'}}
                    onClick={()=>this.getPerc()}>
                    确定
                </div>
            </div>
        )
    }
}