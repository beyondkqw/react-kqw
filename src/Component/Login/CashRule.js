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
        //type 3用户协议 1充值  2分佣 4提现 5帮助与反馈 6关于聚朵云 7 聚朵云商用户协议
        await this.setState({type:this.props.location.query.type})
        this.getNoticeView(this.state.type)
    }

    getNoticeView(type){
        NoticeView(type==1?'CHARGEAGREE':type==2?'SHARERULE':type==3?'AGREEMENT':type == 4?'CASHRULE':type == 5?'HELP':type == 6?'ABOUT':type == 7?'AGREEMENT_SELLER':'')
            .then(async res=>{
                await this.setState({URl:res&&res[0].URL})
            })
            .catch(err=>{
                console.warn('NoticeView err',err)
            })
    }

    render() {
        return (
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'关于聚朵云'}
                />
                <iframe
                    src={this.state.URl}
                    id="myiframe" overflow='auto'
                    onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)"
                    scrolling="yes"
                    style={{border:'none',width:'100%',height:'100%',position:'absolute',top:45,bottom:0}}>
                </iframe>
            </div>
        );
    }
}
