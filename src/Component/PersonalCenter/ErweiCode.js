import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {qrCode} from '../../Action/url'
import {loadToken,ROOT_URL} from '../../Action/rpc'
import {ErCode,imei,version,client,MyInfo} from '../../Action/auth'
import {initWxShare} from '../../Action/wxUtil'

export default class ErweiCode extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            path:'',
            personalId:''
        };
      }
     async componentWillMount() {
         const token = await loadToken()
         const erweiCodePath = ROOT_URL+qrCode +'?'
             +'token='+token+'&client='+'wx'+'&imei='+imei+'&version='+version+'&width=180&height=180'
         this.setState({path:erweiCodePath})
         await this.getMyInfo()

         initWxShare(
             "聚朵云",
             "http://jdypage.tunnel.qydev.com/api/shareQrCode?accId="+this.state.personalId,
             "../images/logo.png",
             "",
             "",
             "",
             0,
             this.state.personalId
         )
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({personalId:res.ID})
            })
    }

    render() {
        return (
            <div className="containerNav allIncome_Img supplement" style={{height:'100%'}}>
                <div className="tc" style={{marginTop:50}}>
                    <span className="di" style={{height:'7.7rem',width:'14.3rem'}}><img src={require('../../Images/common/erCodeText.png')} alt=""/></span>
                </div>
                <div className="width100 tc mt25">
                    <span className="di erWeiCode">
                        <img src={this.state.path} alt=""/>
                    </span>
                </div>
                <p className="f15 color_white tc" style={{marginTop:15}}>扫一扫，加入我</p>
            </div>
        );
    }
}
