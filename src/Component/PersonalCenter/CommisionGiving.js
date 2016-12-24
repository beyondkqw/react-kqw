import React, { Component} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/personal.css';
import {MyInfo,GiveAmount} from '../../Action/auth'

export default class CommisionGiving extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            accId:'',
            MyInfo:[]
        };
      }
    componentWillMount() {
        this.setState({accId:this.props.location.query.accId})
        this.getUserInfo()
    }

    async getUserInfo(){
        await MyInfo()
            .then(res=>{
                this.setState({MyInfo:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //赠送佣金
    async confirmPonit(){
        const amountNum = this.refs.pointAmount.value
        //判断转赠的佣金是否超出
        if(amountNum > this.state.MyInfo.NOW_AMOUNT){
            alert('余额不足')
            return
        }
        await GiveAmount(this.state.accId,amountNum)
            .then(res=>{
                alert('确认转赠成功')
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {toChange,imgUrl,memberName} = this.props.location.query
        const {MyInfo} = this.state
        return (
            <div className="bkg_color">
                <div className="list-block m0">
                    <ul>
                        {
                            toChange?
                                <Link to='/personalCenter/confirmGivenPerson'>
                                    <li className ='item-link item-content border_bottom isConfirmSet'>
                                        <div className="item-inner">
                                            <div className="item-title height_all">
                                                <span className="di headerImg">
                                                    <img className="border_ra50" src={imgUrl} alt=""/>
                                                </span>
                                                <span className="di margin15 color9 font14">{memberName}</span>
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                                :
                                <Link to='/personalCenter/confirmGivenPerson'>
                                    <li className="item-content item-link pl  border_bottom">
                                        <div className="item-media"><i className="icon icon-f7"></i></div>
                                        <div className="item-inner margin0">
                                            <div className="item-title color6 font14">
                                                确定转赠人
                                            </div>
                                        </div>
                                    </li>
                                </Link>
                        }
                    </ul>
                </div>
                <SplitLine />
                <div className="plAll">
                    <p className="color6 font14">转赠佣金</p>
                    <div className="mt5 mb1 f25 df">
                        <span className="flex-1">￥</span>
                        <input
                            className="borderno flex-1"
                            type="text"
                            placeholder="0.00"
                            ref='pointAmount'
                        />
                    </div>
                </div>
                <div className="plAll border_top border_bottom f12">
                    <span>最多可提取</span>
                    <span className="di ml">￥</span><span>{MyInfo.NOW_AMOUNT?MyInfo.NOW_AMOUNT:0}</span>
                </div>
                <SplitLine />
                <div className ="list-block m0 font14">
                    <li className ={'item-content border_bottom isConfirmSet'}>
                        <div className="item-inner">
                            <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                <span className="di margin15 color6">累计转赠佣金</span>
                            </div>
                            <div className="item-after color9 isSet">{MyInfo.GIVE_AMOUNT}</div>
                        </div>
                    </li>
                    <li className ={'item-content border_bottom isConfirmSet'}>
                        <div className="item-inner">
                            <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                <span className="di margin15 color6">现有佣金</span>
                            </div>
                            <div className="item-after color9 isSet">{MyInfo.NOW_AMOUNT}</div>
                        </div>
                    </li>
                    <li className ={'item-content border_bottom isConfirmSet'}>
                        <div className="item-inner">
                            <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                <span className="di margin15 color6">可用佣金</span>
                            </div>
                            <div className="item-after color9 isSet">{MyInfo.USE_POINTS}</div>
                        </div>
                    </li>
                </div>
                <CommonBtn
                    onClick={()=>this.confirmPonit()}
                    title={'确认转赠'}
                />
            </div>
        );
    }
}
