var book = {};
book.util = {};
book.util.parseJSONDateFormat = function(timeString) {
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
var parseJSONDateFormat = book.util.parseJSONDateFormat;

var verPhoneNo = function(value){
       //var regex = /^\d+$/;
       var regex=/^(13[0-9]|15[0|3|6|7|8|9]|18[7|8|9])\d{8}$/;
       return regex.test(value);
};

var verZipcode = function(value){
       var regex=/^[0-9]{6}$/;
       return regex.test(value);
}

var verInt = function(value){
    var regex = /^\d+$/;
    return regex.test(value);
};

var book_verAddress = function(contactName,phoneNo,zipcode,receiveAddress){
    if(contactName==null||contactName.trim()==''){
        alert('收货人名称不能为空！');
        return false;
    }
    
    if(contactName.trim().length>30){
        alert('姓名不能超过30个字符！');
        return false;
    }
    
    if(phoneNo==null||phoneNo.trim()==''){
        alert('联系电话不能为空！');
        return false;
    }else if(!verPhoneNo(phoneNo)){
        alert('请输入正确的手机号码！');
        return false;
    }
	
	if(zipcode!=null&&zipcode.trim().length>0&&!verZipcode(zipcode)){
	    alert('请输入正确的邮编！');
        return false;
	}
	
	if(receiveAddress!=null&&receiveAddress.length>1000){
	    alert('地址不能超过1000个字符！');
        return false;
	}
	
	return true;
}

var book_queryMorebookGoods = function(basePath,resultFunction){
    var book_getLine = function(data,index,length,basePath){
	    if(index%2==0){
	        if(index+1==length){
			     return  '<li>'+
		             '<table width="100%" border="0">'+
				      '<tr style="height:199px;">'+
				       '<td>'+
				         '<div class="presell-list"><a href="'+basePath+'book/queryBookGoodsByID.action@bookGoodsID='+data.goodsID+'">'+
				          ' <p><img src="'+basePath+'image@imgName='+data.wapIconPath+'" style="width:140px;height:127;"></p>'+
				           '<p>'+(data.name!=null&&data.name.length>0?data.name.substring(0,16):'')+'</p>'+
				          '<div class="presell-price">'+
				           '<span class="presell-l">价格：<strong>¥'+data.currentPrice+'</strong></span>'+
				          ' <span class="presell-r">马上参与</span>'+
				          '</div>'+
				         '</a></div> '+
				       '</td>'+
				       '<td>'+
				         '<div class="presell-list">'+
				          '</div>'+
				         '</div> '+
				       '</td>'+
				     ' </tr>'+
				    '</table>'+
		        '</li>';
	        }else{
	            return '<li>'+
		             '<table width="100%" border="0">'+
				      '<tr style="height:199px;">'+
				       '<td>'+
				         '<div class="presell-list"><a href="'+basePath+'book/queryBookGoodsByID.action@bookGoodsID='+data.goodsID+'">'+
				          ' <p><img src="'+basePath+'image@imgName='+data.wapIconPath+'" style="width:140px;height:127;"></p>'+
				           '<p>'+(data.name!=null&&data.name.length>0?data.name.substring(0,16):'')+'</p>'+
				          '<div class="presell-price">'+
				            '<span class="presell-l">价格：<strong>¥'+data.currentPrice+'</strong></span>'+
				          ' <span class="presell-r">马上参与</span>'+
				          '</div>'+
				         '</a></div> '+
				       '</td>';
	        }
	    }else{
	        return '<td>'+
		         '<div class="presell-list"><a href="'+basePath+'book/queryBookGoodsByID.action@bookGoodsID='+data.goodsID+'">'+
		          ' <p><img src="'+basePath+'image@imgName='+data.wapIconPath+'" style="width:140px;height:127;"></p>'+
		           '<p>'+(data.name!=null&&data.name.length>0?data.name.substring(0,16):'')+'</p>'+
		          '<div class="presell-price">'+
		            '<span class="presell-l">价格：<strong>¥'+data.currentPrice+'</strong></span>'+
		          ' <span class="presell-r">马上参与</span>'+
		          '</div>'+
		         '</a></div> '+
		       '</td>'+
		     ' </tr>'+
		    '</table>'+
        '</li>';
	    }
	};
	
   var $ul = $.mobile.activePage.find("ul#bookGoodsList");
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
		    url:"book/queryMorebookGoods.action",
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

var book_queryNewComment = function(bookGoodsID){
//alert('查询：'+groupbuyId);
     var options = 
     {
		    url:"book/queryNewComment.action",
			dataType:'json',
			type:'post',
			data:{'bookGoodsID':bookGoodsID},
			error:function(a,b){
				//alert("获取评论失败！");
			},
			success: function(data) {
			    if(data.status!=1){
			       //alert("获取评论失败！");
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
                   }
			    }
			}
	};
	$.ajax(options);
};

var book_commentSubmit = function(loginUrl){
   var $comment = $.mobile.activePage.find('#commentContent');
   if($comment.val()==null||$comment.val().trim().length==0){
      alert('评论不能为空！');
      return;
   }
   if($comment.val().trim().length>500){
      alert('评论不能超过500字！');
      return;
   }
   var $commentScore = $.mobile.activePage.find('[type=radio][name=commentScore]:checked');
   var commentScore=0;
   if($commentScore.val()!=null){
     commentScore=$commentScore.val();
   }
   var orderID=0;
   var $orderID=$.mobile.activePage.find('#orderID');
   if($orderID.val()!=null&&$orderID.val()>0){
     orderID=$orderID.val();
   }
   var bookGoodsID = $('#commentForm_bookGoodsID').val();
   
   var $cmBt = $.mobile.activePage.find('#book_comment_button');
   var tempValue = $cmBt.val();
   var tempAttr = $cmBt.attr('onclick');
   $cmBt.val('提交...');
   $cmBt.removeAttr('onclick');
   var options = 
     {
		    url:"book/comment.action",
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{bookGoodsID:bookGoodsID,commentContent:$comment.val(),commentScore:commentScore,orderID:orderID}, 
			error:function(a,b){
				alert("评论失败！");
				$cmBt.val(tempValue);
                $cmBt.attr('onclick',tempAttr);
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
                    //window.history.back();
                    //alert($.mobile.activePage.find('.top').find('a').get(0));
                    $.mobile.activePage.find('.top').find('a').get(0).click();
                    //$.mobile.changePage($.mobile.activePage.find('.top').find('a').attr('href'), "slide");
                }
                $cmBt.val(tempValue);
                $cmBt.attr('onclick',tempAttr);
			}
	};
	$.ajax(options);
};

