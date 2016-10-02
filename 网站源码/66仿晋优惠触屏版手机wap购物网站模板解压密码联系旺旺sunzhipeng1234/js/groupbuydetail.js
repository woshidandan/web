var servletPath = window.location.pathname;
var idx = servletPath.indexOf(";");
var jssessionid="";
if(idx>-1){
	jssessionid = servletPath.substr(idx);
}
if(wjsessionid){
	jssessionid = wjsessionid;
}
console.log("wjsessionid:=="+wjsessionid);
var groupBuy = {};
groupBuy.util = {};
groupBuy.util.parseJSONDateFormat = function(timeString) {
    if(timeString==null||timeString.trim()==''){
        return '';
    }
    var date = new Date(parseInt(timeString.replace("/Date(", "").replace(")/", ""), 10));
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var min = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    // var sec = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    //return date.getFullYear() + "-" + month + "-" + currentDate + " " +hour+":"+min+":"+sec;
    return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + min;
};
var parseJSONDateFormat = groupBuy.util.parseJSONDateFormat;

var queryNewComment = function(groupbuyId){
//alert('查询：'+groupbuyId);
     var options = 
     {
		    url:"groupbuypublish/queryNewComment.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'groupbuyID':groupbuyId},
			error:function(a,b){
				//alert("获取评论失败！");
			},
			success: function(data) {
			    if(data.status!=1){
			       //alert("获取评论失败！");
			    }else{
			       var list = data.listData;
			       if(list!=null&&list.length>0){
			           $.mobile.activePage.find('#comment').find('section').remove();
	                   var $toCommentDiv = $.mobile.activePage.find('#toComment');
	                   $(list).each(function(index) {
	                       var strScore = '';
	                        if(this.score>0){
	                            strScore+='——';
	                            for(var i=1;i<=5;i++){
	                               strScore+='<img align="absmiddle" src="images/'+(i<=this.score?'stars2':'stars1')+'.png">';
	                            }
	                        }
						   var temp = '<section><p><strong>'+this.phoneNO+'</strong>'+strScore+'</p>'+
						   '<p>“'+this.content+'”<span class="cgrey">('+parseJSONDateFormat(String(this.recordTime.time))+')</span></p>'+
						   '</section>';
	                        $toCommentDiv.before(temp);
	                   });
                   }else{
                	   $('#toComment').append('<p class="no_d"> 暂无评价! </p>');
                   }
			    }
			}
	};
	$.ajax(options);
};

var commentSubmit = function(loginUrl){
   var $comment = $.mobile.activePage.find('#commentContent');
   if($comment.val()==null||$comment.val().trim().length==0){
      alert('评论不能为空！');
      return;
   }
   var groupbuyID = $('#commentForm_groupbuyID').val();
   var options = 
     {
		    url:"groupbuypublish/commentGroupBuy.action"+jssessionid,
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{groupbuyID:groupbuyID,commentContent:$comment.val()}, 
			error:function(a,b){
				alert("评论失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status!=1){
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                   if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       //$.mobile.changePage(loginUrl, "slide");
	                       window.location.href=loginUrl;
	                   }else if(msg.indexOf('null')>-1){
	                       alert('评论不能为空！');
	                   }else{
	                       alert('评论失败！');
	                   }
	                }else{
	                   alert('评论失败！');
	                }
                }else{
                    alert('评论成功！');
                    $comment.val('');
                    window.history.back();
                }
			}
	};
	$.ajax(options);
};

