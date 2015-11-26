function handleResponse(response){
	console.log(response);
}

var script = document.createElement("script");
script.src = "http://study.163.com/webDev/couresByCategory.htm";
document.body.insertBefore(script,document.body.firstChild);