var book_toOrder = function(){
   var $form = $.mobile.activePage.find('#book_toOrder_form');
   var $radio_color = $form.find('input[type="radio"][name="bookGoodsSession.color"]');
   if($radio_color.size()>0&&$form.find('input[type="radio"][name="bookGoodsSession.color"]:checked').size()<1){
      alert('请选择颜色！');
      return;
   }
   var $radio_size = $form.find('input[type="radio"][name="bookGoodsSession.size"]');
   if($radio_size.size()>0&&$form.find('input[type="radio"][name="bookGoodsSession.size"]:checked').size()<1){
      alert('请选择尺寸！');
      return;
   }
   
   var $amount = $form.find('#amount');
   var amount = $form.find('#amount').val();
   if(amount == null|| amount.trim()==''){
      alert('数量不能为空！');
      return;
   }
   
   if(!verInt(amount)){
      alert('请输入正确的数量！');
      return;
   }
   
   if(amount<1){
      alert('数量不能为零！');
      return;
   }
   
   if(amount>100000000){
      alert('请输入有效的数量！');
      return;
   }
   
   $form.submit();
};

//book_toOrder();

var book_orderBookGoods = function(bookBaseURL,loginUrl){
   var $form = $.mobile.activePage.find('#book_order_form');
   
   var $bookOrder_goodsID = $form.find('#bookOrder_goodsID');
   var $bookOrder_amount = $form.find('#bookOrder_amount');
   
   var $bookOrder_contactName = $form.find('#bookOrder_contactName');
   var $bookOrder_phoneNo = $form.find('#bookOrder_phoneNo');
   var $bookOrder_zipcode = $form.find('#bookOrder_zipcode');
   var $bookOrder_receiveAddress = $form.find('#bookOrder_receiveAddress');
   
   var $bookOrder_labelConsumeID = $form.find('input[name="bookOrder.labelConsumeID"]:checked');
   var $bookOrder_labelReceiveTimeKind = $form.find('input[name="bookOrder.labelReceiveTimeKind"]');

   //检查表单
   if($bookOrder_goodsID.val()==null||$bookOrder_goodsID.val()<=0){
      alert('请选择预订商品！');
      return;
   }
   if($bookOrder_amount.val()==null||$bookOrder_amount.val()<=0){
      alert('数量不能为空!');
      return;
   }
   
   //检查地址
   if(!book_verAddress($bookOrder_contactName.val(),$bookOrder_phoneNo.val(),$bookOrder_zipcode.val(),$bookOrder_receiveAddress.val())){
       return;
   }
   
   if($bookOrder_labelConsumeID.val()==null||$bookOrder_labelConsumeID.val()<=0){
      alert('支付方式不能为空!');
      return;
   }
   if($bookOrder_labelReceiveTimeKind.length>0){
      var labelReceiveTimeKindValue = $form.find('input[name="bookOrder.labelReceiveTimeKind"]:checked');
      if(labelReceiveTimeKindValue.val()==null||labelReceiveTimeKindValue.val()<=0){
          alert('收货时间不能为空!');
          return;
      }
   }
   
   var $subBt = $form.find('#book_order_bt');
   var tempValue = $subBt.val();
   var tempAttrValue = $subBt.attr('onclick');
   $subBt.val('提交...');
   $subBt.removeAttr('onclick');
   
   var options = 
     {
		    url:"book/orderBookGoods.action",
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			error:function(a,b){
				alert("提交订单失败！");
				$subBt.val(tempValue);
                $subBt.attr('onclick',tempAttrValue);
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
	                   }else if(msg.indexOf('nullbusiness')>-1){
	                       alert('该预订商品无效！');
	                   }else{
	                       alert('提交订单失败！');
	                   }
	                }else{
	                     alert('提交订单失败！');
	                }
                }else{
                    alert('提交订单成功！');
                    //window.history.back();
                    $.mobile.changePage(bookBaseURL+'queryBookGoodsByID.action@bookGoodsID='+$bookOrder_goodsID.val().trim(), "slide");
                }
                $subBt.val(tempValue);
                $subBt.attr('onclick',tempAttrValue);
			},
			resetForm: true
	};
	//$.ajax(options);
	$form.ajaxSubmit(options);
};

