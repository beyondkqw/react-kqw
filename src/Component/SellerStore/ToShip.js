/**
 * Created by asus on 2016/11/22.
 */
import React, { Component,PropTypes } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine'
import {Delivery} from '../../Action/auth';
import NavBar from '../../Component/CommonComponent/NavBar'


const logisticalList = [
    {title:'申通',img:require('../../Images/st.png')},{title:'顺丰',img:require('../../Images/sf.png')},
    {title:'圆通',img:require('../../Images/tact.png')},{title:'韵达',img:require('../../Images/yd.png')},
    {title:'中通',img:require('../../Images/zt.png')}
]
export default class ToShip extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            clickIndex:999999,
            chooseName:''
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    async getName(index,name){
        await this.setState({clickIndex:index})
        this.setState({chooseName:name})
    }

    async confirmPost(){
        if(!this.state.chooseName && !this.refs.express.value){
            alert('请选择快递或者输入您需要的快递')
            return
        }
        if(!this.refs.deliveryNo.value){
            alert('请输入快递单号')
            return
        }
        if(this.state.chooseName){
            await this.getDelivery(this.state.chooseName,this.refs.deliveryNo.value,this.props.location.query.orderNo)
            return
        }
        if(this.refs.express.value && !this.state.chooseName){
            await this.getDelivery(this.refs.express.value,this.refs.deliveryNo.value,this.props.location.query.orderNo)
            return
        }
    }
    //请求发货接口
    async getDelivery(deliveryName,deliveryNo,orderNo){
        await Delivery(deliveryName,deliveryNo,orderNo)
            .then(res=>{
                alert('发货成功')
                this.context.router.goBack()
            })
            .catch(err=>{
                console.warn('err',err)
            })

    }

    render() {
        const {clickIndex} = this.state
        console.log('clickIndex=====>',clickIndex)
        return (
            <div>
                <NavBar
                    renderBack = {true}
                    title = {'发货物流'}
                />
                <div style={{height:50}} className="flex flex-align-center border_bottom plr">
                    <span className="di mr10" style={{width:20,height:15,lineHeight:0}}>
                        <img src={require('../../Images/common/fahuo.png')} alt=""/>
                    </span>
                    <span className="font14">选择物流</span>
                </div>
                <div className="border_bottom" style={{height:90}}>
                    <ul style={{overflow:'auto'}} className='width100 height_all flex flex-align-center'>
                        {
                            logisticalList&&logisticalList.map((el,index)=>{
                                return(
                                    <li
                                        className="tc ml20"
                                        onClick = {()=>this.getName(index,el.title)}
                                    >
                                        <div
                                            className="border_ra50 mail_height"
                                            style={this.state.clickIndex == index?{borderWidth:3,borderColor:'#ff5500',borderStyle:'solid'}:null}
                                        >
                                            <img src={el.img} alt="" />
                                        </div>
                                        <span className={this.state.clickIndex == index?'di f12 color_yellow mt3':'di f12 color6 mt3'}>{el.title}</span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <span className="font14 color6">
                        其他快递
                    </span>
                    <input
                        type="text"
                        className="tr font14 color9 borderno"
                        placeholder="输入您需要的快递"
                        ref="express"
                    />
                </div>
                <SplitLine />
                <div style={{height:50}} className="flex flex-align-center flex-pack-justify border_bottom plr">
                    <div>
                        <span className="di mr10" style={{width:20,height:17,lineHeight:0}}>
                            <img src={require('../../Images/common/num.png')} alt=""/>
                        </span>
                        <span className="font14 color6">
                            快递单号
                        </span>
                    </div>
                    <input
                        type="text"
                        className="tr font14 color9 borderno"
                        placeholder="输入快递单号"
                        ref="deliveryNo"
                    />
                </div>
                <SplitLine />
                <div
                    className="pf bottom0 width100 flex color_white flex-pack-center flex-align-center"
                    style={{height:50,backgroundColor:'#ff5500'}}
                    onClick = {()=>this.confirmPost()}
                    >
                    确定发货
                </div>
            </div>
        );
    }
}