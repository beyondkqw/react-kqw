import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import '../../Stylesheets/App/personal.css';
import {StoreDetail,StoreEdit} from '../../Action/auth'
import NavBar from '../../Component/CommonComponent/NavBar'
import DelayModal from '../../Component/CommonComponent/DelayModal'
import Location from '../../Component/SellerStore/Location'
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
            cardBack:'',
            gpsAddress:'',
            showMap:false,
            Reminder:'',
            GPSaddress:'',
            uploadHeaderImg:'',
            uploadLicenseImg:'',
            uploadCardFaceImg:'',
            uploadCardBackImg:'',
            latitude:'',
            longitude:'',
            type:'',
            modalDelay:false,
            detail:'',
            checkChoose:'',
            locType:0,
            Mosaic:'http://jdy-images.oss-cn-shenzhen.aliyuncs.com/'
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.setState({GPSaddress:localStorage.getItem('address')})
        this.setState({latitude:localStorage.getItem('latitude')})
        this.setState({longitude:localStorage.getItem('longitude')})
        console.log('获取的定位信息======>',localStorage.getItem('address')+localStorage.getItem('latitude')+localStorage.getItem('longitude'))
        this.getStoreDetail(this.props.location.query.storeId)
    }

    async getStoreDetail(value){
        await StoreDetail(value)
            .then(res=>{
                this.setState({storeImg:res.store.img,uploadHeaderImg:res.store.img})
                this.setState({storeName:res.store.name})
                this.setState({address:res.store.address})
                this.setState({type:res.store.type})
                this.setState({licenseImg:res.store.license,uploadLicenseImg:res.store.license})
                this.setState({cardFace:res.store.cardFace,uploadCardFaceImg:res.store.cardFace})
                this.setState({cardBack:res.store.cardBack,uploadCardBackImg:res.store.cardBack})
                this.setState({provId:res.store.province})
                this.setState({cityId:res.store.city})
                this.setState({countyId:res.store.area})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //得到地址信息
    async getValue(provName,cityName,countysName,prov,city,county){
        //改变默认值
        if(prov == '110000' || prov =='120000' || prov =='310000' || prov =='500000'){
            //改变初始化的内容
            if((provName == ''|| provName == null|| provName== undefined) && (countysName != '' || countysName != null)&& countysName != undefined){
                await this.setState({provName:'北京市',cityName:'',countysName:countysName,provId:'110000',cityId:'0',countyId:county,showMap:false})
                this.setState({address:this.state.provName+''+this.state.cityName+this.state.countysName})
                return
            }
            if(countysName == '' || countysName == null || countysName== undefined){
                alert('请选择对应的城市和区县')
                return
            }
            if((provName != ''|| provName != null) && (county != '' || county != null)){
                await this.setState({provName:provName,cityName:'',countysName:countysName,provId:prov,cityId:'0',countyId:county,showMap:false})
                this.setState({address:this.state.provName+''+this.state.cityName+this.state.countysName+''})
                return
            }

        }else if(prov == '710000' || prov =='810000' || prov =='820000'){
            await this.setState({provName:provName,cityName:'',countysName:'',provId:prov,cityId:'0',countyId:'0',showMap:false})
            this.setState({address:this.state.provName+''+this.state.cityName+this.state.countysName})
            return
        }else if(prov != '' && city != '' && county != ''){
            await this.setState({
                    provName:provName,
                    cityName:cityName,
                    countysName:countysName,
                    showMap:false,
                    provId:prov,
                    cityId:city,
                    countyId:county
                })
            this.setState({address:this.state.provName+this.state.cityName+this.state.countysName})
        }else{
            alert('地址请选择完整')
        }
    }

    async confirmEdit(){
        if(!this.state.checkChoose){
            alert('请选择地址的类型')
            return
        }else{
            if(this.state.checkChoose == 'type'){
                if(this.state.detail == '' || this.state.detail == null ){
                    alert('请填写详细地址信息')
                    return
                }
                await this.setState({locType:2})
            }else{
                await this.setState({locType:1})
            }
        }
        let {storeName,detail,uploadHeaderImg,address,provId,cityId,countyId,uploadLicenseImg,uploadCardFaceImg,uploadCardBackImg,GPSaddress,latitude,longitude,type} = this.state

        uploadHeaderImg = this.state.Mosaic + uploadHeaderImg;
        uploadLicenseImg = this.state.Mosaic + uploadLicenseImg;
        uploadCardFaceImg = this.state.Mosaic + uploadCardFaceImg;
        uploadCardBackImg = this.state.Mosaic + uploadCardBackImg;

        const {checkChoose,locType} = this.state
        if(!storeName || !uploadHeaderImg || !address || !uploadLicenseImg || !uploadCardFaceImg || !uploadCardBackImg){
            this.setState({Reminder:'修改数据不能为空'})
            return
        }

        await StoreEdit(storeName,uploadHeaderImg,address,detail,locType,provId,cityId,countyId,uploadLicenseImg,uploadCardFaceImg,uploadCardBackImg,'宝安区','10.55','22.00',type)
            .then(res=>{
                this.context.router.push({pathname:'/storeSubCommission',query:{storeId:this.props.location.query.storeId}})
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

        var uuid4 = UUID.create().toString();
        console.log(uuid4.toString());
        var storeAs = 'sq/'+uuid4+''+suffix;
        this.setState({modalDelay:true})

        client.multipartUpload(storeAs, file).then((result)=> {
            this.setState({modalDelay:false})
            switch (type){
                case 1 : this.setState({storeImg:fileName,uploadHeaderImg:storeAs})
                    break;
                case 2 : this.setState({licenseImg:fileName,uploadLicenseImg:storeAs})
                    break;
                case 3 : this.setState({cardFace:fileName,uploadCardFaceImg:storeAs})
                    break;
                case 4 : this.setState({cardBack:fileName,uploadCardBackImg:storeAs})
                    break;
                default : this.status = ''
                    break;
            }
        }).catch(function (err) {
            console.log(err);
        })
    }

    render() {
        const {storeImg,storeName,address,licenseImg,cardFace,cardBack,showMap} = this.state
        return (
            <div className="containerNav" style={{paddingBottom:30}}>
                <NavBar
                    renderBack = {true}
                    title = {'店铺资料'}
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
                                onChange={()=>this.setState({storeName:this.refs.storeName.value})}
                            />
                        </div>
                    </div>
                    <div
                        style={{flexDirection:'row',height:50}}
                        className="df flex-pack-justify flex-align-center border_bottom plr font14"
                        onClick = {()=>this.setState({showMap:true})}
                    >
                        <span className="color6">店铺地址</span>
                        <div>
                            <span className="font14 color9">{address}</span>
                            <span className="di ml5" style={{width:9,height:16,lineHeight:0}}>
                                <img src={require('../../Images/rightArrow.png')} alt=""/>
                            </span>
                        </div>
                    </div>

                    {/* <Link to="/sellerMineCode">
                        <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                            <span className="color6">我的二维码名片</span>
                            <span className="di qrCode">
                                <img src={require('../../Images/QrCode.png')} alt=""/>
                            </span>
                        </div>
                    </Link>*/}
                    <div
                        style={{flexDirection:'row',height:50}}
                        className="df flex-pack-justify flex-align-center border_bottom plr font14"
                    >
                        <span className="color6">详细信息</span>
                        <div>
                            <input
                                ref = 'address_Detais'
                                className="borderno tr color9"
                                type="\"
                                placeholder="请填写详细信息"
                                onChange={()=>this.setState({detail:this.refs.address_Detais.value})}
                            />
                        </div>
                    </div>
                    <div
                        style={{flexDirection:'row',height:50}}
                        className="df flex-pack-justify flex-align-center border_bottom plr font14"
                    >
                        <span className="color6">当前店铺地址</span>
                        <div>

                        </div>
                    </div>
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center plr font14  border_bottom">
                        <div className="pr lh25">
                            <span className="di check_radius pr fl">
                                <input
                                    type="radio"
                                    id="isCheck"
                                    name="chooseTime"
                                    className="di isConfirm"
                                    onClick={()=>this.setState({checkChoose:'type'})}
                                />
                                <label htmlFor="isCheck"></label>
                            </span>
                            <span className="di font14 color6 ml5 fl">自己所选的地址</span>
                        </div>
                        <div className="pr lh25">
                            <span className="di check_radius pr fl">
                                <input
                                    type="radio"
                                    id="isGps"
                                    name="chooseTime"
                                    className="di isConfirm"
                                    onClick={()=>this.setState({checkChoose:'type1'})}
                                />
                                <label htmlFor="isGps"></label>
                            </span>
                            <span className="di font14 color6 ml5 fl">定位地址</span>
                        </div>
                    </div>
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

                <div className="tc f12 color_red width_100 loginHeight" style={{lineHeight:'1.8rem'}}>
                    {this.state.Reminder}
                </div>
                <CommonBtn
                    title = {'确定'}
                    onClick={()=>this.confirmEdit()}
                />
                {
                    showMap?
                        <div className="locationModal pa width_100 font14 flex flex-v" style={{zIndex:100}}>
                            <div
                                className="shadowNav flex-1"
                            >
                            </div>
                            <div className="bkg_color width_100">
                                <Location
                                    getInfomation = {(provName,cityName,countysName,prov,city,county)=>this.getValue(provName,cityName,countysName,prov,city,county)}
                                    hiddenModal = {()=>this.setState({showMap:false})}
                                    options= {{
                                        prov:'110000',
                                        city:'110100',
                                        county:'0',
                                        defaultText:['省份','城市','区县']
                                    }}
                                />
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
