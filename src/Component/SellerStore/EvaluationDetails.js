import React, { Component } from 'react';
import {Link} from 'react-router';
import StoreRow from '../../Component/GoodsDetails/StoreRow';
import SplitLine from '../../Component/NewComponent/SplitLine'

export default class EvaluationDetails extends Component {

    render() {
        const {name,imgUrl,price,comment} = this.props.location.query
        return (
            <div>
                <div className="border_bottom">
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
                <div className="plAll border_bottom">
                    <div className="flex flex-pack-justify">
                        <div>
                            <span className="di  mr10" style={{width:30,height:30}}>
                                <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                            </span>
                            <span className="font14 color9">加班狗</span>
                        </div>
                        <Link>
                            <button  className="di f12 color_yellow border_ra border_ye pa_reply">回复</button>
                        </Link>
                    </div>
                    <p className="font14 color6 mt">衣服好看,很喜欢个毛线</p>
                    <p className="f12 color9 mt">2016-11-20</p>
                </div>

            </div>


        );
    }
}
