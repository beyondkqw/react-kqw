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
export async function SMSCode(mobile){
    try{
        const res = await apiGet(URL.smsCode,{mobile});
        return res;
    }catch (err){
        console.warn('SMSCode',err);
        throw err
    }
}

//用户注册
export async function ToRegister(accName,pwd,smsNo,code,memberName=''){
    try{
        const res = await apiPost(URL.register,{accName,pwd,smsNo,code,memberName});
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
            const res = await apiGet(URL.homeMoudle, {});
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
            const res = await apiGet(URL.productList,{name,order,orderName,minPrice,maxPrice});
            return res;
        } catch (err) {
            console.warn(err);
            throw err
        }
    }


//新增地址
export async function AddAddress(name,mobile,address,detail){
    try{
        const res = await apiPost(URL.addAddress,{name,mobile,address,detail});
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

