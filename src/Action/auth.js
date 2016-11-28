/**
 * Created by asus on 2016/11/25.
 */

import * as URL from './url'

import {apiGet,apiPost,saveToken,getToken,clearToken} from './rpc';

const version = '1.0.0'
const client = 'wx'


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

const imei = cookieImei


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
export async function toRegister(accName,pwd,smsNo,code,memberName=''){
    try{
        const res = await apiPost(URL.register,{accName,pwd,smsNo,code,memberName,imei,version,client});
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
export async function HomeMoudle(){
    try{
        const res = await apiGet(URL.homeMoudle,{});
        return res;
    }catch (err){
    console.warn('homeMoudle',err);
    throw err
}
//用户登录
export async function ToLogin(accName,pwd,imei,version,client){
    try{
        const res = await apiGet(URL.login,{accName,pwd,imei,version,client});
        return res;
    }catch (err){
        console.warn(err);
    }
}
