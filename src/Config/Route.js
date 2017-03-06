import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReactDOM from 'react-dom';

const App = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../App').default)
  },'App')
}

/*const Home = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Home').default)
  },'Home')
}*/
import Home from '../Component/Home';

const Search = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/NewComponent/Search').default)
  },'Search')
}

const Carousel = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/NewComponent/Carousel').default)
  },'Carousel')
}

const OtherApp = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/NewComponent/OtherApp').default)
  },'OtherApp')
}

const Footer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/NewComponent/Footer').default)
  },'Footer')
}

const GoodsDescription = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/GoodsDescription').default)
  },'GoodsDescription')
}

const Store = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/Store').default)
  },'Store')
}

/*const ShoppingCart = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ShoppingCarts/ShoppingCart').default)
  },'ShoppingCart')
}*/
import ShoppingCart from '../Component/ShoppingCarts/ShoppingCart';

const ComfirmPayMoney = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/ComfirmPayMoney').default)
  },'ComfirmPayMoney')
}

const DeliveredInformation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/DeliveredInformation').default)
  },'DeliveredInformation')
}

const ReceivingTime = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/ReceivingTime').default)
  },'ReceivingTime')
}

const ChooseInfomation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/ChooseInfomation').default)
  },'ChooseInfomation')
}

const ManageInformation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/ManageInformation').default)
  },'ManageInformation')
}

const CloudCard = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/CloudCard/CloudCard').default)
  },'CloudCard')
}

const PendPaymentDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/CloudCard/PendPaymentDetails').default)
  },'PendPaymentDetails')
}

const DiaryContainer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/CloudCard/DiaryContainer').default)
  },'DiaryContainer')
}

const PendingPayment = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/CloudCard/PendingPayment').default)
  },'PendingPayment')
}

const AlreadyUsed = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/CloudCard/AlreadyUsed').default)
  },'AlreadyUsed')
}

const TotalDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/CloudCard/TotalDetails').default)
  },'TotalDetails')
}

/*const PersonalCenter = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/PersonalCenter').default)
  },'PersonalCenter')
}*/
import PersonalCenter from '../Component/PersonalCenter/PersonalCenter';

const Partner = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Partner').default)
  },'Partner')
}

const MyCustomer = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MyCustomer').default)
  },'MyCustomer')
}

const Collect = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Collect').default)
  },'Collect')
}

const SearchPage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/SearchPage').default)
  },'SearchPage')
}

const Login = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Login/Login').default)
  },'Login')
}

const Register = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Login/Register').default)
  },'Register')
}

const ForgetPwd = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Login/ForgetPwd').default)
  },'ForgetPwd')
}

const BindPhone = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Login/BindPhone').default)
  },'BindPhone')
}

const PwdModify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Login/PwdModify').default)
  },'PwdModify')
}

const Setting = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Setting').default)
  },'Setting')
}

const Savety = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Savety').default)
  },'Savety')
}

const Feedback = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Feedback').default)
  },'Feedback')
}

const AboutDemo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/AboutDemo').default)
  },'AboutDemo')
}

const CommisionGiving = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/CommisionGiving').default)
  },'CommisionGiving')
}

const OrderList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Orders/OrderList').default)
  },'OrderList')
}

const ViewEvaluation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Orders/ViewEvaluation').default)
  },'ViewEvaluation')
}

const PublishEvalute = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Orders/PublishEvalute').default)
  },'PublishEvalute')
}

const ChaseRatings = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Orders/ChaseRatings').default)
  },'ChaseRatings')
}

const ChoosePayment = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/ChoosePayment').default)
  },'ChoosePayment')
}

const SurePayment = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/SurePayment').default)
  },'SurePayment')
}

const PointGiving = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/PointGiving').default)
  },'PointGiving')
}

const BalanceGiving = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/BalanceGiving').default)
  },'BalanceGiving')
}

const GoodsCategory = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/GoodsCategory').default)
  },'GoodsCategory')
}

const BrowseRecord = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/BrowseRecord').default)
  },'BrowseRecord')
}

const OrderFormDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Orders/OrderFormDetails').default)
  },'OrderFormDetails')
}

