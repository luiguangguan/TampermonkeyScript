// ==UserScript==
// @name         重新拨号工具
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  自动换IP工具
// @author       Simon
// @match        *://192.168.0.1
// @match        *://192.168.3.1
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at document-end
// ==/UserScript==

(function() {
    'use strict';
	var connect = function(){
		console.log(123)
		document.getElementById("routerSetMbtn").click();
		setTimeout(function(){
				document.getElementById("network_rsMenu").click();
				setTimeout(function(){
					if(document.getElementById("wanIpLbl").innerText!="0.0.0.0"){
						console.log("可以断开");
						document.getElementById("disconnect").click();
						setTimeout(function(){
							document.getElementById("save").click();
						},1000*2);
						var timer=setInterval(function(){
							if(document.getElementById("wanIpLbl").innerText=="0.0.0.0"){
								document.getElementById("save").click();
							}else{
								clearInterval(timer);
								console.log("拨号成功，停止计时器");
							}
						},10*1000)
					}
				},500);
			},500);
	}
  var load = function(){ if($("#routerSetMbtn").length>0)
  {
	  console.log(connect)
      var btn="<li><input id='btn_c' type='button' value='重新拨号'></li>"
      $("#basicMenuUl").append(btn);
	  document.getElementById("btn_c").addEventListener('click', () => {
		  var r = confirm("确定要重新拨号吗");
			if (r == true) {
				connect();
			} else {
				console.log("取消操作")
			}

	  });
      console.log(1);
  }else{
      console.log("不是路由器或还没有登录");
  }
}
    setTimeout(load,1000*2);
})();

