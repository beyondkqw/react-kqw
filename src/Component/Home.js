import React, { Component,PropTypes } from 'react';
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
import {HomeBanner,HomeMoudle,ProductList} from '../Action/auth'
//import {initWebsocket} from '../Action/Websocket'
import {getLocation} from '../Action/wxUtil'



const fontUrl = [{title:'充值中心'},{title:'一元夺宝'},{title:'非常好货'},{title:'超实惠'},{title:'特色好货'}]

class Home extends Component {

    // 构造
      constructor(props) {
        super(props);
        // 初始状态
        this.state = {
            banner : [],
            moudle : [],
            goodsList:[]
        };
      }

    static contextTypes = {
        router:PropTypes.object
    }

    async componentWillMount() {
        const getToken = await loadToken();
        console.log('首页得到的token',getToken)

       /* if(getToken == '' ||getToken == null ||getToken == 'null'){

            await WechatAuth()
            const token = GetQueryString('token')
            saveToken(token)
            //initWebsocket()
        }else{
            //initWebsocket()
        }*/
        this.getHomeBanner()
        this.getHomeMoudle()

        getLocation()
    }

    //首页banner
   async getHomeBanner(){
       await HomeBanner('BANNER',0,5)
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

    //搜索
    async SearchBtn(value){
        console.log('value',value);
        await this.getOrder(value,'','','','');
    }

    //请求列表接口
    async getOrder(name,order,orderName,minPrice,maxPrice){
        await ProductList(name,order,orderName,minPrice,maxPrice)
            .then(res=>{
                this.setState({goodsList:res.resultList})
                this.context.router.push({pathname:'/GoodsDetail/SearchPage',query:{goodsList:JSON.stringify(res.resultList)}})
            })
            .catch(err=>{
                console.warn('err',err)
            })
    }

  render() {
    const {moudle} = this.state
    return (
      <div className="containerNav bkg_color">
        <div className="pf t0 width100" style={{zIndex:100}}>
            <Search
                onClick = {(value)=>this.SearchBtn(value)}
                display = {this.state.history}
                style={{backgroundColor:'#ff5500'}}
                location = {true}
            />
        </div>
        <div style={{marginTop:'2.2rem'}}>
              <Carousel
                  images = {this.state.banner}
              />
        </div>

        <OtherApp />
          {
              moudle&&moudle.map(el=>{
                 if(el.num == 3){
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
                 }else if(el.num == 4){
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
                 } else if(el.num == 6){
                     return(
                         <div>
                             <ActiveTitle
                                 title = {el.name}
                             />
                             <Cell_6
                                 imgUrl = {el.cells}
                             />
                             <SplitLine />
                         </div>
                     )
                 }else if(el.num == 7){
                     return(
                         <div>
                             <ActiveTitle
                                 title = {el.name}
                             />
                             <Cell_7
                                 imgUrl = {el.cells}
                             />
                             <SplitLine />
                         </div>
                     )
                 }
              })
          }
        <div className="footerHidden"></div>
        <Footer
            index = {0}
        />
      </div>
    );
  }
}
export default Home;
