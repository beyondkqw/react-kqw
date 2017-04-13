import React, { Component } from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine'
import '../../Stylesheets/App/personal.css';
import {VipList,NoticeView} from '../../Action/auth'

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
            nextGrade:'',
            URl:''
        };
      }

    componentWillMount() {
       this.getVipList()
        this.getNoticeView()
    }

    getNoticeView(){
        NoticeView('LVROLE')
            .then(async res=>{
                await this.setState({URl:res&&res[0].URL})
            })
            .catch(err=>{
                console.warn('NoticeView err',err)
            })
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
        const {perlv,minelv,nextlv,perGrade,mineGrade,nextGrade,URl} = this.state
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
                                    V<span>{perlv?perlv:0}</span>
                                </div>
                                {/*<p className="mt3 color_white">{perGrade?perGrade:0}</p>*/}
                            </div>
                            <div className="fl width_3333 tc" style={{marginTop:-16}}>
                                <div className="di bigSize color_yellow bkg_ff tc border_ra50 z_index">
                                    V<span>{minelv?minelv:0}</span>
                                </div>
                                {/*<div className="mt3 color_white">
                                    <div>总分</div>
                                    <p>{vipPoint?vipPoint:0}</p>
                                </div>*/}
                            </div>
                            <div className="fl width_3333 tc">
                                <div className="di cellSize color_yellow color_pink tc border_ra50 z_index">
                                    V<span>{nextlv?nextlv:0}</span>
                                </div>
                                {/*<p className="mt3 color_white">{nextGrade?nextGrade:0}</p>*/}
                            </div>
                        </div>
                    </div>
                </div>
                <SplitLine />
                <div className="font14 rule">
                    <p className="color6 tc">规则说明</p>
                    <iframe src={URl} id="myiframe" overflow='auto' onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)" scrolling="yes" style={{border:'none',width:'100%',height:window.innerHeight-210}}></iframe>
                </div>
            </div>
        );
    }
}