var queryMoreGroupbuy = function(basePath,resultFunction,city,area,firstindustry,secIndustry,sortname,sorttype){
   var $ul = $.mobile.activePage.find("ul#groupbuyList");
   var loginUrl=$.mobile.activePage.find("#loginUrl").val();
   //var $button = $('#loadButton');
   //var buttonHtml = $button.html();
   var pageNo = $ul.attr("data-page");
   var pagaTotal = $ul.attr("data-pagaTotal");
   if((pageNo*1)>=(pagaTotal*1)){
     resultFunction(true);
     return;
   }
   if(pageNo==null){
      pageNo = 1;
   }else{
      pageNo = parseInt(pageNo)+1;
   }
   $ul.attr("data-page",pageNo);
   //$button.text('正在加载。。。');
   var options = 
     {
		    url:"groupbuypublish/queryMoreGroupbuy.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'pg.pageNo':pageNo,
				   "seqence.cityId":city,
					 "seqence.areaId":area,
					 "seqence.secIndustryId":firstindustry,
					 "seqence.thrdIndustryId":secIndustry,
					 "seqence.sortName":sortname,
					 "seqence.orderType":sorttype},
			error:function(a,b){
				//alert("加载失败！");
				//$button.html(buttonHtml);
				resultFunction();
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status!=1){
                    //alert("加载失败！");
                    //$button.html(buttonHtml);
                }else{
                    var gblist = data.listData;
                    //console.log(gblist);
                    if(gblist!=null&&gblist.length>0){
	                   $(gblist).each(function(index) {
	                	 var temp="<li><h1><a href='"+basePath+"groupbuypublish/queryGroupBuyByID.action"+jssessionid+"@groupbuyID="+this.groupBuyID+"' data-transition='slide'>"+this.title+"</a></h1>";
	                	 temp=temp+"<table width='100%' border='0'><tr>"+
				           "<td width='110px'><a href='"+basePath+"groupbuypublish/queryGroupBuyByID.action"+jssessionid+"@groupbuyID="+this.groupBuyID+"' data-transition='slide'>";  
	                	 temp=temp+(this.describe==null?"<img src=''>":"<img width='100px' height='66px' src='")+this.describe.iconPath+"'></a></td>";  
	                	 temp=temp+"<td valign='top'><p>价格：<strong>"+this.payPrice.toFixed(2)+"</strong>元<span class='g_price'>"+this.originalPrice+"元</span></p>";
	                	 if(this.activityStatus=="STATUS_NOSTART"){
	                		 temp=temp+"<p>距离开始：<span class='cred' id='groupbuymore"+this.groupBuyID+"'></span></p>";
	                	 }else{
	                		 temp=temp+"<p>距离结束：<span class='cred' id='groupbuymore"+this.groupBuyID+"'></span></p>";
	                	 }
	                	 temp=temp+"<p>";
	                	 if(this.activityStatus=="STATUS_PAUSE"){
	                		 temp=temp+"<input id='gbButton' class='sckill_btna' name='' type='button' value='暂停' onClick='javascript:void(0);' data-role='none'/>";
	                	 }else if(this.activityStatus=="STATUS_OFFTHESHELF"){
	                		 temp=temp+"<input id='gbButton' class='sckill_btna' name='' type='button' value='下架' onClick='javascript:void(0);' data-role='none'/>";
	                	 }else if(this.activityStatus=="STATUS_NOSTART"){
	                		 temp=temp+"<input id='gbButton' class='sckill_btna' name='' type='button' value='未开始' onClick='javascript:void(0);' data-role='none'/>";
	                	 }else if(this.activityStatus=="STATUS_SOLDOUT"){
	                		 temp=temp+"<input id='gbButton' class='sckill_btna' name='' type='button' value='卖光' onClick='javascript:void(0);' data-role='none'/>";
	                	 }else if(this.activityStatus=="STATUS_END"){
	                		 temp=temp+"<input id='gbButton'  class='sckill_btna' name='' type='button' value='结束' onClick='javascript:void(0);' data-role='none'/>";
	                	 }else {
	                		 temp=temp+"<input id='gbButton"+this.groupBuyID+"' class='sckill_btn' name='' type='button' value='立即抢购' onClick=\"groupbuyit("+this.groupBuyID+",'"+loginUrl+"','#gbButton"+this.groupBuyID+"');\" data-role='none'/>";
	                	 }
	                	 temp=temp+"&nbsp;&nbsp;<span class='cred'>"+this.subCount+"</span>人已参团</p></td></tr>  </table></li>";
	                	   
	                	  
						 //  alert("temp==="+temp);
		                  $ul.append(temp);
		                  gb_tap_bind();
		                  if(this.activityStatus=="STATUS_NOSTART"){
		                	  timerUtil(this.validStartString,'#groupbuymore'+this.groupBuyID,1);
	                	 }else{
	                		 timerUtil(this.validEndString,'#groupbuymore'+this.groupBuyID,1);
	                	 }
	                   });
	                   //$button.html(buttonHtml);
                    }else{
                       //$button.html('加载完毕');
                       //$button.removeAttr('onClick');
                    }
                }
                resultFunction();
			}
	};
	$.ajax(options);
}
var gb_tap_bind=function(){
	$('.sckill_btn').off('tap');
	$('.sckill_btn').on("tap",function(){
	    var obj_id =  $(this).attr("id");
	    var gbid = obj_id.replace('gbButton','');
	    groupbuyit(gbid,'${loginUrl}','#'+obj_id);
	  });      
}
var favoriteGroupBuy = function(groupbuyId,loginUrl){
     var options = 
     {
		    url:"groupbuypublish/favoriteGroupBuy.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'groupbuyID':groupbuyId},
			error:function(a,b){
				alert("收藏失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status==1){
	               alert('收藏成功！');
	               var temp = '<a href="javascript:cancelFavoriteGroupBuy('+groupbuyId+',\''+loginUrl+'\');" id="favorite">取消收藏</a>';
	               $.mobile.activePage.find('#favorite').replaceWith(temp);
                }else if(data.status==-1){
                   alert(data.msg);
                }else{
                   var msg = data.msg;
                   if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       //$.mobile.changePage(loginUrl, "slide");
	                       window.location.href=loginUrl;
	                    }else if(msg.indexOf('error')>-1){
	                       alert('收藏失败，请稍后再试！');
	                    }else{
	                       alert('收藏失败，请稍后再试！');
	                    }
                    }else{
                        alert('收藏失败，请稍后再试！');
                    }
                }
			}
	};
	$.ajax(options);
};

