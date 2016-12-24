import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';
import {VipList} from '../../Action/auth'

const ruleList=[
    {num:'1、',declaration:'推荐一人可得10分'},
    {num:'2、',declaration:'购买物品,一元为一份,取证'},
    {num:'3、',declaration:'分佣是低等级会员不能得到高级会员的分佣金额'},
    {num:'4、',declaration:'分佣金额分为为止'},
    {num:'5、',declaration:'结构连上为分完的分佣金额贵平台所有'}
];
export default class MemberIntroduction extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            perlv:'',
            minelv:'',
            nextlv:'',
            perGrade:'',
            nextGrade:''
        };
      }

    componentWillMount() {
       this.getVipList()
    }

    async getVipList(){
       await VipList()
            .then(res=>{
                this.setState({perGrade:res[0].minGrade})
                this.setState({perlv:res[0].lv})
                this.setState({minelv:res[1].lv})
                this.setState({nextlv:res[2].lv})
                this.setState({nextGrade:res[2].minGrade})
            })
    }

    render() {
        const {perlv,minelv,nextlv,perGrade,mineGrade,nextGrade} = this.state
        const {vipPoint} = this.props.location.query
        return (
            <div className="containerNav">
                <div className="vipBar">
                    <div className="pr">
                        <div className="di all_progressBar supplement cell-Height width100">
                            <div className="progressBar pr supplement">
                                <span className="di spotImg pa">
                                <img src={require('../../Images/spot.png')} alt=""/>
                            </span>
                            </div>
                        </div>
                        <div className="pa top0 width100 font14">
                            <div className="fl width_3333 tc">
                                <div className="di cellSize color_yellow color_pink tc  border_ra50 z_index">
                                    V<span>{perlv}</span>
                                </div>
                                <p className="mt3 color_white">{perGrade}</p>
                            </div>
                            <div className="fl width_3333 tc" style={{marginTop:-16}}>
                                <div className="di bigSize color_yellow bkg_ff tc border_ra50 z_index">
                                    V<span>{minelv}</span>
                                </div>
                                <div className="mt3 color_white">
                                    <div>总分</div>
                                    <p>{vipPoint}</p>
                                </div>
                            </div>
                            <div className="fl width_3333 tc">
                                <div className="di cellSize color_yellow color_pink tc border_ra50 z_index">
                                    V<span>{nextlv}</span>
                                </div>
                                <p className="mt3 color_white">{nextGrade}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <SplitLine />
                <div className="font14 rule">
                    <p className="color6">规则说明</p>
                    <ul className="color9">
                        {
                            ruleList.map(el=>{
                                return(
                                    <li><span>{el.num}</span><span>{el.declaration}</span></li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}
