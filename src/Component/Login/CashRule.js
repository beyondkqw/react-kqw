import React, { Component } from 'react';
import {NoticeView} from '../../Action/auth'

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
        //type 3用户协议 1充值  2分佣 4提现
        await this.setState({type:this.props.location.query.type})
        this.getNoticeView(this.state.type)
    }

    getNoticeView(type){
        NoticeView(type===1?'RECHARGE':type==2?'SHARERULE':type==3?'AGREEMENT':type?'CASHRULE':'')
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
                <iframe
                    src={this.state.URl}
                    id="myiframe" overflow='auto'
                    onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)"
                    scrolling="yes"
                    style={{border:'none',width:'100%',height:'100%',position:'absolute',top:0,bottom:0}}>
                </iframe>
            </div>
        );
    }
}
