import React, { Component } from 'react';
import {Link} from 'react-router';
import RetailingItem from '../../Component/PersonalCenter/RetailingItem';
import '../../Stylesheets/App/cloudCard.css';
import {GiveAwayRecord} from '../../Action/auth'
import IsShowEmptyImg from '../../Component/CommonComponent/IsShowEmptyImg';

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
                if(res.resultList == ''){
                    this.setState({toShow:true})
                    return
                }
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
                <Link to="/pendPaymentDetails">
                    <RetailingItem
                        isShowDate={true}
                    />
                </Link>
                <RetailingItem
                    isShowDate={true}
                />
            </div>
        );
    }
}
