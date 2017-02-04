import {wsPath,loadToken} from './rpc'
import {imei} from './auth';
import WebSocket from 'reconnecting-websocket';
import RPC from '../Action/rpc'
import Subscribe from '../Component/NewComponent/Subscribe'
var websocket_socket;
var timer;
var socket_state = {
    'open':1,
    'closed':3
};

const defaultOptions = {
    maxReconnectionDelay: 10000,
    minReconnectionDelay: 1500,
    reconnectionDelayGrowFactor: 1.3,
    connectionTimeout: 4000,
    maxRetries: Infinity,
    debug: false
};

export  async  function initWebsocket(){
    const token = await loadToken();
    console.log('websocket  token--------========>',token)
    if(!websocket_socket) {
        if (token) {
            websocket_socket = new WebSocket(wsPath + "?"+"token="+token+ "&imei="+imei
                ,[],defaultOptions);

            websocket_socket.onopen = function (e) {
                console.log("onopen",e);
                startHeartbeatTimer();
            };

            websocket_socket.onmessage = function (e) {
               console.log("onmessage",e);
                console.log("data====", e.data);
                var result = JSON.parse(e.data);
               /* alert(e.data);
                 alert(result);*/
                console.log("result=====>",result)
                if (result.cd) {
                    checkResult(result);
                }/*else if(result.code && result.code == 777){
                    clearWebSocket();
                    localStorage.clear();
                    setForbidden();
                    alert("您的账号已在其他设备登录,请重新登录");
                    againSendLogin();
                }*/
            };

            websocket_socket.onerror = function (e) {
                console.log("onerror",e);
                clearWebSocket();
            };

            websocket_socket.onclose = function (e) {
                clearWebSocket();
                console.log("onclose",e);
            }

        }
    }

}
initWebsocket();

//服务器消息分发器

/*function notifyHandler(result){
    //alert('notifyHandler:'+JSON.stringify(result));
    switch(result.command){
        case '02'://文本支付
            textHandler(result.object);
            break;
        case '03'://语音支付
            playAudio(result.object);
            break;
        case '04'://发问语音支付
            textHandler(result.object);
            break;
        case '05'://发问文本支付
            textHandler(result.object);
            break;
    }
}*/

function checkResult(result){
    //alert("checkResult:"+result.code);
    if (result.code == "1") {
        /*$("#failSuccModal").modal("show");
        return false;*/
    }
    else{
        RPC.emit('modal')
        /*$("#delayModal").modal("hide");
        $("#paySuccModal").modal("show");
        localStorage.setItem("onmessageResult",JSON.stringify(result));
        return true;*/
    }
}

//处理文本支付
/*function textHandler(data){
    localStorage.setItem("questionId",data.questionId);
    linkJump();
}

function linkJump(){
    window.location.href = "../shouye/xiangqing.html";
}

function playAudio(data){
    $("div[tip="+data.questionId+"]").click();
}

function ensureClick(){
    var result = JSON.parse(localStorage.getItem("onmessageResult"));
    //alert('ensureClick:'+result);
    $("#paySuccModal").modal("hide");
    $("#delayModal").modal("hide");
    notifyHandler(result);
}*/

function startHeartbeatTimer(){
    timer = window.setInterval(heartbeatExcutor,5000);
}

function heartbeatExcutor(){
    console.log('i`m timer excutor',new Date().getTime());
    if (isAlive()) {
        var command = buildHeartbeatCommand();
        websocket_socket.send(JSON.stringify(command));
    }
    //   else{
    //     clearWebSocket();
    //     initWebsocket();
    //   }
}

function clearWebSocket(){
    clearTimer();
    closeWs();
    websocket_socket = null;
}

function closeWs(){
    if (isAlive()) {
        websocket_socket.close();
    }
}

function isAlive(){
    return (websocket_socket && websocket_socket.readyState == socket_state.open);
}

function clearTimer(){
    window.clearInterval(timer);
}

function buildHeartbeatCommand(){
    return {'cd':'01','imei':imei};
}
