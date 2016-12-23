/**
 * Created by asus on 2016/11/22.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/login.css';
import {Link} from 'react-router';

export default class PwdModify extends Component {

    // 构造
    constructor(props) {
        super(props);
        // 初始状态
        this.state = {
        };
    }



    render(){
        return(
            <div className="wrap">
                <div>
                    <div className='editorBox_100'>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 24}}>旧密码</span>
                        <input
                            style={{flex:1}}
                            maxLength="11"
                            className="editorInput"
                            placeholder="填写旧密码"
                            type = 'password'
                        />
                    </div>

                    <div className='editorBox_100'>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 24}}>新密码</span>
                        <input
                            style={{flex:1}}
                            maxLength="11"
                            className="editorInput"
                            placeholder="填写新密码"
                            type = 'password'
                        />
                    </div>


                    <div className='editorBox_100'>
                        <span style={{fontSize:14,color:'#666',marginLeft: 20,marginRight: 10}}>确认密码</span>
                        <input
                            style={{flex:1}}
                            maxLength="11"
                            className="editorInput"
                            placeholder="再次填写确认"
                            type = 'password'
                        />
                    </div>


                    <button style={{marginTop:30}} onClick={()=>this.setState({step:2})} className="toLogin">确 认</button>
                </div>
            </div>
        )
    }
}