import React, { Component } from 'react';
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import {RemarkList,Reply} from '../../Action/auth'

export default class EvaluationDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            remarkList:[],
            showMsg:false,
            replayName:'',
            parentID:''
        };
      }
    componentWillMount() {
        this.getSellerRemarkList()
    }

    //获取评论列表
    async getSellerRemarkList(){
        await RemarkList(this.props.location.query.id,1,'')
            .then(res=>{
                console.log('评论列表',res)
                this.setState({remarkList:res.resultList})
            })
    }

    //出现回复框
    ReplyMsg(name,commentID){
        this.setState({showMsg:true,replayName:name,parentID:commentID})
    }

    //发送回复
    async sendMsgOut(){
        await Reply(this.refs.sendMsg.value,this.state.parentID)
            .then(res=>{
                this.setState({showMsg:false})
                this.getSellerRemarkList()
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {name,imgUrl,price,comment} = this.props.location.query
        const {remarkList,showMsg,replayName} = this.state
        return (
            <div>
                <div className="border_bottom pr">
                    <StoreRow
                        title = {name}
                        price = {price}
                        imgurl = {imgUrl}
                        peopleRemark = {comment}
                        assess = {true}
                        showBorderBottom = {true}
                    />
                </div>
                <SplitLine />
                <div className="pa oa width_100" style={{top:120,bottom:0}}>
                    {
                        remarkList == ''?
                           <IsShowEmptyImg
                               styleSheet={{width:69,height:72,marginTop:20}}
                               title={'评论列表为空哦~'}
                           />
                            :
                        remarkList&&remarkList.map(el=>{
                            return(
                                <div>
                                    <div className="plAll border_bottom">
                                        <div className="flex flex-pack-justify">
                                            <div>
                                                <span className="di  mr10" style={{width:30,height:30}}>
                                                    <img className="border_ra50" src={el.IMAGE_URI} alt=""/>
                                                </span>
                                                <span className="font14 color9">{el.MEMBER_NAME}</span>
                                            </div>
                                            <button
                                                className="di f12 color_yellow border_ra border_ye pa_reply"
                                                style={{height:22}}
                                                onClick={()=>this.ReplyMsg(el.MEMBER_NAME,el.COMMENT_ID)}
                                            >回复</button>
                                        </div>
                                        <p className="font14 color6 mt">{el.COMMENT}</p>
                                        <p className="f12 color9 mt">{el.CREATE_TIME}</p>
                                    </div>
                                    {
                                        el.REPLY&&el.REPLY.map(item=>{
                                            return(
                                                <div className="plAll border_bottom font14 color9">
                                                    掌柜回复:<span>{item.COMMENT}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </div>


                            )
                        })
                    }
                </div>
                {
                    showMsg?
                        <div className="pa bottom0 z_index colore5 left0 right0 replyPadding" >
                            <span className="pa close"
                                  onClick={()=>this.setState({showMsg:false})}
                            >
                                <img src={require('../../Images/deiete_yellow.png')} alt=""/>
                            </span>
                            <textarea
                                name=""
                                className="width_100 color9 border_ra borderno f12"
                                style={{height:100}}
                                placeholder={'回复:@'+replayName}
                                ref="sendMsg"
                            ></textarea>
                            <buttton
                                className="fr color_yellow f12 border_ye pa_reply border_ra bkg_color"
                                onClick={()=>this.sendMsgOut()}
                            >发送</buttton>
                        </div>:null

                }


            </div>


        );
    }
}
