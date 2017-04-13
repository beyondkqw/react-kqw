import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import LiComponent from '../../Component/CommonComponent/LiComponent'
import '../../Stylesheets/App/personal.css';
import {Logout} from '../../Action/auth';
import {clearSellerToken} from '../../Action/rpc';
import NavBar from '../../Component/CommonComponent/NavBar'

const Itemlist =[
    {name:'店铺资料',link:'/sellerSetting',imgurl:require('../../Images/common/information.png')},
    {name:'账户与安全',link:'/sellerSavety',imgurl:require('../../Images/common/account.png')},
    {name:'帮助与反馈',link:'/personalCenter/feedback',imgurl:require('../../Images/common/helpReturn.png')},
    {name:'关于聚朵云商',link:'/cashRule',imgurl:require('../../Images/common/about.png'),type:9}
];
export default class SellerStoreSetting extends Component {
    static contextTypes = {
        router:PropTypes.object
    }

    async LoginOut(){
        await Logout()
            .then(res=>{
                clearSellerToken()
                alert('退出成功')
                this.context.router.push('/SellerLogin')
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'设置'}
                />
                <div>
                    <ul>
                        {
                            Itemlist.map(el=>{
                                return(
                                    <Link
                                        to={el.link}
                                        query={{mobile:this.props.location.query.mobile,storeId:this.props.location.query.storeId,name:el.name,type:el.type}}>
                                        <li>
                                            <div style={{flexDirection:'row',height:50}} className="df flex-pack-justify flex-align-center border_bottom plr font14">
                                                <div>
                                                    <span className="di" style={{width:20,height:20}}>
                                                        <img src={el.imgurl} alt=""/>
                                                    </span>
                                                    <span className="di color6 ml5">{el.name}</span>
                                                </div>
                                                <span className="di" style={{width:9,height:16,lineHeight:0,marginLeft:5}}>
                                                    <img src={require('../../Images/rightArrow.png')} alt=""/>
                                                </span>
                                            </div>
                                        </li>
                                    </Link>
                                )
                            })
                        }
                    </ul>
                    <div style={{marginTop:50}}>
                        <CommonBtn
                            title = {'退出'}
                            onClick = {()=>this.LoginOut()}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
