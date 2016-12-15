import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';
import {GiveAwayRecord} from '../../Action/auth'

export default class Retailing extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            incomeAmount:[]
        };
      }
    componentWillMount() {
        this.ToGetAwayRecord()
    }
    //收入明细
    async ToGetAwayRecord(){
        await GiveAwayRecord(0)
            .then(res=>{
                this.setState({incomeAmount:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {incomeAmount}  = this.state
        return (
            <div className="containerNav">
                {
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
