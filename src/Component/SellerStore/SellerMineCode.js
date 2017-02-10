import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {qrCode} from '../../Action/url'
import wx from 'weixin-js-sdk';
import {loadToken,ROOT_URL,initWxShare} from '../../Action/rpc'
import {MyInfo,ErCode,imei,version,client,InitWxJsSDk} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class SellerMineCode extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            path:'',
            storeDetails:''
        };
      }

    async componentWillMount() {
        this.getMyInfo()
        const token = await loadToken()
        console.log('Token====>',token)
        const erweiCodePath = ROOT_URL+qrCode +'?'
            +'token='+token+'&client='+'wx'+'&imei='+imei+'&version='+version+'&width=180&height=180'
        this.setState({path:erweiCodePath})
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({storeDetails:res})
            })
    }

    render() {
        const {storeDetails} = this.state
        return (
            <div className="containerNav allIncome_Img supplement">
                <NavBar
                    renderBack = {true}
                    title = {'二维码名片'}
                />
                <div className="pa_top1 tc">
                    <span className="di incomeImg">
                        <img className="border_ra50" src={storeDetails.IMAGE_URI} alt=""/>
                    </span>
                    <p className="f12 color6 mt5">{storeDetails.MEMBER_NAME}</p>
                </div>
                <div className="width100 tc mt25">
                    <span className="di erWeiCode">
                        <img src={this.state.path} alt=""/>
                    </span>
                </div>
                <div className="pf bottom0 tc userHeight bkg_ff width100 color_white font16">
                    分享
                </div>
            </div>
        );
    }
}
