var shop = {};
shop.util = {};
shop.util.getBaseURL = function(){//带'../../default.htm'
    var curWwwPath=window.document.location.href;
    var pathName=window.document.location.pathname;
    var pos=curWwwPath.indexOf(pathName);
    var localhostPaht=curWwwPath.substring(0,pos);
    var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
    return(localhostPaht+projectName+'/');
};

shop.util.parseJSONDateFormat = function(timeString) {
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

shop.util.valInt = function(value){
    var regex = /^\d+$/;
    return regex.test(value);
};

var baseURL = shop.util.getBaseURL();
var parseJSONDateFormat = shop.util.parseJSONDateFormat;

//显示商品信息
var showProduct = function(currencyid,url){
	var parameter = {"currencyID":currencyid,"terminalKind":1};
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

var baseURL = shop.util.getBaseURL();
var parseJSONDateFormat = shop.util.parseJSONDateFormat;

//评论
var shop_queryNewComment = function(shopGoodsID){
     var options = 
     {
		    url:baseURL+"shop/queryNewComment.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'shopProduct.productID':shopGoodsID},
			error:function(jqXHR, textStatus, errorThrown){
				//alert("获取评论失败error！"+textStatus+','+errorThrown);
				//alert("error————"+jqXHR.status);
				//alert("error————"+jqXHR.readyState);				
			},
			success: function(data) {
			    if(data.status!=1){
			       //alert("获取评论失败status！");
			    }else{
                   var list = data.listData;
			       if(list!=null&&list.length>0){
	                   var $toCommentDiv = $.mobile.activePage.find('#toComment');
	                   $toCommentDiv.find('section').remove();
	                   $(list).each(function(index) {
	                        var strScore = '';
	                        if(this.score>0){
	                            strScore+='——';
	                            for(var i=1;i<=5;i++){
	                               strScore+='<img align="absmiddle" src="images/'+(i<=this.score?'stars2':'stars1')+'.png">';
	                            }
	                        }
	                        var temp='<section><p><strong>'+this.nickName+'</strong>'+strScore+'</p>'+
                            '<p>“'+this.content+'”<span class="cgrey">('+parseJSONDateFormat(String(this.recordTime.time))+')</span></p></section>';
	                        $toCommentDiv.before(temp);
	                   });
                   }else{
	                   $.mobile.activePage.find('#toComment').html("<p class='no_d'> 暂无评论! </p>");
                   }
			    }
			}
	};
	$.ajax(options);
};

var favoriteShopProduct = function(productID,loginUrl){
     var options = 
     {
		    url:baseURL+"shop/favoriteShopProduct.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'productID':productID},
			error:function(a,b){
				alert("收藏失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status==1){
	               alert('收藏成功！');
	               var $input = $.mobile.activePage.find('#favoriteShopProduct_btn');
	               $input.attr('onclick','cancelFavoriteShopProduct('+productID+',"'+loginUrl+'");');
	               $input.val('取消收藏');
                }else if(data.status==-1){
                   alert(data.msg);
                }else{
                   var msg = data.msg;
                   if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       window.location.href=loginUrl;
	                    }else{
	                       alert('收藏失败，请稍后再试！');
	                    }
                    }else{
	                    alert('收藏失败！');
	                }
                }
			}
	};
	$.ajax(options);
};

var cancelFavoriteShopProduct = function(productID,loginUrl){
     var options = 
     {
		    url:baseURL+"shop/cancelfavoriteShopProduct.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'productID':productID},
			error:function(a,b){
				alert("取消收藏失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status==1){
                    alert('取消收藏成功！');
	                var $input = $.mobile.activePage.find('#cancelFavoriteShopProduct_btn');
	                $input.attr('onclick','favoriteShopProduct('+productID+',"'+loginUrl+'");');
	                $input.val('收藏');
                }else if(data.status==-1){
                    alert(data.msg);
                }else{
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       window.location.href=loginUrl;
	                    }else{
	                       alert('取消收藏失败，请稍后再试！');
	                    }
	                }else{
	                    alert('取消收藏失败！');
	                }
                }
			}
	};
	$.ajax(options);
};

var shop_queryMoreShopProduct = function(basePath,resultFunction){
    var book_getLine = function(data,index,length,basePath){
	    return  '<li><a href="'+basePath+'shop/queryShopProductByID.action?shopProduct.productID='+data.productID+'"></a>'+
				          '<em>'+'<img src="'+basePath+'image@imgName='+data.shopProductDescribePo.iconPath+'"></em>'+
						  '<div><h1>'+(data.title==null?"":(data.title.length>15?data.title.substring(0,15)+"...":data.title))+'</h1>'+
						  '<span class="cred fs16">¥'+data.fprice+'</span> '+
						  '<span>'+data.saled+'</span>已购买</p>'+
						  '</div></li>';
	};
	
   var $ul = $.mobile.activePage.find("ul#shopProductList");
   var pageNo = $ul.attr("data-page");
   var pagaTotal = $ul.attr("data-pagaTotal");
   if(pageNo>pagaTotal){
     resultFunction(true);
     return;
   }
   if(pageNo==null){
      pageNo = 1;
   }else{
      pageNo = parseInt(pageNo)+1;
   }
   $ul.attr("data-page",pageNo);
   var options = 
     {
		    url:"shop/queryMoreProducts.action",
			dataType:'json',
			type:'post',
			data:{'pg.pageNo':pageNo},
			error:function(a,b){
				//alert("加载失败！");
				resultFunction();
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status!=1){
                    //alert("加载失败！");
                }else{
                    var bglist = data.listData;
                    if(bglist!=null&&bglist.length>0){
                       var temp = '';
	                   $(bglist).each(function(index) {
					      /*var temp = '<li><a href="'+basePath+'book/queryBookGoodsByID.action@bookGoodsID='+this.goodsID+'"></a>'+
				          '<em><img src='+basePath+'image?imgName='+this.wapIconPath+'"></em>'+
						  '<div><h1>'+(this.name!=null&&this.name.length>0?this.name.substring(0,16):'')+'</h1>'+
						  '<p>预订价：<span class="cred f20">¥'+this.currentPrice+'</span></p>'+
						  '</div></li>';*/
						  temp += book_getLine(this,index,bglist.length,basePath);
	                   });
	                   $ul.append(temp);
                    }else{
                    }
                }
                resultFunction();
			}
	};
	$.ajax(options);
}