var cancelFavoriteGroupBuy = function(groupbuyId,loginUrl){
     var options = 
     {
		    url:"groupbuypublish/cancelFavoriteGroupBuy.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'groupbuyID':groupbuyId},
			error:function(a,b){
				alert("取消收藏失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status==1){
                    alert('取消收藏成功！');
                    var temp = '<a href="javascript:favoriteGroupBuy('+groupbuyId+',\''+loginUrl+'\');" id="favorite">收藏</a>';
	                $.mobile.activePage.find('#favorite').replaceWith(temp);
                }else if(data.status==-1){
                    alert(data.msg);
                }else{
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       //$.mobile.changePage(loginUrl, "slide");
	                       window.location.href=loginUrl;
	                    }else if(msg.indexOf('error')>-1){
	                       alert('取消收藏失败，请稍后再试！');
	                    }else{
	                       alert('取消收藏失败，请稍后再试！');
	                    }
	                }else{
	                    alert('取消收藏失败，请稍后再试！');
	                }
                } 
			}
	};
	$.ajax(options);
};

var gb_hideMsg = function(){
    $.mobile.activePage.find('#exchangeButton').remove();
    $.mobile.activePage.find('#tuan_ok').hide();
}

//var groupbuyit = function(groupbuyId,loginUrl){
//	var $msgDiv = $.mobile.activePage.find('#tuan_ok');
//	   var $spanResult = $msgDiv.find('#result');
//	   var $spanMsg = $msgDiv.find('#msg');
//	   var $closeMsg = $msgDiv.find('#closeMsg');
//	   var $gbButton = $.mobile.activePage.find('#gbButton');
//	   var tempBtValue = $gbButton.val();
//	   var tempBtAttrValue = $gbButton.attr('onClick');
//	   $gbButton.val('提交...');
//	   $gbButton.removeAttr('onClick');
//	   var options = 
//	     {
//			    url:"groupbuypublish/groupBuyAjax.action"+jssessionid,
//				dataType:'json',
//				type:'post',
//				data:{'groupbuyID':groupbuyId},
//				error:function(a,b){
//					$spanResult.text('团购失败！');
//		            $spanMsg.text('请稍后再试！');
//					$msgDiv.show();
//					$gbButton.val(tempBtValue);
//	                $gbButton.attr('onClick',tempBtAttrValue);
//				},
//				success: function(data) {
//	                if(data.status==0){
//	                    var msg = data.msg;
//		                if(msg!=null&&msg.length>0){
//		                    if(msg.indexOf('nologin')>-1){
//		                       $spanResult.text('没有登录！');
//		                       $spanMsg.text('请先登录！');
//		                       $closeMsg.attr('onClick','gb_hideMsg();window.location.href="'+loginUrl+'";');
//		                    }else{
//		                       $spanResult.text('团购失败！');
//		                       $spanMsg.text(msg);
//		                    }
//		                }
//
//		                $spanResult.text('团购失败！');
//		                $msgDiv.show();
//		                $gbButton.val(tempBtValue);
//		                $gbButton.attr('onClick',tempBtAttrValue);
//		                
//	                }else{
	                	
