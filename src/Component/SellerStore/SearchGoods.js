/**
 * Created by asus on 2016/11/22.
 */
import React, { Component } from 'react';
import {Link} from 'react-router'
import SplitLine from '../../Component/NewComponent/SplitLine';
import ManageRow from '../../Component/SellerStore/ManageRow';
import CheckBox from '../../Component/ShoppingCarts/CheckBox';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import Modal from '../../Component/CommonComponent/Modal'
import {StorectList,SellerOffShelf} from '../../Action/auth'

export default class SearchGoods extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.selectOffArray = []
        this.state = {
            goodsList:'',
            changeStatus:true,
            isShowModal:false
        };
      }
    async searchInformation(){
        await this.getOrderList(this.refs.searchValue.value,'','','')
    }
    async getOrderList(name,id,order,orderName){
        await StorectList(name,id,order,orderName)
            .then(res=>{
                this.setState({changeStatus:false})
                this.setState({goodsList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }
    //单选
    async getSelectItem(state,id){
        if(state){
            this.selectOffArray.push(id)
        }else{
            this.selectOffArray = this.selectOffArray.filter(el=>{
                if(el==id){
                    return false
                }
                return true
            })
        }
        this.setState({toRender:1})
        console.log('selectOffArray',this.selectOffArray)
    }

    //弹出模态层,判断所选数量
    judgeInformation(){
        if(this.selectOffArray.length == 0){
            alert('请选择要清空的宝贝？')
            return
        }
        this.setState({isShowModal:true})
    }

    //清空宝贝
    async DelSearchList(){
        if(this.selectOffArray.length>0){
            await SellerOffShelf(this.selectOffArray)
                .then(res=>{
                    //alert('清空宝贝成功')
                    this.setState({isShowModal:false})
                    //this.context.router.push({pathname:'/comfirmPayMoney',query:{orderId:res}})
                })
        }else{
            alert('请选择要清空的宝贝')
        }
    }
    render() {
        const {goodsList,changeStatus} = this.state
        return (
            <div className="containerNav">
                {/*<div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        商品ID
                    </span>
                    <input type="text" className="tr font14 color9 borderno" placeholder="输入ID号"/>
                </div>*/}
                {
                    changeStatus?
                        <div>
                            <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                                <span className="font14 color6">
                                    宝贝名称
                                </span>
                                <input
                                    type="text"
                                    className="tr font14 color9 borderno"
                                    placeholder="输入宝贝名称"
                                    ref="searchValue"
                                />
                            </div>
                            <div
                                className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                                style={{height:50,backgroundColor:'#ff5500'}}
                                onClick={()=>this.searchInformation()}
                            >
                                搜索
                            </div>
                        </div>
                        :
                        <div>
                            <SplitLine />
                            {
                                goodsList == ''?
                                    <IsShowEmptyImg
                                        styleSheet={{width:69,height:72,marginTop:120}}
                                        title={'查询列表为空哦~'}
                                    />
                                    :
                                goodsList&&goodsList.map((el,index)=>{
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
                                                                onSelect = {(state)=>this.getSelectItem(state,el.ID)}
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
                            <div className="footerHidden"></div>
                            {
                                goodsList == ''?
                                    null
                                    :
                                    <div className="width_100 commit pf bottom0">
                                        <button
                                            className="width100 height_all bkg_ff color_white"
                                            onClick = {()=>this.judgeInformation()}
                                        >确定下架</button>
                                    </div>
                            }

                            {this.state.isShowModal?
                                <Modal
                                    title = {'确定要删除所选宝贝？'}
                                    onClick = {()=>this.DelSearchList()}
                                    toHideModal = {()=>this.setState({isShowModal:false})}
                                />
                                :null
                            }
                        </div>
                }
            </div>
        );
    }
}