main.hotAnimation = (function () {
	var createHotList,
		getHotList,
		init,
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class,
		addURLComponent = main.tools.addURLComponent,
		newElement = main.tools.newElement;
	
	//根据获得的数据创建最热排行列表
	createHotList = function (text) {
		var hotList = $_id("j-hotlist");
		for(var i=0; i<10; i++){
			var data = text[i],
				li = newElement("li", "f-clear"),
				img1 = newElement("img", "u-img"),
				div = newElement("div", "u-container"),
				a = newElement("a", "u-title"),
				img2 = newElement("img", "u-person"),
				span = newElement("span", "u-num");
			
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
	};

	//获取最热排行的JSON数据
	getHotList = function () {
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
	};
	
	init = function () {
		addEvent(document, "DOMContentLoaded", getHotList);
	};
	
	return {
		init : init 
	};
}());