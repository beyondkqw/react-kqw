/**
 * Created by asus on 2016/11/23.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/goodsDetails.css';
import {Link} from 'react-router';
import TabBarColumn from '../../Component/NewComponent/TabBarColumn'
import RightCell from './RightCell'
import {CategoryList} from '../../Action/auth';

export default class GoodsCategory extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态

        this.state = {
            index:0,
            id:0,
            name:'',
            rightTags:[],
            leftTags:[],

        };
      }

    async componentWillMount() {
        await this.getGoodsCategory(0,0);
        this.getChilrenCategory(this.state.id,0)
    }

    async getId(index,id,name){
        await this.setState({id:id})
        this.setState({name:name})
        this.getChilrenCategory(this.state.id,0)
    }

    //查询父类型接口
    async getGoodsCategory(paramOne,paramTwo){
        await CategoryList(paramOne,paramTwo)
            .then(res=>{
                this.setState({leftTags:res.resultList})
                //将父元素的第一个id,name传给子元素
                this.setState({id:res.resultList[0].id})
                this.setState({name:res.resultList[0].name})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //子类型的接口
    async getChilrenCategory(paramOne,paramTwo){
        await CategoryList(paramOne,paramTwo)
            .then(res=>{
                this.setState({rightTags:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }


    render(){
        const {leftTags,rightTags,name} = this.state
        return(
            <div className="width_100 font14 color6 height_all fl cateContainer pf" style={{display:'flex'}}>
                <TabBarColumn
                    className = {'f12'}
                    contents = {leftTags}
                    onClick = {(index,id,name)=>this.getId(index,id,name)}
                />
                <RightCell
                    name = {name}
                    rightValue = {rightTags}
                />
            </div>
        )
    }
}

const styles = {
    onfocus:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        color:'#666',
        mineight:40,
        flexWrap:'wrap'
    },
    onblur:{
        display:'flex',
        backgroundColor:'#ffddcc',
        justifyContent:'center',
        alignItems:'center',
        color:'#ff5500',
        height:40,
        paddingRight:3,
        borderLeftWidth:3,
        borderLeftStyle:'solid',
        borderLeftColor:'#ff5500',
        flexWrap:'wrap'
    }
}