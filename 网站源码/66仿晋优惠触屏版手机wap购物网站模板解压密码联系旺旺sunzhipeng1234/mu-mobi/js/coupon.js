var servletPath = window.location.pathname;
var idx = servletPath.indexOf(";");
var jssessionid="";
if(idx>-1){
	jssessionid = servletPath.substr(idx);
}
if(wjsessionid){
	jssessionid = wjsessionid;
}
var downCoupon = function (couponId) {
	var $downButton = $.mobile.activePage.find('#cp_downButton');
	$downButton.val('提交...');
	$downButton.removeAttr('onClick');
	var options = 
    {
		    url:"couponpublish/downCoupon.action"+jssessionid,
		    data: {'couponID':couponId},
			dataType:'json',
			type:'post',
		    timeout:initSubmitTimeout,
			error:function(jqXHR, textStatus, errorThrown){
				handleAjaxError(couponId,jqXHR, textStatus, errorThrown);
			},
			success: function(data) {
				downCouponResult(couponId,data);
			}
    };
	$.ajax(options);
};

var downCouponResult = function(couponId,resp){
	var $downButton = $.mobile.activePage.find('#cp_downButton');
	$downButton.val('下载优惠券');
    $downButton.attr('onClick','downCoupon('+couponId+')');
	//data = $.parseJSON(resp);
	if(-1==resp.status)
	{
		alert("请先登录再下载优惠券！");
		return;
	}
	url = "couponpublish/downCouponResult.action"+jssessionid;
	document.getElementById("scriptResultData").value = resp;
	document.getElementById("pageMainForm").action = url;
	document.getElementById("pageMainForm").submit();
};

