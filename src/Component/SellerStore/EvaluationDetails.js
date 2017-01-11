import React, { Component } from 'react';
import {Link} from 'react-router';
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import {RemarkList} from '../../Action/auth'

export default class EvaluationDetails extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            remarkList:[]
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

    render() {
        const {name,imgUrl,price,comment} = this.props.location.query
        const {remarkList} = this.state
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
                                <div className="plAll border_bottom">
                                    <div className="flex flex-pack-justify">
                                        <div>
                                            <span className="di  mr10" style={{width:30,height:30}}>
                                                <img className="border_ra50" src={el.IMAGE_URI} alt=""/>
                                            </span>
                                            <span className="font14 color9">{el.MEMBER_NAME}</span>
                                        </div>
                                        <Link>
                                            <button  className="di f12 color_yellow border_ra border_ye pa_reply">回复</button>
                                        </Link>
                                    </div>
                                    <p className="font14 color6 mt">{el.COMMENT}</p>
                                    <p className="f12 color9 mt">{el.CREATE_TIME}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pa bottom0 z_index colore5 plAll left0 right0">
                    <textarea name="" id="" cols="30" rows="10" className="width_100"></textarea>
                    <p>
                        <buttton>发送</buttton>
                    </p>
                </div>

            </div>


        );
    }
}