//--- 本来已经注释                $spanResult.text('团购成功！');
//	                    console.log(data.mapData);
//	                    if(data.mapData!=null){
//	                       if(data.mapData.hadAccounted==false){
//	                           $spanMsg.text('该团购达到最低成团人数人时将自动入账');
//	                       }else{
//	                           $spanMsg.text('团购券已发送到您的账户');
//	                           var accountID = 0;
//				                if(data.mapData.accountID!=null){
//				                   accountID = data.mapData.accountID;
//				                }
//				                 //增加兑换消费按钮
//				                var exchangeURL=$('#common_exchangeHtml5URL').val()+'@accountID='+accountID+'&token='+$('#token').val();
//				                $('<input id="exchangeButton" type="button" value="兑换本券" onClick="gb_hideMsg();window.location.href=\''+exchangeURL+'\';" data-role="none">').insertAfter($closeMsg);
//	                       }
//	                    }
//		                queryGroupBuyByUpdate(groupbuyId);
//-------	                	
//	                	 var basePath = $.mobile.activePage.find("#basePath").val();
//                  	   window.location.href=basePath+"groupbuypublish/groupBuyByResult.action"+jssessionid+"@groupbuyID="+groupbuyId+"&status="+data.status+"&msg="+data.msg;
//                  	  
//	                	
//	                }  
//				}
//		};
//		$.ajax(options);	
//}

var groupbuyit = function(groupbuyId,loginUrl,buttonID){
	var $msgDiv = $.mobile.activePage.find('#tuan_ok');
	   var $spanResult = $msgDiv.find('#result');
	   var $spanMsg = $msgDiv.find('#msg');
	   var $closeMsg = $msgDiv.find('#closeMsg');
	   var $gbButton = $.mobile.activePage.find(buttonID);
	   var tempBtValue = $gbButton.val();
	   var tempBtAttrValue = $gbButton.attr('onClick');
	   $gbButton.val('提交...');
	   $gbButton.removeAttr('onClick');
	    var basePath = $.mobile.activePage.find("#basePath").val();
        window.location.href=basePath+"groupbuypublish/groupBuyByResult.action"+jssessionid+"@groupbuyID="+groupbuyId;
                  	  
	                	
	      }  



var queryGroupBuyByUpdate = function(groupbuyId){
    var $refreshDiv = $.mobile.activePage.find('#refreshGroupBuy');
    //var $refreshDiv = $("div:jqmData(role='page')#gb_describe").find('#refreshGroupBuy');
    var $subCount = $refreshDiv.find('#subCount');
    var $info = $refreshDiv.find('#info');
    var options = 
     {
		    url:"groupbuypublish/queryGroupBuyByUpdate.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'groupbuyID':groupbuyId},
			error:function(a,b){
                //alert('查询失败！');
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status!=1){
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
                           //alert('没有登录！');
	                    }else{
	                       //alert('查询失败！');
	                    }
	                }
                }else{
                    var gbData = data.mapData;
                    var hadBuy = gbData.hadBuy;
                    var maxMembers = gbData.maxMembers;
                    var subCount = gbData.subCount;
                    
                    $subCount.text(subCount);
                    var tempInfo = '';
                    if(hadBuy){
                       tempInfo+='团购成功！';
                       if(maxMembers==-1||subCount<maxMembers){
                          tempInfo+='还可以继续购买！';
                       }
                    }
                    if(maxMembers>-1&&subCount>=maxMembers){
                       tempInfo+='团购数量已满！';
                    }
                    $info.text(tempInfo);
                }  
			}
	};
	$.ajax(options);
}

var gb_queryProductInfo = function(url,currencyID){
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
				$.mobile.activePage.find("#gb_productInfo").html(data);
			}
		}
    });
};