const ApplicationForAfterSales = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Orders/ApplicationForAfterSales').default)
  },'ApplicationForAfterSales')
}

const UserInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/UserInfo').default)
  },'UserInfo')
}

const MemberClub = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MemberClub').default)
  },'MemberClub')
}

const MemberInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MemberInfo').default)
  },'MemberInfo')
}

const MemberIntroduction = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MemberIntroduction').default)
  },'MemberIntroduction')
}

const CountryRank = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/CountryRank').default)
  },'CountryRank')
}

const LocationSearch = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/NearbyShop/LocationSearch').default)
  },'LocationSearch')
}

const NearShop = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/NearbyShop/NearShop').default)
  },'NearShop')
}

const MyCharges = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MyCharges').default)
  },'MyCharges')
}

const AllIncome = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/AllIncome').default)
  },'AllIncome')
}

const Retailing = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Retailing').default)
  },'Retailing')
}

const RetailingDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/RetailingDetails').default)
  },'RetailingDetails')
}

const TakenDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/TakenDetails').default)
  },'TakenDetails')
}

const ConfirmGivenPerson = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/ConfirmGivenPerson').default)
  },'ConfirmGivenPerson')
}

const MyBankCark = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MyBankCark').default)
  },'MyBankCark')
}

const BankInformation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/BankInformation').default)
  },'BankInformation')
}

const ToWatchOtherInfo = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/ToWatchOtherInfo').default)
  },'ToWatchOtherInfo')
}

const WithdrawCash = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/WithdrawCash').default)
  },'WithdrawCash')
}

const JdyStock = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/JdyStock').default)
  },'JdyStock')
}

const StockDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/StockDetail').default)
  },'StockDetail')
}

const Recharge = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/Recharge').default)
  },'Recharge')
}

const RechargeNum = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/RechargeNum').default)
  },'RechargeNum')
}

const MyAlipay = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/MyAlipay').default)
  },'MyAlipay')
}

const CommissionCash = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/CommissionCash').default)
  },'CommissionCash')
}

const ErweiCode = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/ErweiCode').default)
  },'ErweiCode')
}

const TeamAmount = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/TeamAmount').default)
  },'TeamAmount')
}

const ContactMe = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/ContactMe').default)
  },'ContactMe')
}

const RecommendPerson = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/RecommendPerson').default)
  },'RecommendPerson')
}

const EquityDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/EquityDetails').default)
  },'EquityDetails')
}

const SellerLogin = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerLogin/SellerLogin').default)
  },'SellerLogin')
}

const SellerForgetPwd = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerLogin/SellerForgetPwd').default)
  },'SellerForgetPwd')
}

const SellerRegister = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerLogin/SellerRegister').default)
  },'SellerRegister')
}

const EntryStoreInformation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/EntryStoreInformation').default)
  },'EntryStoreInformation')
}

const SellerSearchLocation = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerSearchLocation').default)
  },'SellerSearchLocation')
}

const SellerStoreCenter = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerStoreCenter').default)
  },'SellerStoreCenter')
}

const CustomerService = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/CustomerService').default)
  },'CustomerService')
}

const SellerOrderList = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerOrderList').default)
  },'SellerOrderList')
}

const SellerErWeiCode = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerErWeiCode').default)
  },'SellerErWeiCode')
}

const ToShip = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/ToShip').default)
  },'ToShip')
}

const SearchOrder = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SearchOrder').default)
  },'SearchOrder')
}

const SellerSetting = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerSetting').default)
  },'SellerSetting')
}

const SellerMineCode = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerMineCode').default)
  },'SellerMineCode')
}

const ToFund = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/ToFund').default)
  },'ToFund')
}

const EvaluationDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/EvaluationDetails').default)
  },'EvaluationDetails')
}

const ProductManagement = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/ProductManagement').default)
  },'ProductManagement')
}

const OnSale = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/OnSale').default)
  },'OnSale')
}

const SearchGoods = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SearchGoods').default)
  },'SearchGoods')
}

const OffTheShelf = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/OffTheShelf').default)
  },'OffTheShelf')
}