var initSubmitTimeout = 30000,maxSubmitTimeout = 120000;
var handleAjaxError = function(couponId,jqXHR, textStatus, errorThrown)
{
	var $downButton = $.mobile.activePage.find('#cp_downButton');
	$downButton.val('下载');
    $downButton.attr('onClick','downCoupon('+couponId+')');
	if(textStatus)
	{
		if('timeout'==textStatus)
		{
			alert("超时，估计是网络影响，请重试！");
			/*if(initSubmitTimeout>=maxSubmitTimeout)
			{
				alert("超时，您的网络实在太不给力了，请切换改善网络再尝试！");
			}
			else
			{
				if(initSubmitTimeout<10000)
					initSubmitTimeout += 1000;
				else if(initSubmitTimeout<20000)
					initSubmitTimeout += 1500;
				else if(initSubmitTimeout<30000)
					initSubmitTimeout += 3000;
				else initSubmitTimeout += 4000;
				alert("超时，估计是网络影响，请重试！");
			}*/
		} else if('error'==textStatus)
		{
			alert("出错");
		} else if('abort'==textStatus)
		{
			alert("执行退出");
		} else if('parsererror'==textStatus)
		{
			alert("响应不能解释");
		}
	} else if (errorThrown)
	{
		alert("服务器页面出现异常");
	}
};
var downloadcoupon = function (couponId,loginUrl) {
   var $msgDiv = $.mobile.activePage.find('#tuan_ok');
   var $spanResult = $msgDiv.find('#result');
   var $spanMsg = $msgDiv.find('#msg');
   var $closeMsg = $msgDiv.find('#closeMsg');
   var $downButton = $.mobile.activePage.find('#cp_downButton');
   $downButton.val('提交...');
   $downButton.removeAttr('onClick');
	var options = 
    {
		    url:"couponpublish/downCoupon.action"+jssessionid,
		    data: {'couponID':couponId,'channels':2},
			dataType:'json',
			type:'post',
			error:function(a,b){
		    	alert("status=="+a.status);
                alert("readyState=="+a.readyState);
		    	alert(""+b);
				$spanResult.text('下载失败！');
	            $spanMsg.text('请稍后再试！');
				$msgDiv.show();
				$downButton.val('下载');
                $downButton.attr('onClick','downloadcoupon('+couponId+',"'+loginUrl+'")');
			},
			success: function(data) {
				if(data.status!=0){
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       $spanResult.text('没有登录！');
	                       $spanMsg.text('请先登录！');
	                       $closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();window.location.href="'+loginUrl+'";');
	                    }else if(data.status==3){
	                       $spanResult.text('下载失败！');
	                       $spanMsg.text('需要资格：'+data.data.quaDescribe+'。');
	                    }else{
	                    	$spanResult.text('下载失败！');
		                    $spanMsg.text(msg);
	                    }
	                }else{
	                       $spanResult.text('下载失败！');
	                       $spanMsg.text(msg);
	                }
                }else if(data.status==0){
                    $spanResult.text('下载成功！');
	                $spanMsg.text('请到个人账户查询确认');
	                queryCouponByUpdate(couponId);
                }else{
                	$spanResult.text('下载 失败！');
	                $spanMsg.text(data);
                }  
                $msgDiv.show();
                $downButton.val('下载');
                $downButton.attr('onClick','downloadcoupon('+couponId+',"'+loginUrl+'")');
			}
    };
	$.ajax(options);
};
var downloadcouponlist = function (couponId,loginUrl,buttonID) {
	   var $msgDiv = $.mobile.activePage.find('#tuan_ok');
	   var $spanResult = $msgDiv.find('#result');
	   var $spanMsg = $msgDiv.find('#msg');
	   var $closeMsg = $msgDiv.find('#closeMsg');
	   var $downButton = $.mobile.activePage.find(buttonID);
	   $downButton.val('提交...');
	   $downButton.removeAttr('onClick');
		var options = 
	    {
			    url:"couponpublish/downCoupon.action"+jssessionid,
			    data: {'couponID':couponId,'channels':2},
				dataType:'json',
				type:'post',
				error:function(a,b){
			    	alert("status=="+a.status);
	                alert("readyState=="+a.readyState);
			    	alert(""+b);
					$spanResult.text('下载失败！');
		            $spanMsg.text('请稍后再试！');
					$msgDiv.show();
					$downButton.val('立即下载');
	                $downButton.attr('onClick',"downloadcouponlist("+couponId+",'"+loginUrl+"','"+buttonID+"')");
				},
				success: function(data) {
					if(data.status!=0){
	                    var msg = data.msg;
		                if(msg!=null&&msg.length>0){
		                    if(msg.indexOf('nologin')>-1){
		                       $spanResult.text('没有登录！');
		                       $spanMsg.text('请先登录！');
		                       $closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();window.location.href="'+loginUrl+'";');
		                    }else if(data.status==3){
		                       $spanResult.text('下载失败！');
		                       $spanMsg.text('需要资格：'+data.data.quaDescribe+'。');
		                    }else{
		                    	$spanResult.text('下载失败！');
			                    $spanMsg.text(msg);
		                    }
		                }else{
		                       $spanResult.text('下载失败！');
		                       $spanMsg.text(msg);
		                }
	                }else if(data.status==0){
	                    $spanResult.text('下载成功！');
		                $spanMsg.text('请到个人账户查询确认');
		                queryCouponByUpdate(couponId);
	                }else{
	                	$spanResult.text('下载 失败！');
		                $spanMsg.text(data);
	                }  
					set_center_sk($msgDiv);
	                $msgDiv.show();
	                $downButton.val('立即下载');
	                $downButton.attr('onClick',"downloadcouponlist("+couponId+",'"+loginUrl+"','"+buttonID+"')");
				}
	    };
		$.ajax(options);
	};

	var set_center = function (obj) { 
		obj.css("position","absolute"); 
		obj.css("top", ( $(window).height() - obj.height() ) / 2 + "px"); 
	} 
	
