import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Home from '../Component/Home';
import App from '../App';
import Search from '../Component/NewComponent/Search';
import Carousel from '../Component/NewComponent/Carousel';
import OtherApp from '../Component/NewComponent/OtherApp';
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
import Collect from '../Component/PersonalCenter/Collect';
import SearchPage from '../Component/GoodsDetails/SearchPage';
import Setting from '../Component/PersonalCenter/Setting';
import Savety from '../Component/PersonalCenter/Savety';
import Feedback from '../Component/PersonalCenter/Feedback';
import AboutDemo from '../Component/PersonalCenter/AboutDemo';

const RouteConfig = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="search" component={Search}/>
      <Route path="carousel" component={Carousel}/>
      <Route path="otherApp" component={OtherApp}/>
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
      <Route path="personalCenter/collect" component ={Collect} />
      <Route path="personalCenter/setting" component ={Setting} />
      <Route path="personalCenter/savety" component ={Savety} />
      <Route path="personalCenter/feedback" component ={Feedback} />
      <Route path="personalCenter/aboutDemo" component ={AboutDemo} />
    </Route>
  </Router>
);

export default RouteConfig;
