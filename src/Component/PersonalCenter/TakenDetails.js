import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';
import {GiveAwayRecord} from '../../Action/auth'

export default class TakenDetails extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            payAmount:[]
        };
    }
    componentWillMount() {
        const accId = this.props.location.query.accId
        console.log('accId============>',accId)
        this.ToGetAwayRecordDetails(accId)
    }
    //支出明细
    async ToGetAwayRecordDetails(){
        await GiveAwayRecord(1)
            .then(res=>{
                this.setState({payAmount:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {payAmount} = this.state
        return (
            <div>
                <SplitLine />
                {
                    payAmount&&payAmount.map(el=>{
                        return(
                            <RetailingItem
                                changeAmount = {el.change_amount}
                                extraMsg = {el.extra_msg2}
                                imgUrl = {el.image_uri}
                                isShowDate={true}
                            />
                        )
                    })
                }
            </div>
        );
    }
}
