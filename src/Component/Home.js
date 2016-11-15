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



const fontUrl = [{title:'充值中心'},{title:'一元夺宝'},{title:'非常好货'},{title:'超实惠'},{title:'特色好货'}]

class Home extends Component {
  constructor(props) {
    super(props);
    this.props.actions.fetchTopics({type: 'excellent'})
  }

  render() {
    return (
      <div className="containerNav bkg_color">
        <Search />
        <Carousel />
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
