/**
 * Created by asus on 2016/11/25.
 */

import * as URL from './url'

import {apiGet,apiPost,saveToken,getToken,clearToken} from './rpc';

const version = '1.0.0'
const client = 'wx'
const imei = ''

//获取短信验证码
export async function SMSCode(mobile){
    try{
        const res = await apiGet(URL.smsCode,{mobile});
        return res;
    }catch (err){
        console.warn(err);
    }
}

//用户注册
export async function Register(accName,pwd,smsNo,code,memberName){
    try{
        const res = await apiGet(URL.register,{accName,pwd,smsNo,code,memberName,imei,version,client});
        return res;
    }catch (err){
        console.warn(err);
    }
}
