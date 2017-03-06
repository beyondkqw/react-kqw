import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import {MyInfo,UpdateInfo} from '../../Action/auth'
import {changeTime} from '../../Action/rpc'
import DelayModal from '../../Component/CommonComponent/DelayModal'
import UUID from 'uuid-js'

export default class UserInfo extends Component {
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
            modalDelay:false,
            isUploadHeader:false,
            Mosaic:'http://jdy-images.oss-cn-shenzhen.aliyuncs.com/',
            uploadHeaderImg:''
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
                    uploadHeaderImg:res.IMAGE_URI,
                    area : res.AREA,
                    address:res.ADDRESS
                })
            })
    }

    async confirmSubmit(){
        const sdm = 'http://jdy-images.oss-cn-shenzhen.aliyuncs.com/http://jdy-images.oss-cn-shenzhen.aliyuncs.com/sq/c2fdcd42-66e2-4428-9f18-98363c'
        let {uploadHeaderImg} = this.state
        uploadHeaderImg = this.state.isUploadHeader?uploadHeaderImg:uploadHeaderImg.substring(uploadHeaderImg.indexOf('sq/'),uploadHeaderImg.indexOf('@!head_img_style'));
        const {sex,memberName,realName,area,address} = this.state
        await UpdateInfo(memberName,realName,uploadHeaderImg,area,address,sex =='男'?0:1)
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
    fileChange (e){
        var client = new OSS.Wrapper({
            region: 'oss-cn-shenzhen',
            accessKeyId: 'LTAIbrSAT1OgIEDo',
            accessKeySecret: 'rOI5hYbqCTy3B2sb6Zbt77Is9h34XS',
            bucket: "jdy-images"
        });

        var file = e.target.files[0];
        var fileName = window.URL.createObjectURL(file)
        var index1=file.name.lastIndexOf(".");
        var index2=file.name.length;
        var suffix=file.name.substring(index1,index2)

        var uuid4 = UUID.create().toString();
        console.log(uuid4.toString());
        var storeAs = 'sq/'+uuid4+''+suffix;
        this.setState({modalDelay:true})

        client.multipartUpload(storeAs, file).then((result)=> {
            this.setState({modalDelay:false})
            this.setState({imageUri:fileName,uploadHeaderImg:storeAs,isUploadHeader:true})
        }).catch(function (err) {
            console.log(err);
        })
    }

    render() {
        const {isShow,sex,memberName,realName,imageUri,area,address} = this.state
        return (
            <div className="containerNav">
                <SplitLine />
                <div className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:60,padding:'0 10px'}}>
                    <div className="color6">聚朵云头像</div>
                    <div className="pr headerImg" style={{maxHeight:40}}>
                        <input
                            className="pa top0"
                            type="file"
                            style={{left:0,width:40,height:40,padding:0,opacity:0}}
                            ref='imgUrl'
                            onChange={(e)=>this.fileChange(e)}
                        />
                        <img className="border_ra50" src={imageUri} alt=""/>
                    </div>
                </div>
                <div className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:50,padding:'0 10px'}}>
                    <div className="color6">会员名</div>
                    <div className="fr tr">
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
                <div
                    className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:50,padding:'0 10px'}}
                    onClick={()=>this.setState({isShow:!this.state.isShow})}
                >
                    <div className="color6">性别</div>
                    <div className="color9">{sex}</div>
                </div>
                <Link to="/personalCenter/erweiCode">
                    <div className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:50,padding:'0 10px'}}>
                        <div className="color6  font14">我的二维码名片</div>
                        <div>
                            <span className="di qrCode">
                                <img src={require('../../Images/QrCode.png')} alt=""/>
                            </span>
                        </div>
                    </div>
                </Link>
                <div>
                    <ul>
                        <li>
                            <div className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:50,padding:'0 10px'}}>
                                <div className="fl color6">姓名</div>
                                <div className="fr f12 color9 tr">
                                    <span className="di height_all">
                                        <input
                                            key="1"
                                            className="tr borderno"
                                            type="text"
                                            placeholder="编辑"
                                            ref='realName'
                                            value={realName?realName:''}
                                            onChange={()=>this.setState({realName:this.refs.realName.value})}
                                        />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:50,padding:'0 10px'}}>
                                <div className="fl color6">地区</div>
                                <div className="fr f12 color9 tr">
                                    <span className="di height_all">
                                        <input
                                            key="2"
                                            className="tr borderno"
                                            type="text"
                                            placeholder="编辑"
                                            value={area?area:''}
                                            ref='area'
                                            onChange={()=>this.setState({area:this.refs.area.value})}
                                        />
                                    </span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="flex flex-pack-justify flex-align-center border_bottom font14" style={{height:50,padding:'0 10px'}}>
                                <div className="fl color6">详细信息</div>
                                <div className="fr f12 color9 tr">
                                    <span>
                                        <input
                                            key="3"
                                            className="tr borderno"
                                            type="text"
                                            placeholder="编辑"
                                            ref='address'
                                            value={address?address:''}
                                            onChange={()=>this.setState({address:this.refs.address.value})}
                                        />
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div style={{marginTop:50}}>
                    <CommonBtn
                        title = {'确定'}
                        onClick={()=>this.confirmSubmit()}
                    />
                </div>
                {
                    isShow?
                        <div className="modalNav pa width_100 height_all font14" style={{zIndex:100}}>
                            <div className="modal_body border_ra scale">
                                <p className="tc color_white bkg_ff pt7 sexChange_br">
                                    选择性别
                                </p>
                                <div  className="tc">
                                    <ul>
                                        <li
                                            className="ptb border_bottom"
                                            onClick={()=>this.setState({sex:'男',isShow:false})}
                                        >男</li>
                                        <li
                                            className="ptb"
                                            onClick={()=>this.setState({sex:'女',isShow:false})}
                                        >女</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :null
                }
                {
                    this.state.modalDelay?
                        <DelayModal />
                        :null

                }
            </div>
        );
    }
}
