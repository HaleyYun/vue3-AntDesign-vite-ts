import { pareState } from "@/types/subscribeList"
// import { message } from 'ant-design-vue';
/**
 *  语音方面公共方法
 *  
 * initVoice 初始化方法内部 返回文字匹配监听回调，语音播放结束监听回调
 *  
 * sendFontToApp 发送本地文字到TTS读取 
 * 
 * startListenVoice 开始监听语音
 */

const connectWebViewJavascriptBridge = (callback:any) => { // 初始化内容
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
    } else {
        try {
            document.addEventListener(
                'WebViewJavascriptBridgeReady'
                , function () {
                    callback(window.WebViewJavascriptBridge)
                },
                false
            );
        } catch {
            console.log('333')
        }

    }
}
export const initVoice = (fontRightCb:any, voiceEndCb:any) => { // 初始化语音，返回文字匹配监听，语音播放结束监听
    connectWebViewJavascriptBridge(function (bridge:any) {
        bridge.init(function (message:any, responseCallback:any) {
            console.log(message);
            let data = {
                'Javascript Responds': 'Wee!'
            };
            responseCallback(data);
        });
        bridge.registerHandler("voiceInJs", function (data:any, responseCallback:any) {
            let responseData = fontRightCb(data); // 即使匹配语音文字后的回调
            responseCallback(responseData);
        });

        //TTS语音播放完毕回调函数
        bridge.registerHandler("ttsCompleted", function (data:any, responseCallback:any) {
            //语音播放完毕后，停止语音动画图标
            // if (countNum = 1;
            console.log(data);
            voiceEndCb()
            let responseData = voiceEndCb(); // 监听结束回调事件
            responseCallback(responseData);
        });
    })
}

export const completedVoice = (cb:any) => {
    try {
        window.WebViewJavascriptBridge.callHandler(
            'ttsCompleted'
            , function () {
                cb()
            }
        );
    } catch {
        console.log()
    }
}

export const initVoiceOne = (fontRightCb:any, voiceEndCb:any) => {
    // 初始化语音，返回文字匹配监听，语音播放结束监听
    connectWebViewJavascriptBridge(function (bridge:any) {
        bridge.init(function (message:any, responseCallback:any) {
            console.log(message);
            let data = {
                "Javascript Responds": "Wee!",
            };
            responseCallback(data);
        });
        bridge.registerHandler("voiceInJsOne", function (data:any, responseCallback:any) {
            let responseData = fontRightCb(data); // 即使匹配语音文字后的回调
            fontRightCb(data)
            responseCallback(responseData);
        });

        //TTS语音播放完毕回调函数
        bridge.registerHandler("ttsCompletedOne", function (data:any, responseCallback:any) {
            console.log(data);
            //语音播放完毕后，停止语音动画图标
            // if (countNum = 1;
            voiceEndCb();
            let responseData = voiceEndCb(); // 监听结束回调事件
            responseCallback(responseData);
        });
    });
};

