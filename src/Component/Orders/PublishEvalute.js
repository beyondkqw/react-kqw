import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import PublishComment from '../../Component/CommonComponent/PublishComment'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/order.css';
import {_OrderDetail,Remark} from '../../Action/auth'

export default class PublishEvalute extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            images:[]
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }


    componentWillMount() {
        //this.getOrderDetail()
    }

    //async getOrderDetail(){
    //    await _OrderDetail(this.props.location.query.id)
    //    .then(res=>{
    //        console.log('ererer',res)
    //    })
    //}

    async toRemark(){
        const {orderNo,productId} = this.props.location.query
        console.log(orderNo,productId,this.refs.comment.value)
        await Remark(orderNo,productId,this.refs.comment.value,this.state.images.join(','))
        .then(res=>{
            console.log('res')
            //this.context.router.goBack()
        })
    }

    render() {
        const {image} = this.props.location.query
        return (
            <div className="containerNav">
                <div className="df plAll">
                    <div className="logoHeight">
                        <img className="border_ra" src={image?image:require('../../Images/storeClothes.png')} alt=""/>
                    </div>
                    <div className="flex1 ml5 font14 color6 height3">
                        <textarea
                            className="height_all borderno"
                            name=""
                            placeholder="评价一下吧。。。"
                            cols="30"
                            rows="10"
                            ref = 'comment'
                        />
                    </div>
                </div>
                <div className=" border_bottom">
                    <div className="filediv tc mt5 plAll">
                        <input ref="images" type="file" name="" multiple="multiple" />
                        <img className="border_ra" src={require('../../Images/camera.png')}/>
                    </div>
                </div>
                <SplitLine/>
                {/*<div>
                    <ul className="font14">
                        <li className="plr evalute_h border_bottom">
                            <div className="fl">
                                店铺评分
                            </div>
                            <div className="fr">
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                            </div>
                        </li>
                        <li className="plr evalute_h border_bottom">
                            <div className="fl">
                                商家服务态
                            </div>
                            <div className="fr">
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                                <span className="di scoreImg ml"><img src={require('../../Images/collect.png')} alt=""/></span>
                            </div>
                        </li>
                    </ul>
                </div>*/}

                {/*<Link to="/orderList/chaseRatings"> </Link>*/}
                <PublishComment
                    onClick = {()=>this.toRemark()}
                />
            </div>
        );
    }
}
