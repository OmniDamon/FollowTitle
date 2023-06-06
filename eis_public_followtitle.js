
/* EIS公共 标题自动跟随滚动 */
/* follow_title 1.31 Build 20230207 */

/* 识别对象 <tbody id="follow_title"> */
/* 使用变量 follow_title_object_id= */


	if (typeof(object_find)=="undefined"){
		function object_find(id){	//ID
			if (typeof(id)=="object"){return id;}
			_obj=document.getElementById(id);
			if (!_obj){
				for (var _i=0;_i<document.all.length;_i++){
					if (document.all[_i].getAttribute("name")==id){
						if (!document.all[_i].getAttribute("id")){document.all[_i].setAttribute("id",document.all[_i].getAttribute("name"));}
						_obj=document.all[_i];
					}
				}
			}
			if (_obj){return _obj;}else{return false;}
		}		
	}

	if (typeof(object_get_html)=="undefined"){
		function object_get_html(_obj){
			if (typeof(_obj)!="object"){_obj=object_find(_obj);}
			if (typeof(_obj)!="object"){return false;}
			return _obj.innerHTML;
		}
	}
	
	if (typeof(object_set_html)=="undefined"){
		function object_set_html(_obj,val){
			if (typeof(_obj)!="object"){_obj=object_find(_obj);}
			if (typeof(_obj)!="object"){return false;}
			_obj.innerHTML=(typeof(val)=="undefined"?"":val);
			return true;
		}
	}

	if (typeof(object_pos)=="undefined"){
		function object_pos(_obj){
			if (typeof(_obj)!="object"){_obj=object_find(_obj);}
			if (typeof(_obj)!="object"){return false;}
		  var h=_obj.offsetHeight;
		  h=0;
		  for (var sumTop=0,sumLeft=0;_obj!=document.body;sumTop+=_obj.offsetTop,sumLeft+=_obj.offsetLeft, _obj=_obj.offsetParent);
		  sumTop = h+sumTop;
		  return {left:sumLeft,top:sumTop}
		}
	}

	if (typeof(follow_title_object_id)=="undefined"){
		follow_title_object=object_find("follow_title");	
	}else{
		follow_title_object=object_find(follow_title_object_id);
	}
	
	if (follow_title_object){
		document.write('<div id="_follow_div" style="display:none;position:absolute;top:0px;left:0px;z-index:60000;border-bottom:#999999 1px solid;-moz-box-shadow:2px 2px 3px #969696;-webkit-box-shadow:2px 2px 3px #969696;box-shadow:2px 2px 3px #969696;"><table id="_follow_table" border="0" cellspacing="0" cellpadding="0"><thead id="_follow_head"></thead></table></div>');

		var follow_title_pos_top=0;
		var follow_title_pos_scrolltop=0;
		
		follow_title_table_object=follow_title_object.parentNode;
		
		follow_title_div_obj=object_find("_follow_div");
		follow_title_table_obj=object_find("_follow_table");
		follow_title_head_obj=object_find("_follow_head");

		function follow_title_resize(){
			follow_title_table_obj.style.width=(follow_title_table_object.scrollWidth+0) +"px";	//2
			follow_title_div_obj.style.left=object_pos(follow_title_object).left+"px";
			for(var i=0;i<follow_title_object.rows.length;i++){
				for(var ii=0;ii<follow_title_object.rows[i].cells.length;ii++){
					follow_title_table_obj.rows[i].cells[ii].style.width=(follow_title_object.rows[i].cells[ii].scrollWidth-0) +"px";	//4
					follow_title_table_obj.rows[i].cells[ii].style.height=(follow_title_object.rows[i].cells[ii].scrollHeight) +"px";
				}
			}			
		}
		
		function follow_title_init(){
			
			follow_title_table_obj.className=follow_title_table_object.className;
			follow_title_head_obj.className=follow_title_object.className;
			follow_title_table_obj.border=follow_title_table_object.border;

			object_set_html(follow_title_head_obj, object_get_html(follow_title_object) );
			
			follow_title_resize();

			follow_title_pos_top=object_pos(follow_title_table_object).top;
			follow_title_pos_scrolltop=(document.documentElement.scrollTop||document.body.scrollTop);
			follow_title_div_obj.style.top=(follow_title_pos_scrolltop)+"px";
			
			if (follow_title_pos_scrolltop>0){follow_title_scroll();}
		}

		
		function follow_title_scroll(){
			follow_title_resize();

			if ((document.documentElement.scrollTop>follow_title_pos_top)||(document.body.scrollTop>follow_title_pos_top)){
				follow_title_div_obj.style.display="";
			}else{
				follow_title_div_obj.style.display="none";
			}
			if(follow_title_pos_scrolltop!=(document.documentElement.scrollTop||document.body.scrollTop)){
				follow_title_pos_scrolltop=(document.documentElement.scrollTop||document.body.scrollTop);
				follow_title_div_obj.style.top=(follow_title_pos_scrolltop)+"px";
			}
		}


		follow_title_init();
		window.addEventListener("scroll", follow_title_scroll);
		window.addEventListener("resize", follow_title_resize);
	}	