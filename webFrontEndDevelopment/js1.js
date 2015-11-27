getHotList();
getClassList(1,20,10);

//给url尾部添加查询参数
function addURLComponent(url,name,value){
	url += (url.indexOf("?") == -1 ? "?" : "&");
	url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
	return url;
}

//获取课程列表的JSON数据
function getClassList(pageNo,psize,type){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				var text = JSON.parse(xhr.responseText);
				globalTemp2 =text;
				createProductList(text.list);
			}else{
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
			}else{
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
				JSON.parse(xhr.responseText);

			}else{
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	xhr.open("get","http://study.163.com/webDev/attention.htm",true);
	xhr.send(null);	
}

//验证用户登入是否成功
function checkUser(userName,password){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
				JSON.parse(xhr.responseText);
			}else{
				console.log("Request was unsuccessful：" + xhr.status);
			}
		}
	};
	var referUrl = "http://study.163.com/webDev/login.htm";
	referUrl = addURLComponent(referUrl,"userName",userName);
	referUrl = addURLComponent(referUrl,"password",password);
	xhr.open("get",referUrl,false);
	xhr.send(null);
//	xhr.send(userName,password);
}

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
		if(i<9) {li.style.cssText = "margin-bottom:20px;"}
		img1.src = data.smallPhotoUrl;
		img1.style.cssText = "width:50px; height:50px; float:left;";
		div.style.cssText = "display:inline-block; width:125px;";
		a.innerHTML = data.name;
		a.href = data.providerLink;
		a.title = data.name;
		a.style.cssText = "display:inline-block; margin-left:10px; width:123px; overflow:hidden; white-space:nowrap; text-overflow:ellipsis; font:14px '微软雅黑'; text-decoration:none;";
		img2.src = "pic/personhead.png";
		img2.style.cssText = "margin-left:10px";
		span.innerHTML = "  "+data.learnerCount;
		span.style.cssText = "color:#bbbbbb;";

		li.appendChild(img1);
		li.appendChild(div);
		div.appendChild(a);
		div.appendChild(img2);
		div.appendChild(span);
		hotList.appendChild(li);
	}
}

function createProductList(text){
	var productList = document.getElementById("j-classlist");

	for(var i=0;i<20;i++){
		var data = text[i];
		var div1 = document.createElement("div");
		var img1 = document.createElement("img");
		var a = document.createElement("a");
		var p = document.createElement("p");
		var div2 = document.createElement("div");
		var img2 = document.createElement("img");
		var span1 = document.createElement("span");
		var span2 = document.createElement("span");

		div1.style.cssText = "display:inline-block; margin:0px 20px 20px 0px; width:225px; height228px; background-color:#FFFFFF;";
		img1.src = data.bigPhotoUrl;
		img1.style.cssText = "width:223px; margin:1px;";
		a.innerHTML = data.name;
		a.style.cssText = "";
		p.innerHTML = data.provider;
		div2.style.cssText = "";
		img2.src = "pic/personhead.png";
		span1.innerHTML = data.learnerCount;
		span1.style.cssText = "";
		span2.innerHTML = "¥ "+data.price;
		span2.style.cssText = "";

		div1.appendChild(img1);
		div1.appendChild(a);
		div1.appendChild(p);
		div1.appendChild(div2);
		div2.appendChild(img2);
		div2.appendChild(span1);
		div1.appendChild(span2);
		productList.appendChild(div1);

	}
}