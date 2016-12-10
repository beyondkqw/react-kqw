import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import LiItem from '../../Component/CommonComponent/LiItem'
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';
import {TeamMembers} from '../../Action/auth'


export default class ConfirmGivenPerson extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            pointList:[]
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }

    componentWillMount() {
        this.getPointsList()
    }
    //获取转赠人
    getInformation(accId,imageUri,memberName){
        this.context.router.push({pathname:'/personalCenter/commisionGiving',
            query:{toChange:true,accId:accId,imgUrl:imageUri,memberName:memberName}})
    }

    //转赠人列表
    async getPointsList(){
        await TeamMembers()
            .then(res=>{
                this.setState({pointList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {pointList} = this.state
        console.log('pointList')
        return (
            <div className="containerNav">
                <Search
                    toChange = {true}
                    style={{backgroundColor:'#fff',borderBottom:'1px solid #e5e5e5'}}
                />
                <SplitLine />
                <div className ="list-block m0 font14">
                    {
                        pointList.map(el=>{
                            return(
                                <LiItem
                                    title={el.memberName}
                                    imgUrl={el.imageUri}
                                    name={''}
                                    isShow={false}
                                    onClick={()=>this.getInformation(el.accId,el.imageUri,el.memberName)}
                                />
                                )
                        })
                    }
                </div>
            </div>
        );
    }
}
