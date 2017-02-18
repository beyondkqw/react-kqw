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
            latitude:'',
            longitude:'',
            type:'',
            modalDelay:false
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
                this.setState({storeImg:res.store.img})
                this.setState({storeName:res.store.name})
                this.setState({address:res.store.address})
                this.setState({type:res.store.type})
                this.setState({licenseImg:res.store.license})
                this.setState({cardFace:res.store.cardFace})
                this.setState({cardBack:res.store.cardBack})
                this.setState({provId:res.store.province})
                this.setState({cityId:res.store.city})
                this.setState({countyId:res.store.area})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //得到地址信息
    getValue(provName,cityName,countysName,prov,city,county){
        if(provName&&cityName&&countysName){
            this.setState({
                provName:provName,
                cityName:cityName,
                address:provName+cityName+countysName,
                showMap:false,
                provId:prov,
                cityId:city,
                countyId:county,
            })
        }

    }

    async confirmEdit(){
        const {storeName,storeImg,address,provId,cityId,countyId,licenseImg,cardFace,cardBack,GPSaddress,latitude,longitude,type} = this.state
        if(!storeName || !storeImg|| !address || !licenseImg || !cardFace || !cardBack){
            this.setState({Reminder:'修改数据不能为空'})
            return
        }
        await StoreEdit(storeName,storeImg,address,provId,cityId,countyId,licenseImg,cardFace,cardBack,GPSaddress,latitude,longitude,type)
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
        console.log('file=================>',file)
        var fileName = window.URL.createObjectURL(file)
        var index1=file.name.lastIndexOf(".");
        var index2=file.name.length;
        var suffix=file.name.substring(index1,index2)
        console.log('suffix==========>',suffix)

        var uuid4 = UUID.create().toString();
        console.log(uuid4.toString());
        var storeAs = 'sq/'+uuid4+''+suffix;
        this.setState({modalDelay:true})

        console.log(file.name + '=======================> ' + storeAs);
        client.multipartUpload(storeAs, file).then((result)=> {
            console.log('后台返回的地址----------------》',result.name);
            this.setState({modalDelay:false})
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
                    <div
                        style={{flexDirection:'row',height:50}}
                        className="df flex-pack-justify flex-align-center border_bottom plr font14"
                    >
                        <span className="color6">当前店铺地址</span>
                        <div>

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
                                        county:'110101',
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
