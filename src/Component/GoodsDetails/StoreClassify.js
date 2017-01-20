import React, { Component } from 'react';
import {CategoryList} from '../../Action/auth'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import {Link} from 'react-router';

export default class StoreClassify extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            storeClassify:[]
        };
    }

    componentWillMount() {
        this.getGoodsCategory()
    }

    //查询店铺分类接口
    async getGoodsCategory(){
        await CategoryList(0,1,this.props.location.query.storeId)
            .then(res=>{
                this.setState({storeClassify:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {storeClassify} = this.state
        return (
            <div className="containerNav">
                {
                    storeClassify ==''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'列表是空的哦~'}
                        />
                        :
                    storeClassify&&storeClassify.map(el=>{
                        return(
                            <Link to="/storeClassifyDetail" query={{storeId:this.props.location.query.storeId}}>
                                <div style={{flexDirection:'row',height:40}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                    <span className="di color6 ml5">{el.name}</span>
                                    <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                        <img src={require('../../Images/rightArrow.png')} alt=""/>
                                    </span>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}
