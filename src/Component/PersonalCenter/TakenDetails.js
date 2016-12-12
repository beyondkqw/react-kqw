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
        this.ToGetAwayRecordDetails()
    }
    //支出明细
    async ToGetAwayRecordDetails(){
        await GiveAwayRecord()
            .then(res=>{
                this.setState({payAmount:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        return (
            <div>
                <SplitLine />
                <RetailingItem />
            </div>
        );
    }
}
