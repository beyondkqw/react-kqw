import React, { Component} from 'react';
import {Link} from 'react-router';
import SplitLine from '../../Component/NewComponent/SplitLine';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/personal.css';

const liItem = [1,2,3,4,5,6,7,8,9]
export default class WithdrawCash extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.copyArray=[]
        this.state = {
            toShaowModal:false,
            pwd:'',
            pwdArray:[]
        };
      }
    confirmIncome(){
        this.setState({toShaowModal:!this.state.toShaowModal})
    }
    //输入密码
    async addNumToArray(num){
        if(this.copyArray.length < 6){
            await this.copyArray.push(num)
            this.setState({pwdArray:this.copyArray})
            console.log('this.state.pwdArray',this.copyArray)
            //this.setState({pwd:this.pwdArray.join('')})
        }

    }
    //删除密码
    async deletePwd(){
        await this.copyArray.splice(this.copyArray.length-1)
        this.setState({pwdArray:this.copyArray})
    }
    render() {
        const {toShaowModal,pwdArray,pwd} = this.state
        console.log('pwdArray===========>',pwdArray)
        return (
            <div className="bkg_color">
                <div className="list-block m0">
                    <ul>
                        <Link to='/personalCenter/confirmGivenPerson'>
                            <li className="item-content item-link pl  border_bottom">
                                <div className="item-media"><i className="icon icon-f7"></i></div>
                                <div className="item-inner margin0">
                                    <div className="item-title color6 font14">
                                        确定转赠人
                                    </div>
                                </div>
                            </li>
                        </Link>
                    </ul>
                </div>
                <SplitLine />
                <div className="plAll">
                    <p className="color6 font14">提现金额</p>
                    <div className="mt5 mb1 f25 df">
                        <span className="flex-1">￥</span>
                        <input
                            className="borderno"
                            type="password"
                            placeholder="0.00"
                            ref='pointAmount'
                        />
                    </div>
                </div>
                <div className="plAll border_top border_bottom f12">
                    <span>最多可提取</span>
                    <span className="di ml">￥</span><span>123</span>
                </div>
                <SplitLine />
                <div className ="list-block m0 font14">
                    <li className ={'item-content border_bottom isConfirmSet'}>
                        <div className="item-inner">
                            <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                <span className="di margin15 color6">总佣金</span>
                            </div>
                            <div className="item-after color9 isSet">421</div>
                        </div>
                    </li>
                    <li className ={'item-content border_bottom isConfirmSet'}>
                        <div className="item-inner">
                            <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                <span className="di margin15 color6">可提取佣金</span>
                            </div>
                            <div className="item-after color9 isSet">345</div>
                        </div>
                    </li>
                    <li className ={'item-content border_bottom isConfirmSet'}>
                        <div className="item-inner">
                            <div className="item-title height_all">
                                <span className="di listimg">
                                    <img className="border_ra50" src={require('../../Images/myPatrner.png')} alt=""/>
                                </span>
                                <span className="di margin15 color6">已申请提现佣金</span>
                            </div>
                            <div className="item-after color9 isSet">345</div>
                        </div>
                    </li>
                </div>
                <CommonBtn
                    title={'确认提现'}
                    onClick={()=>this.confirmIncome()}
                />
                <p className="f12 color6 tc mt5">余额提现时间为产品<span className="color_yellow">确认收货后30</span>天</p>

                {/*模态层*/}
                {
                    toShaowModal?
                        <div className="modalNav pa width_100 height_all font14" style={{zIndex:100}}>
                            <div className="imcomeModal pf bottom0 width100">
                                <p className="tc width100 userHeight border_bottom pr">
                                    <span className="font16">输入密码</span>
                                    <span className="di hideModal pa">
                                        <img
                                            src={require('../../Images/delete.png')}
                                            alt=""
                                            onClick={()=>this.setState({toShaowModal:false})}
                                        />
                                    </span>
                                </p>
                                <p className="color6 font16 tc cashHeight">
                                    <span>提现金额</span><span>200.00</span>
                                </p>
                                <div className="ptlr">
                                    <div className="modal_input border_ra">
                                        {/*<input
                                            className="width100 height_all borderno supplement input_Spacing"
                                            type="text"
                                            maxLength="6"
                                            value={pwd}
                                            readOnly="readonly"
                                        />*/}
                                        {
                                            pwdArray.map(el=>{
                                                return(
                                                    <div className="fl width16 height_all tc">{el}</div>
                                                )
                                            })
                                        }

                                    </div>
                                </div>
                                <div className="ptlr mt5">
                                    <span className="f12 color_yellow fr">忘记密码?</span>
                                </div>
                                <div className="mt25 width100 border_top">
                                    <ul>
                                        {
                                            liItem.map((el,index)=>{
                                                return(
                                                    <li
                                                        className={
                                                        index%3==0||index%3==1?
                                                        "fl f20 width_3333 tc liInput border_bottom border_right":
                                                        "fl f20 width_3333 tc liInput border_bottom"}
                                                        onClick={()=>this.addNumToArray(el)}
                                                    >{el}</li>
                                                )
                                            })
                                        }
                                        <li
                                            className="fl f20 width_3333 tc liInput border_bottom border_right"
                                            style={{backgroundColor:'#d1d5db'}}
                                        ></li>
                                        <li
                                            className="fl f20 width_3333 tc liInput border_bottom border_right"
                                            onClick={()=>this.addNumToArray(0)}
                                        >0</li>
                                        <li
                                            className="fl f20 width_3333 tc liInput border_bottom border_right"
                                            style={{backgroundColor:'#d1d5db'}}
                                        >
                                            <span className="di" style={{height:17,width:23}}>
                                                <img
                                                    src={require('../../Images/detNum.png')}
                                                    alt=""
                                                    onClick={()=>this.deletePwd()}
                                                />
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        :null
                }
            </div>
        );
    }
}
