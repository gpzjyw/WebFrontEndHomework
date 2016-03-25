main.hotAnimation = (function () {
	var createHotList,
		getHotList,
		init,
		domCache = [],
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class,
		addURLComponent = main.tools.addURLComponent,
		newElement = main.tools.newElement,
		ajax = main.tools.ajax;
	
	
	
	//根据获得的数据创建最热排行列表
	createHotList = function (text) {
		var hotList = $_id("j-hotlist"),
			fragment = document.createDocumentFragment();
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
			fragment.appendChild(li);
			
			domCache[i] = {
				img1 : img1,
				a	 : a,
				span : span
			};
		}
		hotList.appendChild(fragment);
		
		var index = 0,
			indexData = 10,
			listAnimation = function () {
				var data = text[indexData];
				
				domCache[index].img1.src = data["smallPhotoUrl"];
				domCache[index].a.innerHTML = data["name"];
				domCache[index].a.href = data["providerLink"];
				domCache[index].a.title = data["name"];
				domCache[index].span.innerHTML = "  " + data["learnerCount"];
				
				index++;
				if ( index >= 10 ) {
					index = 0;
				}
				indexData++;
				if ( indexData >= 20) {
					indexData = 0;
				}
				
				setTimeout( listAnimation, 5000 );
			};
		
		setTimeout( listAnimation, 5000 );
	};

	//获取最热排行的JSON数据
	getHotList = function () {
		ajax("get", "http://study.163.com/webDev/hotcouresByCategory.htm", null, createHotList);
	};
	
	init = function () {
		addEvent(document, "DOMContentLoaded", getHotList);
	};
	
	return {
		init : init 
	};
}());