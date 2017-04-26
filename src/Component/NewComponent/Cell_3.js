import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import LeftImg from '../../Component/NewComponent/LeftImg'
import RightImg from '../../Component/NewComponent/RightImg'
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

export default class Cell_3 extends Component {
    static contextTypes = {
        router:PropTypes.object
    }

    onPress (cell) {
        if(cell===undefined){
            return
        }

        if(this.props.city && this.props.isShop){
            this.context.router.push({pathname: '/cloudComplex', query: {city:this.props.city,type:cell.tagId}})
            return
        }

        if(cell.linkType==0){
            this.context.router.push({pathname:'/GoodsDetail/SearchPage',query:{tagId:cell.tagId,isTag:true}})
        }else if(cell.linkType==1){
            this.context.router.push({pathname:'/goodsDescription',query:{id:cell.productId}})
        }else if(cell.linkType==2) {
            this.context.router.push({pathname: '/toWebView', query: {url: cell.webUrl}})
        }
    }
    render() {
        const {imgUrl} = this.props
        return (
            <div className="width_100 border_top border_bottom" style={{height : SCREEN_WIDTH/2.3}}>
                <div
                    className="width_50 fl height_all border_right tc pr flex flex-align-center"
                    onClick = {()=>this.onPress(imgUrl&&imgUrl[0])}
                >
                    <span className="di width_100" style={{height : SCREEN_WIDTH/2.3}}>
                        <img src={imgUrl[0]&&imgUrl[0].img} alt=""/>
                    </span>
                </div>
                <div className="width_50 fl height_all tc">
                    <div className="border_bottom" onClick = {()=>this.onPress(imgUrl&&imgUrl[1])}>
                        <span className="di" style={{height : SCREEN_WIDTH/4.68}}>
                            <img src={imgUrl[1]&&imgUrl[1].img} alt=""/>
                        </span>
                    </div>
                    <div onClick = {()=>this.onPress(imgUrl&&imgUrl[2])}>
                        <span className="di" style={{height : SCREEN_WIDTH/4.68}}>
                            <img src={imgUrl[2]&&imgUrl[2].img} alt=""/>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}
