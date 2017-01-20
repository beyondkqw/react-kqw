/**
 * Created by asus on 2016/11/21.
 */
import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {EnterStoreInformation,StoreType} from '../../Action/auth'
import '../../Stylesheets/App/sellerStore.css';


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
            id:''
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

        this.getInformation(storeName,uploadStoreImg,'深圳-广州-宝安','1001','1002','1003',licenseImg,cardFace,cardBack,'定位地址','234.00','23.00',this.state.id)
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

    getType(id){
        this.setState({id:id})
        this.setState({chooseType:false})
    }

    render(){
        const {chooseType,StoreTypeItem} = this.state
        return(
            <div className="containerNav">
                <div className="flex1">
                    <div className="lh60 border_bottom plr font14 df flex-pack-justify flex-align-center">
                        <span className="color6">店铺头像</span>
                        <div className="pr storeHeaderImg">
                            <input type="file"
                               ref='imgUrl'
                               onChange={()=>this.setState({uploadStoreImg:this.refs.imgUrl.value})}
                            />
                            <img className="" src={require("../../Images/common/uploadImg.png")} alt=""/>
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
                            <span className="color9">点击选择店铺类型</span>
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
                                                    onClick = {()=>this.getType(el.id)}
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
                    <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                        <span className="color6">店铺地址</span>
                        <div style={{width:9,height:16,lineHeight:0}}>
                            <img src={require('../../Images/rightArrow.png')} alt=""/>
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
                                   onChange={()=>this.setState({licenseImg:this.refs.license.value})}
                                />
                                <img className="educationImg" src={require("../../Images/uploadImg.png")} />
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
                                   onChange={()=>this.setState({cardFace:this.refs.cardFace.value})}
                                />
                                <img className="educationImg" src={require("../../Images/uploadImg.png")} />
                            </span>
                            <span className="di uploadCardImg ml5">
                                <input type="file"
                                   ref='cardBack'
                                   onChange={()=>this.setState({cardBack:this.refs.cardBack.value})}
                                />
                                <img className="educationImg" src={require("../../Images/uploadImg.png")} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className="tc f12 color_red width_100 loginHeight">
                    {this.state.Reminder}
                </div>
                <div
                    className="flex color9 flex-pack-center flex-align-center"
                    style={{height:50,backgroundColor:'#e5e5e5'}}
                    onClick={()=>this.confirmInformation()}
                >
                    确定,下一步
                </div>
            </div>
        )
    }
}