var threeSelectData={

	

	"选择省份":{

		val:"",

		items:{

			"选择城市":{

				val:"",

			}

		}

	},

	

	"江苏省":{

		val:"jiangsu",

		items:{

			"南京市":{

				val:"nanjing",

			},

			

			"扬州市":{

				val:"yangzhou",

				

			},

		}

	},

	"北京市":{

		val:"beijing",

		items:{

			"北京市":{

				val:"beijing",

			},

			

		}

	},

	

	"上海市":{

		val:"shanghai",

		items:{

			

			"上海市":{

				val:"shanghai",

				items:{}

			},

		}

	},

	

	"湖北省":{

		val:"hubei",

		items:{

			

			"武汉市":{

				val:"wuhan",

				items:{}

			},

		}

	},

	

	"山东省":{

		val:"shandong",

		items:{

			

			"大连市":{

				val:"dalian",

				items:{}

			},

		}

	},

	"宁夏":{

		val:"ningxia",

		items:{

			

			"银川市":{

				val:"yinchuan",

				items:{}

			},

		}

	},

	"内蒙古":{

		val:"neimeng",

		items:{

			

			"呼和浩特":{

				val:"huhehaote",

				items:{}

			},

		}

	}



};



var defaults = {

	s1:'mainselect',

	s2:'midselect'

};



$(function(){

	threeSelect(defaults);

});



function threeSelect(config){

	var $s1=$("#"+config.s1);

	var $s2=$("#"+config.s2);

	var v1=config.v1?config.v1:null;

	var v2=config.v2?config.v2:null;

	$.each(threeSelectData,function(k,v){

		appendOptionTo($s1,k,v.val,v1);

	});

	

	$s1.change(function(){

		$s2.html("");

		if(this.selectedIndex==-1)

		return;

		

		var s1_curr_val = this.options[this.selectedIndex].value;

		

		$.each(threeSelectData,function(k,v){

			if(s1_curr_val==v.val){

				if(v.items){

					$.each(v.items,function(k,v){

						appendOptionTo($s2,k,v.val,v2);

					});

				}

			}

		});

	

		if($s2[0].options.length==0){

			appendOptionTo($s2,"...","",v2);

		}

		

		$s2.change();

		

	}).change();

	

	$s2.change(function(){

		var s1_curr_val = $s1[0].options[$s1[0].selectedIndex].value;

		if(this.selectedIndex==-1)

		return;

		

		var s2_curr_val = this.options[this.selectedIndex].value;

		

		$.each(threeSelectData,function(k,v){

			if(s1_curr_val==v.val){

				if(v.items){

					$.each(v.items,function(k,v){

					});

					

				}

			}

		});

		$('.linkbtn').click(function(){
			var ext = "";
			if (s2_curr_val=='nanjing') {
				ext = 286;
			} else if(s2_curr_val=='yangzhou'){
				ext = 287;
			} else if(s2_curr_val=='beijing'){
				ext = 288;
			} else if(s2_curr_val=='shanghai'){
				ext = 289;
			} else if(s2_curr_val=='wuhan'){
				ext = 290;
			} else if(s2_curr_val=='dalian'){
				ext = 291;
			} else if(s2_curr_val=='yinchuan'){
				ext = 292;
			} else if(s2_curr_val=='huhehaote'){
				ext = 293;
			} else {
				ext = 286;
			};
			var link = "show@catid=71&id=" + ext;
			location.href = link;

		});

	}).change();

	

	function appendOptionTo($o,k,v,d){



		var $opt=$("<option>").text(k).val(v);

		

		if(v==d){

			$opt.attr("selected", "selected")

		}

		$opt.appendTo($o);

	}

	

}
