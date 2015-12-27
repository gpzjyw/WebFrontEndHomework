//初始执行函数
initialAddEvents();
checkCookieTop();
checkCookieFollow();
getHotList();
getClassList(1,20,10);

//定义打开关闭响应窗口的函数集合
var switchWindow = {
	//打开登录窗口
	openLogin: function(){
		$_class("g-login")[0].style.display = "block";
	},
	//关闭登录窗口
	closeLogin: function(){
		$_class("g-login")[0].style.display = "none";
	},
	//打开视频播放窗口
	openVideo: function(){
		$_class("g-video")[0].style.display = "block";
	},
	//关闭视频播放窗口
	closeVideo:function(){
		$_class("g-video")[0].style.display = "none";
	},
	//打开遮罩
	openMask: function(){
		$_class("g-mask")[0].style.display = "block";
	},
	//关闭遮罩
	closeMask: function(){
		$_class("g-mask")[0].style.display = "none";
	}
};
//定义轮播动画的暂停播放的信号
var pauseSign = 0;
var classType = 10;

//添加初始事件
function initialAddEvents(){
	//点击后关闭顶部tips，且设置cookie
	addEvent($_id("j-tips"), "click", function(){
		setCookie("topClosed", 1);
   		checkCookieTop();
	});
	//点击关注之后，根据cookie判断是否弹出登录窗口
	addEvent($_id("j-follow"), "click", function(){
		if(checkCookieLogin()){
			getAttention();
		} else {
			switchWindow.openMask();
			switchWindow.openLogin();
		}
	});
	//点击取消之后，取消关注，并设置cookie
	addEvent($_id("j-followed"), "click", function(){
		setCookie("followSuc", 0);
		checkCookieFollow();
	});
	//添加x关闭登录窗口
	addEvent($_id("j-loginclose"), "click", function(){
		switchWindow.closeLogin();
		switchWindow.closeMask();
	});
	//提交登录窗口验证
	addEvent($_id("j-login"), "click", function(){
		var userName = $_id("j-userName").value;
		var passWord = $_id("j-passWord").value;
		checkUser(userName, passWord);
	});
	//页面加载完毕后开始加载banner动画
	addEvent(window, "load", bannerAnimation);
	//鼠标悬停到banner上和离开banner触犯的banner动画暂停信号
	addEvent($_class("u-banner")[0], "mouseover", function(){
		pauseSign = 1;
	});
	addEvent($_class("u-banner")[1], "mouseover", function(){
		pauseSign = 1;
	});
	addEvent($_class("u-banner")[2], "mouseover", function(){
		pauseSign = 1;
	});
	addEvent($_class("u-banner")[0], "mouseout", function(){
		pauseSign = 0;
	});
	addEvent($_class("u-banner")[1], "mouseout", function(){
		pauseSign = 0;
	});
	addEvent($_class("u-banner")[2], "mouseout", function(){
		pauseSign = 0;
	});
	//点击“产品设计”或“编程语言”切换tab
	addEvent($_id("j-product"), "click", function(){
		getClassList(1,20,10);
		$_id("j-product").className = "u-click";
		$_id("j-programming").className = "u-unclick";
	});
	addEvent($_id("j-programming"), "click", function(){
		getClassList(1,20,20);
		$_id("j-programming").className = "u-click";
		$_id("j-product").className = "u-unclick";
	});
	//点击图片弹出视频播放窗口
	addEvent($_id("j-video"), "click", function(){
		switchWindow.openMask();
		switchWindow.openVideo();
	});
	//点击x关闭视频播放窗口
	addEvent($_id("j-videoclose"), "click", function(){
		switchWindow.closeMask();
		switchWindow.closeVideo();
		$_id("j-videoplay").pause();
		$_id("j-videoplay").currentTime = 0;
	});
}

//****************************************************************//
//检查cookie的一些函数
//****************************************************************//
//检查cookie（topClosed）,确定是否关闭相应标签
function checkCookieTop(){
	var cookie = getCookie();
	if(cookie["topClosed"] == 1){
		$_class("g-top")[0].style.display = "none";
	}
}
function checkCookieLogin(){
	var cookie = getCookie();
	if(cookie["loginSuc"] == 1){
		return 1;
	} else {
		return 0;
	}
}
//检查cookie（followSuc），确定需要显示和隐藏的标签
function checkCookieFollow(){
	var cookie = getCookie();
	if(cookie["followSuc"] == 1  && checkCookieLogin()){
		$_class("u-follow")[0].style.display = "none";
		$_class("u-followed")[0].style.display = "inline-block";
	} else {
		$_class("u-follow")[0].style.display = "inline-block";
		$_class("u-followed")[0].style.display = "none";
	}
}

