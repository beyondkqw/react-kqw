import React, { Component} from 'react';
import '../../Stylesheets/App/personal.css';

const liItem = [1,2,3,4,5,6,7,8,9]
export default class EnterPassword extends Component {
    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.copyArray=[]
        this.state = {
            pwd:'',
            pwdArray:[],
            toShowConter:true
        };
    }
    //输入密码
    async addNumToArray(num){
        if(this.copyArray.length < 6){
            await this.copyArray.push(num)
            this.setState({pwdArray:this.copyArray})
        }
    }
    //删除密码
    async deletePwd(){
        await this.copyArray.splice(this.copyArray.length-1)
        this.setState({pwdArray:this.copyArray})
    }
    componentWillReceiveProps(newProps) {
        this.setState({toShowConter:true})
    }
    changeType(){
        this.setState({toShowConter:false})
    }

    render() {
        const {pwdArray,pwd,toShowConter} = this.state
        return (
            toShowConter?
            <div className="bkg_color">
                {/*模态层*/}
                    <div className="modalNav pa wrap height_all font14" style={{zIndex:100}}>
                        <div className="imcomeModal pf bottom0 wrap">
                            <p className="tc width100 userHeight border_bottom pr">
                                <span className="font16">输入密码</span>
                        <span className="di hideModal pa">
                            <img
                                src={require('../../Images/delete.png')}
                                alt=""
                                onClick={()=>this.changeType()}
                            />
                        </span>
                            </p>
                            <p className="color6 font16 tc cashHeight">
                                <span>提现金额</span><span>200.00</span>
                            </p>
                            <div className="ptlr">
                                <div className="modal_input border_ra">
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
            </div>
                :null
        );
    }
}