const SearchOffTheShelf = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SearchOffTheShelf').default)
  },'SearchOffTheShelf')
}

const MineOffDown = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/MineOffDown').default)
  },'MineOffDown')
}

const SellerStoreSetting = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerStoreSetting').default)
  },'SellerStoreSetting')
}

const SellerBankCard = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerBankCard').default)
  },'SellerBankCard')
}

const SellerSavety = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerSavety').default)
  },'SellerSavety')
}

const SellerAddCard = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerAddCard').default)
  },'SellerAddCard')
}

const SellerMyAlipy = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerMyAlipy').default)
  },'SellerMyAlipy')
}

const SalesStatistics = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SalesStatistics').default)
  },'SalesStatistics')
}

const SellerBindPhone = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerLogin/SellerBindPhone').default)
  },'SellerBindPhone')
}

const SellerPwdModify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerLogin/SellerPwdModify').default)
  },'SellerPwdModify')
}

const StoreSubCommission = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/StoreSubCommission').default)
  },'StoreSubCommission')
}

const SellerOrderDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerOrderDetails').default)
  },'SellerOrderDetails')
}

const RemarkManage = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/RemarkManage').default)
  },'RemarkManage')
}

const ShopHome = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/ShopHome').default)
  },'ShopHome')
}

const SellerContactMe = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerContactMe').default)
  },'SellerContactMe')
}

const SellerGoodsDec = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerGoodsDec').default)
  },'SellerGoodsDec')
}

const PaymentSuccess = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/ConfirmPayment/PaymentSuccess').default)
  },'PaymentSuccess')
}

const StoreClassify = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/StoreClassify').default)
  },'StoreClassify')
}

/*const CloudComplex = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/CloudComplex').default)
  },'CloudComplex')
}*/
import CloudComplex from '../Component/GoodsDetails/CloudComplex'

const RechargeWay = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/RechargeWay').default)
  },'RechargeWay')
}

const StoreClassifyDetail = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/StoreClassifyDetail').default)
  },'StoreClassifyDetail')
}

const ShareQrCode = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/PersonalCenter/ShareQrCode').default)
  },'ShareQrCode')
}

const SellerModifyCard = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerModifyCard').default)
  },'SellerModifyCard')
}

const SellerBalanceMan = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerBalanceMan').default)
  },'SellerBalanceMan')
}

const BalanceTake = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/BalanceTake').default)
  },'BalanceTake')
}

const SellerChooseType = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerChooseType').default)
  },'SellerChooseType')
}

const SellerTakenDetails = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/SellerTakenDetails').default)
  },'SellerTakenDetails')
}

const ToWebView = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/ToWebView').default)
  },'ToWebView')
}

const ChooseCity = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/SellerStore/ChooseCity').default)
  },'ChooseCity')
}

const CommonSoon = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/GoodsDetails/CommonSoon').default)
  },'CommonSoon')
}

const CashRule = (nextState, cb) => {
  require.ensure([], require => {
    cb(null, require('../Component/Login/CashRule').default)
  },'CashRule')
}

