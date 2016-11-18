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
import ChooseInfomation from '../Component/ConfirmPayment/ChooseInfomation';
import ManageInformation from '../Component/ConfirmPayment/ManageInformation';
import CloudCard from '../Component/CloudCard/CloudCard';
import PaymentOther from '../Component/CloudCard/PaymentOther';
import PaymentDetails from '../Component/CloudCard/PaymentDetails';
import AlreadyUsed from '../Component/CloudCard/AlreadyUsed';
import AlreadyUsedDetails from '../Component/CloudCard/AlreadyUsedDetails';
import DiaryContainer from '../Component/CloudCard/DiaryContainer';
import PersonalCenter from '../Component/PersonalCenter/PersonalCenter';
import Partner from '../Component/PersonalCenter/Partner';
import LevelPartner from '../Component/PersonalCenter/LevelPartner';
import SearchPage from '../Component/GoodsDetails/SearchPage';


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
      <Route path="chooseInfomation" component={ChooseInfomation}/>
      <Route path="manageInformation" component={ManageInformation}/>
      <Route path="cloudCartoon" component={CloudCard}/>
      <Route path="paymentOther" component={PaymentOther}/>
      <Route path="paymentDetails" component={PaymentDetails}/>
      <Route path="alreadyUsed" component={AlreadyUsed}/>
      <Route path="alreadyUsedDetails" component={AlreadyUsedDetails}/>
      <Route path="diaryContainer" component={DiaryContainer}/>
      <Route path="personalCenter" component={PersonalCenter}/>
      <Route path="partner" component={Partner}/>
      <Route path="levelPartner" component={LevelPartner}/>
      <Route path="GoodsDetail/SearchPage" component ={SearchPage} />
    </Route>
  </Router>
);

export default RouteConfig;
