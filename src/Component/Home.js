import React, { Component } from 'react';
import Search from './NewComponent/Search'
import Carousel from './NewComponent/Carousel'
import Footer from './NewComponent/Footer'
import OtherApp from './NewComponent/OtherApp'
import ActiveTitle from './NewComponent/ActiveTitle'
import Cell_3 from './NewComponent/Cell_3'
import Cell_4 from './NewComponent/Cell_4'
import Cell_6 from './NewComponent/Cell_6'
import Cell_7 from './NewComponent/Cell_7'
import SplitLine from './NewComponent/SplitLine'
import {Link} from 'react-router';
import '../Stylesheets/App/sm.min.css'
import '../Stylesheets/App/common.css'
import {HomeBanner,HomeMoudle} from '../Action/auth'


const fontUrl = [{title:'充值中心'},{title:'一元夺宝'},{title:'非常好货'},{title:'超实惠'},{title:'特色好货'}]

class Home extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            banner : []
        };
      }

    componentWillMount() {
        this.getHomeBanner()
        this.getHomeMoudle()
    }

    //首页banner
    getHomeBanner(){
        HomeBanner('BANNER',1,5)
        .then(res=>{
            console.log('BANNER',res)
            this.setState({banner:res})
        })
        .catch(err=>{
            console.warn('BANNER',err)
        })
    }

    //首页模块
    getHomeMoudle(){
        HomeMoudle()
        .then(res=>{
            console.log('首页模块',res)
        })
        .catch(err=>{
            console.warn('getHomeMoudle',err)
        })
    }

  render() {
    return (
      <div className="containerNav bkg_color">
        <Search />
        <Carousel
            images = {this.state.banner}
        />
        <OtherApp />

        <ActiveTitle />
        <Cell_3 />
        <SplitLine />

        <ActiveTitle />
        <Cell_4 />
        <SplitLine />

        <ActiveTitle />
        <Cell_6 />
        <SplitLine />

        <ActiveTitle />
        <Cell_7 />
        <SplitLine />

        <div className="footerHidden"></div>
        <Footer />
      </div>
    );
  }
}
export default Home;
