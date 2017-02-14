import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/cloudCard.css';
import {GiveAwayRecord} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg';

export default class AlreadyUsed extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            areadyUsedList:[]
        };
    }
    componentWillMount() {
        this.ToGetAwayRecord()
    }

    //查询列表
    async ToGetAwayRecord(){
        await GiveAwayRecord(4)
            .then(res=>{
                this.setState({areadyUsedList:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {areadyUsedList} = this.state
        return (
            <div>
                {
                    areadyUsedList == ''?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title={'列表是空的哦~'}
                        />
                        :
                    areadyUsedList&&areadyUsedList.map(el=>{
                        return(
                            <Link to="/pendPaymentDetails"
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
