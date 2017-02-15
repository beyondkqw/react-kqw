import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {UpdatePerc,StoreDetailItem} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class StoreSubCommission extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            perc:''
        };
    }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        const storeId = this.props.location.query.storeId
        this.getStoreDetails(storeId)
    }

    async getPerc(){
        console.log('this.state.perc<100===>',(this.state.perc>100))
        if((this.state.perc>100) || !this.state.perc ){
            alert("请输入正确的分佣比例")
            return
        }
        await UpdatePerc(this.state.perc)
            .then(res=>{
                this.context.router.push({pathname:'/sellerStoreCenter'})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }


    //获取默认的分佣比例
    async getStoreDetails(storeId){
        await  StoreDetailItem(storeId)
            .then(res=>{
                this.setState({perc:res.store.perc})
            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }

    render(){
        console.log('this.state.perc',this.state.perc)
        return(
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'设置分佣比例'}
                />
                <SplitLine />
                <div className="flex flex-v flex-pack-center flex-align-center" style={{height:100}}>
                    <p>
                        <input
                            style={{width:80}}
                            className="borderno f25 tr color9"
                            type="text"
                            value={this.state.perc?this.state.perc:0}
                            ref='updatePerc'
                            onChange = {()=>this.setState({perc:this.refs.updatePerc.value})}
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