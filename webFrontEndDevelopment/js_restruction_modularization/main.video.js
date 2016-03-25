main.video = (function () {
	var openVideo,
		closeVideo,
		openMask,
		closeMask,
		init,
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class,
	
	//打开视频播放窗口
	openVideo = function(){
		$_class("g-video")[0].style.display = "block";
	};
	//关闭视频播放窗口
	closeVideo = function(){
		$_class("g-video")[0].style.display = "none";
	};
	//打开遮罩
	openMask = function(){
		$_class("g-mask")[0].style.display = "block";
	};
	//关闭遮罩
	closeMask = function(){
		$_class("g-mask")[0].style.display = "none";
	};
	
	init = function () {
		//点击图片弹出视频播放窗口
		addEvent($_id("j-video"), "click", function(){
			openMask();
			openVideo();
		});
		//点击x关闭视频播放窗口
		addEvent($_id("j-videoclose"), "click", function(){
			closeMask();
			closeVideo();
			$_id("j-videoplay").pause();
			$_id("j-videoplay").currentTime = 0;
		});
	};
	
	return {
		init : init
	};
}());
