/**
 * Created by asus on 2016/12/6.
 */
import React, { Component } from 'react';
import '../../Stylesheets/App/test.css';
//import $ from '../../js/jquery.min'

const icon = [
    require('../../Images/person/first.png'),
    require('../../Images/person/second.png'),
    require('../../Images/person/third.png')

]


export default class Test extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
          this.container = document.getElementsByClassName('containerNav')
        this.state = {

        };
      }


    componentDidUpdate() {
        console.log('aaaa')
    }

    scroll(e,b){
        //console.log('e',document.getElementsByClassName('containerNav')[0].clientHeight)
        //console.log('b',b)
        //e.offsetTop
        const scrollTop = document.getElementsByClassName('containerNav')[0].scrollTop
        const clientHeight = document.getElementsByClassName('containerNav')[0].clientHeight

        if(scrollTop>=30){
            console.log('加载')
        }
    }

    render(){
        return(
            <div className="containerNav" onScroll={(e,b)=>this.scroll(e,b)}>
                <div className="container" >
                    <RefreshWrapper />
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div><div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div><div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div><div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>
                    <div>aa</div>








                </div>
            </div>
        )
    }
}