var continueQueryCoupon = function(basePath,resultFunction,city,area,firstindustry,secIndustry,sortname,sorttype){
	var pageno = $.mobile.activePage.find("#pageno").val();
	var totalpg = $.mobile.activePage.find("#totalpage").val();
	//console.log("pageno:"+pageno+"==="+totalpg);
	if((1*totalpg)>-1 && (1*pageno)>(1*totalpg)){
		resultFunction(true);
		return ;
	}
	if(pageno==null){
      pageno = 1;
    }else{
      pageno = parseInt(pageno)+1;
    }
    $.mobile.activePage.find("#pageno").val(pageno);
	var options = 
    {
		    url:"couponpublish/continueQueryCoupon.action"+jssessionid,
		    data: {'pg.pageNo':pageno,
		"seqence.cityId":city,
		 "seqence.areaId":area,
		 "seqence.secIndustryId":firstindustry,
		 "seqence.thrdIndustryId":secIndustry,
		 "seqence.sortName":sortname,
		 "seqence.orderType":sorttype},
			dataType:'json',
			type:'post',
			error:function(a,b){
				//console.log("加载失败！");
				resultFunction();
			},
			success: function(data) {
				continueGetCoupon(basePath,data);
				resultFunction();
			}
    };
	$.ajax(options);
};
var quercoupon = function(hotOrPrice){
	var pgpageno = document.getElementById("pgpageno").value;
	var cityLabelid = document.getElementById("cityLabelid").value;
	var cityLabelParentID = document.getElementById("cityLabelParentID").value ;
	var industryLabelid = document.getElementById("industryLabelid").value ;
	var industryLabelParentID = document.getElementById("industryLabelParentID").value;
	//document.forms[0].action = "";
	//document.forms[0].submit();
	document.forms[0].action="../couponpublish/queryCoupon.action"+jssessionid+"@hotOrPrice="+hotOrPrice+"&cityLabelid="+cityLabelid+"&pgpageno="+pgpageno+"&cityLabelParentID="+cityLabelParentID+"&industryLabelid="+industryLabelid+"&industryLabelParentID="+industryLabelParentID;
	document.forms[0].submit();
}
var comment = function (loginUrl) {
	
	var couponId = $("#couponId").val();
	var content = $("#commentcontent").val();
	   if(content==null||content.trim().length==0){
		      alert('评论不能为空！');
		      return;
		   }	
	//console.log(couponId+"----"+content);
	var options = 
    {
		    url:"../couponpublish/savaComment.action"+jssessionid,
		    data: {'couponID':couponId,'comment':content,'channels':2},
			dataType:'json',
			type:'post',
			error:function(a,b){
				alert("点评失败");
			},
			success: function(data) {
				if(data!=null){
					alert(data.msg);
					if(data.status==0){
					//$.mobile.changePage(loginUrl, "slide");
					window.location.href=loginUrl;
					}else{
					window.history.back();
					}
					
//					if(data.status>0){
//				getCommentList(couponId);
//					}
				}
			}
    };
	$.ajax(options);
	
};
var favorite = function (couponId,loginUrl) {
	var options = 
    {
		    url:"../couponpublish/saveFavorite.action"+jssessionid,
		    data: {'couponID':couponId,'channels':2},
			dataType:'json',
			type:'post',
			error:function(a,b){
				alert("收藏失败");
			},
			success: function(data) {
				if(data!=null){
				    if(data.status==1){
				        alert("收藏成功");
				        var $a = $.mobile.activePage.find('#cp_favorite');
				        $a.text('取消收藏');
				        $a.attr('href','javascript:cancelFavorite('+couponId+',"'+loginUrl+'");');
				    }else if(data.status==0){
				        alert('请先登录');
				        window.location.href=loginUrl;
				    }else if(data.status==-1){
				        alert(data.msg);
				    }else{
				        alert("收藏失败");
				    }
				}else{
				    alert("收藏失败");
				}
			}
    };
	$.ajax(options);
};

