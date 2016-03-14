main.switchTab = (function () {
	var createProductList,
		getClassList,
		init,
		classType = 10,
		addEvent = main.tools.addEvent,
		$_id = main.tools.$_id,
		$_class = main.tools.$_class,
		addURLComponent = main.tools.addURLComponent,
		newElement = main.tools.newElement;
	
	//根据获得的数据创建产品列表
	createProductList = function (text){
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
				div1 = newElement("div", "m-class")
				
				div2 = newElement("div", "m-unhover"),
				img1 = newElement("img", "u-pic"),
				a1 = newElement("a", "m-link"),
				h3_1 = newElement("h3", "u-title"),
				p1 = newElement("p", "u-organization"),
				div3 = newElement("div", "u-container"),
				img2 = newElement("img", "u-person"),
				span1 = newElement("span", "u-personnum"),
				span2 = newElement("span", "u-price"),
				
				div4 = newElement("div", "m-hover"),
				img3 = newElement("img", "u-pic"),
				div5 = newElement("div", "m-container"),
				a2 = newElement("a", "m-link"),
				h3_2 = newElement("h3", "u-title"),
				img4 = newElement("img", "u-person"),
				span3 = newElement("span", "u-personnum"),
				p2 = newElement("p", "u-provider"),
				p3 = newElement("p", "u-category"),
				p4 = newElement("p", "u-description");
			
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
		var maxPage = text["totalPage"],
			pageIndex = text["pagination"]["pageIndex"],
			div6 = newElement("div", "m-page"),
			a_left = newElement("a", "u-left"),
			a_right = newElement("a", "u-right");
			
		//创建左翻页
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
				var i1 = newElement("i", "u-selected");
				i1.innerHTML = i;
				div6.appendChild(i1);
			} else {
				var a3 = newElement("a", "u-page");
				a3.innerHTML = i;
				addEvent(a3, "click", function(num){
					return function(){
						getClassList(num, 20, classType);
					};
				}(i));
				div6.appendChild(a3);
			}
		}
		//创建右翻页
		a_right.innerHTML = ">";
		addEvent(a_right, "click", function(num){
			return function(){
				getClassList(num, 20, classType);
			};
		}(pageIndex+1));
		div6.appendChild(a_right);
		
		productList.appendChild(div6);
	};

	
	getClassList = function (pageNo, psize, type) {
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
	};
	
	init = function () {
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
		addEvent(document, "DOMContentLoaded", function(){
			getClassList(1,20,10);
		});
	};
	
	return {
		init : init
	};
	
}());