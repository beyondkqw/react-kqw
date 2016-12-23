import React, { Component} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import EnterPassword from '../../Component/CommonComponent/EnterPassword';
import '../../Stylesheets/App/personal.css';


export default class Recharge extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.monetList = [100,200,300,400,500,600]
        this.state = {
            toShowNav:false,
            showModal:false,
            indexNum:''
        };
      }

    render() {
        const {toShowNav,indexNum,showModal} = this.state
        return (
            <div className="bkg_color containerNav">
                <div className="wrap">

                    <div className="list-block m0">
                        <ul>
                            <Link to='/personalCenter/rechargeNum'>
                                <li className="item-content item-link item-link pl  border_bottom">
                                    <div className="item-media">
                                        <span className="fl di headerImg">
                                            <img className="border_ra50" src={require('../../Images/headerImg.jpg')} alt=""/>
                                        </span>
                                    </div>
                                    <div className="item-inner" style={{marginLeft:15}}>
                                        <div className="item-title-row">
                                            <div className="item-title font14 color6">多云云的天堂</div>
                                            <div className="f12 color9">请设置充值账号</div>
                                        </div>
                                    </div>
                                </li>
                            </Link>
                        </ul>
                    </div>
                    <SplitLine />
                    <div className="plAll">
                        <p className="font14">
                            <span className="color6">充值金额</span>
                            <span className="color9"> ( 选择或自定义金额 ) </span>
                        </p>
                        <div className="mt5 mb1 f25 df">
                            <span className="flex-1">￥</span>
                            <input
                                className="borderno"
                                type="password"
                                placeholder="0.00"
                            />
                        </div>
                    </div>
                    {
                        toShowNav?
                            <div>
                                <div className="plAll border_top border_bottom f12 color_yellow">
                                    <span>赠送充值币</span>
                                    <span>15</span>
                                </div>
                                <SplitLine />
                            </div>
                            :null
                    }
                    <div className="border_top">
                        <ul className="font14 color6 width100">
                            {
                                this.monetList.map((el,index)=>{
                                    return(
                                            <li
                                                className={indexNum === index?
                                                "ptb tc di width_3333 border_right border_bottom color_yellow"
                                                :"ptb tc di width_3333 border_right border_bottom"
                                                }
                                                onClick={()=>this.setState({toShowNav:true,indexNum:index})}
                                            ><div>{el}<span>元</span></div>
                                                <p className="color9 f12">赠送<span>5</span>元充值币</p>
                                            </li>
                                        )
                                })
                            }
                        </ul>
                    </div>
                    <SplitLine />
                    <div className ="list-block m0 font14">
                        <ul>
                            <li className ='item-content item-link border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg">
                                            <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                        </span>
                                        <span className="di margin15 color6">省份</span>
                                    </div>
                                    <div className="item-after color9">广东省</div>
                                </div>
                            </li>
                            <li className ='item-content item-link border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg">
                                            <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                        </span>
                                        <span className="di margin15 color6">城市</span>
                                    </div>
                                    <div className="item-after color9">深圳</div>
                                </div>
                            </li>
                            <li className ='item-content item-link border_bottom isConfirmSet'>
                                <div className="item-inner">
                                    <div className="item-title height_all">
                                        <span className="di listimg">
                                            <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                        </span>
                                        <span className="di margin15 color6">区县</span>
                                    </div>
                                    <div className="item-after color9">宝安区</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <CommonBtn
                        title={'确认充值'}
                        onClick={()=>this.setState({showModal:true})}
                    />
                    <p className="f12 color6 tc mt5 pr">
                        <span className="di checkedRead pa">
                            <input
                                type="checkbox" id="isRead"
                                className="di toRead"
                            />
                            <label htmlFor="isRead"></label>
                        </span>
                        <span style={{marginLeft:20,marginRight:5}}>同意并接受聚朵云商综合体招商资质标准</span>
                        <Link to="/personalCenter/balanceCashRule">
                            <span className="di pa" style={{width:15,height:15,lineHeight:0}}>
                                <img src={require('../../Images/toRead.png')} alt=""/>
                            </span>
                        </Link>
                    </p>
                </div>
                    {
                        showModal?
                            <EnterPassword />
                            :null
                    }


            </div>
        );
    }
}
