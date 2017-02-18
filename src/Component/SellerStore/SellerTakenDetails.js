import React, { Component } from 'react';
import SplitLine from '../../Component/NewComponent/SplitLine';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/personal.css';
import {GiveAwayRecord,CashRecord} from '../../Action/auth'
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg';

export default class SellerTakenDetails extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            payAmount:[],
            showImg:false
        };
    }
    componentWillMount() {
        const accId = this.props.location.query.accId
        this.ToGetAwayRecordDetails(accId)
    }
    //支出明细
    async ToGetAwayRecordDetails(){
        await CashRecord(5)
            .then(res=>{
                if(res.resultList == ''){
                    this.setState({showImg:true})
                    return
                }
                this.setState({payAmount:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {showImg,payAmount} = this.state
        return (
            <div className="wrap">
                <SplitLine />
                {
                    showImg?
                        <IsShowEmptyImg
                            styleSheet={{width:69,height:72,marginTop:120}}
                            title="列表是空的哦~"
                        />
                        :
                    payAmount&&payAmount.map(el=>{
                        return(
                            <RetailingItem
                                changeAmount = {el.amount}
                                extraMsg = {el.bankName}
                                imgUrl = {el.image_uri}
                                ymd = {el.createTime.substr(0,10)}
                                time = {el.createTime.substring(el.createTime.length -5, el.createTime.length)}
                                isShowDate={true}
                            />
                        )
                    })
                }
            </div>
        );
    }
}
