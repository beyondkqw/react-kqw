import React, { Component } from 'react';
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

    async componentWillMount() {
        await loadToken()
        this.getCollectList()
    }

    //我的商品收藏列表
    async getCollectList(){
        await FollowList()
            .then(res=>{
                console.log('res.resultList == null',res.resultList == '')
                if(res.resultList == ''){
                    this.setState({isShowEmptyImg:true})
                    return
                }
                this.setState({ItemList:res.resultList});
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

    render() {
        const {ItemList,isShowEmptyImg} = this.state
        return (
            <div className="containerNav">
                <div className="wrap">
                    {
                        isShowEmptyImg?
                            <div className="pa tc" style={{top:0,left:0,right:0,bottom:0}}>
                                <span className="di" style={{width:69,height:72,marginTop:120}}>
                                    <img src={require('../../Images/empty.png')} alt=""/>
                                </span>
                                <p className="font14 color9">收藏列表是空的哦~</p>

                            </div>
                            :null
                    }
                    {
                        ItemList.map((el,index)=>{
                            return(
                                <div className="pt_collect border_bottom pr">
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
                                </div>
                            )
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
            </div>
        );
    }
}
