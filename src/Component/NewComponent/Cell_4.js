import React, { Component,PropTypes } from 'react';
import '../../Stylesheets/App/homePage.css';
import {SCREEN_WIDTH} from '../../Action/rpc'

export default class Cell_4 extends Component {
    static contextTypes = {
        router:PropTypes.object
    }

    onPress (cell) {
        if(cell===undefined){
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
            <div className="width100 border_top border_bottom" style={{height:SCREEN_WIDTH/3.45}}>
                <div
                    className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}
                    onClick = {()=>this.onPress(imgUrl&&imgUrl[0])}
                >
                    <div className="pr width100 height_all">
                        <img src={imgUrl[0]&&imgUrl[0].img}/>
                    </div>
                </div>
                <div
                    className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}
                    onClick = {()=>this.onPress(imgUrl&&imgUrl[1])}
                >
                    <div className="pr width100 height_all">
                        <img src={imgUrl[0]&&imgUrl[1].img}/>
                    </div>
                </div>
                <div
                    className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}
                    onClick = {()=>this.onPress(imgUrl&&imgUrl[2])}
                >
                    <div className="pr width100 height_all">
                        <img src={imgUrl[0]&&imgUrl[2].img}/>
                    </div>
                </div>
                <div
                    className="width_25 height_all fl border_right" style={{height:SCREEN_WIDTH/3.45}}
                    onClick = {()=>this.onPress(imgUrl&&imgUrl[3])}
                >
                    <div className="pr width100 height_all">
                        <img src={imgUrl[0]&&imgUrl[3].img}/>
                    </div>
                </div>
            </div>
        );
    }
}
