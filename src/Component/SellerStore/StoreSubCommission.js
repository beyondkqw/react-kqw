import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {UpdatePerc,StoreDetailItem,NoticeView} from '../../Action/auth'
import {ChinaChar,EnglishChar,specialCharPoint} from '../../Action/rpc'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class StoreSubCommission extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            perc:'',
            URl:''
        };
    }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        const storeId = this.props.location.query.storeId
        this.getStoreDetails(storeId)
        this.getNoticeView()
    }

    getNoticeView(){
        NoticeView('SHARERULE')
            .then(async res=>{
                await this.setState({URl:res&&res[0].URL})
            })
            .catch(err=>{
                console.warn('NoticeView err',err)
            })
    }

    async getPerc(){
        console.log(ChinaChar(this.state.perc))
        console.log(EnglishChar(this.state.perc))
        console.log(specialCharPoint(this.state.perc))
        if((this.state.perc>100) || !this.state.perc || ChinaChar(this.state.perc) || EnglishChar(this.state.perc) || specialCharPoint(this.state.perc) ){
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
                this.setState({perc:res.store.perc?res.store.perc:0})
            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }

    render(){
        const {URl} = this.state
        return(
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'设置分佣比例'}
                />
                <SplitLine />
                <div className="flex flex-v flex-pack-center flex-align-center" style={{height:100}}>
                    <p>
                        <input
                            style={{width:70,borderBottom:'1px solid #e5e5e5'}}
                            className="borderno f25 color9 tc"
                            type="text"
                            value={this.state.perc}
                            ref='updatePerc'
                            onChange = {()=>this.setState({perc:this.refs.updatePerc.value})}
                        />
                        <span className="f15">%</span>
                    </p>
                    <span style={{marginTop:5}} className="di font14 color6">佣金比例设置</span>
                </div>
                <SplitLine />
                <div className="pl1 color6 mb50">
                    <p className="font14 tc">分佣规则说明</p>
                    <iframe src={URl} id="myiframe" overflow='auto' onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)" scrolling="yes" style={{border:'none',width:'100%',height:window.innerHeight-258}}></iframe>
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