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
         console.log('Token====>',token)
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
        const {image,memberName} = this.props.location.query
        return (
            <div className="containerNav allIncome_Img supplement">
                <div className="pa_top1 tc">
                    <span className="di incomeImg">
                        <img className="border_ra50" src={image} alt=""/>
                    </span>
                    <p className="f12 color9 mt5">{memberName}</p>
                </div>
                <div className="width100 tc mt25">
                    <span className="di erWeiCode">
                        <img src={this.state.path} alt=""/>
                    </span>
                </div>
                {/* <div className="pf bottom0 tc userHeight bkg_ff width100 color_white font16">
                    分享
                </div>*/}
            </div>
        );
    }
}
