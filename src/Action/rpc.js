/**
 * Created by asus on 2016/11/25.
 */


const KEY_TOKEN = 'accessToken';
const KEY_USERINFO = 'accessUserInfo';

import URI from 'urijs';


let token = '';
let userInfo = {};
import {imei,version,client} from './auth'

const ROOT_URL = 'http://jdy.tunnel.qydev.com/api/';
//const ROOT_URL = 'http://jdy.viphk.ngrok.org/api/';


export function getUserInfo(){
    console.log('getUserInfo===>',userInfo);
    return userInfo;
};
export function saveUserInfo(_userInfo) {
    console.log('saveUserInfo====>',_userInfo);
    userInfo = _userInfo;
}

export async function clearUserInfo() {
    await localStorage.removeItem(KEY_USERINFO);
    userInfo = null;
}



export function saveToken(_token) {
    console.log('saveToken====>',_token);
    token = _token;
    return localStorage.setItem(KEY_TOKEN, token);
}

export async function loadToken() {
    token = await localStorage.getItem(KEY_TOKEN);
    return token;
}

export async function clearToken() {
    await localStorage.removeItem(KEY_TOKEN);
    token = null;
}

export function getToken() {
    console.log('getToken====>',token);
    return token;
}

async function request (urlKey,method,params = {},token = ''){
    //console.log('params',params);
    let url = urlKey;

    if(!url){
        return null;
    }
    //拼接地址
    url = ROOT_URL + url;
    //请求参数

    let headers = {}
    if(method==='POST'){
        headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    }else{
        headers = null
    }

    let options = {
        method: method,

        headers,
        //headers: {
        //    //'Accept' :'application/json',
        //    //'Content-Type': method === 'GET' ? null:'application/x-www-form-urlencoded',
        //    //'Access-Control-Allow-Origin':'*',
        //    //'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE',
        //    //'Access-Control-Max-Age':'3600',
        //    //'Access-Control-Allow-Headers':'x-requested-with'
        //}
    };
    console.log('获取到的token---',getToken());
    if(await loadToken()){
        params.token = getToken();
    }
    if (imei)
    {
        params.imei =imei;
    }
    if (client)
    {
        params.client =client;
    }
    if (version)
    {
        params.version =version;
    }

    //console.log('获取到的token后',params);
    //GET请求
    if (method === 'GET') {
        url = URI(url).query(params).toString();

        console.log('params',params)
        console.warn(`GET ${url}`);
    }
    //POST / PUT请求
    else if (method === 'POST' || method === 'PUT') {
        let bodyString = "";
        for(let param in params){
            bodyString += (param+ '=' + encodeURIComponent(params[param])+ '&');
        }

        options = {...options,body:bodyString.substring(0,bodyString.length-1)};
        //打印请求内容
        console.warn(`POST ${url}: ${bodyString}`);
    }


    try {
        let response = await fetch(url,options);
        if(response.ok){
            console.log('收到了消息');
            // 转换为文本
            let json = await response.text();
            //打印返回值
            console.warn(`RESP ${json}`);
            let jsonObj = JSON.parse(json);
            //操作成功
            if(jsonObj.code == 0){
                return jsonObj.obj;
            }
            //操作失败
            else if(jsonObj.code ==1){
                if(jsonObj.message){
                    //Toast.show(jsonObj.message, {
                    //    duration: Toast.durations.LONG,
                    //    shadow: true,
                    //    animation: true,
                    //});
                    throw new Error(jsonObj.message);
                }
                else{
                    //Toast.show('网络不给力,请稍后再试', {
                    //    duration: Toast.durations.LONG,
                    //    shadow: true,
                    //    animation: true,
                    //});
                    throw new Error('未知错误');
                }
            }
            else if (jsonObj.code == 999) {
                //console.warn('code=999');
                //Toast.show('请先登录', {
                //    duration: Toast.durations.LONG,
                //    shadow: true,
                //    animation: true,
                //});
                wechatAuth();
                throw new Error('请先登录');
            }
            else{
                return jsonObj;
            }
        }

        console.warn('[Request error]: URLKey: ' + urlKey, 'HTTP status: ' + response.status);
        return 'err';
    }catch(error){
        throw error;
    }

}

export async function apiGet(urlKey,params = {}){
    return await request(urlKey,'GET',params,'');
}
export async function apiPost(urlKey,params = {}){
    return await request(urlKey,'POST',params,'');
}

//自动授权登录
export function wechatAuth() {
    token = localStorage.getItem("tokenNum");
    var newPath = ROOT_URL + "/wechat/baseCode";
    var nowPath = window.location.href.split('?')[0];
    location.href = newPath + "?callBackUrl=" + nowPath + "&token="+token +"&imei=" + imei;
}

// 验证手机号是否正确
export function ErrorNum(value) {
    if (!(/^((13[0-9])|(15[^4,\D])|(18[0-1,3-9]))\d{8}$/.test(value))) {
        return false;
    } else {
        return true;
    }
}
//校验密码
export function ErrorPs(value) {
    if (!(/(?!^[0-9]+$)(?!^[A-Z]+$)(?!^[a-z]+$)(?!^[^A-z0-9]+$)^.{6,16}/.test(value))) {
        return false;
    } else {
        return true;
    }
}
// 获取地址栏请求参数
export function GetQueryString(name) {
    let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    console.log('reg==============>',reg);
    let r = window.location.search.substr(1).match(reg);
    console.log('r==============>',r);
    if(r!=null)return  unescape(r[2]); return null;
}
