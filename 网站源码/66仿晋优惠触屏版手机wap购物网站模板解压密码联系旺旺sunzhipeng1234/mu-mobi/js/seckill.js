var servletPath = window.location.pathname;
var idx = servletPath.indexOf(";");
var jssessionid="";
if(idx>-1){
	jssessionid = servletPath.substr(idx);
}
if(wjsessionid){
	jssessionid = wjsessionid;
}

Date.prototype.Format = function(fmt)   
{ //author: meizz   
  var o = {   
    "M+" : this.getMonth()+1,                 //月份   
    "d+" : this.getDate(),                    //日   
    "h+" : this.getHours(),                   //小时   
    "m+" : this.getMinutes(),                 //分   
    "s+" : this.getSeconds(),                 //秒   
    "q+" : Math.floor((this.getMonth()+3)/3), //季度   
    "S"  : this.getMilliseconds()             //毫秒   
  };   
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
};

//滚动动态加载
var querySeckill = function(currentPath,skill_resultFunction,city,area,firstindustry,secIndustry,sortname,sorttype,activeStatue){
	var pageno =  $.mobile.activePage.find("#hiddenpage").val();
	var pageToal = $.mobile.activePage.find("#pageTotal").val();
	if((pageno*1)>=(pageToal*1)){
		skill_resultFunction(true);
		return ;
	}
	pageno++;
	$.mobile.activePage.find("#hiddenpage").val(pageno);
	$.ajax({
		   type: "POST",
		   dataType:"json",
		   url: currentPath+"seckillnpublish/ajaxQuerySeckill.action"+jssessionid,
		   data:{"pg.pageNo":pageno,
				 "seqence.cityId":city,
				 "seqence.areaId":area,
				 "seqence.secIndustryId":firstindustry,
				 "seqence.thrdIndustryId":secIndustry,
				 "seqence.sortName":sortname,
				 "seqence.orderType":sorttype,
				 "seqence.activeStatue":activeStatue},
		   success: function(data){
			   if(data.status==1){
				   insertSeckill(data.seckills,currentPath);
			   }
			   skill_resultFunction();
		   },
		   error: function(){
			 skill_resultFunction();
		   }
		});		
};

var insertSeckill = function(seckills,currentPath){
	var insertbody = "";
	var loginUrl=$.mobile.activePage.find("#loginUrl").val();
	for(var i=0;i<seckills.length;i++){
		var seckill = seckills[i];
		insertbody +="<li><h1><a data-transition='slide' href='"+currentPath+"seckillnpublish/querySeckillByID.action"+jssessionid+"@seckillTimeID="+seckill.seckillTime.timeId+"'>"+seckill.title+"</a></h1>";
		insertbody +="<table width='100%' border='0'><tr>";
		insertbody +="<td width='110px'><a data-transition='slide' href='"+currentPath+"seckillnpublish/querySeckillByID.action"+jssessionid+"@seckillTimeID="+seckill.seckillTime.timeId+"'>";
		insertbody +="<img width='100px' height='66px' src='"+seckill.describe.iconPath+"'></a></td>";
		insertbody +="<td valign='top'><p>价格：<strong>"+seckill.payPrice+"</strong>元<span class='g_price'>"+seckill.originalPrice+"元</span></p>";
		if(seckill.seckillTime.showtypeView==0){
			if(seckill.seckillTime.balanceNum>0){
				insertbody +="<p>距离结束：<span id='time"+seckill.seckillTime.timeId+"'  class='cred'></span></p>";
				timerUtil(seckill.validEndString,"#time"+seckill.seckillTime.timeId,2);
			}
		}else{
			if(seckill.seckillTime.showtypeView==4){
				insertbody +="<p>距离开始：<span id='time"+seckill.seckillTime.timeId+"' class='cred'></span></p>";
				timerUtil(seckill.validStartString,"#time"+seckill.seckillTime.timeId,2);
			}
		}
		insertbody +="<p>";
		if(seckill.status==2||seckill.seckillTime.status==2){
			insertbody +="<input name='' class='sckill_btn' type='button' value='已暂停' data-role='none' />";
		}else{
			if(seckill.status==1&&seckill.seckillTime.status==1){
				if(seckill.seckillTime.balanceNum>0){
					if(seckill.seckillTime.showtypeView==0){
					    if(seckill.currencyTotal==-1){
					    	insertbody +="<input id='seckillbt"+seckill.seckillTime.timeId+"'  class='sckill_btn' name='' type='button' value='立即秒杀'  data-role='none' />";
					    	insertbody +="&nbsp;&nbsp;库存充足";
					    }else if((seckill.currencyTotal-seckill.seckillTime.subCount)>0){
					    	insertbody +="<input id='seckillbt"+seckill.seckillTime.timeId+"'  class='sckill_btn' name='' type='button' value='立即秒杀' data-role='none' />";
					    	insertbody +="&nbsp;&nbsp;仅剩<span class='cred'>"+(seckill.currencyTotal-seckill.seckillTime.subCount)+"</span>件";
					    }else if((seckill.currencyTotal-seckill.seckillTime.subCount)<=0){
					    	insertbody +="<input  class='sckill_btna' name='' type='button' value='已卖光' data-role='none' />";
					    }
					}else{
						insertbody +="<input  class='sckill_btna' name='' type='button' value='"+seckill.seckillTime.showtypeBTStr+"' data-role='none' />";
					}
				}else{
					insertbody +="<input  class='sckill_btna' name='' type='button' value='已卖光' data-role='none' />";
				}
			}else{
				insertbody +="<input  class='sckill_btna' name='' type='button' value='已下架' data-role='none' />";
			}
		}
		insertbody +="</p></td></tr>  </table></li>";
		
		
		
	}
	$.mobile.activePage.find("#seckillul").append(insertbody);
	btn_tap_bind();
};

