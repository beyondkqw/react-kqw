import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import {MyInfo,UpdateInfo} from '../../Action/auth'
import {changeTime} from '../../Action/rpc'

export default class SellerSetting extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            isShow:false,
            sex:'',
            memberName:'',
            realName:'',
            imageUri:'',
            area:'',
            address:'',
        };
    }

    componentWillMount() {
        this.getMyInfo()
    }

    async getMyInfo(){
        await MyInfo()
            .then(res=>{
                console.log('个人资料',res)
                this.setState({
                    realName : res.REAL_NAME,
                    sex : res.SEX == 0?'男':'女',
                    memberName : res.MEMBER_NAME,
                    imageUri : res.IMAGE_URI,
                    area : res.AREA,
                    address:res.ADDRESS
                })
            })
    }

    async confirmSubmit(){
        const {sex,memberName,realName,imageUri,area,address} = this.state
        await UpdateInfo(memberName,realName,imageUri,area,address,sex =='男'?0:1)
            .then(res=>{
                this.context.router.push({pathname:'/personalCenter'})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    static contextTypes = {
        router:PropTypes.object
    }

    //上传图片
    uploadPhoto(){
        this.setState({imageUri:this.refs.imgUrl.value})
    }
    render() {
        const {isShow,sex,memberName,realName,imageUri,area,address} = this.state
        return (
            <div className="containerNav" style={{paddingBottom:30}}>
                <SplitLine />
                <div className="list-block m0">
                    <Link>
                        <li className="item-content pl" style={{minHeight:60}}>
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">店铺头像</div>
                                <div className="item-after pr headerImg" style={{maxHeight:40}}>
                                    <input
                                        className="pa top0"
                                        type="file"
                                        style={{left:0,width:40,height:40,padding:0,opacity:0}}
                                        ref='imgUrl'
                                        onChange={()=>this.uploadPhoto()}
                                    />
                                    <img className="border_ra50" src={imageUri} alt=""/>
                                </div>
                            </div>
                        </li>
                    </Link>
                </div>
                <div className="list-block m0">
                    <ul>
                        <li className="item-content pl border_bottom">
                            <div className="item-media"><i className="icon icon-f7"></i></div>
                            <div className="item-inner font14">
                                <div className="item-title color6">店铺名称</div>
                                <div className="item-after fr tr">
                                    <input
                                        key="4"
                                        style={{height:24,fontSize:12,color:'#999'}}
                                        className="tr borderno"
                                        type="text"
                                        placeholder="编辑"
                                        ref='memberName'
                                        value={memberName}
                                        onChange={()=>this.setState({memberName:this.refs.memberName.value})}
                                    />
                                </div>
                            </div>
                        </li>
                        <Link to="/sellerMineCode">
                            <li className="item-content item-link pl">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner">
                                    <div className="item-title color6  font14">我的二维码名片</div>
                                    <div className="item-after">
                                        <span className="di qrCode">
                                            <img src={require('../../Images/QrCode.png')} alt=""/>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div>
                    <div className="userHeight border_bottom plr font14">
                        <div className="fl color6">姓名</div>
                        <div className="fr f12 color9 tr">
                            <span className="di height_all">
                                <input
                                    key="1"
                                    className="tr borderno"
                                    type="text"
                                    placeholder="编辑"
                                    ref='realName'
                                    value={realName}
                                    onChange={()=>this.setState({realName:this.refs.realName.value})}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="userHeight border_bottom plr font14">
                        <div className="fl color6">微信</div>
                        <div className="fr f12 color9 tr">
                            <span className="di height_all">
                                <input
                                    key="1"
                                    className="tr borderno"
                                    type="text"
                                    placeholder="编辑"
                                    ref='realName'
                                    value={realName}
                                    onChange={()=>this.setState({realName:this.refs.realName.value})}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="userHeight border_bottom plr font14">
                        <div className="fl color6">手机号</div>
                        <div className="fr f12 color9 tr">
                            <span className="di height_all">
                                <input
                                    key="1"
                                    className="tr borderno"
                                    type="text"
                                    placeholder="编辑"
                                    ref='realName'
                                    value={realName}
                                    onChange={()=>this.setState({realName:this.refs.realName.value})}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="userHeight border_bottom plr font14">
                        <div className="fl color6">邮箱</div>
                        <div className="fr f12 color9 tr">
                            <span className="di height_all">
                                <input
                                    key="1"
                                    className="tr borderno"
                                    type="text"
                                    placeholder="编辑"
                                    ref='realName'
                                    value={realName}
                                    onChange={()=>this.setState({realName:this.refs.realName.value})}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="userHeight border_bottom plr font14">
                        <div className="fl color6">地区</div>
                        <div className="fr f12 color9 tr">
                            <span className="di height_all">
                                <input
                                    key="2"
                                    className="tr borderno"
                                    type="text"
                                    placeholder="编辑"
                                    value={area}
                                    ref='area'
                                    onChange={()=>this.setState({area:this.refs.area.value})}
                                />
                            </span>
                        </div>
                    </div>
                    <div className="userHeight border_bottom plr font14">
                        <div className="fl color6">详细地址</div>
                        <div className="fr f12 color9 tr">
                            <span>
                                <input
                                    key="3"
                                    className="tr borderno"
                                    type="text"
                                    placeholder="编辑"
                                    ref='address'
                                    value={address}
                                    onChange={()=>this.setState({address:this.refs.address.value})}
                                />
                            </span>
                        </div>
                    </div>
                </div>
                <CommonBtn
                    title = {'确定'}
                    onClick={()=>this.confirmSubmit()}
                />
            </div>
        );
    }
}
