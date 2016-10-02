$.mobile.loadingMessage="正在加载。。。";
var indexSearch = function(keywords){
	if(keywords){
		$.mobile.activePage.find("#keywords").val(keywords)
	}
	var $form = $.mobile.activePage.find('form');
	var ks = $.mobile.activePage.find("#keywords").val();
	if(!ks){
		alert("请输入关键字");
		$.mobile.activePage.find("#keywords").focus();
		return ;
	}else{
	    $form.submit();
	}
};

var leftclick =function(){
	$.mobile.activePage.find("#left_menu_in").hide("slow");
	$.mobile.activePage.find("#leftmenumask").hide("slow");
};

var logout = function(pt, jsessionid){
	if(!confirm("确定退出登录？")){
		return;
	}
	var options = {
	    url:"member/logout.action"+jsessionid,
		dataType:'json',
		error:function(a,b){
			alert("退出失败，请重试！");
			$.mobile.activePage.find("#logouA").attr("href","javascript:logout('"+pt+"','"+jsessionid+"');");
			$.mobile.activePage.find("#logouA").text("退出");
		},
		success: function(data) {
			if(data.status==0){
				$.mobile.activePage.find("#loginDiv").html("<a data-transition='slide' rel='external' class='cwhite' href='HTMLLoginServlet'>登录</a>&nbsp;|&nbsp;<a data-transition='slide' class='cwhite' href='member/registerPage.action'>注册</a>");
				if('pps' == pt) {
					var nowUrl = window.location.pathname;
					var idx = servletPath.indexOf("?");
					if(idx > -1) {
						window.location.href = nowUrl+"&loginout=1";
					}else {
						window.location.href = nowUrl+"@loginout=1";
					}
				}
			}else{
				alert("退出失败，请重试！");
				$.mobile.activePage.find("#logouA").attr("href","javascript:logout('"+pt+"','"+jsessionid+"');");
				$.mobile.activePage.find("#logouA").text("退出");
			}
		}
	};
	$.mobile.activePage.find("#logouA").attr("href","javascript:void(0);");
	$.mobile.activePage.find("#logouA").text("正在退出...");
	$.ajax(options);
};
var leftlogout = function(pt, jsessionid,searchKind,keywords,ADMIN_URL,shortName,qiehuanchengshi,existKind){
	if(existKind==0){
		if(!confirm("确定退出登录？")){
			return;
		}
	}else{
		if(!confirm("在此页面退出将转到晋优惠首页，确定退出登录？")){
			return;
		}
	}
	var options = {
	    url:ADMIN_URL+"member/logout.action"+jsessionid,
		dataType:'json',
		error:function(a,b){
			alert("退出失败，请重试！");
			$.mobile.activePage.find("#logouA").attr("href","javascript:leftlogout('"+pt+"','"+jsessionid+
					"',"+searchKind+",'"+keywords+"','"+ADMIN_URL+"','"+shortName+"',"+qiehuanchengshi+");");
			$.mobile.activePage.find("#logouA").text("退出");
		},
		success: function(data) {
			if(data.status==0){
				if(existKind==0){
				var leftmenuinview="<ul><li>"+
		          "<div class='left_search'><input class='left_search_ipt' id='leftkeywords' name='leftkeywords' type='text' value='"+keywords+"' maxlength='64'></div>"+
		          "<div class='left_search_btn'><input class='left_search_btn2' name='' type='button' onclick='leftsearch();'></div>"+
		          "<input type='hidden' id='leftsearchKind' name='searchKind' value="+searchKind+" />"+
		          " </li>"+
		        "<li><a data-transition='slide' rel='external' href='"+ADMIN_URL+"HTMLLoginServlet' >登录</a></li>"+
		        "<li><a data-transition='slide'  href='"+ADMIN_URL+"member/registerPage.action"+jsessionid+"'>注册</a></li>";
				if(qiehuanchengshi!=0){
					leftmenuinview=leftmenuinview+"<li><a href='"+ADMIN_URL+"changeCityPage.action"+jsessionid+"' data-role='button'>切换城市"+
					"<span style='float:right;'>晋优惠"+shortName+"站&nbsp;&nbsp;&nbsp;&nbsp;</span></a></li>";
				}
				leftmenuinview=leftmenuinview+"<li><a data-transition='slide'  href='"+ADMIN_URL+"index.action"+jsessionid+"'>晋优惠首页</a></li></ul>";
				$.mobile.activePage.find("#left_menu_in").html(leftmenuinview);
				if('pps' == pt) {
					var nowUrl = window.location.pathname;
					var idx = servletPath.indexOf("?");
					if(idx > -1) {
						window.location.href = nowUrl+"&loginout=1";
					}else {
						window.location.href = nowUrl+"@loginout=1";
					}
				}
				}else{
					window.location.href = ADMIN_URL+"index.action"+jsessionid;
				}
			}else{
				alert("退出失败，请重试！");
				$.mobile.activePage.find("#logouA").attr("href","javascript:leftlogout('"+pt+"','"+jsessionid+"');");
				$.mobile.activePage.find("#logouA").text("退出");
			}
		}
	};
	$.mobile.activePage.find("#logouA").attr("href","javascript:void(0);");
	$.mobile.activePage.find("#logouA").text("正在退出...");
	$.ajax(options);
};
var leftcartlogout = function( jsessionid,ADMIN_URL){
	if(!confirm("在此页面退出将转到晋优惠首页，确定退出登录？")){
		return;
	}
	var options = {
	    url:ADMIN_URL+"member/logout.action"+jsessionid,
		dataType:'json',
		error:function(a,b){
			alert("退出失败，请重试！");
			$.mobile.activePage.find("#logouA").attr("href","javascript:leftcartlogout('"+jsessionid+"','"+ADMIN_URL+"');");
			$.mobile.activePage.find("#logouA").text("退出");
		},
		success: function(data) {
			if(data.status==0){
					window.location.href = ADMIN_URL+"index.action"+jsessionid;
				}else{
				alert("退出失败，请重试！");
				$.mobile.activePage.find("#logouA").attr("href","javascript:leftcartlogout('"+jsessionid+"','"+ADMIN_URL+"');");
				$.mobile.activePage.find("#logouA").text("退出");
			}
		}
	};
	$.mobile.activePage.find("#logouA").attr("href","javascript:void(0);");
	$.mobile.activePage.find("#logouA").text("正在退出...");
	$.ajax(options);
};
//选择或去掉所有的多选框
var selectAll = function (obj){
    var sis = document.getElementsByName("ids");
    if (sis != null) {
        if (sis.length != null) {
            for (var i = 0; i < sis.length; i++) {
                var e = sis[i];
                if (e.type == 'checkbox') {
                    e.checked = obj.checked;
                }
            }
        } else {
            var e = sis;
            if (e.type == 'checkbox') {
                e.checked = obj.checked;
            }
        }
    }
};
//选择ID
var selectIds = function(idsName){
	var sis = document.getElementsByName(idsName);
	var str = "";
	if(!sis){
    	return ;
    }else if(sis.value){
 		if(sis.checked ==true){
 			str= sis.value;
 		}
	 }else if(sis != null) {
        if (sis.length != null) {
            for (var i = 0; i < sis.length; i++) {
                var e = sis[i];
                if (e.type == 'checkbox') {
                	if(e.checked == true){
	                	 if(str==""){
	                    	str=sis[i].value;
	                     }else{
	                    	str+=","+sis[i].value;
	                     }
                	}
                }
            }
        } 
    }
	return str;
};