var bk_clearTime = function(){
    var $form = $.mobile.activePage.find('#book_order_form');
    var $receiveStart =$form.find('#bookOrder_receiveStart');
	var $receiveEnd =$form.find('#bookOrder_receiveEnd');
	$receiveStart.val('');
	$receiveEnd.val('');
}

var book_saveToAddress = function(loginUrl){
    var $div_dynamic = $.mobile.activePage.find('#addressDiv_dynamic');
    var contactName = $div_dynamic.find('#bookOrder_contactName_dynamic').val();
    var phoneNo = $div_dynamic.find('#bookOrder_phoneNo_dynamic').val();
    var zipcode = $div_dynamic.find('#bookOrder_zipcode_dynamic').val();
    var receiveAddress = $div_dynamic.find('#bookOrder_receiveAddress_dynamic').val();
    
    //封装地址验证！！！！！！！！！！！！
    if(!book_verAddress(contactName,phoneNo,zipcode,receiveAddress)){
      return;
    }
    
    var options = 
     {
		    url:"book/saveAddress.action",
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{"bookMemberAddress.contactName":contactName,"bookMemberAddress.phoneNo":phoneNo,"bookMemberAddress.zipCode":zipcode,"bookMemberAddress.receiveAddress":receiveAddress},
			error:function(a,b){
				alert("保存地址失败！");
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
	                       alert('姓名，电话不能为空！');
	                   }else if(msg.indexOf('morebusiness')>-1){
	                       alert('常用地址已满！');
	                   }else{
	                       alert('保存地址失败！');
	                   }
	                }else{
	                     alert('保存地址失败！');
	                }
                }else{
                    alert('保存地址成功！');
                    book_confirmAddress();
                }
			},
	};
	$.ajax(options);
}

