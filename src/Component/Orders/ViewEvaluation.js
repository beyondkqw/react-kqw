import React, { Component } from 'react';
import {Link} from 'react-router';
import PublishComment from '../../Component/CommonComponent/PublishComment'
import '../../Stylesheets/App/order.css';
import {RemarkList} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'

export default class ViewEvaluation extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            remarkItem:[]
        };
      }
    componentWillMount() {
        this.getRemark()
    }
    async getRemark(){
        const {orderNo,productId} = this.props.location.query
        await RemarkList(productId,1,orderNo)
            .then(res=>{
                this.setState({remarkItem:res.resultList})
            })
    }
    render() {
        const {remarkItem} = this.state
        return (
            <div className="containerNav">
                {
                    remarkItem == ''?
                    <IsShowEmptyImg
                        styleSheet={{width:69,height:72,marginTop:120}}
                        title={'列表是空的哦~'}
                    />
                    :
                    remarkItem&&remarkItem.map(el=>{
                       return(
                           <div className="df plAll border_bottom">
                               <div className="logoHeight">
                                   <img className="border_ra" src={el.IMAGE_URI} alt=""/>
                               </div>
                               <div className="flex1 ml5 font14 color6">
                                   <p>{el.COMMENT}</p>
                                   <span className="f12 color9 fr">{el.CREATE_TIME}</span>
                               </div>
                           </div>
                       )
                    })
                }
            </div>
        );
    }
}
