// 正在前往星球 - 页面展示切换
$(document).ready(function(){
	if(window.screen.width > window.screen.height){	
		$("#pc").show();
		$("#mp").hide();
	}else{
		$("#pc").hide();
		$("#mp").show();
	}
})