import React, { Component,PropTypes} from 'react';
import CommonBtn from '../../Component/CommonComponent/CommonBtn';
import '../../Stylesheets/App/personal.css';
import {BankList} from '../../Action/auth';
import IsShowEmptyImg from '../CommonComponent/IsShowEmptyImg'

export default class CommissionCash extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            myBankList:[]
        };
      }
    static contextTypes = {
        router:PropTypes.object
    }
    componentWillMount() {
        this.getMyBankList()
    }
    async getMyBankList(){
        await BankList()
            .then(res=>{
                this.setState({myBankList:res})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }
    //跳转页面,传参
    confirmBankCard(bankName,bankcardNo,id){
        this.context.router.push({pathname:'/personalCenter/withdrawCash',
            query:{toChange:true,bankname:bankName,bankcardNo:bankcardNo,bankcardId:id}})
    }
    render() {
        const {myBankList} = this.state
        return (
            <div className="bkg_color">
                {
                    myBankList == ''?
                    <IsShowEmptyImg
                        styleSheet={{width:69,height:72,marginTop:120}}
                        title={'列表是空的哦~'}
                    />
                    :
                    myBankList&&myBankList.map(el=>{
                        return(
                            <div className="height_charge plAll border_bottom"
                                 onClick={()=>
                                 this.confirmBankCard(el.bankName,el.bankcardNo.substr(el.bankcardNo.length-4),el.id)}
                            >
                                <span className="fl di headerImg">
                                    <img className="border_ra50" src={require('../../Images/common/bankImg.png')} alt=""/>
                                </span>
                                <div className="fl" style={{marginLeft:15}}>
                                    <div className="font14 color6">
                                        <span>{el.bankcardNo}</span>
                                    </div>
                                    {/*<p className="f12 color9 mt1">尾号{el.bankcardNo.substr(el.bankcardNo.length-4)}的卡</p>*/}
                                    <p className="f12 color9 mt1">{el.branch}</p>
                                </div>
                                <div className="fr" style={{marginTop:7}}>
                                    <span className="font14 color9">{el.bankName}</span>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}