//****************************************************************//
//定义一些实现基本功能的函数
//****************************************************************//
//获得特定id和className的元素节点
function $_id(id){
	return document.getElementById(id);
}
function $_class(className){
	return document.getElementsByClassName(className);
}
//跨浏览器的添加/删除事件函数
function addEvent(element, type, handler){
	if (element.addEventListener) {
		element.addEventListener(type, handler, false);
	} else if (element.attachEvent){
		element.attachEvent("on" + type, handler);
	} else {
		element["on" + type] = handler;
	}
}
function removeEvent(element, type, handler){
	if (element.removeEventListener) {
		element.removeEventListener(type, handler, false);
	} else if (element.detachEvent){
		element.detachEvent("on" + type, handler);
	} else {
		element["on" + type] = null;
	}
}
//跨浏览器获取/设置标签的自定义属性,自定义属性均加上data-前缀
function setDataset(element, attr, value){
	if(element.dataset){
		element.dataset[attr] = value;
	} else if(element.setAttribute) {
		element.setAttribute("data-" + attr, value);
	} else {
		element["data-" + attr] = value;
	}
}
function getDataset(element, attr){
	if(element.dataset){
		return element.dataset[attr];
	} else if(element.getAttribute) {
		return element.getAttribute("data-" + attr);
	} else {
		return element["data-" + attr];
	}
}
//获得cookie
function getCookie(){
    var cookie = {};
    var all = document.cookie;
    if (all === "")
        return cookie;
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
        var item = list[i];
        var p = item.indexOf("=");
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
    var cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (expires)
        cookie += "; expires=" + expires.toGMTString();
    if (path)
        cookie += "; path=" + path;
    if (domain)
        cookie += "; domain=" + domain;
    if (secure)
        cookie += "; secure=" + secure;
    document.cookie = cookie;
}

//给url尾部添加查询参数
function addURLComponent(url, name, value){
	url += (url.indexOf("?") == -1 ? "?" : "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}
//****************************************************************//
//ajax异步获取数据
//****************************************************************//
//获取课程列表的JSON数据
function getClassList(pageNo, psize, type){
	classType = type;
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				var text = JSON.parse(xhr.responseText);
				globalTemp2 = text;
				globalType = type;
				createProductList(text);
			} else {
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
			} else {
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
				if(JSON.parse(xhr.responseText) == 1){
					setCookie("followSuc", 1);
					checkCookieFollow();
				}
			} else {
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	xhr.open("get","http://study.163.com/webDev/attention.htm",true);
	xhr.send(null);	
}

//验证用户登录是否成功
function checkUser(userName,passWord){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				if(JSON.parse(xhr.responseText) == 1){
					//成功登录之后，设置本地登录cookie,请求关注状态
					setCookie("loginSuc", 1);
					switchWindow.closeLogin();
					switchWindow.closeMask();
					getAttention();
				} else {
					alert("帐号或密码错误！");
				}
			} else {
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	var referUrl = "http://study.163.com/webDev/login.htm";
	referUrl = addURLComponent(referUrl, "userName", hex_md5(userName));
	referUrl = addURLComponent(referUrl, "password", hex_md5(passWord));
	xhr.open("get", referUrl, true);
	xhr.send(null);
//	xhr.send(userName,password);
}

//****************************************************************//
//实现特定功能的一些函数
//****************************************************************//
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
		
		img1.src = data["smallPhotoUrl"];
		a.innerHTML = data["name"];
		a.href = data["providerLink"];
		a.title = data["name"];
		a.target = "_blank";
		img2.src = "pic/personhead.png";
		span.innerHTML = "  " + data["learnerCount"];
		
		li.appendChild(img1);
		li.appendChild(div);
		div.appendChild(a);
		div.appendChild(img2);
		div.appendChild(span);
		hotList.appendChild(li);
	}
}

//根据获得的数据更新最热排行榜
//function updataHotList(text){
//	var 
//}

