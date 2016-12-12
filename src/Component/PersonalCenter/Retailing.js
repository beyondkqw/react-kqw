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
        await GiveAwayRecord()
            .then(res=>{
                this.setState({incomeAmount:res.resultList})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        return (
            <div className="containerNav">
                <Link to="/personalCenter/retailingDetails">
                    <RetailingItem
                        isShowDate={true}
                    />
                </Link>
            </div>
        );
    }
}
