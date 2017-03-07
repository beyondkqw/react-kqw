import React, { Component,PropTypes } from 'react';
import {Link} from 'react-router';
import CommonBtn from '../../Component/CommonComponent/CommonBtn'
import LiComponent from '../../Component/CommonComponent/LiComponent'
import '../../Stylesheets/App/comfirmPayMoney.css';
import {Logout} from '../../Action/auth'
import {clearToken} from '../../Action/rpc';

const Itemlist =[
    {name:'个人资料',link:'/personalCenter/userInfo',imgurl:require('../../Images/common/information.png'),type:''},
    {name:'账户与安全',link:'/personalCenter/savety',imgurl:require('../../Images/common/account.png'),type:''},
    {name:'帮助与反馈',link:'/cashRule',imgurl:require('../../Images/common/helpReturn.png'),type:5},
    {name:'关于聚朵云',link:'/cashRule',imgurl:require('../../Images/common/about.png'),type:6}
];
export default class Setting extends Component {

    static contextTypes = {
        router:PropTypes.object
    }
    quit(){
        Logout()
            .then(res=>{
                clearToken();
                this.context.router.push({pathname:'/Login/Login'}) //跳转
            })
            .catch(err=>{
                console.warn('退出失败',err)
            })
    }
    render() {
        return (
        <div className="containerNav">
            <div className="list-block m0">
                <ul>
                    {
                        Itemlist.map((el,index)=>{
                            return(
                                <Link
                                    to={el.link}
                                    query={{mobile:this.props.location.query.resetMobile,type:el.type}}
                                >
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
                        title = {'退出登录'}
                        onClick = {()=>this.quit()}
                    />
                </div>
            </div>
        </div>
        );
    }
}
