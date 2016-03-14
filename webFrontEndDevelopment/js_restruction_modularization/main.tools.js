//定义通用工具方法
main.tools = (function(){
	
	var $_id, 
		$_class, 
		getCookie, 
		addEvent, 
		setCookie, 
		addURLComponent,
		newElement;
	
	//获得特定id和className的元素节点
	$_id = function (id) {
		return document.getElementById(id);
	};
	$_class = function (className) {
		return document.getElementsByClassName(className);
	};
	
	//跨浏览器的添加事件
	addEvent = function (element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent){
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	};

	//获得cookie
	getCookie = function () {
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
	};
	//设置cookie
	setCookie = function (name, value, expires, path, domain, secure) {
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
	};
	
	//给url尾部添加查询参数
	addURLComponent = function (url, name, value) {
		url += (url.indexOf("?") == -1 ? "?" : "&");
		url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
		return url;
	};
	
	//创建新元素并设置className（如果有）
	newElement = function (element, className) {
		var ele = document.createElement(element);
		
		ele.className = className? className : undefined ;
		
		return ele;
	};
	
	return {
		$_id 			: $_id,
		$_class			: $_class,
		getCookie 		: getCookie,
		addEvent 		: addEvent,
		setCookie 		: setCookie,
		addURLComponent : addURLComponent,
		newElement		: newElement
	};
	
}());