var book_confirmAddress = function(){
    var $div_dynamic = $.mobile.activePage.find('#addressDiv_dynamic');
    var $contactName = $div_dynamic.find('#bookOrder_contactName_dynamic');
    var $phoneNo = $div_dynamic.find('#bookOrder_phoneNo_dynamic');
    var $zipcode = $div_dynamic.find('#bookOrder_zipcode_dynamic');
    var $receiveAddress = $div_dynamic.find('#bookOrder_receiveAddress_dynamic');
    
    var contactName = $contactName.val();
    var phoneNo = $phoneNo.val();
    var zipcode = $zipcode.val();
    var receiveAddress = $receiveAddress.val();
   
    if(!book_verAddress(contactName,phoneNo,zipcode,receiveAddress)){
      return;
    }
    
    var $div_static = $.mobile.activePage.find('#addressDiv_static');
    $div_static.find('#bookOrder_contactName_static').text(contactName);
    $div_static.find('#bookOrder_phoneNo_static').text(phoneNo);
    $div_static.find('#bookOrder_zipcode_static').text(zipcode);
    $div_static.find('#bookOrder_receiveAddress_static').text(receiveAddress);
    
    var $form = $.mobile.activePage.find('#book_order_form');
    var contactName = $form.find('#bookOrder_contactName').val(contactName);
    var phoneNo = $form.find('#bookOrder_phoneNo').val(phoneNo);
    var zipcode = $form.find('#bookOrder_zipcode').val(zipcode);
    var receiveAddress = $form.find('#bookOrder_receiveAddress').val(receiveAddress);
    
    $div_dynamic.hide();
    $contactName.val('');
    $phoneNo.val('');
    $zipcode.val('');
    $receiveAddress.val('');
    
    $div_static.show();
}

var book_editAddress = function(){
    var $div_static = $.mobile.activePage.find('#addressDiv_static');
    var $contactName = $div_static.find('#bookOrder_contactName_static');
    var $phoneNo = $div_static.find('#bookOrder_phoneNo_static');
    var $zipcode = $div_static.find('#bookOrder_zipcode_static');
    var $receiveAddress = $div_static.find('#bookOrder_receiveAddress_static');
    
    var $div_dynamic = $.mobile.activePage.find('#addressDiv_dynamic');
    $div_dynamic.find('#bookOrder_contactName_dynamic').val($contactName.text());
    $div_dynamic.find('#bookOrder_phoneNo_dynamic').val($phoneNo.text());
    $div_dynamic.find('#bookOrder_zipcode_dynamic').val($zipcode.text());
    $div_dynamic.find('#bookOrder_receiveAddress_dynamic').val($receiveAddress.text());
    
    $div_static.hide();
    $contactName.val('');
    $phoneNo.val('');
    $zipcode.val('');
    $receiveAddress.val('');
    
    $div_dynamic.show();
}

var book_updateAddress = function(bookBaseURL,loginUrl){
    var $form = $.mobile.activePage.find('#book_update_form');
    var contactName = $form.find('#address_contactName').val();
    var phoneNo = $form.find('#address_phoneNo').val();
    var zipcode = $form.find('#address_zipcode').val();
    var receiveAddress = $form.find('#address_receiveAddress').val();
    
    if(!book_verAddress(contactName,phoneNo,zipcode,receiveAddress)){
      return;
    }
    
    var options = 
     {
		    url:"book/updateAddress.action",
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			error:function(a,b){
				alert("更新地址失败！");
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
	                       alert('姓名，电话不能为空！');
	                   }else if(msg.indexOf('nullbusiness')>-1){
	                       alert('该地址不存在！');
	                   }else{
	                       alert('更新地址失败！');
	                   }
	                }else{
	                     alert('更新地址失败！');
	                }
                }else{
                    alert('更新地址成功！');
                    $.mobile.changePage(bookBaseURL+"listAddress.action","slide");
                }
			},
	};
	$form.ajaxSubmit(options);
}

var book_deleteAddress = function(loginUrl,addressID){
    var options = 
     {
		    url:"book/deleteAddress.action",
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			data:{addressID:addressID},
			error:function(a,b){
				alert("删除地址失败！");
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
	                   }else if(msg.indexOf('nullbusiness')>-1){
	                       alert('该地址不存在！');
	                   }else{
	                       alert('删除地址失败！');
	                   }
	                }else{
	                     alert('删除地址失败！');
	                }
                }else{
                    alert('删除地址成功！');
                    $.mobile.activePage.find('div[data-address|='+addressID+']').remove();
                }
			},
	};
	$.ajax(options);
}

