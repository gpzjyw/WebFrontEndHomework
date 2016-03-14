main.bannerAnimation = (function () {
	var bannerAnimation,
		init,
		pauseSign = 0,
		setCookie = main.tools.setCookie,
		getCookie = main.tools.getCookie,
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class;
	
	
	bannerAnimation = function () {
		
		var num = 0,
			step = 0,
			step1 = 0,
			step2 = 0,
			bannerDisappear,
			bannerAppear,
			points = $_class("u-point");
		
		setTimeout(switchPic, 5000);
		//切换图片的实现
		function switchPic() {
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
	
	
	init = function () {
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
	};
	
	return {
		init : init
	};
}());