var shop_queryProductInfo = function(url,currencyid){
	var parameter = {"currencyID":currencyid,"terminalKind":0};
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

var shop_checkBuyTotal = function(){
    var inputTotal = $('#amount').val();
    var productTotal = $('#shop_balance_show').text().trim();
    if(inputTotal==null||inputTotal.trim()==''){
        alert('数量不能为空');
        return false;
    }else if(!shop.util.valInt(inputTotal)||inputTotal<1){
        alert('请输入有效数量');
        return false;
    }else if(productTotal!='无限制'&&inputTotal>parseInt(productTotal)){
        alert('您的购买数量已超过库存，请调整您的购买数量');
        return false;
    }
    
    return true;
}

var shop_getToBuyTotal = function(){
    return $('#amount').val();
}

var shop_checkBuyTotalOnBlur = function(){
    var $inputTotal = $('#amount');
    if($inputTotal.val()!=null&&!shop.util.valInt($inputTotal.val())){
        $inputTotal.val('');
    }
}

var shop_hideMsg = function(){
    $.mobile.activePage.find('#exchangeButton').remove();
    $.mobile.activePage.find('#tuan_ok').hide();
}


var addnum = function(f){
  	var a= $('#amount').val();
  	a=parseInt(a);
  	if(isNaN(a)){
  		alert("请输入正确的数字！");
  		$('#amount').val(1);
  		return;
  	}
  	
  	if(f==0){
  		if(a<=1){
  			$('#amount').val(1);
  		}else{
  			$('#amount').val(a-1);
  		}
  	}
  
  	  	if(f==1){
  		if(a<=0){
  			$('#amount').val(1);
  		}else{
  			$('#amount').val(a+1);
  		}
  	}
  
  }
  


var shop_buy = function(){
   if(!shop_checkBuyTotal()){
       return;
   }
   
   var $msgDiv = $.mobile.activePage.find('#tuan_ok');
   var $spanResult = $msgDiv.find('#result');
   var $spanMsg = $msgDiv.find('#msg');
   var $closeMsg = $msgDiv.find('#closeMsg');
   var $gbButton = $.mobile.activePage.find('#shopButton');
   var tempBtValue = $gbButton.val();
   var tempBtAttrValue = $gbButton.attr('onClick');
   $gbButton.val('提交...');
   $gbButton.removeAttr('onClick');
  // alert(11);
   var options = 
     {
		    url:baseURL+"shop/buy.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'productID':$('#productID').val(),'amount':shop_getToBuyTotal()},
			error:function(a,b){
				$spanResult.text('购买失败！');
	            $spanMsg.text('请稍后再试！');
				$msgDiv.show();
				$gbButton.val(tempBtValue);
                $gbButton.attr('onClick',tempBtAttrValue);
			},
			success: function(data) {
               // alert("status:"+data.status);
                if(data.status==0){
                    var msg = data.msg;
                 //   alert(msg);
	                if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       $spanResult.text('没有登录！');
	                       $spanMsg.text('请先登录！');
	                       $closeMsg.attr('onClick','shop_hideMsg();window.location.href="'+$('#loginUrl').val()+'";');
	                    }else{
	                       $spanResult.text('购买失败！');
	                       $spanMsg.text(msg);
	                    }
	                }
	                $msgDiv.show();
	                $gbButton.val(tempBtValue);
	                $gbButton.attr('onClick',tempBtAttrValue);
                }else{
//                    $spanResult.text('购买成功！');
//	                $spanMsg.text('网购券已发送到您的账户');
//	                $('#amount').val('');
//	                var accountID = 0;
//	                if(data.mapData!=null&&data.mapData.accountID!=null){
//	                    accountID = data.mapData.accountID;
//	                }
//	                //增加兑换消费按钮
//	                var exchangeURL=$('#common_exchangeHtml5URL').val()+'@accountID='+accountID+'&token='+$('#token').val();
//	                $('<input id="exchangeButton" type="button" value="兑换本券" onClick="shop_hideMsg();window.location.href=\''+exchangeURL+'\';" data-role="none">').insertAfter($closeMsg);
//	                
//	                if(data.mapData!=null&&data.mapData.balance!=null){
//	                    $('#shop_balance_show').text(data.mapData.balance);
//	                }
                	var basepath = shop.util.getBaseURL();
                	window.location.href=basepath+"shop/shopingResult.action"+jssessionid+"@productID="+$('#productID').val()+"&status="+data.status;
                	
                	
                }  
                
			}
	};
   
  // alert(11);
	$.ajax(options);
}
