/**
 * Created by hsy on 2017/01/19.
 */

import wx from 'weixin-js-sdk';
import * as URL from './url'
import {apiGet,apiPost} from './rpc';

//初始化微信Jssdk
function initWx(){
    InitWxJsSDk(encodeURIComponent(location.href.split('#')[0]))
        .then(res=>{
            console.log("initWx =====>",res);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature,// 必填，签名，见附录1
                jsApiList: ["openLocation","getLocation","chooseWXPay","onMenuShareTimeline","onMenuShareAppMessage",
                    "startRecord","stopRecord","uploadVoice","downloadVoice","playVoice","onVoicePlayEnd","pauseVoice","chooseWXPay"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
        .catch(err=>{
            console.warn('getHomeMoudle',err)
        });
}

//微信分享
export async function initWxShare(title, link, imgUrl, desc, type, dataUrl, bizCode, bizType) {
    await initWx();
    wx.ready(()=> {
        //分享到朋友圈
        wx.onMenuShareTimeline({
            title: title, // 分享标题
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: ()=>{alert('分享到朋友圈成功')},
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });


        //分享给朋友
        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            type: type, // 分享类型,music、video或link，不填默认为link
            dataUrl: dataUrl, // 如果type是music或video，则要提供数据链接，默认为空
            success: ()=> {
                // 用户确认分享后执行的回调函数
                alert("分享到朋友成功");
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
            }
        });
    });
}

async function InitWxJsSDk(url) {
    try {
        const res = await apiGet(URL.wxJsSdk,{url});
        return res;
    } catch (err) {
        console.warn(err);
        throw err
    }
}

 export async function getLocation(){
    await initWx();
    console.log("gcj02 wxsdk =====>",wx);
     wx.ready(()=> {
         console.log("gcj02 ready =====>");
         wx.getLocation({
             type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
             success:(res)=>{
                 console.log("gcj02 res ===============>",res);
                 const latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                 const longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                 const speed = res.speed; // 速度，以米/每秒计
                 const accuracy = res.accuracy; // 位置精度
             }
         });
     });
}