//收藏
var faverateseckill = function(id,basePath,loginpath){
	var $msgDiv = $.mobile.activePage.find('#tuan_ok');
	   var $spanResult = $msgDiv.find('#result');
	   var $spanMsg = $msgDiv.find('#msg');
	   var $closeMsg = $msgDiv.find('#closeMsg');	   
	   var options = 
     {
		    url:basePath+"/seckillnpublish/SaveFavorite.action"+jssessionid,
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{"seckillId":id},
			error:function(a,b){
				alert("评论失败！");
			},
			success: function(data) {
				if(data.status==0){
					if(data.msg.indexOf("登录")>-1){
						$spanResult.text("没有登录");
						$spanMsg.text("请你登录");
						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();gotologin("'+loginpath+'");');
					}else{
						$spanResult.text("收藏失败");
						$spanMsg.text(data.msg);
						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
					}
				}else {
					$.mobile.activePage.find("#showFavorite").html("<a href='javascript:cansolefaverate("+id+",\""+basePath+"\",\""+loginpath+"\");'>取消收藏</a>");
					$spanResult.text("收藏成功");
					$spanMsg.text("");
					$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
				}
				$msgDiv.show();
			}
	};
	$.ajax(options);
};
var btn_tap_bind=function(){
	$('.sckill_btn').off('tap');
	$('.sckill_btn').on("tap",function(){
	    var obj_id =  $(this).attr("id");
	    var skid = obj_id.replace('seckillbt','');
	    seckillit(skid,'${loginUrl}','#'+obj_id);
	  });      
}

var cansolefaverate = function(id,basePath,loginpath){
   var $msgDiv = $.mobile.activePage.find('#tuan_ok');
   var $spanResult = $msgDiv.find('#result');
   var $spanMsg = $msgDiv.find('#msg');
   var $closeMsg = $msgDiv.find('#closeMsg');
   
	 var options = 
    {
		    url:basePath+"/seckillnpublish/CansoleFavorite.action"+jssessionid,
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{"seckillId":id},
			error:function(a,b){
				alert("取消失败！");
			},
			success: function(data) {
				if(data.status==0){
					if(data.msg.indexOf("登录")>-1){
						$spanResult.text("没有登录");
						$spanMsg.text("请你登录");
						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();gotologin("'+loginpath+'");');
					}else{
						$spanResult.text("取消失败");
						$spanMsg.text(data.msg);
						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
					}
				}else {
					$.mobile.activePage.find("#showFavorite").html("<a href='javascript:faverateseckill("+id+",\""+basePath+"\",\""+loginpath+"\");'>收藏</a>");
					$spanResult.text("取消成功");
					$spanMsg.text("");
					$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
				}
				$.mobile.activePage.find("#tuan_ok").show();
			}
	};
	$.ajax(options);
};




//点评

var showcomment = function(seckilltimeid,basePath){
		$.ajax({
			   type: "POST",
			   dataType:"json",
			   url: basePath+"/seckillnpublish/showComment.action"+jssessionid,
			   data:{"seckillTimeId":seckilltimeid},
			   success: function(data){
				   if(data.status==1){
						insertcomment(data.comments,basePath);
					}else{
						$.mobile.activePage.find("#commentdiv").before('<p class="no_d"> 暂无评价! </p>');
					}
			   },
			   error: function(){
				   $.mobile.activePage.find("#commentdiv").before("获取评论失败");
			   }
			});			
};

var insertcomment = function(comments,basePath){
	if(comments.length>0){
		var body = '';
		for(var i=0;i<comments.length;i++){		
			var comment = comments[i];	
	        body +='  <section>';
	        body +='<p><strong>';
		    body +=comment.phoneNO;
	        body +='——';
	        var count = (comment.score*10)/10;
	        for(var j = 0;j<count;j++){
				body+='<img src="'+basePath+'/images/stars2.png" />';
			}
			for(var su=5-count;su>0;su--){
				body+='<img src="'+basePath+'/images/stars1.png" />';
			}
	        body +='</strong>';
	        body +='</p>';
	        
	        body +='<p>“'+comment.content+'”<span class="cgrey">('+(new Date(comment.recordTime.time)).Format("yyyy-MM-dd")+')</span></p>';
	        body +='</section>';	
		}
		$.mobile.activePage.find("#commentdiv").before(body);
		
	}
};