export const sendFontToApp = (val:string) => { // 发送本地文字到TTS语音播报
    try {
        window.WebViewJavascriptBridge.callHandler(
            'tts'
            , { 'content': val }
            , function () {
                // document.getElementById("result").innerHTML = "endVideo, data = " + responseData
            }
        );
    } catch {
        console.log()
    }
}
// 关闭发送本地文字到TTS语音播报
export const stopVoice = (val:any) => { 
    try {
        window.WebViewJavascriptBridge.callHandler(
            'ttsStop'
            , { 'content': val }
            , function () {
                
                // document.getElementById("result").innerHTML = "endVideo, data = " + responseData
            }
        );
    } catch {
        console.log()
    }
}
// 开启监听语音
export const startListenVoice = (cb:any) => { 
    try {
        cb()
        window.WebViewJavascriptBridge.callHandler(
            'listenIat'
            , {}
            , function () {
                //开始监听语音，播放监听语音动画图标
            }
        );
    } catch {
        console.log()
    }
}
// 开始录像
export const startVideo = (para: pareState, cb: any) => {
    /**
     * 传入 para = { 'id' : id, 'project_code' : code zskj-object/depressed}
     */
    window.WebViewJavascriptBridge.callHandler(
        'startVideo'
        , para
        ,function (responseData: any){
            cb(responseData);
            (document.getElementById("result") as HTMLElement).innerHTML = "startVideo, data = " + responseData
        }
    );
}
// 结束录像
export const endVideo = (para: pareState, cb:any) => {
    window.WebViewJavascriptBridge.callHandler(
        "endVideo",
        para,
        function (responseData:any) {
            // alert(responseData)
            cb(responseData)
            (document.getElementById("result") as HTMLElement).innerHTML =
                "endVideo, data = " + responseData;
        }
    );
};
// 触发监听上传
export const reupload = (id:any) => {
    window.WebViewJavascriptBridge.callHandler(
        "reupload",
        { id: id },
        function (responseData:any) {
            // cb(responseData)
            (document.getElementById("result") as HTMLElement).innerHTML =  "endVideo, data = " + responseData;
        }
    );
}; 
export const visibleVideo = (bool:string) => {// 唤起人脸  触发监听上传 
    window.WebViewJavascriptBridge.callHandler(
        "visibleVideo",
        bool,
        function (responseData:any) {
            (document.getElementById("result") as HTMLElement).innerHTML = "endVideo, data = " + responseData;
        }
    );
};

export const showSetting = (bool:any) => { // 触发监听上传
    window.WebViewJavascriptBridge.callHandler(
        "showSetting",
        bool,
        function (responseData:any) {
            console.log(responseData);
            // cb(responseData)
            // document.getElementById("result").innerHTML = "endVideo, data = " + responseData;
        }
    );
};

export const talkPhoto = (bool:any, cb:any) => { // 触发监听拍照
    // alert('打开摄像头')
    window.WebViewJavascriptBridge.callHandler(
        "talkPhoto",
        bool,
        function (responseData:any) {
            // alert(JSON.stringify(responseData))
            cb(responseData)
            // document.getElementById("result").innerHTML = "endVideo, data = " + responseData;
        }
    );
};

export const startRecordAudio = (bool:any, cb:any) => { // 触发监听开始录音
    // alert('开始录音')
    window.WebViewJavascriptBridge.callHandler(
        "startRecordAudio",
        bool,
        function (responseData:any) {
            // alert(JSON.stringify(responseData)+'开始录音')
            cb(responseData)
            // document.getElementById("result").innerHTML = "endVideo, data = " + responseData;
        }
    );
};

export const endRecordAudio = (bool:any, cb:any) => { // 触发监听结束录音
    // alert('结束录音')
    window.WebViewJavascriptBridge.callHandler(
        "endRecordAudio",
        bool,
        function (responseData:any) {
            // alert(JSON.stringify(responseData) +'结束录音')
            cb(responseData)
            // document.getElementById("result").innerHTML = "endVideo, data = " + responseData;
        }
    );
};

export const clearCacheFun = () => { // 清理缓存
    window.WebViewJavascriptBridge.callHandler(
        "clearCache",
        {},
        function (responseData:any) {
            console.log(responseData);
            // document.getElementById("result").innerHTML = "endVideo, data = " + responseData;
        }
    );
};

//聚焦并拉起键盘
export const requestFocus = () => {
    window.WebViewJavascriptBridge.callHandler(
        'requestFocus',
        {},
        function (responseData: any){
            console.log(responseData);
        }
    );
}

//安卓里输入日志
export const showLog = (logmsg:any) => {
    window.WebViewJavascriptBridge.callHandler(
        'ShowLog',
        logmsg,
        function (responseData: any){
            console.log(responseData);
        }
    );
}


//获取安卓设备信息
export const getPhoneInfo = (cb:any) => {
    
    window.WebViewJavascriptBridge.callHandler(
        'getPhoneInfo',
        {},
        function (responseData: any){
            cb(responseData);
        }
    );
}







