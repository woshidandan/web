
function AutoScroll(obj){
	$(obj).find("ul:first").animate({
		marginTop:"-16px"
	},500,function(){
		$(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
	});
}
$(document).ready(function(){
	setInterval('AutoScroll("#scrolldiv")',4000);

    function mySideChange(front) {
    if (front) {
        $(this).css('background', 'none');
    } else {
        $(this).css('background', 'none');
    }
}

function myComplete() {
$('#ex1,#ex2,#ex3,#ex4,#ex5,#ex6,#ex7,#ex8,#ex9,#ex10').css('backgroundColor', 'none');
}
$('#ex1,#ex2,#ex3,#ex4,#ex5,#ex6,#ex7,#ex8,#ex9,#ex10').click(function () {
    $(this).rotate3Di(
        '360',
        500,
        {
          sideChange: mySideChange,
          complete: myComplete
        }
    );
});
$("#qulink").click(function(){
            $(".link").toggleClass("disblock");
        });
});
