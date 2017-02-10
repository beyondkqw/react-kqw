import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import {StoreDetail,StoreEdit} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'
import UUID from 'uuid-js'

export default class SellerSetting extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeImg:'',
            storeName:'',
            address:'',
            licenseImg:'',
            cardFace:'',
            cardBack:''
        };
      }

    componentWillMount() {
        this.getStoreDetail(this.props.location.query.storeId)
    }

    async getStoreDetail(value){
        await StoreDetail(value)
            .then(res=>{
                this.setState({storeImg:res.store.img})
                this.setState({storeName:res.store.name})
                this.setState({address:res.store.address})
                this.setState({licenseImg:res.store.license})
                this.setState({cardFace:res.store.cardFace})
                this.setState({cardBack:res.store.cardBack})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    confirmEdit(){
        const {storeName,uploadStoreImg,licenseImg,cardFace,cardBack} = this.state
        this.editInformation(storeName,uploadStoreImg,'深圳宝安','1001','1002','1003',licenseImg,cardFace,cardBack,'')
    }

    async editInformation(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress){
        await StoreEdit(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress)
            .then(res=>{
                this.context.router.push({pathname:'/storeSubCommission'})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }

    //上传图片
    fileChange (type,e){
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
        console.log(suffix)

        var uuid4 = UUID.create().toString();
        console.log(uuid4.toString());
        var storeAs = 'sq/'+uuid4+''+suffix;
        console.log(file.name + ' => ' + storeAs);
        client.multipartUpload(storeAs, file).then((result)=> {
            console.log(result.url);
            switch (type){
                case 1 : this.setState({storeImg:fileName})
                    break;
                case 2 : this.setState({licenseImg:fileName})
                    break;
                case 3 : this.setState({cardFace:fileName})
                    break;
                case 4 : this.setState({cardBack:fileName})
                    break;
                default : this.status = ''
                    break;
            }
        }).catch(function (err) {
            console.log(err);
        })
    }

    render() {
        const {storeImg,storeName,address,licenseImg,cardFace,cardBack} = this.state
        return (
            <div className="containerNav" style={{paddingBottom:30}}>
                <NavBar
                    renderBack = {true}
                    title = {'个人资料'}
                />
                <SplitLine />
                <div className="lh60 border_bottom plr font14 df flex-pack-justify flex-align-center">
                    <span className="color6">店铺头像</span>
                    <div className="pr storeHeaderImg">
                        <input
                            type="file"
                            ref='storeHeaderImg'
                            onChange={(e)=>this.fileChange(1,e)}
                            //onChange={()=>this.state({storeImg:this.refs.storeHeaderImg.value})}
                        />
                        <img className="border_ra50" src={storeImg} alt=""/>
                    </div>
                </div>
                <div>
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center plr font14 border_bottom">
                        <span className="color6">店铺名称</span>
                        <div>
                            <input
                                type="text"
                                className="borderno tr font14 color9"
                                value={storeName}
                                ref='storeName'
                                onChange={()=>this.state({storeName:this.refs.storeName.value})}
                            />
                        </div>
                    </div>
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                        <span className="color6">店铺地址</span>
                        <div>
                            <span className="font14 color9">{address}</span>
                            <span className="di ml5" style={{width:9,height:16,lineHeight:0}}>
                                <img src={require('../../Images/rightArrow.png')} alt=""/>
                            </span>
                        </div>
                    </div>
                    <Link to="/sellerMineCode">
                        <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                            <span className="color6">我的二维码名片</span>
                            <span className="di qrCode">
                                <img src={require('../../Images/QrCode.png')} alt=""/>
                            </span>
                        </div>
                    </Link>
                </div>
                <SplitLine />
                <div className="df flex-pack-justify flex-pack-center flex-align-center plAll border_bottom">
                    <span className="font14 color6">营业执照</span>
                    <div className="uploadFile flex" style={{marginTop:0}}>
                        <span className="di uploadCardImg">
                            <input
                               type="file"
                               ref='licenseImg'
                               onChange={(e)=>this.fileChange(2,e)}
                               //onChange={()=>this.setState({licenseImg:this.refs.licenseImg.value})}
                            />
                            <img className="educationImg border_ra" src={licenseImg} />
                        </span>
                    </div>
                </div>
                <div className="df flex-pack-justify flex-pack-center flex-align-center plAll border_bottom">
                    <span className="font14 color6">身份证</span>
                    <div className="uploadFile flex" style={{marginTop:0}}>
                        <span className="di uploadCardImg">
                            <input
                               type="file"
                               ref='cardFace'
                               onChange={(e)=>this.fileChange(3,e)}
                               //onChange={()=>this.setState({cardFace:this.refs.cardFace.value})}
                            />
                            <img className="educationImg border_ra" src={cardFace} />
                        </span>
                       <span className="di uploadCardImg ml5">
                            <input type="file"
                               ref='cardBack'
                               onChange={(e)=>this.fileChange(4,e)}
                               //onChange={()=>this.setState({cardBack:this.refs.cardBack.value})}
                            />
                            <img className="educationImg border_ra" src={cardBack} />
                        </span>
                    </div>

                </div>
                <div style={{marginTop:50}}>
                    <CommonBtn
                        title = {'确定'}
                        onClick={()=>this.confirmEdit()}
                    />
                </div>
            </div>
        );
    }
}
