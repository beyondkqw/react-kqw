/**
 * Created by asus on 2016/11/25.
 */

//获取短信验证码
export const smsCode = 'sms/reg'

//获取忘记密码验证码
export const forgetsCode = 'sms/default'

//忘记密码
export const updateLoginPwd = 'pwd/updateLoginPwd'

//用户注册
export const register = 'account/add'

//首页banner图
export const homeBanner = 'notices/list'

//首页模块（例如一元夺宝）
export const homeMoudle = 'floor/homePage'

//用户登录
export const login = 'account/login'

//商品详情
export const  detail = 'product/detail'

//商品是否收藏
export const  follow = 'auth/account/follow'

//商品收藏列表
export const  followList = 'auth/account/followList'

//商品列表
export const  productList = 'product/list'

//商品属性
export const productAttribute = 'product/attribute'

//新增地址
export const addAddress = 'auth/address/save'

//编辑地址
export const editAddress = 'auth/address/edit'

//地址列表
export const addressList = 'auth/address/list'

//设置默认收货地址
export const defaultAddress = 'auth/address/defaultAddress'

//订单列表
export const orderList = 'order/auth/list'

//订单详情
export const orderDetail = 'order/detail'

//加入购物车
export const addShopCar = 'auth/car/add'

//购物车列表
export const shopCarList = 'auth/car/list'

//更新购物车数量
export const editShopNum = 'auth/car/edit'

//删除购物车
export const delShopCar = 'auth/car/del'

//购物车结算
export const settlementShopCar = 'order/auth/generate'

//商品类型
export const categoryList = 'category/list'

//立即购买
export const orderShopping = 'order/auth/shopping'

//确认收货
export const confirmReceive = 'order/auth/receive'

//取消订单
export const cancelReceive = 'order/auth/cancel'

//根据订单号查询订单
export const listByOrderNo = 'order/auth/listByOrderNo'

//vip等级列表
export const vipList = 'vip/auth/list'

//查看个人资料
export const myInfo = 'auth/account/info'

//绑定手机号
export const bindPhone = 'auth/account/bindingAccName'

//发送绑定手机号验证码
export const bindSms = 'sms/auth/binding'

//我的合伙人
export const myPartner = 'auth/account/partner'

//团队成员
export const membersInfo = 'auth/account/teemList'

//全国排名
export const countryRank = 'accountInfo/accountList'

//成员(俱乐部)信息
export const memberInfo = 'auth/account/memberInfo'

//查看用户资料
export const userInfo = 'accountInfo/info'

//根据订单详情ID, 查询订单详情
export const _orderDetail = 'order/orderdetail'

//赠送佣金
export const giveAmount = 'auth/account/giveAmount'

//我的佣金记录
export const giveAwayRecord = 'auth/account/commissionRecord'

//商品评价
export const remark = 'comment/auth/save'

//商品评价列表
export const remarkList = 'comment/list'

//修改个人资料
export const updateInfo = 'auth/account/updateInfo'

//邀请注册二维码
export const qrCode = 'captcha/auth/qrCode'

//可用积分查询
export const points = 'order/auth/points'

//删除订单
export const orderDel = 'order/auth/del'

//银行卡列表
export const bankList = 'bank/auth/list'

//绑定银行卡
export const bindBank = 'bank/auth/binding'

//退款原因列表
export const noticeList = 'notices/list'

//申请退款
export const refund = 'order/auth/refund'

//商品浏览记录
export const browseRecord = 'product/auth/browseRecord'

//消费金额
export const lvmemberInfo = 'accountInfo/memberInfo'

//首页菜单导航
export const tagList = 'tag/list'

//清空浏览记录
export const delBrowseRecord = 'product/auth/delBrowseRecord'

//店铺详情
export const storeDetails = 'store/detail'

//重置密码验证码
export const resetPwd = 'sms/auth/resetPwd'

//修改密码
export const resetLoginPwd = 'pwd/auth/resetLoginPwd'

//删除地址
export const delAddress = 'auth/address/del'

//支付
export const payment = 'auth/charge/process'

//提现
export const cash = 'transation/auth/cash'

//聚朵股权
export const equityList = 'auth/account/equityList'

//直推人列表
export const recommendList = 'auth/account/recommendList'

//云综合体--店铺类型
export const storeType = 'store/storeType'

//云综合体--店铺列表
export const storeList = 'store/list'

//云卡通订单生成
export const generate = 'yunCard/auth/generate'

//查看分享注册二维码
export const accQrCode = 'captcha/accQrCode'

//云卡通充值金额列表
export const rechargeAmount = 'notices/rechargeAmount'


/*---------------卖家版---------------*/
//注册
export const sellerAdd = 'account/seller_add'

//登录
export const sellerLogin = 'account/seller_login'

//录入店铺信息
export const storeAdd = 'store/auth/add'

//店铺详情
export const storeDetail = 'store/detail'

//修改店铺信息
export const storeEdit = 'store/auth/edit'

//修改店铺的分佣比例
export const updatePerc = 'store/auth/updatePerc'

//修改店铺联系方式
export const contact = 'store/auth/contact'

//卖家订单列表
export const sellerList = 'order/auth/sellerList'

//删除下架商品
export const delOffShelf = 'product/auth/delOffShelf'

//商品下架
export const sellerOffShelf = 'product/auth/offShelf'

//店铺月销售列表
export const monthSale = 'store/auth/monthSale'

//店铺日销售列表
export const daySale = 'store/auth/daySale'

//去发货
export const delivery = 'order/auth/delivery'

//回复评论
export const reply = 'comment/auth/reply'

//退出登录
export const logout = 'account/auth/logout'

//微信Jssdk初始化
export const wxJsSdk = 'support/sign'

//绑定支付宝
export const bindingAlipay = 'auth/account/bindingAlipay'

//查询支付宝信息
export const queryAlipay = 'auth/account/queryAlipay'

//修改银行卡信息
export const bankUpdate = 'bank/auth/update'

//删除银行卡
export const unBinding = 'bank/auth/unBinding'
