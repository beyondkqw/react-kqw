/**
 * Created by asus on 2016/11/21.
 */
import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {EnterStoreInformation,StoreType} from '../../Action/auth'
import Location from '../../Component/SellerStore/Location'
import '../../Stylesheets/App/sellerStore.css';
import NavBar from '../../Component/CommonComponent/NavBar'
import UUID from 'uuid-js'


export default class EntryStoreInformation extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            Reminder:'',
            uploadStoreImg:'',
            licenseImg:'',
            cardFace:'',
            cardBack:'',
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
            countyId:''
        };
    }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getStoreType()
    }

    confirmInformation(){
        const {uploadStoreImg,licenseImg,cardFace,cardBack} = this.state
        const storeName = this.refs.storeName.value
        //非空校验
        if(!uploadStoreImg){
            this.setState({Reminder:'上传的头像不能为空'})
            return
        }else if(!storeName){
            this.setState({Reminder:'店铺名不能为空'})
            return
        }else if(!licenseImg){
            this.setState({Reminder:'上传的营业执照不能为空'})
            return
        }else if(!cardFace||!cardBack){
            this.setState({Reminder:'上传的身份证照片不能为空'})
            return
        }else if(this.state.id == ''){
            this.setState({Reminder:'请点击选择店铺类型'})
            return
        }else{
            this.setState({Reminder:''})
        }

        this.getInformation(storeName,uploadStoreImg,this.state.provName+this.state.cityName+this.state.countysName,this.state.provId,this.state.cityId,this.state.countyId,licenseImg,cardFace,cardBack,'定位地址','234.00','23.00',this.state.id)
    }

    async getInformation(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress,latitude,longitude,type){
        await EnterStoreInformation(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress,latitude,longitude,type)
            .then(res=>{
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

    //得到地址信息
    getValue(provName,cityName,countysName,prov,city,county){
        if(provName&&cityName&&countysName){
            this.setState({
                provName:provName,
                cityName:cityName,
                countysName:countysName,
                showMap:false,
                provId:prov,
                cityId:city,
                countyId:county,
            })
        }

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
                case 1 : this.setState({uploadStoreImg:fileName})
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


    render(){
        const {chooseType,StoreTypeItem,storeType,uploadStoreImg,licenseImg,cardFace,cardBack,showMap,provName,cityName,countysName} = this.state
        return(
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'店铺资料'}
                />
                <div className="flex1">
                    <div className="lh60 border_bottom plr font14 df flex-pack-justify flex-align-center">
                        <span className="color6">店铺头像</span>
                        <div className="pr storeHeaderImg">
                            <input type="file"
                               ref='imgUrl'
                               onChange={(e)=>this.fileChange(1,e)}
                               //onChange={()=>this.setState({uploadStoreImg:this.refs.imgUrl.value})}
                            />
                            <img className="" src={uploadStoreImg} alt=""/>
                        </div>
                    </div>
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                        <span className="color6">店铺名称</span>
                        <div>
                            <input
                                className="tr borderno"
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
                            <span>{provName+cityName+countysName?provName+cityName+countysName:''}</span>
                            <span className="di color9" style={{width:9,height:16,lineHeight:0}}>
                                <img src={require('../../Images/rightArrow.png')} alt=""/>
                            </span>
                        </div>

                    </div>
                    {/*<ReactGeoLocation >example</ReactGeoLocation>*/}
                    <Link>
                        <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center plr font14">
                            <span className="color6">定位店铺位置</span>
                            <div style={{width:35,height:21,lineHeight:0}}>
                                <img src={require('../../Images/common/sellerLocation.png')} alt=""/>
                            </div>
                        </div>
                    </Link>
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
                                   //onChange={()=>this.setState({licenseImg:this.refs.license.value})}
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
                                   //onChange={()=>this.setState({cardFace:this.refs.cardFace.value})}
                                />
                                <img className="educationImg" src={cardFace} />
                            </span>
                            <span className="di uploadCardImg ml5">
                                <input type="file"
                                   ref='cardBack'
                                   onChange={(e)=>this.fileChange(4,e)}
                                   //onChange={()=>this.setState({cardBack:this.refs.cardBack.value})}
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
                                        county:'110101',
                                        defaultText:['省份','城市','区县']
                                    }}
                                />
                            </div>
                        </div>
                        :null
                }
            </div>
        )
    }
}