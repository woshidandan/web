   $(function ($) {
	   var myScroll;
      function loaded() {
	     myScroll = new iScroll('wrapper',{hScrollbar:false, vScrollbar:false,useTransform:false,useTransition:false,checkDOMChanges:true});
         }
      document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
      document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200);      }, false);
	   
        $('.panel').panel({
            contentWrap: $('.cont')
        }).on('close',function(){
			$('.nav-botton').removeClass('active');
			});

        $('.nav-botton').on('click', function () {
            $('.panel').panel('toggle', 'push', 'left');
			$(this).toggleClass('active');
        });
		
		
		$('.panel-list').panel({
            contentWrap: $('.cont')
        }).on('close',function(){
			$('.tool-list-botton').removeClass('active');
			});

        $('.tool-list-botton').on('click', function () {
            $('.panel-list').panel('toggle', 'push', 'right');
			$(this).toggleClass('active');
        });
		
		 
         $('.cont').imglazyload();
		 
		 
		 $('.slider-main').slider({loop:true,viewNum:1});
		 
		 
		 
		 $('.p-cur span').longTap(function (){
			 $('.p-select').mousedown();
		       }
		 );
		
		 
		 $('.select-show').click(function (){
			 $('.input-select').mousedown();
		       }
		 );
		 
		 $('.input-select').change(function (){
            var obj=document.getElementById('search_type');
            for(i=0;i<obj.length;i++){
                if(obj[i].selected==true){
                    //return obj[i].innerText;      //关键是通过option对象的innerText属性获取到选项文本
                    $(".select-show").html(obj[i].innerText);
                }
            }
          //$(".select-show").html($('.input-select').innerText);
		 }
		  );

          $('.p-select').change(function(){
            var page = $(this).val();
            var href = document.getElementById("baseurl").value;
            if(isNaN(page)){
                alert("请输入合法数字");
            }else{
                window.location.href = href+""+page;
            }
          });
          
		 $('.nav-box').navigator();
		 
		 $('.tabs-nav-s a').on('click',function(){
			 $(this).parent('li').addClass('active').siblings().removeClass('active').parent().siblings('.tabs-panel-s').hide().siblings('.'+$(this).attr('id')).show();
			 });

	     if($('body').height() < 380){
			 $('.panel').addClass('active');
			 $('.panel-list').addClass('active');
			 } else{
				 $('.panel').removeClass('active');
				 $('.panel-list').removeClass('active');
				 }
		 
    }(Zepto));