import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {FollowList} from '../../Action/auth';
import {loadToken,getToken} from '../../Action/rpc'


const ItemList = [{id:1,title:'皮草阁201d回家收电费和解散后圣诞节',price:2200,imgLink:require('../../Images/store.png')},
    {id:2,title:'适合我的饭',price:100,imgLink:require('../../Images/clothesDetails.png')},
    {id:3,title:'变色的汇聚为皇帝还是减肥的挥洒的回复',price:150,imgLink:require('../../Images/clothes.png')}
];
export default class Collect extends Component {
      // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            id:null,
            visible:false,
            isIndex:null
        };
      }

    async componentWillMount() {
        await loadToken()
        console.log("---------------");
        FollowList();
    }

      //显示模态层
      isShow(id,index){
          console.log("id",id);
          console.log("index",index);
          this.setState({id:id});
          this.setState({visible:true});
          this.setState({isIndex:index});
      }
      //隐藏模态层
      isHidden(){
          this.setState({visible:false});
      }
      /*删除商品*/
      isDetete(){
          const itemId = this.state.id;
          const index = this.state.isIndex;
          ItemList.splice(index,1);
          this.setState({visible:false});
      }

    render() {

        return (
            <div className="containerNav">
                {
                    ItemList.map((el,index)=>{
                        return(
                            <div className="pt_collect border_bottom pr">
                                <div className="store_img pa">
                                    <img className="border_ra" src={el.imgLink} alt=""/>
                                </div>
                                <div className="color6 mr45">
                                    <p className="font14 oh oh_height">{el.title}</p>
                                    <p className="color_yellow oh_height">
                                        <span className="f12">￥</span><span className="font14">{el.price}</span></p>
                                </div>
                                <div className="pa color6 cancel_collect">
                                    <button className="f12 cancel_btn border_ra"
                                        onClick={()=>this.isShow(el.id,index)}
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
        );
    }
}
