import React, { Component,PropTypes} from 'react';
import {Link} from 'react-router';
import Search from '../../Component/NewComponent/Search';
import LiItem from '../../Component/CommonComponent/LiItem'
import SplitLine from '../../Component/NewComponent/SplitLine'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg'
import '../../Stylesheets/App/personal.css';
import {TeamMembers,CountryRankList} from '../../Action/auth'


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
        this.getPointsList('')
    }
    //获取转赠人
    getInformation(accId,imageUri,memberName){
        this.context.router.push({pathname:'/personalCenter/commisionGiving',
            query:{toChange:true,accId:accId,imgUrl:imageUri,memberName:memberName}})
    }

    //转赠人列表
    async getPointsList(value){
        await CountryRankList(value)
            .then(res=>{
                this.setState({pointList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //搜索转赠人列表
    async searchPerson(value){
        console.log('vakue',value)
        await this.getPointsList(value)
    }

    render() {
        const {pointList} = this.state
        console.log('pointList')
        return (
            <div className="containerNav">
                <Search
                    style={{backgroundColor:'#ff5500',borderBottom:'1px solid #e5e5e5'}}
                    location = {false}
                    onClick={(value)=>this.searchPerson(value)}
                />
                <SplitLine />
                <div className ="list-block m0 font14 pr">
                    {
                        pointList == ''?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'查询列表是空的哦~'}
                            />
                            :
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
