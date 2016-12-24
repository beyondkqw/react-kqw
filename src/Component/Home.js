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
import {loadToken,saveToken,clearToken,GetQueryString} from '../Action/rpc'
import {WechatAuth} from '../Action/autoLogin'
import '../Stylesheets/App/sm.min.css'
import '../Stylesheets/App/common.css'
import '../Stylesheets/App/homePage.css';
import {HomeBanner,HomeMoudle} from '../Action/auth'
import {initWebsocket} from '../Action/Websocket'



const fontUrl = [{title:'充值中心'},{title:'一元夺宝'},{title:'非常好货'},{title:'超实惠'},{title:'特色好货'}]

class Home extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            banner : [],
            moudle : []
        };
      }

    async componentWillMount() {
        initWebsocket()
        const getToken =await loadToken();
        console.log('getToken=========>hahah',getToken)

        if(getToken == null || getToken == ''){
            WechatAuth()
            const token = GetQueryString('token')
            saveToken(token)
        }
        this.getHomeBanner()
        this.getHomeMoudle()
    }
    //首页banner
   async getHomeBanner(){
       await HomeBanner('BANNER',1,5)
        .then(res=>{
            console.log('BANNER',res)
            this.setState({banner:res})
        })
        .catch(err=>{
            console.warn('BANNER',err)
        })
    }

    //首页模块
   async getHomeMoudle(){
       await HomeMoudle()
        .then(res=>{
            console.log('首页模块',res)
            this.setState({moudle:res})
        })
        .catch(err=>{
            console.warn('getHomeMoudle',err)
        })
    }


  render() {
    const {moudle} = this.state
    return (
      <div className="containerNav bkg_color">
          <div className="wrap">
              <div className="pf t0 wrap" style={{zIndex:100}}>
                  <Search
                      style={{backgroundColor:'#ff5500'}}
                  />
              </div>
          </div>
          <div className="wrap">
              <div className="headerHidden"></div>
              <Carousel
                  images = {this.state.banner}
              />
              <OtherApp />

              {
                  moudle.map(el=>{
                      if(el.num==3){
                          return(
                              <div>
                                  <ActiveTitle
                                      title = {el.name}
                                  />
                                  <Cell_3
                                      imgUrl = {el.cells}
                                  />
                                  <SplitLine />
                              </div>
                          )
                      }else if(el.num==4){
                          return(
                              <div>
                                  <ActiveTitle
                                      title = {el.name}
                                  />
                                  <Cell_4
                                      imgUrl = {el.cells}
                                  />
                                  <SplitLine />
                              </div>
                          )
                      } else if(el.num==6){
                          return(
                              <div>
                                  <ActiveTitle
                                      title = {el.name}
                                  />
                                  <Cell_6 />
                                  <SplitLine />
                              </div>
                          )
                      }else if(el.num==7){
                          return(
                              <div>
                                  <ActiveTitle
                                      title = {el.name}
                                  />
                                  <Cell_7 />
                                  <SplitLine />
                              </div>
                          )
                      }
                  })
              }
          </div>
          <div className="footerHidden"></div>
          <div className="wrap">
              <div className="pf bottom0 wrap" style={{zIndex:100}}>
                  <nav className="bar-tab bkg_color wrap">
                      <Footer />
                  </nav>
              </div>
          </div>
      </div>



    );
  }
}
export default Home;
