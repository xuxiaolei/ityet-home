// 正在前往星球 - 页面展示切换
$(document).ready(function(){
	if(window.screen.width > window.screen.height){
		$("#pc").show();
		$("#mp").hide();
	}else{
		$("#pc").hide();
		$("#mp").show();
		let srcUrl = $("#exnav06 iframe").data('src');
        $("#exnav06 iframe").attr('src', srcUrl+'?t=' + new Date().getTime());
	}
})