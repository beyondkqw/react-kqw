/**
 * Created by asus on 2016/11/21.
 */
import React, { Component,PropTypes } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {EnterStoreInformation,StoreType} from '../../Action/auth'
import Location from '../../Component/SellerStore/Location'
import '../../Stylesheets/App/sellerStore.css';
import NavBar from '../../Component/CommonComponent/NavBar'
import DelayModal from '../../Component/CommonComponent/DelayModal'
import UUID from 'uuid-js'


export default class EntryStoreInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.address = '',
        this.latitude = '',
        this.longitude = '',
        this.state = {
            Reminder:'',
            modalDelay:false,
            chooseType:false,
            StoreTypeItem:[],
            id:'',
            storeType:'',
            showMap:false,
            uploadStoreImg:require("../../Images/common/uploadImg.png"),
            licenseImg:require("../../Images/uploadImg.png"),
            cardFace:require("../../Images/uploadImg.png") ,
            cardBack:require("../../Images/uploadImg.png"),
            provName:'',
            cityName:'',
            countysName:'',
            provId:'',
            cityId:'',
            countyId:'',
            uploadHeaderImg:'',
            uploadLicenseImg:'',
            uploadCardFaceImg:'',
            uploadCardBackImg:'',
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
        this.getStoreType()
    }

    componentDidMount() {
        this.latitude = sessionStorage.getItem('latitude')
        this.longitude = sessionStorage.getItem('longitude')
        this.address = sessionStorage.getItem('address')
    }

    //得到地址信息
    getValue(provName,cityName,countysName,prov,city,county){
        //改变默认值
        if(prov == '110000' || prov =='120000' || prov =='310000' || prov =='500000'){
            //改变初始化的内容
            if((provName == ''|| provName == null) && (countysName != '' || countysName != null)&& countysName != undefined){
                this.setState({provName:'北京市',cityName:'',countysName:countysName,provId:'110000',cityId:'0',countyId:county,showMap:false})
                return
            }
            if(countysName == '' || countysName == null || countysName== undefined){
                alert('请选择对应的城市和区县')
                return
            }
            if((provName != ''|| provName != null) && (county != '' || county != null)){
                this.setState({provName:provName,cityName:'',countysName:countysName,provId:prov,cityId:'0',countyId:county,showMap:false})
                return
            }

        }else if(prov == '710000' || prov =='810000' || prov =='820000'){
            this.setState({provName:provName,cityName:'',countysName:'',provId:prov,cityId:'0',countyId:'0',showMap:false})
            return
        }else if(prov != '' && city != '' && county != ''){
            this.setState({
                provName:provName,
                cityName:cityName,
                countysName:countysName,
                showMap:false,
                provId:prov,
                cityId:city,
                countyId:county,
            })
        }else{
            alert('地址请选择完整')
        }

    }

    async confirmInformation(){
        //判断选择位置的类型
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
        let {uploadStoreImg,detail,licenseImg,cardFace,cardBack,uploadHeaderImg,uploadLicenseImg,uploadCardFaceImg,uploadCardBackImg} = this.state

        const storeName = this.refs.storeName.value
        const {checkChoose,locType} = this.state
        //非空校验
        if(!uploadHeaderImg){
            this.setState({Reminder:'上传的头像不能为空'})
            return
        }else if(!storeName){
            this.setState({Reminder:'店铺名不能为空'})
            return
        }else if(!uploadLicenseImg){
            this.setState({Reminder:'上传的营业执照不能为空'})
            return
        }else if(!uploadCardFaceImg||!uploadCardBackImg){
            this.setState({Reminder:'上传的身份证照片不能为空'})
            return
        }else if(this.state.id == ''){
            this.setState({Reminder:'请点击选择店铺类型'})
            return
        }else if(this.state.provName == ''){
            this.setState({Reminder:'请选择店铺地址'})
            return
        }else{
            this.setState({Reminder:''})
        }
        //拼接上传图片的地址
        uploadHeaderImg = this.state.Mosaic + uploadHeaderImg;
        uploadLicenseImg = this.state.Mosaic + uploadLicenseImg;
        uploadCardFaceImg = this.state.Mosaic + uploadCardFaceImg;
        uploadCardBackImg = this.state.Mosaic + uploadCardBackImg;

        this.getInformation(this.props.location.query.registerMobile,storeName,uploadHeaderImg,this.state.provName+this.state.cityName+this.state.countysName,detail,locType,this.state.provId,this.state.cityId,this.state.countyId,uploadLicenseImg,uploadCardFaceImg,uploadCardBackImg,this.address,this.latitude,this.longitude,this.state.id)
    }

    async getInformation(mobile,name,img,address,detail,locType,province,city,area,license,cardFace,cardBack,gpsAddress,latitude,longitude,type){
        await EnterStoreInformation(mobile,name,img,address,detail,locType,province,city,area,license,cardFace,cardBack,gpsAddress?gpsAddress:'',latitude?latitude:'',longitude?longitude:'',type)
            .then(res=>{
                alert('店铺申请成功,请耐心等待')
                this.context.router.push({pathname:'/storeSubCommission'})
            })
            .catch(err=>{
                this.setState({Reminder:err.message})
            })
    }

    //获取店铺类型
    async getStoreType(){
        await  StoreType()
            .then(res=>{
                res.map(item=>{
                    this.setState({StoreTypeItem:res})
                })
            })
            .catch(err=>{
                console.warn('获取商品属性失败',err)
            })
    }

    getType(id,name){
        this.setState({id:id})
        this.setState({chooseType:false})
        this.setState({storeType:name})
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
        this.setState({modalDelay:true})
        client.multipartUpload(storeAs, file).then((result)=> {
            console.log(result.url);
            this.setState({modalDelay:false})
            switch (type){
                case 1 : this.setState({uploadStoreImg:fileName,uploadHeaderImg:storeAs})
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

    render(){
        const {chooseType,StoreTypeItem,storeType,uploadStoreImg,licenseImg,cardFace,cardBack,showMap,provName,cityName,countysName} = this.state
        return(
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'店铺资料'}
                />
                <div className="bkg_color overScroll width100" style={{position:'absolute',top:'2.2rem',bottom:0,overflowX:'hidden',overflowY:'auto'}}>
                    <div className="flex1">
                        <div className="lh60 border_bottom plr font14 df flex-pack-justify flex-align-center">
                            <span className="color6">店铺头像</span>
                            <div className="pr storeHeaderImg">
                                <input type="file"
                                   ref='imgUrl'
                                   onChange={(e)=>this.fileChange(1,e)}
                                />
                                <img className="" src={uploadStoreImg} alt=""/>
                            </div>
                        </div>
                        <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                            <span className="color6">店铺名称</span>
                            <div>
                                <input
                                    className="tr borderno color9"
                                    placeholder="输入您的店铺名称"
                                    ref="storeName"
                                />
                            </div>
                        </div>
                        {
                            chooseType?
                                <SplitLine />
                                :
                                null
                        }
                        <div
                            style={{flexDirection:'row',height:50}}
                            className="df flex-pack-justify flex-align-center border_bottom plr font14"
                            onClick = {()=>this.setState({chooseType:true})}
                        >
                            <span className="color6">店铺类型</span>
                            <div>
                                <span className="color9">{storeType?storeType:'点击选择店铺类型'}</span>
                                <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:10}}>
                                    <img src={require('../../Images/rightArrow.png')} alt=""/>
                                </span>
                            </div>
                        </div>
                        {
                            chooseType?
                                <div>
                                    <ul>
                                        {
                                            StoreTypeItem&&StoreTypeItem.map(el=>{
                                                return(
                                                    <li
                                                        className="border_bottom"
                                                        onClick = {()=>this.getType(el.id,el.name)}
                                                    >
                                                        <div className="font14 color9 plr" style={{height:40,lineHeight:'40px'}}>{el.name}</div>
                                                    </li>
                                                )
                                            })
                                        }

                                    </ul>
                                </div>
                                :
                                null
                        }

                        <SplitLine />
                        <div
                            style={{flexDirection:'row',height:50}}
                            className="df flex-pack-justify flex-align-center border_bottom plr font14"
                            onClick = {()=>this.setState({showMap:true})}
                        >
                            <span className="color6">店铺地址</span>
                            <div>
                                <span className="color9">{provName+cityName+countysName?provName+cityName+countysName:''}</span>
                                <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:10}}>
                                    <img src={require('../../Images/rightArrow.png')} alt=""/>
                                </span>
                            </div>
                        </div>
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
                        <div style={{flexDirection:'row',padding:'5px 10px'}} className="df flex-pack-justify flex-align-center plr font14 border_bottom">
                            <span className="color6 di" style={{width:160}}>当前店铺位置</span>
                            <div className="color9" style={{textAlign:'right'}}>
                                {this.address?this.address:'暂未定位到当前位置'}
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
                        <SplitLine />
                        <div className="upload">
                            <div className="font14">
                                <span className="di mr10" style={{width:20,height:12}}><img src={require('../../Images/common/BusinessLicense.png')} alt=""/></span>
                                <span>上传营业执照</span>
                            </div>
                            <p className="f12 color9 mt5">
                                上传的图片<span className="color_yellow">清晰</span>,能清楚的看见
                                <span className="color_yellow">注册号</span>
                            </p>
                            <div className="uploadFile marging_s">
                                <span className="di uploadCardImg">
                                    <input type="file"
                                       ref='license'
                                       onChange={(e)=>this.fileChange(2,e)}
                                    />
                                    <img className="educationImg" src={licenseImg} />
                                </span>
                            </div>
                        </div>
                        <SplitLine />
                        <div className="upload">
                            <div className="font14">
                                <span className="di mr10" style={{width:18,height:13}}><img src={require('../../Images/common/IDCard.png')} alt=""/></span>
                                <span>上传身份证正反面</span>
                            </div>
                            <p className="f12 color9 mt5">
                                上传的图片<span className="color_yellow">清晰</span>,能清楚的看见
                                <span className="color_yellow">身份证号和有效时间</span>
                            </p>
                            <div className="uploadFile marging_s flex">
                                <span className="di uploadCardImg">
                                    <input type="file"
                                       ref='cardFace'
                                       onChange={(e)=>this.fileChange(3,e)}
                                    />
                                    <img className="educationImg" src={cardFace} />
                                </span>
                                <span className="di uploadCardImg ml5">
                                    <input type="file"
                                       ref='cardBack'
                                       onChange={(e)=>this.fileChange(4,e)}
                                    />
                                    <img className="educationImg" src={cardBack} />
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="tc f12 color_red width_100 loginHeight">
                        {this.state.Reminder}
                    </div>
                    <div
                        className="flex color_white flex-pack-center flex-align-center bkg_ff"
                        style={{height:50}}
                        onClick={()=>this.confirmInformation()}
                    >
                        确定,下一步
                    </div>
                    {
                        showMap?
                            <div className="locationModal pf width_100 font14 flex flex-v" style={{zIndex:100}}>
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
            </div>
        )
    }
}