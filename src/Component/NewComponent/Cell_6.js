import React, { Component,PropTypes } from 'react';
import Cell_4 from '../../Component/NewComponent/Cell_4'
import {Link} from 'react-router';
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

export default class Cell_6 extends Component {
    static contextTypes = {
        router:PropTypes.object
    }

    onPress (cell) {
        if(cell===undefined){
            return
        }
        if(cell.linkType==0){
            this.context.router.push({pathname:'/GoodsDetail/SearchPage',query:{type:cell.tagId}})
        }else if(cell.linkType==1){
            this.context.router.push({pathname:'/goodsDescription',query:{id:cell.productId}})
        }else if(cell.linkType==2) {
            this.context.router.push({pathname: '/toWebView', query: {url: cell.webUrl}})
        }
    }
    render() {
        const {imgUrl} = this.props
        return (
        <div>
            <div className="width_100 border_top border_bottom" style={{height : SCREEN_WIDTH/3.41}}>
                <span
                    className="di width_50"
                    style={{height : SCREEN_WIDTH/3.41}}
                    onClick = {()=>this.onPress(imgUrl&&imgUrl[0])}>
                    <img src={imgUrl[0]&&imgUrl[0].img} alt=""/>
                </span>
                <span className="di width_50" style={{height : SCREEN_WIDTH/3.41}} onClick = {()=>this.onPress(imgUrl&&imgUrl[1])}>
                    <img src={imgUrl[1]&&imgUrl[1].img} alt=""/>
                </span>
            </div>
            <div className="width100 border_top border_bottom" style={{height:SCREEN_WIDTH/3.45}}>
                <div
                    className="width_25 height_all fl border_right"
                    style={{height:SCREEN_WIDTH/3.45}}
                >
                    <div
                        className="pr width100 height_all"
                        onClick = {()=>this.onPress(imgUrl&&imgUrl[2])}
                    >
                        <img src={imgUrl[2]&&imgUrl[2].img} alt=""/>
                    </div>
                </div>
                <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                    <div className="pr width100 height_all" onClick = {()=>this.onPress(imgUrl&&imgUrl[3])}>
                        <img src={imgUrl[3]&&imgUrl[3].img} alt=""/>
                    </div>
                </div>
                <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                    <div className="pr width100 height_all" onClick = {()=>this.onPress(imgUrl&&imgUrl[4])}>
                        <img src={imgUrl[4]&&imgUrl[4].img} alt=""/>
                    </div>
                </div>
                <div className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}>
                    <div className="pr width100 height_all" onClick = {()=>this.onPress(imgUrl&&imgUrl[5])}>
                        <img src={imgUrl[5]&&imgUrl[5].img} alt=""/>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
