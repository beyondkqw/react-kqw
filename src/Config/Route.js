import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Home from '../Component/Home';
import App from '../App';
import Search from '../Component/NewComponent/Search';
import Carousel from '../Component/NewComponent/Carousel';
import OtherApp from '../Component/NewComponent/OtherApp';
import ActiveTitle from '../Component/NewComponent/ActiveTitle';
import Cell_3 from '../Component/NewComponent/Cell_3';
import Cell_4 from '../Component/NewComponent/Cell_4';
import Cell_6 from '../Component/NewComponent/Cell_6';
import Cell_7 from '../Component/NewComponent/Cell_7';
import SplitLine from '../Component/NewComponent/SplitLine';
import Footer from '../Component/NewComponent/Footer';
import GoodsDescription from '../Component/GoodsDetails/GoodsDescription';
import Store from '../Component/GoodsDetails/Store';
import ShoppingCart from '../Component/ShoppingCarts/ShoppingCart';
import ComfirmPayMoney from '../Component/ConfirmPayment/ComfirmPayMoney';
import DeliveredInformation from '../Component/ConfirmPayment/DeliveredInformation';
import ReceivingTime from '../Component/ConfirmPayment/ReceivingTime';
import CloudCartoon from '../Component/CloudCartoon/CloudCartoon';

const RouteConfig = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="search" component={Search}/>
      <Route path="carousel" component={Carousel}/>
      <Route path="otherApp" component={OtherApp}/>
      <Route path="activeTitle" component={ActiveTitle}/>
      <Route path="cell_3" component={Cell_3}/>
      <Route path="cell_4" component={Cell_4}/>
      <Route path="cell_6" component={Cell_7}/>
      <Route path="cell_7" component={Cell_7}/>
      <Route path="splitLine" component={SplitLine}/>
      <Route path="footer" component={Footer}/>
      <Route path="shoppingCart" component={ShoppingCart}/>
      <Route path="store" component={Store}/>
      <Route path="comfirmPayMoney" component={ComfirmPayMoney}/>
      <Route path="deliveredInformation" component={DeliveredInformation}/>
      <Route path="goodsDescription" component={GoodsDescription}/>
      <Route path="receivingTime" component={ReceivingTime}/>
      <Route path="cloudCartoon" component={CloudCartoon}/>
    </Route>
  </Router>
);

export default RouteConfig;
