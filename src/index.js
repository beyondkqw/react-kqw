import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import Route from './Config/Route';
import reducer from './Reducer'


import './css/bootstrap.min.css';
import './Stylesheets/Index.css';
import './Stylesheets/Wrap.css'
import './Stylesheets/App/sm.min.css'
import './Stylesheets/App/common.css'
import './Stylesheets/App/cloudCard.css'
import './Stylesheets/App/comfirmPayMoney.css'
import './Stylesheets/App/goodsDetails.css'
import './Stylesheets/App/homePage.css'
import './Stylesheets/App/login.css'
import './Stylesheets/App/MsgListPage.css'
import './Stylesheets/App/order.css'
import './Stylesheets/App/personal.css'
import './Stylesheets/App/sellerStore.css'
import './Stylesheets/App/shoppingCarts.css'


const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)
ReactDOM.render(
  <Provider store={store}>
    {Route}
  </Provider>,
  document.getElementById('root')
);