//根据获得的数据创建产品列表
function createProductList(text){
	var productList = $_id("j-classlist");
	//在创建产品列表之前，清除所有课程卡片
	var childs = productList.childNodes;
	for(var i=childs.length-1;i>=0;i--){
		productList.removeChild(childs.item(i));
	}
	//创建课程卡片
	var classes = text["list"];
	for(var i=0;i<classes.length;i++){
		var data = classes[i];
		var div1 = document.createElement("div");
		
		var div2 = document.createElement("div");
		var img1 = document.createElement("img");
		var a1 = document.createElement("a");
		var h3_1 = document.createElement("h3");
		var p1 = document.createElement("p");
		var div3 = document.createElement("div");
		var img2 = document.createElement("img");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");
		
		var div4 = document.createElement("div");
		var img3 = document.createElement("img");
		var div5 = document.createElement("div");
		var a2 = document.createElement("a");
		var h3_2 = document.createElement("h3");
		var img4 = document.createElement("img");
		var span3 = document.createElement("span");
		var p2 = document.createElement("p");
		var p3 = document.createElement("p");
		var p4 = document.createElement("p");
		
		div1.className = "m-class";
		
		div2.className = "m-unhover";
		img1.className = "u-pic";
		a1.className = "m-link";
		h3_1.className = "u-title";
		p1.className = "u-organization";
		div3.className = "u-container";
		img2.className = "u-person";
		span1.className = "u-personnum";
		span2.className = "u-price";
		div4.className = "m-hover";
		
		div4.className = "m-hover";
		img3.className = "u-pic";
		div5.className = "m-container";
		a2.className = "m-link";
		h3_2.className = "u-title";
		img4.className = "u-person";
		span3.className = "u-personnum";
		p2.className = "u-provider";
		p3.className = "u-category";
		p4.className = "u-description";
		
		img1.src = data["bigPhotoUrl"];
		a1.href = data["providerLink"]
		h3_1.innerHTML = data["name"];
		h3_1.title = data["name"];
		p1.innerHTML = data["provider"];
		img2.src = "pic/personhead.png";
		span1.innerHTML = "  " + data["learnerCount"];
		span2.innerHTML = "¥ " + data["price"];
		
		img3.src = data["bigPhotoUrl"];
		a2.href = data["providerLink"];
		a2.target = "_blank";
		h3_2.innerHTML = data["name"];
		h3_2.title = data["name"];
		img4.src = "pic/personhead.png";
		span3.innerHTML = "  " + data["learnerCount"] + "人在学";
		p2.innerHTML = "发布者：" + data["provider"];
		p3.innerHTML = "分类：" + data["categoryName"];
		p4.innerHTML = data["description"];
		
		div2.appendChild(img1);
		div2.appendChild(a1);
			a1.appendChild(h3_1);
		div2.appendChild(p1);
		div2.appendChild(div3);
			div3.appendChild(img2);
			div3.appendChild(span1);
		div2.appendChild(span2);
		div1.appendChild(div2);
		
		div4.appendChild(img3);
		div4.appendChild(div5);
			div5.appendChild(a2);
				a2.appendChild(h3_2);
			div5.appendChild(img4);
			div5.appendChild(span3);
			div5.appendChild(p2);
			div5.appendChild(p3);
		div4.appendChild(p4);
		div1.appendChild(div4);
		
		productList.appendChild(div1);
	}
	
	//创建页码器
	var maxPage = text["totalPage"];
	var pageIndex = text["pagination"]["pageIndex"];
	var div6 = document.createElement("div");
	div6.className = "m-page";
	//创建左翻页
	var a_left = document.createElement("a");
	a_left.className = "u-left";
	a_left.innerHTML = "<";
	addEvent(a_left, "click", function(num){
		return function(){
			getClassList(num, 20, classType);
		};
	}(pageIndex-1));
	div6.appendChild(a_left);
	//创建数字页码
	for(var i=1;i<=maxPage;i++){
		if(i == pageIndex){
			var i1 = document.createElement("i");
			i1.innerHTML = i;
			i1.className = "u-selected";
			div6.appendChild(i1);
		} else {
			var a3 = document.createElement("a");
			a3.innerHTML = i;
			a3.className = "u-page";
			addEvent(a3, "click", function(num){
				return function(){
					getClassList(num, 20, classType);
				};
			}(i));
			div6.appendChild(a3);
		}
	}
	//创建右翻页
	var a_right = document.createElement("a");
	a_right.className = "u-right";
	a_right.innerHTML = ">";
	addEvent(a_right, "click", function(num){
		return function(){
			getClassList(num, 20, classType);
		};
	}(pageIndex+1));
	div6.appendChild(a_right);
	
	productList.appendChild(div6);
}


//轮播图动画
function bannerAnimation(){
	
	var num = 0;
	var step = 0;
	var step1 = 0;
	var step2 = 0;
	var bannerDisappear;
	var bannerAppear;
	var points = $_class("u-point");
	
	setTimeout(switchPic, 5000);
	//切换图片的实现
	function switchPic(){
		if(!pauseSign){
			step++;
			if(step == 3){
				step1 = step;
				step2 = 1;
				step = 0;
			} else {
				step1 = step;
				step2 = step + 1;
			}
			bannerDisappear = $_id("j-banner" + step1);
			bannerAppear = $_id("j-banner" + step2);
			setTimeout(switchOpacity, 1);
		}
		else{
			setTimeout(switchPic, 1);
		}
	}
	//淡入淡出效果的实现
	function switchOpacity(){
		num++;
		if(num < 500){
			bannerDisappear.style["z-index"] = 200;
			bannerAppear.style["z-index"] = 300;
			points[step1-1].src = "pic/whitepoint.png";
			points[step2-1].src = "pic/blackpoint.png";
			var opacatyRate = (num/500).toFixed(2);
			setOpacity(bannerDisappear, (1-opacatyRate));
			setOpacity(bannerAppear, opacatyRate);
			setTimeout(switchOpacity, 1);
		} else {
			num = 0;
			setTimeout(switchPic, 5000);
		}
	}
	//设置id的透明度
	function setOpacity(id, opacityRate){
		id.style["filter"] = "alpha(opacity=" + (opacityRate*100) + ")";
		id.style["-moz-opacity:"] = opacityRate;
		id.style["-khtml-opacity"] = opacityRate;
		id.style["opacity"] = opacityRate;
	}
}












