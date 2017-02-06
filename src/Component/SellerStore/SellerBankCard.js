import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/personal.css';
import {BankList} from '../../Action/auth';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'
import NavBar from '../../Component/CommonComponent/NavBar'

export default class SellerBankCard extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            sellerBankList:[]
        };
    }
    componentWillMount() {
        this.getBankList()
    }
    async getBankList(){
        await BankList()
            .then(res=>{
                this.setState({sellerBankList:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    render() {
        const {sellerBankList} = this.state
        console.log('bankList=====>',sellerBankList)
        return (
            <div className="containerNav">
                <NavBar
                    renderBack = {true}
                    title = {'我的银行卡'}
                />
                <div className="ChooseHeight">
                    {
                        sellerBankList == ''||sellerBankList == null?
                            <IsShowEmptyImg
                                styleSheet={{width:69,height:72,marginTop:120}}
                                title={'银行卡列表为空哦~'}
                            />
                            :
                            sellerBankList.map(el=>{
                                return(
                                    <div className="BankHeight df supplement border_ra pa_top pa_left1 mt5">
                                        <span className="store_img"><img src={require('../../Images/bank.png')} alt=""/></span>
                                        <div className="flex-1 color_white font14 ml5">
                                            <span className="di" style={{marginTop:2}}>{el.bankName}</span>
                                            <p>储蓄卡</p>
                                            <div style={{marginTop:25}}>
                                                <span>****</span>
                                                <span className="di ml5">****</span>
                                                <span className="di ml5">****</span>
                                                <span className="di ml5">{el.bankcardNo.substr(el.bankcardNo.length-4)}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                    }
                </div>
                <div className="footerHidden"></div>
                <Link to="/sellerAddCard">
                    <div className="pf bottom0 tc userHeight bkg_ff width100 color_white font16">
                        添加银行卡
                    </div>
                </Link>
                <div className="footerHidden"></div>
            </div>
        );
    }
}
