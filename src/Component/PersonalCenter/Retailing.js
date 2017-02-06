import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';
import {GiveAwayRecord} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg';

export default class Retailing extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            incomeAmount:[],
            toShow:false
        };
      }
    componentWillMount() {
        this.ToGetAwayRecord()
    }
    //收入明细
    async ToGetAwayRecord(){
        await GiveAwayRecord(0)
            .then(res=>{
                if(res.resultList == ''){
                    this.setState({toShow:true})
                    return
                }
                this.setState({incomeAmount:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {toShow,incomeAmount}  = this.state
        return (
            <div className="containerNav">
                {
                    toShow?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title="列表是空的哦~"
                        />:
                    incomeAmount&&incomeAmount.map(el=>{
                        return(
                            <Link
                                to="/personalCenter/retailingDetails"
                                query={{
                                imgUrl:el.image_uri,
                                memberName:el.member_name,
                                amount:el.change_amount,
                                msg:el.extra_msg2
                                }}>
                                <RetailingItem
                                    changeAmount = {el.change_amount}
                                    extraMsg = {el.extra_msg2}
                                    imgUrl = {el.image_uri}
                                    ymd = {el.substr(0,10)}
                                    time = {el.substr(11,5)}
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
