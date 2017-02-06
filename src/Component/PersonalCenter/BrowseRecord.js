/**
 * Created by asus on 2016/11/24.
 */
import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/personal.css';
import StoreRow from '../../Component/GoodsDetails/StoreRow'
import PublishComment from '../../Component/CommonComponent/PublishComment'
import Modal from '../../Component/CommonComponent/Modal'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {BrowseHistory,DelBrowseRecord} from '../../Action/auth'

const storeDetail = [{title:'拼接雪纺连衣裙小清新卡死的奇偶爱好的手机',record:288,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接安山东跑外地偶尔奥苏废物',record:290,imgUrl:require('../../Images/clothesDetails.png')},
    {title:'拼接S佛我爱我如娃儿殴辱我耳机',record:291,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
    {title:'拼接驾驶的海外时间',record:289,imgUrl:require('../../Images/clothes1.png')},
]


export default class BrowseRecord extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            historyList:[],
            historyImgShow:true,
            isDelete:false,
            delAll:false,
            browseId:''
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }
    componentWillMount() {
        this.getBrowseHistory()
    }

    //删除单条浏览记录
    async deleteItem(){
        console.log('browseId=========>',this.state.browseId)
        await DelBrowseRecord(this.state.browseId)
            .then(res=>{
                this.setState({isDelete:false})
                this.getBrowseHistory()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    //清空浏览记录
    async deleteRecord(){
        await DelBrowseRecord('')
            .then(res=>{
                this.setState({delAll:false})
                this.getBrowseHistory()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }


    async getBrowseHistory(){
        await BrowseHistory()
                .then(res=>{
                    if(res.resultList == ''){
                        this.setState({historyImgShow:true})
                    }else{
                        this.setState({historyImgShow:false})
                        this.setState({historyList:res.resultList})
                    }
                })
                .catch(err=>{
                    console.warn('err',err)
                })
    }
    //跳转链接
    jumpToLink(productId){
        console.log('--------页面跳转')
        this.context.router.push({pathname:'/goodsDescription',
            query:{id:productId}})
    }

    render(){
        const {historyList,historyImgShow} = this.state
        return(
            <div className="containerNav">
                {
                    historyImgShow?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'浏览记录列表是空的哦~'}
                        />
                        :
                    historyList&&historyList.map(el=>{
                        return(
                            <StoreRow
                                title = {el.NAME}
                                record = {el.CURRENT_PRICE}
                                imgurl = {el.IMAGE}
                                //browseId = {el.BROWSE_ID}
                                toDelete = {()=>this.setState({isDelete:true,browseId:el.BROWSE_ID})}
                                onClick={()=>this.jumpToLink(el.PRODUCT_ID)}
                            />
                        )
                    })
                }
                {
                    historyImgShow?
                    null
                    :<section>
                        <div className="footerHidden"></div>
                        <div className="width_100 commit bkg_ff pf bottom0">
                            <button
                                onClick={()=>this.setState({delAll:true})}
                                className="width_100 height_all color_white"
                            >清空浏览记录</button>
                        </div>
                    </section>
                }
                {
                    this.state.isDelete?
                        <Modal
                            title = {'确定删除浏览记录?'}
                            onClick = {()=>this.deleteItem()}
                            toHideModal={()=>this.setState({isDelete:false})}
                        />
                        :null
                }
                {
                    this.state.delAll?
                        <Modal
                            title = {'确定删除浏览记录?'}
                            onClick = {()=>this.deleteRecord()}
                            toHideModal={()=>this.setState({delAll:false})}
                        />
                        :null
                }

            </div>
        )
    }
}