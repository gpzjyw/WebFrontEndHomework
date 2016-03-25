//定义关闭顶部通知条模块
main.closeTop = (function () {
	var checkCookieTop,
		onclick,
		init,
		setCookie = main.tools.setCookie,
		getCookie = main.tools.getCookie,
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class;
	
	checkCookieTop = function () {
		var cookie = getCookie();
		if(cookie["topClosed"] == 1){
			$_class("g-top")[0].style.display = "none";
		}
	};
	
	onclick = function () {
		setCookie("topClosed", 1);
   		checkCookieTop();
	};
	
	init = function () {
		addEvent($_id("j-tips"), "click", onclick);
		addEvent(document, "DOMContentLoaded", checkCookieTop);
	};
	
	return {
		init : init
	};
}());
