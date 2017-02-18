/**
 * Created by asus on 2016/11/25.
 */

import * as URL from './url'

import {apiGet,apiPost,saveToken,getToken,clearToken} from './rpc';

export const version = '1.0.0'
export const client = 'wx'

//设置imei
const createUUID = function () {
    function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }

    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
};

let cookieImei = localStorage.getItem('imei');

if (!cookieImei) {
    var expiresDate = new Date();
    expiresDate.setTime(expiresDate.getTime() + (43200 * 60 * 1000));
    localStorage.setItem('imei', createUUID());
    cookieImei = localStorage.getItem('imei');
}

export const imei = cookieImei


/***********************************************/

//获取短信验证码
export async function SMSCode(mobile,role){
    try{
        const res = await apiGet(URL.smsCode,{mobile,role});
        return res;
    }catch (err){
        console.warn('SMSCode',err);
        throw err
    }
}

//获取忘记密码短信验证码
export async function ForgetCode(mobile){
    try{
        const res = await apiGet(URL.forgetsCode,{mobile});
        return res;
    }catch (err){
        console.warn('SMSCode',err);
        throw err
    }
}

//忘记密码
export async function UpdateLoginPwd(mobile,pwd,smsNo,code,role){
    try{
        const res = await apiPost(URL.updateLoginPwd,{mobile,pwd,smsNo,code,role});
        return res;
    }catch (err){
        console.warn('toRegister',err);
        throw err
    }
}

//用户注册
export async function ToRegister(accName,pwd,smsNo,code,recommendId,memberName=''){
    try{
        const res = await apiPost(URL.register,{accName,pwd,smsNo,code,recommendId,memberName});
        return res;
    }catch (err){
        console.warn('toRegister',err);
        throw err
    }
}

//首页banner
export async function HomeBanner(type,page,count){
    try{
        const res = await apiGet(URL.homeBanner,{type,page,count});
        return res;
    }catch (err){
        console.warn('HomeBanner',err);
        throw err
    }
}

//首页模块 （例如一元夺宝）
export async function HomeMoudle() {
        try {
            const res = await apiGet(URL.homeMoudle);
            return res;
        } catch (err) {
            console.warn('homeMoudle', err);
            throw err
        }
    }

