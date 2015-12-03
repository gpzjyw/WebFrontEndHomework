//初始执行函数
initialAddEvents()
checkCookieTop();
checkCookieFollow();
getHotList();
getClassList(2,20,10);

//定义打开关闭响应窗口的函数集合
var switchWindow = {
	//打开登录窗口
	openLogin: function (){
		$_class("g-login")[0].style.display = "block";
	},
	//关闭登录窗口
	closeLogin: function (){
		$_class("g-login")[0].style.display = "none";
	},
	//打开遮罩
	openMask: function (){
		$_class("g-mask")[0].style.display = "block";
	},
	//关闭遮罩
	closeMask: function (){
		$_class("g-mask")[0].style.display = "none";
	}
};

//添加初始事件
function initialAddEvents(){
	//给id为j-tips的a标签添加事件
	addEvent($_id("j-tips"), "click", function(){
		setCookie("topClosed", 1);
   		checkCookieTop();
	});
	//给id为j-attention的a标签添加事件
	addEvent($_id("j-follow"), "click", function(){
		if(checkCookieLogin()){
			setCookie("followSuc", 1);
			checkCookieFollow();
		}else{
			switchWindow.openMask();
			switchWindow.openLogin();
		}
	});
	//给id为j-attentioned的a标签添加事件
	addEvent($_id("j-followed"), "click", function(){
		setCookie("followSuc", 0);
		checkCookieFollow();
	});
	//添加关闭登入窗口的事件
	addEvent($_id("j-loginclose"), "click", function(){
		switchWindow.closeLogin();
		switchWindow.closeMask();
	});
	
}


//检查cookie（topClosed）,确定是否关闭相应标签
function checkCookieTop(){
	var cookie = getCookie();
	if(cookie["topClosed"] == "1"){
		$_class("g-top")[0].style.display = "none";
	}
}
function checkCookieLogin(){
	var cookie = getCookie();
	if(cookie["loginSuc"] == "1"){
		return 1;
	}else{
		return 0;
	}
}
//检查cookie（followSuc），确定需要显示和隐藏的标签
function checkCookieFollow(){
	var cookie = getCookie();
	if(cookie["followSuc"] == "1"  && checkCookieLogin()){
		$_class("u-follow")[0].style.display = "none";
		$_class("u-followed")[0].style.display = "inline-block";
	}else{
		$_class("u-follow")[0].style.display = "inline-block";
		$_class("u-followed")[0].style.display = "none";
	}
}


//获得特定id和className的元素节点
function $_id(id){
	return document.getElementById(id);
}
function $_class(className){
	return document.getElementsByClassName(className);
}
//跨浏览器的添加事件函数
function addEvent(element, type, handler){
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else if (element.attachEvent){
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}
//获得cookie
function getCookie(){
    var cookie = {};
    var all = document.cookie;
    if (all === '')
        return cookie;
    var list = all.split('; ');
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf('=');
        var name = item.substring(0, p);
        name = decodeURIComponent(name);
        var value = item.substring(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
//设置cookie
function setCookie(name, value, expires, path, domain, secure){
    var cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    if (expires)
        cookie += '; expires=' + expires.toGMTString();
    if (path)
        cookie += '; path=' + path;
    if (domain)
        cookie += '; domain=' + domain;
    if (secure)
        cookie += '; secure=' + secure;
    document.cookie = cookie;
}

//给url尾部添加查询参数
function addURLComponent(url,name,value){
	url += (url.indexOf("?") == -1 ? "?" : "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}


//获取课程列表的JSON数据
function getClassList(pageNo,psize,type){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				var text = JSON.parse(xhr.responseText);
				globalTemp2 =text;
				createProductList(text.list);
			}else{
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	var referUrl = "http://study.163.com/webDev/couresByCategory.htm";
	referUrl = addURLComponent(referUrl,"pageNo",pageNo);
	referUrl = addURLComponent(referUrl,"psize",psize);
	referUrl = addURLComponent(referUrl,"type",type);
	xhr.open("get",referUrl,true);
	xhr.send(null);
}

//获取最热排行的JSON数据
function getHotList(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				var text = JSON.parse(xhr.responseText);
				globalTemp = text;
				createHotList(text);
			}else{
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	xhr.open("get","http://study.163.com/webDev/hotcouresByCategory.htm",true);
	xhr.send(null);	
}

//获取导航关注的信息
function getAttention(){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				JSON.parse(xhr.responseText);

			}else{
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	xhr.open("get","http://study.163.com/webDev/attention.htm",true);
	xhr.send(null);	
}

//验证用户登入是否成功
function checkUser(userName,password){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				JSON.parse(xhr.responseText);
			}else{
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	var referUrl = "http://study.163.com/webDev/login.htm";
	referUrl = addURLComponent(referUrl,"userName",userName);
	referUrl = addURLComponent(referUrl,"password",password);
	xhr.open("get",referUrl,false);
	xhr.send(null);
//	xhr.send(userName,password);
}

//根据获得的数据创建最热排行列表
function createHotList(text){
	var hotList = document.getElementById("j-hotlist");
	for(var i=0; i<10; i++){
		var data = text[i];
		var li = document.createElement("li");
		var img1 = document.createElement("img");
		var div = document.createElement("div");
		var a = document.createElement("a");
		var img2 = document.createElement("img");
		var span = document.createElement("span");

		li.className = "f-clear";
		img1.className = "u-img";
		div.className = "u-container";
		a.className = "u-title";
		img2.className = "u-person";
		span.className = "u-num";
		
		img1.src = data.smallPhotoUrl;
		a.innerHTML = data.name;
		a.href = data.providerLink;
		a.title = data.name;
		img2.src = "pic/personhead.png";
		span.innerHTML = "  " + data.learnerCount;

		li.appendChild(img1);
		li.appendChild(div);
		div.appendChild(a);
		div.appendChild(img2);
		div.appendChild(span);
		hotList.appendChild(li);
	}
}

function createProductList(text){
	var productList = document.getElementById("j-classlist");

	for(var i=0;i<20;i++){
		var data = text[i];
		var div1 = document.createElement("div");
		var img1 = document.createElement("img");
		var h3 = document.createElement("h3");
		var p = document.createElement("p");
		var div2 = document.createElement("div");
		var img2 = document.createElement("img");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");

		div1.style.cssText = "display:inline-block; margin:0px 20px 20px 0px; width:225px; box-shadow: 0 2px 2px #CCCCCC; background-color:#FFFFFF;";
		img1.src = data.bigPhotoUrl;
		img1.style.cssText = "width:223px; margin:1px;";
		h3.innerHTML = data.name;
		h3.style.cssText = "margin:10px 0 10px 2px; width:225px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; font:12px '微软雅黑'; text-decoration:none;";
		p.innerHTML = data.provider;
		p.style.cssText = "margin:0 0 10px 2px; font:12px '微软雅黑'; color:#BBBBBB;";
		div2.style.cssText = "display: inline-block;  margin:0 0 10px 2px; border: 1px solid #BBBBBB; border-radius: 2px; color: #BBBBBB;";
		img2.src = "pic/personhead.png";
		span1.innerHTML = "  "+ data.learnerCount;
		span1.style.cssText = "";
		span2.innerHTML = "¥ "+ data.price;
		span2.style.cssText = "display: block; margin:0 0 10px 2px; color: #ff3f00;";

		div1.appendChild(img1);
		div1.appendChild(h3);
		div1.appendChild(p);
		div1.appendChild(div2);
		div2.appendChild(img2);
		div2.appendChild(span1);
		div1.appendChild(span2);
		productList.appendChild(div1);

	}
}