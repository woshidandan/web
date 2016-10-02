var queryMoreSpecial = function(basePath,resultFunction,citylabelid,specialkind){
   var $ul = $.mobile.activePage.find("ul#specialList");
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
		    url:"activitypublish/getMoreSpecial.action"+jssessionid,
			dataType:'json',
			type:'post',
			data:{'pg.pageNo':pageNo,
				   "cityLabelid":citylabelid,
				   "specialkind":specialkind},
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
	                 var splist = data.listData;
	                 //console.log(gblist);
	                 if(splist!=null&&splist.length>0){
		                   $(splist).each(function(index) {
		                	  var temp = '<li> <div class="active_pic" ><p> <a href="'+basePath+'activitypublish/getSpecialByid.action'+jssessionid+'@hyperLink='+this.hyperLink+'"></a>'+
					          '<em>'+(this.iconURL==null?'<img  src="">':'<img style="width:294px;height:111px" src="')+this.iconURL+'"></em>'+
							  '</p><p>活动时间：'+this.starttimeT+' 至' +this.endtimeT+'</p></div></li>';
							 //  alert("temp==="+temp);
			                  $ul.append(temp);
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
};

var getSpecialListBykind=function(basePath,specialkind){
		window.location.href=basePath+"activitypublish/getSpecialList.action"+jssessionid+"@specialkind="+specialkind;

};
