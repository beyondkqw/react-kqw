/**
 * Created by asus on 2016/11/17.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import SplitLine from '../../Component/NewComponent/SplitLine';
import ManageRow from '../../Component/SellerStore/ManageRow';
import {Link} from 'react-router'
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import Modal from '../../Component/CommonComponent/Modal'
import {SellerProductList,SellerOffShelf} from '../../Action/auth';

const itemList = [
    {name:'或者豆腐丝收到货基地是可敬的',prace:235,num:'hisjuhdi',paymoney:2367,id:1},
    {name:'dfghrugeyr',prace:2456,num:'ags',paymoney:255,id:2}
]
export default class OffTheShelf extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        //是否使用全选按钮
        this.isUseSelectAll = false
        this.selectOffShelf = []
        this.state = {
            selectAll:false,
            toRender:1,
            sellerOffDownList:[],
            isVisible:false
        };
    }

    componentWillMount() {
        this.getSellerOrder()
    }
    //请求列表接口
    async getSellerOrder(){
        await SellerProductList(this.props.location.query.storeId,0)
            .then(res=>{
                this.setState({sellerOffDownList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    //全选/反选
    async onChangeState(){
        this.isUseSelectAll = true
        this.setState({selectAll:!this.state.checked});
        if(this.selectOffShelf.length<this.state.sellerOffDownList.length){
            this.selectOffShelf = []
            this.setState({selectAll:true})
            await this.state.sellerOffDownList.map(el=>{
                this.selectOffShelf.push(el.ID)
            })
        }else{
            this.setState({selectAll:false})
            this.selectOffShelf = []
        }
        this.setState({toRender:1})
        console.log('this.select.length',this.selectOffShelf.length)
    }

    //单选
    async getSelect(state,id){
        this.isUseSelectAll = false
        if(state){
            this.selectOffShelf.push(id)
        }else{
            this.selectOffShelf = this.selectOffShelf.filter(el=>{
                if(el==id){
                    return false
                }
                return true
            })
        }
        this.setState({toRender:1})
        console.log('selectIndex',this.selectOffShelf)
    }

    //弹出模态层,判断所选数量
    showModal(){
        if(this.selectOffShelf.length == 0){
            alert('请选择要清空的宝贝？')
            return
        }
        this.setState({isVisible:true})
    }

    //清空宝贝
    async DelOrderList(){
        if(this.selectOffShelf.length>0){
            await SellerOffShelf(this.selectOffShelf)
                .then(res=>{
                    //alert('清空宝贝成功')
                    this.setState({isVisible:false})
                    this.getSellerOrder()
                    //this.context.router.push({pathname:'/comfirmPayMoney',query:{orderId:res}})
                })
        }else{
            alert('请选择要清空的宝贝')
        }
        ///comfirmPayMoney
    }
    render(){
        const {sellerOffDownList} = this.state
        return(
            <div className="containerNav">
                <SplitLine />
                {
                    sellerOffDownList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'查询列表为空哦~'}
                        />
                        :
                    sellerOffDownList&&sellerOffDownList.map((el,index)=>{
                        return(
                            <Link>
                                <div className="storeRowContainer">
                                    <div style={{width:100,height:100}}>
                                        <img src={el.IMAGE} />
                                    </div>
                                    <div className="rightMoudle border_bottom">
                                        <div className="orderShow font14 color6 width100">
                                            {el.NAME}
                                        </div>
                                        <div>
                                            <div className="df flex-pack-justify" style={{height:18,marginBottom:8}}>
                                                <p>
                                                    <span className="colorff f12">￥</span>
                                                    <span className="colorff font18">{el.CURRENT_PRICE?el.CURRENT_PRICE:0}</span>
                                                </p>
                                                <CheckBox
                                                    selectAll = {this.isUseSelectAll?this.state.selectAll:null}
                                                    index={index}
                                                    onSelect = {(state)=>this.getSelect(state,el.ID)}
                                                />
                                            </div>
                                            <div>
                                                <div className="rightBottom" style={{color:'#999'}}>
                                                    <p><span>货号 : </span><span>asere</span></p>
                                                    <p><span>25</span>人付款</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
                {
                    sellerOffDownList == ''?
                        null:
                        <div className="width_100 commit pf bottom0 df">
                            <button
                                className="width50 height_all color_pink color_yellow"
                                onClick={()=>this.showModal()}
                            >清空宝贝</button>
                            <div className="df width50 height_all bkg_ff color_white flex-align-center flex-pack-center">
                                <span className="di check_radius pr fl">
                                    <input
                                        type="checkbox" id="checkAll"
                                        checked={this.selectOffShelf.length == sellerOffDownList.length?true:false}
                                        onClick={()=>this.onChangeState()}
                                        className="di isCheck"
                                    />
                                    <label htmlFor="checkAll"></label>
                                </span>
                                <span className="di ml">全部选择</span>
                            </div>
                        </div>
                }
                <div className="footerHidden"></div>
                {/*模态层*/}
                {this.state.isVisible?
                    <Modal
                        title = {'确定要清空所选宝贝？'}
                        onClick = {()=>this.DelOrderList()}
                        toHideModal = {()=>this.setState({isVisible:false})}
                    />
                    :null
                }
            </div>
        )
    }
}