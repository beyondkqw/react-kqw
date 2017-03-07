import React, { Component } from 'react';
import '../../Stylesheets/App/personal.css';
import {NoticeView} from '../../Action/auth'

export default class AboutDemo extends Component {
    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            URL:''
        };
      }
    componentWillMount() {
        this._NoticeView()
    }
    _NoticeView(){
        NoticeView('ABOUT')
            .then(async res=>{
                await this.setState({URL:res&&res[0].URL})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

    render() {
        return (
            <div className="containerNav" style={{height:'100%'}}>
                {/*<NavBar
                    renderBack = {true}
                    title = {'关于聚朵云'}
                />*/}
                <iframe
                    src={this.state.URL}
                    id="myiframe" overflow='auto'
                    onLoad="$(this).css('height',$(this).contents().find('body')[0].scrollHeight)"
                    scrolling="yes"
                    style={{border:'none',width:'100%',height:'100%',position:'absolute',top:0,bottom:0}}>
                </iframe>
            </div>
        );
    }
}
