// 进入页面就执行
window.onload=function()
{
	// 展示框架宽度-显示
	// var conw = $("#content").width();
	// $("#cright").css({"width":(conw-30)+"px"});
	
	// 判断是否有操作 并 执行大小宽度的变化$("#cright")
	// $(window).resize(function()
	// {
	// 	conw = $("#content").width();
	// 	$("#content").css({"height":(conw*0.5)+"px"});
	// 	$("#cright").css({"width":(conw-30)+"px"});
	// });
	
	// 文字输入特效
	let divTyping = document.getElementById('etext')
	let i = 0,
        timer = 0,
		str = '千里之行，始于足下。'
	function typing()
	{
		if (i <= str.length)
		{
			divTyping.innerHTML = str.slice(0, i++) + '_'
			timer = setTimeout(typing, 120)
		}else
		 {
			divTyping.innerHTML = str //结束打字,移除 _ 光标
			clearTimeout(timer)
			$("#ebga").animate({width:'100%',height:'100%'},800);
			setTimeout(function(){$("#content").animate({height:'80%'},800)},300);
		}
	}
	typing();
	
	setTimeout(function(){
	    $("#xuna").show();
        divTyping.style.display = 'none';
        let src07 = $("#nav07 iframe").data('src');
        $("#nav07 iframe").attr('src', src07+'?t=' + new Date().getTime());
        let src08 = $("#nav08 iframe").data('src');
        $("#nav08 iframe").attr('src', src08+'?t=' + new Date().getTime());
	},3000);
	
	//单击选择框-宽度变化
	$("#cleft_li01").click(function(){
		$("#cleft_li01").css({"background-color":"#ececec"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#cleft_li07").css({"background-color":"#f9f9f9"});
		$("#cleft_li08").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"0%"},800);
		$("#nav02").animate({"left":"0%"},800);
		$("#nav03").animate({"left":"0%"},800);
		$("#nav04").animate({"left":"0%"},800);
		$("#nav05").animate({"left":"0%"},800);
		$("#nav07").animate({"left":"0%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})
	$("#cleft_li02").click(function(){
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#ececec"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#cleft_li07").css({"background-color":"#f9f9f9"});
		$("#cleft_li08").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"0%"},800);
		$("#nav03").animate({"left":"0%"},800);
		$("#nav04").animate({"left":"0%"},800);
		$("#nav05").animate({"left":"0%"},800);
		$("#nav07").animate({"left":"0%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})
	$("#cleft_li03").click(function(){
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#ececec"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#cleft_li07").css({"background-color":"#f9f9f9"});
		$("#cleft_li08").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"-100%"},800);
		$("#nav03").animate({"left":"0%"},800);
		$("#nav04").animate({"left":"0%"},800);
		$("#nav05").animate({"left":"0%"},800);
		$("#nav07").animate({"left":"0%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})
	$("#cleft_li04").click(function(){
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#ececec"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#cleft_li07").css({"background-color":"#f9f9f9"});
		$("#cleft_li08").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"-100%"},800);
		$("#nav03").animate({"left":"-100%"},800);
		$("#nav04").animate({"left":"0%"},800);
		$("#nav05").animate({"left":"0%"},800);
		$("#nav07").animate({"left":"0%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})
	$("#cleft_li05").click(function(){
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#ececec"});
		$("#cleft_li07").css({"background-color":"#f9f9f9"});
		$("#cleft_li08").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"-100%"},800);
		$("#nav03").animate({"left":"-100%"},800);
		$("#nav04").animate({"left":"-100%"},800);
		$("#nav05").animate({"left":"0%"},800);
		$("#nav07").animate({"left":"0%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})
	
	$("#cleft_li07").click(function(){
	    let srcUrl = $("#nav07 iframe").data('src');
    	$("#nav07 iframe").attr('src', srcUrl+'?t=' + new Date().getTime());
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#cleft_li07").css({"background-color":"#ececec"});
		$("#cleft_li08").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"-100%"},800);
		$("#nav03").animate({"left":"-100%"},800);
		$("#nav04").animate({"left":"-100%"},800);
		$("#nav05").animate({"left":"-100%"},800);
		$("#nav07").animate({"left":"0%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})

	$("#cleft_li08").click(function(){
	    let srcUrl = $("#nav08 iframe").data('src');
    	$("#nav08 iframe").attr('src', srcUrl+'?t=' + new Date().getTime());
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#cleft_li07").css({"background-color":"#f9f9f9"});
		$("#cleft_li08").css({"background-color":"#ececec"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"-100%"},800);
		$("#nav03").animate({"left":"-100%"},800);
		$("#nav04").animate({"left":"-100%"},800);
		$("#nav05").animate({"left":"-100%"},800);
		$("#nav07").animate({"left":"-100%"},800);
		$("#nav08").animate({"left":"0%"},800);
	})
	$(".nav01_but01").click(function(){
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#ececec"});
		$("#cleft_li03").css({"background-color":"#f9f9f9"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"0%"},800);
		$("#nav03").animate({"left":"0%"},800);
		$("#nav04").animate({"left":"0%"},800);
		$("#nav05").animate({"left":"0%"},800);
	})
	$(".nav01_but02").click(function(){
		$("#cleft_li01").css({"background-color":"#f9f9f9"});
		$("#cleft_li02").css({"background-color":"#f9f9f9"});
		$("#cleft_li03").css({"background-color":"#ececec"});
		$("#cleft_li04").css({"background-color":"#f9f9f9"});
		$("#cleft_li05").css({"background-color":"#f9f9f9"});
		$("#nav01").animate({"left":"-100%"},800);
		$("#nav02").animate({"left":"-100%"},800);
		$("#nav03").animate({"left":"-100%"},800);
		$("#nav04").animate({"left":"0%"},800);
		$("#nav05").animate({"left":"0%"},800);
	})
	
	//展示按钮,如果宽度大于30就执行收回，小于就执行释放 --- 缺陷占不使用
	// $(".cleft_bottom").click(function(){
	// 	var cleft_width = $("#cleft").width();
	// 	if(cleft_width > 30){
	// 		cleft_widx();
	// 	}else{
	// 		cleft_wid();
	// 	}
	// })
}


function AddFavorite(title, url)
{
    try {
        window.external.addFavorite("https://ityet.com", "LeoBlog");
    }
    catch (e) {
        try {
            window.sidebar.addPanel("LeoBlog","https://ityet.com", "");
        }
        catch (e) {
            alert("抱歉，您所使用的浏览器无法完成此操作。\n加入收藏失败，请使用 [ Ctrl+D ] 进行添加");
        }
    }
}