//用户登录
export async function ToLogin(accName,pwd) {
    try {
        const res = await apiGet(URL.login, {accName, pwd});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//商品详情
export async function Details(productId) {
        try {
            const res = await apiGet(URL.detail, {productId});
            return res;
        } catch (err) {
            console.warn(err);
            throw err
        }
}

//收藏/取消收藏
export async function Follow(productId,status) {
    try {
        const res = await apiGet(URL.follow,{productId,status});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//我的收藏列表
export async function FollowList() {
    try {
        const res = await apiGet(URL.followList);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//商品列表
export async function ProductList(name,order,orderName,minPrice,maxPrice) {
    try {
        const res = await apiPost(URL.productList,{name,order,orderName,minPrice,maxPrice});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//新增地址
export async function AddAddress(name,mobile,address,detail,province,city,area){
    try{
        const res = await apiPost(URL.addAddress,{name,mobile,address,detail,province,city,area});
        return res;
    }catch (err){
        console.warn('AddAddress',err);
        throw err
    }
}

//编辑地址
export async function EditAddress(name,mobile,address,detail,addressId){
    try{
        const res = await apiPost(URL.editAddress,{name,mobile,address,detail,addressId});
        return res;
    }catch (err){
        console.warn('EditAddress',err);
        throw err
    }
}

//地址列表
export async function AddressList(){
    try{
        const res = await apiGet(URL.addressList);
        return res;
    }catch (err){
        console.warn('AddressList',err);
        throw err
    }
}

//设置默认地址
export async function DefaultAddress(addressId){
    try{
        const res = await apiGet(URL.defaultAddress,{addressId});
        return res;
    }catch (err){
        console.warn('DefaultAddress',err);
        throw err
    }
}

//商品属性
export async function ProductAttribute(productId){
    try{
        const res = await apiGet(URL.productAttribute,{productId});
        return res;
    }catch (err){
        console.warn('ProductAttribute',err);
        throw err
    }
}

//订单列表
export async function GetOrderList(status,isComment,type=0,page){
    try{
        const res = await apiGet(URL.orderList,{status,isComment,type,page});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//订单详情
export async function OrderDetail(orderNo){
    try{
        const res = await apiGet(URL.orderDetail,{orderNo});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//加入购物车
export async function AddShopCar(productId,attrIds,count) {
    try {
        const res = await apiGet(URL.addShopCar, {productId, attrIds, count});
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//商品类型
export async function CategoryList(parentId,type,storeId){
    try{
        const res = await apiGet(URL.categoryList,{parentId,type,storeId});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//确认收货
export async function ConfirmReceived(orderNo){
    try{
        const res = await apiGet(URL.confirmReceive,{orderNo});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//购物车列表
export async function ShopCarList(page){
    try{
        const res = await apiGet(URL.shopCarList,{page});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}


//取消订单
export async function CancelReceived(orderNo){
    try{
        const res = await apiGet(URL.cancelReceive,{orderNo});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//更新购物车数量
export async function EditShopNum(carId,count){
    try{
        const res = await apiGet(URL.editShopNum,{carId,count});

        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//删除购物车
export async function DelShopCar(carIds){
    try{
        const res = await apiGet(URL.delShopCar,{carIds});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//购物车结算
export async function SettlementShopCar(carIds){
    try{
        const res = await apiGet(URL.settlementShopCar,{carIds});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//立即购买
export async function OrderShopping(productId,attrIds,num){
    try{
        const res = await apiGet(URL.orderShopping,{productId,attrIds,num});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//根据订单号查询订单
export async function ListByOrderNo(orderNos){
    try{
        const res = await apiGet(URL.listByOrderNo,{orderNos});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//vip等级列表
export async function VipList(){
    try{
        const res = await apiGet(URL.vipList);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//查看个人资料
export async function MyInfo(){
    try{
        const res = await apiGet(URL.myInfo);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//绑定手机号
export async function ToBindPhone(accName,pwd,smsNo,code){
    try{
        const res = await apiGet(URL.bindPhone,{accName,pwd,smsNo,code});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//发送绑定手机号验证码
export async function BindSms(accName){
    try{
        const res = await apiGet(URL.bindSms,{accName});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//我的合伙人
export async function MyPartner(){
    try{
        const res = await apiGet(URL.myPartner);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//成员列表
export async function TeamMembers(){
    try{
        const res = await apiGet(URL.membersInfo);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//全国排名
export async function CountryRankList(memberName){
    try{
        const res = await apiPost(URL.countryRank,{memberName});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//成员(俱乐部)信息
export async function MemberInfo(){
    try{
        const res = await apiGet(URL.memberInfo);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//查看用户资料:性别:0男1女
export async function UserInfo(accId){
    try{
        const res = await apiGet(URL.userInfo,{accId});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//根据订单详情ID， 查询订单详情
export async function _OrderDetail(orderDetailId){
    try{
        const res = await apiGet(URL._orderDetail,{orderDetailId});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//赠送佣金
export async function GiveAmount(accId,amount){
    try{
        const res = await apiGet(URL.giveAmount,{accId,amount});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//我的佣金记录
export async function GiveAwayRecord(tranType){
    try{
        const res = await apiGet(URL.giveAwayRecord,{tranType});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//商品评价
export async function Remark(orderNo,productId,comment,images){
    try{
        const res = await apiPost(URL.remark,{orderNo,productId,comment,images});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//商品评价列表
export async function RemarkList(productId,page,orderNo){
    try{
        const res = await apiGet(URL.remarkList,{productId,page,orderNo});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//修改个人资料
export async function UpdateInfo(memberName,realName,imageUri,area,address,sex){
    try{
        const res = await apiPost(URL.updateInfo,{memberName,realName,imageUri,area,address,sex});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//可用积分查询
export async function Points(){
    try{
        const res = await apiGet(URL.points);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//删除订单
export async function OrderDel(orderNo){
    try{
        const res = await apiGet(URL.orderDel,{orderNo});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//银行卡列表
export async function BankList(){
    try{
        const res = await apiGet(URL.bankList);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//绑定银行卡
export async function BandBank(bankName,name,bankCardNo,pro,city,area,branch,mobile){
    try{
        const res = await apiGet(URL.bindBank,{bankName,name,bankCardNo,pro,city,area,branch,mobile});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//退款原因列表
export async function NoticeList(type,count,page){
    try{
        const res = await apiGet(URL.noticeList,{type,count,page});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//申请退款
export async function Refund(orderDetailId,applyAmount,reason,type,recStatus,desc){
    try{
        const res = await apiPost(URL.refund,{orderDetailId,applyAmount,reason,type,recStatus,desc});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//商品浏览记录
export async function BrowseHistory(){
    try{
        const res = await apiGet(URL.browseRecord);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//消费金额
export async function LvmemberInfo(accId){
    try{
        const res = await apiGet(URL.lvmemberInfo,{accId});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//首页导航栏
export async function TagList(type){
    try{
        const res = await apiGet(URL.tagList,{type});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//清空浏览记录
export async function DelBrowseRecord(browseRecordId){
    try{
        const res = await apiGet(URL.delBrowseRecord,{browseRecordId});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//店铺详情
export async function StoreDetailItem(storeId){
    try{
        const res = await apiGet(URL.storeDetails,{storeId});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//店铺商品列表
export async function StorectList(name='',storeId='',order='',orderName='') {
    try {
        const res = await apiGet(URL.productList,{name,storeId,order,orderName});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//重置密码验证码
export async function ResetPwd(mobile,role) {
    try {
        const res = await apiGet(URL.resetPwd,{mobile,role});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//修改密码
export async function ResetLoginPwd(pwd,smsNo,code) {
    try {
        const res = await apiGet(URL.resetLoginPwd,{pwd,smsNo,code});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//删除地址
export async function DelAddress(addressId) {
    try {
        const res = await apiGet(URL.delAddress,{addressId});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//支付
export async function Process(type,channel,successCallbackPara) {
    try {
        const res = await apiGet(URL.payment,{type,channel,successCallbackPara});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//确认提现
export async function Cash(bankcardId,amount) {
    try {
        const res = await apiGet(URL.cash,{bankcardId,amount});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//直推人列表
export async function EecommendList() {
    try {
        const res = await apiGet(URL.recommendList);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//聚朵股权
export async function EquityList() {
    try {
        const res = await apiGet(URL.equityList);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//云综合体--店铺类型
export async function StoreType() {
    try {
        const res = await apiGet(URL.storeType);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//云综合体--店铺列表
export async function StoreList(type,name) {
    try {
        const res = await apiGet(URL.storeList,{type,name});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//云卡通订单生成
export async function Generate(address,province,city,area,amount,chargeType){
    try{
        const res = await apiPost(URL.generate,{address,province,city,area,amount,chargeType});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//云卡通充值金额列表
export async function RechargeAmount(){
    try{
        const res = await apiGet(URL.rechargeAmount);
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}
/*-----------卖家版-------------*/
//注册
export async function SellerToRegister(accName,pwd,smsNo,code,memberName,role){
    try{
        const res = await apiPost(URL.sellerAdd,{accName,pwd,smsNo,code,memberName,role});
        return res;
    }catch (err){
        console.warn('toRegister',err);
        throw err
    }
}

//登录
export async function SellerToLogin(accName,pwd) {
    try {
        const res = await apiGet(URL.sellerLogin, {accName, pwd});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//录入店铺信息
export async function EnterStoreInformation(name='',img='',address='',province='',city='',area='',license='',cardFace='',cardBack='',gpsAddress='',latitude='',longitude='',type='') {
    try {
        const res = await apiPost(URL.storeAdd,{name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress,latitude,longitude,type});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//店铺详情
export async function StoreDetail(storeId) {
    try {
        const res = await apiGet(URL.storeDetail,{storeId});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//修改店铺信息
export async function StoreEdit(name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress,latitude,longitude,type) {
    try {
        const res = await apiPost(URL.storeEdit,{name,img,address,province,city,area,license,cardFace,cardBack,gpsAddress,latitude,longitude,type});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//修改店铺的分佣比例
export async function UpdatePerc(perc){
    try {
        const res = await apiGet(URL.updatePerc,{perc});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//修改店铺的联系方式
export async function StoreContact(qq,wechat,mobile){
    try {
        const res = await apiGet(URL.contact,{qq,wechat,mobile});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//订单列表
export async function GetSellerOrderList(status,page=1){
    try{
        const res = await apiGet(URL.sellerList,{status,page});
        return res;
    }catch (err){
        console.warn(err);
        throw err
    }
}

//商品列表
export async function SellerProductList(storeId,status) {
    try {
        const res = await apiGet(URL.productList,{storeId,status});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//删除下架商品
export async function SellerDelOffShelf(productIds) {
    try {
        const res = await apiGet(URL.delOffShelf,{productIds});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//商品下架
export async function SellerOffShelf(productIds) {
    try {
        const res = await apiGet(URL.sellerOffShelf,{productIds});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//店铺月销售列表
export async function MonthSale() {
    try {
        const res = await apiGet(URL.monthSale);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//店铺日销售列表
export async function DaySale(month) {
    try {
        const res = await apiGet(URL.daySale,{month});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//去发货
export async function Delivery(deliveryName,deliveryNo,orderNo) {
    try {
        const res = await apiPost(URL.delivery,{deliveryName,deliveryNo,orderNo});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//回复评论
export async function Reply(comment,parentId) {
    try {
        const res = await apiPost(URL.reply,{comment,parentId});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//退出登录
export async function Logout() {
    try {
        const res = await apiGet(URL.logout);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//支付
export async function InitWxJsSDk(url) {
    try {
        const res = await apiGet(URL.wxJsSdk,{url});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//绑定银行卡
export async function BindingAlipay(name,accNumber) {
    try {
        const res = await apiGet(URL.bindingAlipay,{name,accNumber});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//绑定银行卡
export async function QueryAlipay() {
    try {
        const res = await apiGet(URL.queryAlipay);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//编辑银行卡信息
export async function BankUpdate(bankId,bankName,name,bankCardNo,pro,city,area,branch,mobile) {
    try {
        const res = await apiGet(URL.bankUpdate,{bankId,bankName,name,bankCardNo,pro,city,area,branch,mobile});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//删除银行卡
export async function UnBinding(bankId) {
    try {
        const res = await apiGet(URL.unBinding,{bankId});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//我的店铺详情
export async function MyStore() {
    try {
        const res = await apiGet(URL.myStore);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

//提现
export async function CashRecord() {
    try {
        const res = await apiGet(URL.cashRecord);
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}
