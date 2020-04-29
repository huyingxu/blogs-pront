/**
 * @email xiaohuzi@slera.cn
 * @author: Mr.hu
 * @date: 2020-04-19
 * @time: 17:45
 */
// 使用js引入必要样式
document.write('<link href="/css/modal/modal.css"  rel="stylesheet">');

var home = window.location.origin;

// 关闭弹框函数
function closeModal() {
    document.getElementById("outer").style.display="none";
}
// 返回上一步
function upStep() {
    window.history.back(-1);
}
// 首页
function home() {
    window.location.href = home;
}
// 判断值包含数字
function isIntNum(val){
    var regNeg = /^[1-9][0-9]*$/;
    if(regNeg.test(val)){
        return true;
    }else{
        return false;
    }
}

//通用存入Cookie
function addCookie(objName, objValue, objHours) {
    var str = objName + "=" + escape(objValue); //编码
    if (objHours > 0) {//为0时不设定过期时间，浏览器关闭时cookie自动消失
        var date = new Date();
        var ms = objHours * 3600 * 1000;
        date.setTime(date.getTime() + ms);
        str += "; expires=" + date.toGMTString();
    }
    document.cookie = str;
}

//写入身份令牌
function addAuthory(objValue) {
    var str = "Authorization=" + escape(objValue.data.token); //编码
    var date = new Date();
    var ms = 12 * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();
    document.cookie = str;
    return objValue;
}

//修改cookie的值
function editCookie(name,value,expiresHours){
    var cookieString=name+"="+escape(value);
    if(expiresHours>0){
        var date=new Date();
        date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
        cookieString=cookieString+";expires=" + date.toGMTString();
    }
    document.cookie=cookieString;
}

//根据名字获取cookie的值
function getCookieValue(name){
    var strCookie=document.cookie;
    var arrCookie=strCookie.split("; ");
    for(var i=0;i<arrCookie.length;i++){
        var arr=arrCookie[i].split("=");
        if(arr[i]==name){
            return unescape(arr[1]);
            break;
        }else{
            return "";
        }
    }

}

function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return decodeURI(r[2]);
    return null;
}

// 通用弹框
function openModal(title,content){
    // 创建模态框的元素
    var creatediv = document.createElement('div'); // 创建div
    creatediv.setAttribute('id','outer'); // 添加ID
    var contentHtml =  '<div id="model" style="border-radius: 8px;">' +
        '<div class="modal"><div style="float: right">' +'<a style="padding: 10px;color:red;" href="javascript:closeModal();">x</a>'+
        '<div class="fa-hover col-md-3 col-sm-4 close" style=""></div></div>' +
        '<div class="modalTitle"><span style="margin-left: 30px;">'+title+'</span></div>' +
        '<div style="clear:both;"></div><hr></div>' +
        '<div>'+content+'</div>' +
        '<div style="padding: 40px;">' +
        '<button type="button" id="home" onclick="home()" style="">首页</button>' +
        '<button type="button" id="back" onclick="upStep()" style="">返回上一级</button></div></div>'
    creatediv.innerHTML = contentHtml;
    document.body.appendChild(creatediv); // 将创建的div 加入 body
}

// 获取数据异常弹框
function errorModal(title,code,message){// 标题,错误代码,错误信息
    // 创建模态框的元素
    var creatediv = document.createElement('div'); // 创建div
    creatediv.setAttribute('id','outer'); // 添加ID
    var contentHtml =  '<div id="model" style="border-radius: 8px;">' +
        '<div class="modal"><div style="float: right">' +
        '<div class="fa-hover col-md-3 col-sm-4 close" style=""></div></div>' +
        '<div class="modalTitle"><span>'+title+'</span></div>' +
        '<div style="clear:both;"></div><hr></div>' +
        '<div>错误代码:'+code+'</br>错误原因:'+message+'</div>' +
        '<div style="padding: 40px;"><button type="button" id="back" onclick="upStep()" style="">返回上一级</button></div></div>'
    creatediv.innerHTML = contentHtml;
    document.body.appendChild(creatediv); // 将创建的div 加入 body

}

// 关闭弹框
function closeModal() {
    document.getElementById('outer').remove();
}

// 弱提示
function tips(title,content){
    // 创建模态框的元素
    var creatediv = document.createElement('div'); // 创建div
    creatediv.setAttribute('id','tips'); // 添加ID
    var contentHtml =  '<div id="tipsModel" style="border-radius: 8px;">' +
        '<div class="modal"><div style="float: right">' +
        '<div class="fa-hover col-md-3 col-sm-4 close" style=""></div></div>' +
        '<div class="modalTitle"><span>'+title+'</span></div>' +
        '<div style="clear:both;"></div><hr></div>' +
        '<div style="font-size: 15px;">'+content+'</div></div>'
    creatediv.innerHTML = contentHtml;
    document.body.appendChild(creatediv); // 将创建的div 加入 body
    // 关闭提示
    cancelTips(1);
}
/*
 * 弱提示关闭 默认2s
 */
function cancelTips(time) {
        if(!time) {
            var time = 2; // 关闭时间默认在2s
        }
        setTimeout(function(){
            document.getElementById('tips').style.display = 'none';
        },time*1000)
}

var debug= GetQueryString("debug")

// 是否开启debug模式
if(debug){
    // addCookie("debug","true",2);
    localStorage.setItem("debug",true);
}
// else if(isIntNum(debug)){
//     addCookie("debug","true",debug);
// }
// 从cookie中获取debug有效性
// var cookieDebug = getCookieValue("debug");//获取cookie值
// if(cookieDebug){
//     debug = cookieDebug;
// }
// 从localStorage获取debug有效性
var local= localStorage.getItem("debug");
if(local){
    debug = local;
}

if(!debug){
    // 禁用右键
    document.onkeydown=function(){
        var e = window.event||arguments[0];
        // 禁用
        if(e.keyCode==123){
            return false;
        }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){ //禁用i键
            return false;
        }else if((e.ctrlKey)&&(e.keyCode==85)){
            return false;
        }else if((e.ctrlKey)&&(e.keyCode==83)){ // 禁用s键
            return false;
        }
    }
// 右键菜单栏禁用
    document.oncontextmenu=function(){
        return false;
    }
}

