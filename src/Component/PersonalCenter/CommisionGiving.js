import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import LiComponent from '../../Component/CommonComponent/LiComponent';
import LiItem from '../../Component/CommonComponent/LiItem';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/personal.css';

const ChagreList = [
    {title:'累计转赠佣金',name:'200',imgUrl:require('../../Images/myPatrner.png'),isShow:false,link:''},
    {title:'现有佣金',name:'56880.22',imgUrl:require('../../Images/myapply.png'),isShow:false,link:''},
    {title:'可用佣金',name:'12564',imgUrl:require('../../Images/myapply.png'),isShow:false,link:''}
]
export default class CommisionGiving extends Component {
    render() {
        return (
            <div className="containerNav bkg_color">
                <div className="list-block m0">
                    <ul>
                        <Link to='/personalCenter/confirmGivenPerson'>
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0">
                                    <div className="item-title color6 font14">
                                        确定转赠人
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <SplitLine />
                <div className="plAll">
                    <p className="color6 font14">转赠佣金</p>
                    <div className="mt5 mb1 f25 df">
                        <span className="flex-1">￥</span><input className="borderno flex-1" type="text" placeholder="0.00"/>
                    </div>
                </div>
                <div className="plAll border_top border_bottom f12">
                    <span>最多可提取</span>
                    <span>2345</span>
                </div>
                <SplitLine />
                <div className ="list-block m0 font14">
                    {
                        ChagreList.map(el=>{
                            return(
                                <LiItem
                                    title={el.title}
                                    link={el.link}
                                    name={el.name}
                                    imgUrl={el.imgUrl}
                                    isShow={el.isShow}
                                />
                            )
                        })
                    }
                </div>
                <CommonBtn
                    title={'确认转赠'}
                />
            </div>
        );
    }
}
