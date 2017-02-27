import React, { Component } from 'react';
import {Link} from 'react-router';
import '../../Stylesheets/App/sm.min.css';
import '../../Stylesheets/App/homePage.css';

const footerList = [
    {title:'首页',imgUrl:require("../../Images/common/navHome.png"),replaceImg:require("../../Images/common/homeReplace.png"),link:'/home'},
    {title:'分类',imgUrl:require("../../Images/common/classification.png"),replaceImg:require("../../Images/common/classReplace.png"),link:'/cloudComplex'},
    {title:'购物车',imgUrl:require("../../Images/common/ShoppingCart.png"),replaceImg:require("../../Images/common/ShoppingCartReplace.png"),link:'/shoppingCart'},
    {title:'个人中心',imgUrl:require("../../Images/common/personCenter.png"),replaceImg:require("../../Images/common/centerReplace.png"),link:'/personalCenter'},
]
export default class Footer extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            tabIndex:this.props.index
        };
      }

    async changeStatus(index){
        await this.setState({tabIndex:index})
    }
    render() {
        const {tabIndex} = this.state
        return (
            <div className="bkg_color df border_top pf bottom0 width_100" style={{paddingTop:5}}>
                {
                    footerList.map((el,index)=>{
                        return(
                            <div
                                className="width_100"
                                onClick = {()=>this.changeStatus(index)}>
                            <Link
                                to={el.link}
                                className="di df flex-v flex1 flex-align-center"
                            >
                                {
                                   tabIndex == index?
                                        <div style={{height:25}} >
                                            <span className={tabIndex == index?'di replacrImg':'di footerNav'} style={{lineHeight:0}}>
                                                <img src={el.replaceImg} />
                                            </span>
                                        </div>
                                        :
                                        <div style={{height:25}} >
                                            <span className={tabIndex == index?'di replacrImg':'di footerNav'} style={{lineHeight:0}}>
                                                <img src={el.imgUrl} />
                                            </span>
                                        </div>
                                }

                                <div style={{height:22}} className={tabIndex == index?'color_yellow font14':'color9 font14'}>{el.title}</div>
                            </Link>
                            </div>
                        )
                    })
                }
            </div>


        );
    }
}