var cancelFavorite = function(couponId,loginUrl){
	var options = 
    {
		    url:"../couponpublish/cancelFavorite.action"+jssessionid,
		    data: {'couponID':couponId},
			dataType:'json',
			type:'post',
			error:function(a,b){
				alert("取消收藏失败");
			},
			success: function(data) {
				if(data!=null){
				    if(data.status==1){
				        alert("取消收藏成功");
				        var $a = $.mobile.activePage.find('#cp_favorite');
				        $a.text('收藏');
				        $a.attr('href','javascript:favorite('+couponId+',"'+loginUrl+'");');
				    }else if(data.status==0){
				        alert('请先登录');
				        window.location.href=loginUrl;
				    }else if(data.status==-1){
				        alert(data.msg);
				    }else{
				        alert("取消收藏失败");
				    }
				}else{
				    alert("取消收藏失败");
				}
			}
    };
	$.ajax(options);
}

var getCommentList = function (couponId) {
	var options = 
    {
		    url:"couponpublish/getCommentList.action"+jssessionid,
		    data: {'couponID':couponId},
			dataType:'json',
			type:'post',
			error:function(a,b){
				//console.log("查询评论失败！"+a+","+b);
			},
			success: function(data) {
				//console.log(data);
				getComment(data);
			}
    };
	$.ajax(options);
};

var queryCouponByUpdate = function(couponId){
    var options = 
    {
		    url:"couponpublish/queryCouponByUpdate.action"+jssessionid,
		    data: {'couponID':couponId},
			dataType:'json',
			type:'post',
			error:function(a,b){
				//console.log("查询下载人数失败！");
			},
			success: function(data) {
				//console.log(data);
				if(data!=null&&data.status==1){
				    var amount = data.amount;
				    if(amount!=null){
				      $.mobile.activePage.find('#cp_amount').text(amount);
				    }
				}
			}
    };
    $.ajax(options);
} 


var getLikeCoupon = function (couponId) {
	var options = 
    {
		    url:"../couponpublish/getLikeCoupon.action"+jssessionid,
		    data: {'couponID':couponId},
			dataType:'json',
			type:'post',
			error:function(a,b){
				//console.log("查询猜你喜欢失败！");
			},
			success: function(data) {
				likeCoupon(data);
			}
    };
	$.ajax(options);
	
};
var getPopularCoupon = function () {
	
//jQuery.ajax({
    //type : 'GET',
    //url  : 'couponpublish/getPopularCoupon.action',
   // dataType:'text' ,
    //success:function(data)
    //{
	//popularCoupon(data);
    //},
    //error:function(){
    //}
   //});
	var options = 
    {
		    url:"../couponpublish/getPopularCoupon.action"+jssessionid,
			dataType:'json',
			type:'post',
			error:function(a,b){
		//console.log("查询热门优惠失败！");
			},
			success: function(data) {
				popularCoupon(data);
			}
    };
	$.ajax(options);
}
var getRecommendedCoupon = function () {
	
	var options = 
    {
		    url:"../couponpublish/getRecommendedCoupon.action"+jssessionid,
			dataType:'json',
			type:'post',
			error:function(a,b){
		//console.log("查询热门优惠失败！");
			},
			success: function(data) {
				recommendedCoupon(data);
			}
    };
	$.ajax(options);
}
var getComment = function(data){
	var strComment = '';
	var sourcename='';
	if(data!=null&&data.status==1){
	    if(data.listData!=null&&data.listData.length>0){
	        $(data.listData).each(function (index){ 
				var strScore = '';
	            if(this.score>0){
	                strScore+='——';
	                for(var i=1;i<=5;i++){
	                   strScore+='<img align="absmiddle" src="images/'+(i<=this.score?'stars2':'stars1')+'.png">';
	                }
	            }
	            strComment+='<section><p><strong>'+this.phoneNO+'</strong>'+strScore+'</p>'+
	               '<p>“'+this.content+'”<span class="cgrey">('+parseJSONDateFormat(String(this.recordTime.time))+')</span></p></section>';
		    });
			$.mobile.activePage.find('#comment').find('section').remove();
		    $.mobile.activePage.find('#commentList').before(strComment);
	    }else{
	    	$.mobile.activePage.find('#commentList').before('<p class="no_d"> 暂无评价! </p>');
	    }
	}
};
var likeCoupon = function(data){
	var likeCoupon = '';
	if(data!=null){
		$(data.likeCoupon).each(function (index){ 
		likeCoupon += "<li><p><a href='../couponpublish/queryCouponByID.action"+jssessionid+"@couponID="+this.couponId+"'><img style='width:196px;height:126px;' src='../../mupublish/image@imgName="+this.iconPath+"' /></a></p><p class='success_title_b'><a href='#'>"+this.title+"</a></p></li>";
	});
	 $(likeCoupon).appendTo("#likeCoupon");
	}
};

