import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/cloudCard.css';
import {GiveAwayRecord} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg';

export default class DiaryContainer extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            rechareList:[]
        };
    }
    componentWillMount() {
        this.ToGetAwayRecord()
    }

    //查询列表
    async ToGetAwayRecord(){
        await GiveAwayRecord(3)
            .then(res=>{
                this.setState({rechareList:res.resultList})
                console.log('获取到的数据==========>',this.state.rechareList)
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        const {rechareList}  = this.state
        return (
            <div className="containerNav">
                {
                    rechareList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title="列表是空的哦~"
                        />:
                    rechareList&&rechareList.map(el=>{
                        return(
                            <Link
                                to="/pendPaymentDetails"
                                query={{
                                amount:el.channel_amount,
                                msg:el.extra_msg2,
                                time:el.create_time,
                                showMsg:true
                                }}>
                                <RetailingItem
                                    changeAmount = {el.channel_amount}
                                    extraMsg = {el.extra_msg2}
                                    imgUrl = {el.image_uri}
                                    ymd = {el.create_time.substr(0,10)}
                                    time = {el.create_time.substring(el.create_time.length -5, el.create_time.length)}
                                    isShowDate={true}
                                />
                            </Link>
                        )
                    })
                }
            </div>
        );
    }
}
