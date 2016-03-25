var main = (function () {
	var init;
	
	init = function () {
		main.closeTop.init();
		main.followAndLogin.init();
		main.bannerAnimation.init();
		main.switchTab.init();
		main.hotAnimation.init();
		main.video.init();
	};
	
	return {
		init : init
	}
}());