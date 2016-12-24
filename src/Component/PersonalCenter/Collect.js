import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/personal.css';
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import {FollowList,Follow} from '../../Action/auth';
import {loadToken,getToken} from '../../Action/rpc'

export default class Collect extends Component {
      // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id:null,
            visible:false,
            isIndex:null,
            isShowEmptyImg:false,
            ItemList:[]
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    async componentWillMount() {
        await loadToken()
        this.getCollectList()
    }

    //我的商品收藏列表
    async getCollectList(){
        await FollowList()
            .then(res=>{
                if(res.resultList == ''||res.resultList == null){
                    this.setState({isShowEmptyImg:true})
                }else{
                    this.setState({isShowEmptyImg:false})
                    this.setState({ItemList:res.resultList});
                }
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //显示模态层
    isShow(id,index){
        this.setState({id:id});
        this.setState({visible:true});
        this.setState({isIndex:index});
    }
    //隐藏模态层
    isHidden(){
        this.setState({visible:false});
    }
    /*取消收藏*/
    async isDetete(){
        let itemId = this.state.ItemList.PRODUCT_ID;
        let index = this.state.isIndex;
        await this.getCollect(1)
        .then(()=>{
            this.state.ItemList.splice(index,1);
            this.setState({visible:false});
        })
    }

    async getCollect(status){
        await Follow(1,status)
            .then(res=>{
                console.log(res);
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //跳转到商品详情页
    jumpLink(productId){
        this.context.router.push({pathname:'/goodsDescription',
            query:{id:productId}})
    }

    render() {
        const {ItemList,isShowEmptyImg} = this.state
        console.log('isShowEmptyImgi',isShowEmptyImg)
        return (
            <div className="containerNav">
                {
                    isShowEmptyImg?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'收藏列表是空的哦~'}
                        />
                        :
                        ItemList&&ItemList.map((el,index)=>{
                        return(
                            <div className="pt_collect border_bottom pr"
                                onClick={()=>this.jumpLink(el.PRODUCT_ID)}
                            >
                                <div className="store_img pa">
                                    <img className="border_ra" src={el.IMAGE} alt=""/>
                                </div>
                                <div className="color6 mr45">
                                    <p className="font14 oh oh_height">{el.NAME}</p>
                                    <p className="color_yellow oh_height">
                                        <span className="f12">￥</span><span className="font14">{el.CURRENT_PRICE}</span></p>
                                </div>
                                <div className="pa color6 cancel_collect">
                                    <button className="f12 cancel_btn border_ra"
                                            onClick={()=>this.isShow(el.PRODUCT_ID,index)}
                                    >取消</button>
                                </div>
                            </div>)
                        })
                    }
                    {/*模态层*/}
                    {this.state.visible?
                        <div>
                            <div className="modalNav pa width_100 height_all font14">
                                <div className="modal_body border_ra scale">
                                    <p className="isCancel border_bottom tc">确定删除？</p>
                                    <div className="chooseType">
                                        <button className="w50 border_right color_yellow"
                                            onClick = {()=>this.isDetete()}
                                        >确定</button>
                                        <button className="w50"
                                            onClick = {()=>this.isHidden()}
                                        >取消</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :null}
                </div>
        );
    }
}
