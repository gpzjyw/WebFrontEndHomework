main.followAndLogin = (function () {
	var checkCookieLogin,
		checkCookieFollow,
		openLogin,
		closeLogin,
		openMask,
		closeMask,
		getAttention,
		checkUser,
		onclickFollow,
		onclickUnfollow,
		onclickClose,
		init,
		setCookie = main.tools.setCookie,
		getCookie = main.tools.getCookie,
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class;
		
	
	checkCookieLogin = function () {
		var cookie = getCookie();
		if(cookie["loginSuc"] == 1){
			return 1;
		} else {
			return 0;
		}
	};
	//检查cookie（followSuc），确定需要显示和隐藏的标签
	checkCookieFollow = function () {
		var cookie = getCookie();
		if(cookie["followSuc"] == 1  && checkCookieLogin()){
			$_class("u-follow")[0].style.display = "none";
			$_class("u-followed")[0].style.display = "inline-block";
		} else {
			$_class("u-follow")[0].style.display = "inline-block";
			$_class("u-followed")[0].style.display = "none";
		}
	};
	
	//打开登录窗口
	openLogin = function () {
		$_class("g-login")[0].style.display = "block";
	};
	//关闭登录窗口
	closeLogin = function () {
		$_class("g-login")[0].style.display = "none";
	};
	//打开遮罩
	openMask = function () {
		$_class("g-mask")[0].style.display = "block";
	};
	//关闭遮罩
	closeMask = function () {
		$_class("g-mask")[0].style.display = "none";
	};
	
	//获取导航关注的信息
	getAttention = function () {
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
	checkUser = function (userName, passWord) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function(){
			if(xhr.readyState == 4){
				if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
					if(JSON.parse(xhr.responseText) == 1){
						//成功登录之后，设置本地登录cookie,请求关注状态
						setCookie("loginSuc", 1);
						closeLogin();
						closeMask();
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
	};
	
	//点击关注之后，根据cookie判断是否弹出登录窗口
	onclickFollow = function () {
		if (checkCookieLogin()) {
			getAttention();
		} else {
			openMask();
			openLogin();
		}
	};
	//点击取消之后，取消关注，并设置cookie
	onclickUnfollow = function () {
		setCookie("followSuc", 0);
		checkCookieFollow();
	};
	//添加x关闭登录窗口
	onclickClose = function(){
		closeLogin();
		closeMask();
	}
	
	init = function () {
		addEvent($_id("j-follow"), "click", onclickFollow);
		addEvent($_id("j-followed"), "click", onclickUnfollow);
		addEvent($_id("j-loginclose"), "click", onclickClose);
		addEvent(document, "DOMContentLoaded", checkCookieFollow);
	};
	
	return {
		init : init
	};
}());
