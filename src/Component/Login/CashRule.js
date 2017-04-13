import React, { Component } from 'react';
import {NoticeView} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class CashRule extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            type:'',
            URl:''
        };
    }

    async componentWillMount() {
        //type 3用户协议 1充值  2分佣 4提现 5帮助与反馈 6关于聚朵云 7 聚朵云商用户协议 8 佣金转赠 9关于聚朵云商
        await this.setState({type:this.props.location.query.type})
        this.getNoticeView(this.state.type)
    }

    getNoticeView(type){
        NoticeView(type==1?'CHARGEAGREE':type==2?'SHARERULE':type==3?'AGREEMENT':type == 4?'CASHRULE':type == 5?'HELP':type == 6?'ABOUT':type == 7?'AGREEMENT_SELLER':type == 8?'GIVE_AMOUNT':type == 9?'ABOUT_SHOP' :'')
            .then(async res=>{
                await this.setState({URl:res&&res[0].URL})
            })
            .catch(err=>{
                console.warn('NoticeView err',err)
            })
    }

    render() {
        const {type} = this.state
        return (
            <div>
                <NavBar
                    renderBack = {true}
                    title = {type==1?'充值协议':type==2?'分佣协议':type==3?'用户协议':type == 4?'提现协议':type == 5?'帮助与反馈':type == 6?'关于聚朵云':type == 7?'聚朵云商用户协议':type == 8?'佣金转赠协议':type == 9?'关于聚朵云商协议':''}
                />
                <iframe
                    src={this.state.URl}
                    id="myiframe" overflow='auto'
                    onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)"
                    scrolling="yes"
                    style={{border:'none',width:'100%',height:'100%',position:'absolute',top:45,bottom:0,fontSize:14}}>
                </iframe>
            </div>
        );
    }
}