var seckillcomment = function(){
   var $comment = $.mobile.activePage.find("#seckillcommentContent");
   if($comment.val()==null||$comment.val().trim().length==0){
      alert('评论不能为空！');
      return;
   }
   var $msgDiv = $.mobile.activePage.find('#tuan_ok');
   var $spanResult = $msgDiv.find('#result');
   var $spanMsg = $msgDiv.find('#msg');
   var $closeMsg = $msgDiv.find('#closeMsg');
   var seckillID = $('#commentseckilltimeID').val();
   var options = 
     {
		    url:"seckillnpublish/SaveComment.action"+jssessionid,
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{"seckillId":seckillID,"comments":$comment.val()},
			error:function(a,b){
				alert("评论失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status!=1){
                    var msg = data.msg;
                    if(msg.indexOf("登录")>-1){
						$spanResult.text("没有登录");
						$spanMsg.text("请你登录");
						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();gotologin("'+loginpath+'");');
					}else{
						$spanResult.text("评论失败");
						$spanMsg.text(msg);
						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
					}
                }else{
                    $comment.val('');
                    $spanResult.text("评论成功");
					$spanMsg.text("请查看评论");
					$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
                }
                $.mobile.activePage.find("#tuan_ok").show();
			}
	};
	$.ajax(options);
};

//秒杀
function seckillit(id,loginpath,buttonID){
	$(buttonID).hide();
	 var $msgDiv = $.mobile.activePage.find('#tuan_ok');
	   var $spanResult = $msgDiv.find('#result');
	   var $spanMsg = $msgDiv.find('#msg');
	   var $closeMsg = $msgDiv.find('#closeMsg');
	 var options = 
     {	    url:"seckillnpublish/secKillt.action"+jssessionid,
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{"seckillTimeID":id},
			error:function(a,b){
				alert("秒杀失败！");
				$(buttonID).show();
			},
			success: function(data) {
                if(data.status!=0){
                    var msg = data.msg;
                    if(msg.indexOf("登录")>-1){                	
						$spanResult.text("没有登录");
						$spanMsg.text("请你登录");
						//$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();gotologin("'+loginpath+'");');
						set_center_sk($.mobile.activePage.find("#tuan_ok"));
						$.mobile.activePage.find("#tuan_ok").show();
						$("#closeMsg").on("tap",function(){
							$.mobile.activePage.find("#tuan_ok").hide();gotologin(loginpath);
						  });   
//                    }else if(data.status==9){
//						
////						$spanResult.text("尊敬的晋优惠的会员客户，非常抱歉您没有参加本活动的资格!");
////						$spanMsg.text("资格就是您是否有参加活动的准入条件，如果您没有该资格说明您不能参与指定活动。资格往往是商家赋予它的客户或联盟商家客户参与某活动的权利，如果您没有指定活动的资格证明商家没赋予您参与此活动的权利。如果您确信您具备拥有参与本次活动的资格，但系统提示您不具备参与活动的资格，您可以联系举办此活动的商家。");
////						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
//					}else if(data.status==7||data.status==8){
////						$spanResult.text("尊敬的晋优惠的会员客户，非常抱歉您的信用积分不足以参加此活动");
////						$spanMsg.text("信用积分是会员客户参与晋优惠行为的信用评分，此评分是晋优惠会员客户");
////						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
//					}else{
////						$spanResult.text("秒杀失败");
////						$spanMsg.text("请稍候再试!");
////						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');
//					
//					}
                   
                    }else{
                    	$(buttonID).show();
                    	window.location="seckillnpublish/showSeckillResult.action"+jssessionid+"@status="+data.status+"&seckillTimeID="+id+"&msg="+data.msg;
                    }
                    $(buttonID).show();
                }else{
                   // alert('秒杀成功！');
                	if(data.status==0){
                		//$spanResult.text("秒杀成功");
//                		$spanResult.text("您已成功参与秒杀活动，您的商品已经存入您的账户！请到个人中心查看。");                		
//						$spanMsg.text("您可以在个人中心获取电子凭证，系统会通过短信或彩信的方式发送到您的手机上。到指定商家后，出示电子凭证即可兑换指定商品。");
//						$closeMsg.attr('onClick','$.mobile.activePage.find("#tuan_ok").hide();');                		
                		window.location="seckillnpublish/showSeckillResult.action"+jssessionid+"@status="+data.status+"&seckillTimeID="+id+"&accountid="+data.accountid+"&msg="+data.msg;
                	}
                }
               
			}
	};
	$.ajax(options);
}



var gotologin=function(loginpath){
	window.location.href=loginpath;
};


var showProduct = function(currencyid,urlbath){
	var parameter = {"currencyID":currencyid,"terminalKind":0};
	var url = urlbath+"shopCurrencyDetail"+jssessionid;
	jQuery.ajax({
		type:"post",
		url :url,
		data:parameter,
		dataType:'html',
		contentType: "application/x-www-form-urlencoded; charset=utf-8",
		error:function(a,b,c){
		},
		success: function(result){
			if(result!=""||result!=null){
				$("#productshow").html(result);
			}
		}
});
};