var book_addAddress = function(bookBaseURL,loginUrl){
    var $form = $.mobile.activePage.find('#book_addAddress_form');
    var contactName = $form.find('#address_contactName').val();
    var phoneNo = $form.find('#address_phoneNo').val();
    var zipcode = $form.find('#address_zipcode').val();
    var receiveAddress = $form.find('#address_receiveAddress').val();
    
    if(!book_verAddress(contactName,phoneNo,zipcode,receiveAddress)){
      return;
    }
    
    var options = 
     {
		    url:"book/saveAddress.action",
			dataType:'json',
			type:'post',
			contentType: "application/x-www-form-urlencoded; charset=utf-8",
			error:function(a,b){
				alert("保存地址失败！");
			},
			success: function(data) {
                //alert(data.status+','+data.msg);
                if(data.status!=1){
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                   if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       //$.mobile.changePage(loginUrl, "slide");
	                       window.location.href=loginUrl;
	                   }else if(msg.indexOf('null')>-1){
	                       alert('姓名，电话不能为空！');
	                   }else if(msg.indexOf('morebusiness')>-1){
	                       alert('常用地址已满！');
	                   }else{
	                       alert('保存地址失败！');
	                   }
	                }else{
	                     alert('保存地址失败！');
	                }
                }else{
                    alert('保存地址成功！');
                    $form[0].reset();
                    $.mobile.changePage(bookBaseURL+"listAddress.action","slide");
                }
			},
			//resetForm: true
	};
	$form.ajaxSubmit(options);
}

var book_selectAddress = function (){
    var $form = $.mobile.activePage.find('#book_selectAddress_form');
    var $addressRadio = $form.find("input[name='bookGoodsSession.addressID']:checked");
    if($addressRadio.get(0)==null||$addressRadio.val()<1){
        alert('请选择地址!');
        return;
    }
    $form.submit();
}

var favoriteBookGoods = function(bookGoodsID,loginUrl){
     var options = 
     {
		    url:"book/favoriteBookGoods.action",
			dataType:'json',
			type:'post',
			data:{'bookGoodsID':bookGoodsID},
			error:function(a,b){
				alert("收藏失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status==1){
	               alert('收藏成功！');
	               var $span = $.mobile.activePage.find('#book_favorite');
	               var $a = $span.find('a');
	               $a.attr('href','javascript:cancelFavoriteBookGoods('+bookGoodsID+',"'+loginUrl+'");');
	               $a.text('取消收藏');
                }else if(data.status==-1){
                   alert(data.msg);
                }else{
                   var msg = data.msg;
                   if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       window.location.href=loginUrl;
	                    }else if(msg.indexOf('error')>-1){
	                       alert('收藏失败，请稍后再试！');
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

var cancelFavoriteBookGoods = function(bookGoodsID,loginUrl){
     var options = 
     {
		    url:"book/cancelfavoriteBookGoods.action",
			dataType:'json',
			type:'post',
			data:{'bookGoodsID':bookGoodsID},
			error:function(a,b){
				alert("取消收藏失败！");
			},
			success: function(data) {
                //alert("status:"+data.status);
                if(data.status==1){
                    alert('取消收藏成功！');
	                var $span = $.mobile.activePage.find('#book_favorite');
	                var $a = $span.find('a');
	                $a.attr('href','javascript:favoriteBookGoods('+bookGoodsID+',"'+loginUrl+'");');
	                $a.text('收藏');
                }else if(data.status==-1){
                    alert(data.msg);
                }else{
                    var msg = data.msg;
	                if(msg!=null&&msg.length>0){
	                    if(msg.indexOf('nologin')>-1){
	                       alert('请先登录！');
	                       window.location.href=loginUrl;
	                    }else if(msg.indexOf('error')>-1){
	                       alert('取消收藏失败，请稍后再试！');
	                    }else{
	                       alert('取消收藏失败！');
	                    }
	                }else{
	                    alert('取消收藏失败！');
	                }
                }
			}
	};
	$.ajax(options);
};