const RouteConfig = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
    <Route path="/" getComponent={App}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home}/>
      <Route path="search" getComponent={Search}/>
      <Route path="carousel" getComponent={Carousel}/>
      <Route path="otherApp" getComponent={OtherApp}/>
      <Route path="footer" getComponent={Footer}/>
      <Route path="shoppingCart" component={ShoppingCart}/>
      <Route path="store" getComponent={Store}/>
      <Route path="comfirmPayMoney" getComponent={ComfirmPayMoney}/>
      <Route path="deliveredInformation" getComponent={DeliveredInformation}/>
      <Route path="goodsDescription" getComponent={GoodsDescription}/>
      <Route path="receivingTime" getComponent={ReceivingTime}/>
      <Route path="chooseInfomation" getComponent={ChooseInfomation}/>
      <Route path="manageInformation" getComponent={ManageInformation}/>
      <Route path="/cloudCartoon" getComponent={CloudCard}/>
      <Route path="pendPaymentDetails" getComponent={PendPaymentDetails}/>
      <Route path="diaryContainer" getComponent={DiaryContainer}/>
      <Route path="personalCenter" component={PersonalCenter}/>
      <Route path="partner" getComponent={Partner}/>
      <Route path="GoodsDetail/SearchPage" getComponent ={SearchPage} />
      <Route path="Login/Login" getComponent={Login} />
      <Route path="Login/Register" getComponent={Register} />
      <Route path="Login/ForgetPwd" getComponent={ForgetPwd} />
      <Route path="Setting/BindPhone" getComponent={BindPhone} />
      <Route path="Setting/PwdModify" getComponent={PwdModify} />
      <Route path="personalCenter/collect" getComponent={Collect} />
      <Route path="personalCenter/setting" getComponent={Setting} />
      <Route path="personalCenter/savety" getComponent={Savety} />
      <Route path="personalCenter/feedback" getComponent={Feedback} />
      <Route path="personalCenter/aboutDemo" getComponent={AboutDemo} />
      <Route path="orderList" getComponent={OrderList} />
      <Route path="orderList/viewEvaluation" getComponent={ViewEvaluation} />
      <Route path="orderList/chaseRatings" getComponent={ChaseRatings} />
      <Route path="orderList/publishEvalute" getComponent={PublishEvalute} />
      <Route path="confirmPayment/choosePayment" getComponent={ChoosePayment} />
      <Route path="confirmPayment/surePayment" getComponent={SurePayment} />
      <Route path="personalCenter/myCustomer" getComponent={MyCustomer} />
      <Route path="personalCenter/commisionGiving" getComponent={CommisionGiving} />
      <Route path="personalCenter/pointGiving" getComponent={PointGiving} />
      <Route path="personalCenter/balanceGiving" getComponent={BalanceGiving} />
      <Route path="personalCenter/BrowseRecord" getComponent={BrowseRecord} />
      <Route path="orders/orderFormDetails" getComponent={OrderFormDetails} />
      <Route path="goodsDetails/goodsCategory" getComponent={GoodsCategory} />
      <Route path="orders/applicationForAfterSales" getComponent={ApplicationForAfterSales} />
      <Route path="personalCenter/userInfo" getComponent={UserInfo} />
      <Route path="personalCenter/memberClub" getComponent={MemberClub} />
      <Route path="personalCenter/memberInfo" getComponent={MemberInfo} />
      <Route path="personalCenter/memberIntroduction" getComponent={MemberIntroduction} />
      <Route path="personalCenter/countryRank" getComponent={CountryRank} />
      <Route path="nearbyShop/locationSearch" getComponent={LocationSearch} />
      <Route path="goods/NearByShop" getComponent={NearShop} />
      <Route path="personalCenter/myCharges" getComponent={MyCharges} />
      <Route path="personalCenter/allIncome" getComponent={AllIncome} />
      <Route path="personalCenter/retailing" getComponent={Retailing} />
      <Route path="personalCenter/retailingDetails" getComponent={RetailingDetails} />
      <Route path="personalCenter/takenDetails" getComponent={TakenDetails} />
      <Route path="personalCenter/confirmGivenPerson" getComponent={ConfirmGivenPerson} />
      <Route path="personalCenter/myBankCark" getComponent={MyBankCark} />
      <Route path="personalCenter/bankInformation" getComponent={BankInformation} />
      <Route path="personalCenter/toWatchOtherInfo" getComponent={ToWatchOtherInfo} />
      <Route path="personalCenter/withdrawCash" getComponent={WithdrawCash} />
      <Route path="personalCenter/jdyStock" getComponent={JdyStock} />
      <Route path="personalCenter/stockDetail" getComponent={StockDetail} />
      <Route path="personalCenter/recharge" getComponent={Recharge} />
      <Route path="personalCenter/rechargeNum" getComponent={RechargeNum} />
      <Route path="pendingPayment" getComponent={PendingPayment} />
      <Route path="alreadyUsed" getComponent={AlreadyUsed} />
      <Route path="totalDetails" getComponent={TotalDetails} />
      <Route path="personalCenter/myAlipay" getComponent={MyAlipay} />
      <Route path="personalCenter/commissionCash" getComponent={CommissionCash} />
      <Route path="personalCenter/erweiCode" getComponent={ErweiCode} />
      <Route path="personalCenter/teamAmount" getComponent={TeamAmount} />
      <Route path="contactMe" getComponent={ContactMe} />
      <Route path="personalCenter/recommendPerson" getComponent={RecommendPerson} />
      <Route path="sellerLogin" getComponent={SellerLogin} />
      <Route path="sellerForgetPwd" getComponent={SellerForgetPwd} />
      <Route path="sellerRegister" getComponent={SellerRegister} />
      <Route path="entryStoreInformation" getComponent={EntryStoreInformation} />
      <Route path="sellerSearchLocation" getComponent={SellerSearchLocation} />
      <Route path="remarkManage" getComponent={RemarkManage} />
      <Route path="sellerStoreCenter" getComponent={SellerStoreCenter} />
      <Route path="customerService" getComponent={CustomerService} />
      <Route path="sellerOrderList" getComponent={SellerOrderList} />
      <Route path="sellerErWeiCode" getComponent={SellerErWeiCode} />
      <Route path="toShip" getComponent={ToShip} />
      <Route path="sellerSetting" getComponent={SellerSetting} />
      <Route path="sellerMineCode" getComponent={SellerMineCode} />
      <Route path="toFund" getComponent={ToFund} />
      <Route path="evaluationDetails" getComponent={EvaluationDetails} />
      <Route path="productManagement" getComponent={ProductManagement} />
      <Route path="onSale" getComponent={OnSale} />
      <Route path="searchOrder" getComponent={SearchOrder} />
      <Route path="searchGoods" getComponent={SearchGoods} />
      <Route path="offTheShelf" getComponent={OffTheShelf} />
      <Route path="searchOffTheShelf" getComponent={SearchOffTheShelf} />
      <Route path="mineOffDown" getComponent={MineOffDown} />
      <Route path="sellerStoreSetting" getComponent={SellerStoreSetting} />
      <Route path="sellerBankCard" getComponent={SellerBankCard} />
      <Route path="sellerSavety" getComponent={SellerSavety} />
      <Route path="sellerAddCard" getComponent={SellerAddCard} />
      <Route path="sellerMyAlipy" getComponent={SellerMyAlipy} />
      <Route path="salesStatistics" getComponent={SalesStatistics} />
      <Route path="sellerBindPhone" getComponent={SellerBindPhone} />
      <Route path="sellerPwdModify" getComponent={SellerPwdModify} />
      <Route path="storeSubCommission" getComponent={StoreSubCommission} />
      <Route path="sellerOrderDetails" getComponent={SellerOrderDetails} />
      <Route path="shopHome" getComponent={ShopHome} />
      <Route path="sellerContactMe" getComponent={SellerContactMe} />
      <Route path="sellerGoodsDec" getComponent={SellerGoodsDec} />
      <Route path="equityDetails" getComponent={EquityDetails} />
      <Route path="paymentSuccess" getComponent={PaymentSuccess} />
      <Route path="storeClassify" getComponent={StoreClassify} />
      <Route path="cloudComplex" component={CloudComplex} />
      <Route path="rechargeWay" getComponent={RechargeWay} />
      <Route path="storeClassifyDetail" getComponent={StoreClassifyDetail} />
      <Route path="shareQrCode" getComponent={ShareQrCode} />
      <Route path="sellerModifyCard" getComponent={SellerModifyCard} />
      <Route path="sellerBalanceMan" getComponent={SellerBalanceMan} />
      <Route path="balanceTake" getComponent={BalanceTake} />
      <Route path="sellerChooseType" getComponent={SellerChooseType} />
      <Route path="sellerTakenDetails" getComponent={SellerTakenDetails} />
      <Route path="toWebView" getComponent={ToWebView} />
      <Route path="chooseCity" getComponent={ChooseCity} />
      <Route path="commonSoon" getComponent={CommonSoon} />
      <Route path="cashRule" getComponent={CashRule} />
    </Route>
  </Router>
);




export default RouteConfig;
