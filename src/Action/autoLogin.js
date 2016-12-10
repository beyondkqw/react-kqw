import {saveToken,getToken,clearToken,loadToken,ROOT_URL} from './rpc';
import {imei} from './auth'

//自动授权登录
export function WechatAuth() {

    const newPath = ROOT_URL + "/wechat/wxCode";
    const nowPath = window.location.href.split('?')[0];
    location.href = newPath + "?callBackUrl=" + nowPath + "&imei=" + imei;
}