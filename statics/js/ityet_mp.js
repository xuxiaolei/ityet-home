	$(function(){
	$("#exnav li:nth-child(1)").click(function(){
		let srcUrl = $("#exnav06 iframe").data('src');
        $("#exnav06 iframe").attr('src', srcUrl+'?t=' + new Date().getTime());
		$("#exnav06").show();
		$("#exnav02").hide();
		$("#exnav03").hide();
		$("#exnav04").hide();
		$("#exnav05").hide();
		$("#exnav01").hide();
	})
	$("#exnav li:nth-child(2)").click(function(){
		$("#exnav01").hide();
		$("#exnav02").show();
		$("#exnav03").hide();
		$("#exnav04").hide();
		$("#exnav05").hide();
		$("#exnav06").hide();
	})
	$("#exnav li:nth-child(3)").click(function(){
		$("#exnav01").hide();
		$("#exnav02").hide();
		$("#exnav03").show();
		$("#exnav04").hide();
		$("#exnav05").hide();
		$("#exnav06").hide();
	})
	$("#exnav li:nth-child(4)").click(function(){
		$("#exnav01").hide();
		$("#exnav02").hide();
		$("#exnav03").hide();
		$("#exnav04").show();
		$("#exnav05").hide();
		$("#exnav06").hide();
	})
	$("#exnav li:nth-child(5)").click(function(){
		$("#exnav05").hide();
		$("#exnav02").hide();
		$("#exnav03").hide();
		$("#exnav04").hide();
		$("#exnav01").show();
		$("#exnav06").hide();
	})
	
	// 首页
	$("#exn1_01").click(function(){
		$("#exnav01").hide();
		$("#exnav02").hide();
		$("#exnav03").hide();
		$("#exnav04").hide();
		$("#exnav05").hide();
		$("#exnav06").show();
	})
	$("#exn1_02").click(function(){
		$("#exnav01").hide();
		$("#exnav02").show();
		$("#exnav03").hide();
		$("#exnav04").hide();
		$("#exnav05").hide();
		$("#exnav06").hide();
	})
	$("#exn1_03").click(function(){
		$("#exnav01").hide();
		$("#exnav02").hide();
		$("#exnav03").show();
		$("#exnav04").hide();
		$("#exnav05").hide();
		$("#exnav06").hide();
	})
	$("#exn1_04").click(function(){
		$("#exnav01").hide();
		$("#exnav02").hide();
		$("#exnav03").hide();
		$("#exnav04").show();
		$("#exnav05").hide();
		$("#exnav06").hide();
	})
	$("#exn1_05").click(function(){
		$("#exnav01").hide();
		$("#exnav02").hide();
		$("#exnav03").hide();
		$("#exnav04").hide();
		$("#exnav05").show();
		$("#exnav06").hide();
	})
})