var popularCoupon = function(data){
	var popularCoupon = '';
	var mes = "";
	if(data!=null){
		$(data.popularCoupon).each(function (index){
			if(this.kind==0){
				mes="折";
			}
			popularCoupon += "<li><h4>"+this.title+"</h4>" +
			"<p><a href='../couponpublish/queryCouponByID.action"+jssessionid+"@couponID="+this.couponId+"'><img style='width:186px;height:104px;' src='../../mupublish/image@imgName="+this.iconPath+"' /></a></p>" +
					"<span style='float:right;'>原价"+this.originalPrice+"</span>" +
					"<p class='font_30 cred'>"+this.discountOrprice+mes+"</p>"+
					"<p>"+this.subcount+"人已购买</p>"+
					"</li>";
	});
   }
	 //$("#popularCoupon").html(popularCoupon);
	 $(popularCoupon).appendTo("#popularCoupon");
};
var recommendedCoupon = function(data){
	var recommendedCoupon = '';
	var mes = "";
	if(data!=null){
		$(data.recommendedCoupon).each(function (index){
			if(this.kind==0){
				mes="折";
			}
			recommendedCoupon += "<li><h4>"+this.title+"</h4>" +
			"<p><a href='../couponpublish/queryCouponByID.action"+jssessionid+"@couponID="+this.couponId+"'><img style='width:186px;height:104px;' src='../../mupublish/image@imgName="+this.iconPath+"' /></a></p>" +
					"<span style='float:right;'>原价"+this.originalPrice+"</span>" +
					"<p class='font_30 cred'>"+this.discountOrprice+mes+"</p>"+
					"<p>"+this.subcount+"人已购买</p>"+
					"</li>";
		});
	}
	 //$("#recommendedCoupon").html(recommendedCoupon);
	 $(recommendedCoupon).appendTo("#recommendedCoupon");
};

var continueGetCoupon = function(basePath,data){
	var message = "";
	var pageno;
	//var discountOrprice;
	if(data!=null&&data.status==1){
	    if(data.listData!=null&&data.listData.length>0){
			$(data.listData).each(function (index){
				/*if(this.kind==0){
					discountOrprice=this.discountOrprice+"折";
				}else{
					discountOrprice="&yen;"+this.discountOrprice;
				}*/
				message += " <li>" +
					"<a data-transition='slide' href='"+basePath+"couponpublish/queryCouponByID.action"+jssessionid+"@couponID="+this.couponId+"'></a>" +
					"<em><img src='"+this.describe.iconPath+"'></em>"+
				    "<div>"+
				    "<h1>"+(this.title==null?"":(this.title.length>30?this.title.substring(0,30)+"...":this.title))+"</h1>"+
				    "<p>已下载人数：<span class='cred fi16'>"+this.subcount+"人</span></p>"+
				    "</div>"+
				    "</li>";
		     });
	    }
	 $(message).appendTo("#couponullistid");
	}
};

var yh_queryProductInfo = function(url,currencyID){
	var parameter = {"currencyID":currencyID,"terminalKind":0};
	var url = url;
	jQuery.ajax({
		type:"post",
		url :url,
		data:parameter,
		dataType:'html',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		error:function(a,b,c){
		},
		success: function(data){
			if(data!=null&&data!=""){
				$.mobile.activePage.find("#shop_productInfo").html(data);
			}
		}
    });
};