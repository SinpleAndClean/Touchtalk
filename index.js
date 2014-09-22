var table_column = 5;
var window_width = 0;
var state = 0;
var action_icon_src = "";
var place_icon_src = "";
var vehicle_icon_src = "";
var actioin_icon_filename = "";
var place_icon_filename = "";
var vehicle_icon_src = "";
var lat;
var lng;
var json;
var initialized = false;

var signed_g = false;
var signed_q = false;

var action_icons = new Array();
var place_icons = new Array();
var vehicle_icons = new Array();
function init_icons_using_location(){
	processing = true;
	navigator.geolocation.getCurrentPosition (function (pos){
  		lat = pos.coords.latitude;
  		lng = pos.coords.longitude;
		console.log("set lat and long"+lat+","+lng);
		processing = false;
	if(lat && lng||true){
	console.log("./get_icons.php?lat="+lat+"&lon="+lng);
		$.ajax({
   			type: "GET",
   			url: "./get_icons.php?lat="+lat+"&lon="+lng,
   			success: function(msg){
				json = JSON.parse(msg);
				icons = json["icons"];
				for(var i = 0;i<icons.length;i++){
					console.log(icons[i]);
					filename = icons[i]["filename"];
					category_id = icons[i]["category_id"];
					switch(category_id){
						case "1":
							action_icons.push(filename);
							break;
						case "2":
							place_icons.push(filename);
							break;
						case "3":
							vehicle_icons.push(filename);
							break;
					}
				}
				$("div#action_tab_selector").click();
				console.log(action_icons.length+","+place_icons.length+","+vehicle_icons.length);
   				initialized = true;
			}
 		});
	}});	
}
function drawImages(){
	var canvas = document.getElementById('stamp_canvas');
  	if ( ! canvas || ! canvas.getContext ) { return false; }
	//var width = canvas.width;
	//var height = canvas.height;
  	canvas.width = $("canvas#stamp_canvas").width();
	canvas.height = $("canvas#stamp_canvas").height();
	var width = canvas.width;
	var height = canvas.height;
	var ctx = canvas.getContext('2d');
	ctx.clearRect(0,0,width,height);
	var real_height = $(window).height()*0.9*0.65;
	//height = width * real_height / $(window).width();
        console.log("width"+width);
        console.log("height"+height);
	//var rate = height / canvas.height;
	//console.log(rate);
	var good_img_src = "./stamp/OK.jpg";
        var ques_img_src = "./stamp/hatena.jpeg";
        var list_img_src = "./stamp/pin.jpg";
        var good_img = new Image();
        var ques_img = new Image();
        var list_img = new Image();
        good_img.src = good_img_src;
        ques_img.src = ques_img_src;
        list_img.src = list_img_src;
	if(signed_g){
		g_startx = width * 0.3;
		g_starty = height * 0.05;
		g_endx = width * 0.7;
		g_endy = height*0.05 + width*0.4;
		ctx.drawImage(good_img,g_startx,g_starty,g_endx-g_startx,g_endy-g_starty);
		return;
	}
	else if(signed_q){
		q_startx = width * 0.3;
                q_starty = height * 0.05;
                q_endx = width * 0.7;
                q_endy = height*0.05 + width*0.4;
                ctx.drawImage(ques_img,q_startx,q_starty,q_endx-q_startx,q_endy-q_starty);
		return;
	}
	var g_startx =width*0.05;
	var g_starty =height*0.05;
	var g_endx = width*0.2;
	var g_endy = height*0.05 + (g_endx - g_startx);
	var q_startx = width*0.25;
	var q_starty = height*0.05;
	var q_endx = width*0.4;
	var q_endy = height*0.05 + (q_endx - q_startx);
	var l_startx = width*0.45;
	var l_starty = height*0.05;
	var l_endx = width*0.6;
	var l_endy = height*0.05 + (l_endx - l_startx);
	ctx.drawImage(good_img,g_startx,g_starty,g_endx-g_startx,g_endy-g_starty);
	ctx.drawImage(ques_img,q_startx,q_starty,q_endx-q_startx,q_endy-q_starty);
	ctx.drawImage(list_img,l_startx,l_starty,l_endx-l_startx,l_endy-l_starty);
	if(vehicle_icon_src != ""){
                var img = new Image();
                img.src = vehicle_icon_src;
                var startx = width*0.1;
                var endx = width*0.3;
                var starty = height*0.6;
                var endy = height*0.6 + (endx - startx);
                ctx.drawImage(img, startx, starty, endx-startx, endy-starty);
        }
  	if(place_icon_src != ""){
  		var img = new Image();
  		img.src = place_icon_src;
		var startx = width*0.45;
		var endx = width*0.85;
		var starty = height*0.25;
		var endy = height*0.25 + (endx - startx);
  		ctx.drawImage(img,startx,starty,endx-startx,endy-starty);
  	}
  	if(action_icon_src != ""){
  		var img = new Image();
  		img.src = action_icon_src;
		var startx = width*0.275;
		var endx = width*0.475;
		var starty = height*0.50;
		var endy = height*0.50 + (endx - startx);
  		ctx.drawImage(img, startx, starty,endx-startx,endy-starty);
  	}
}

var stamp_clk = function stamp_clicked(){
	switch(state){
		case 0:
			action_icon_src = this.src;
			break;
		case 1:
			place_icon_src = this.src;
			break;
		case 2:
			vehicle_icon_src = this.src;
			break;
	}
	drawImages();
};
function init_handlers(){
	$("div#action_tab_selector").click(function(){
		console.log("click");
		$("div#icon_container").css("background-color","#FFBB99");
		generate_action_icons();
	});
	$("div#place_tab_selector").click(function(){
		console.log("click");
		$("div#icon_container").css("background-color","#99FFBB");
		generate_place_icons();
	});
	$("div#vehicle_tab_selector").click(function(){
		console.log("click");
		$("div#icon_container").css("background-color","#BB99FF");
		generate_vehicle_icons();
	});
	$("canvas#stamp_canvas").click(function(e){
		if(signed_g || signed_q){
			signed_g = false;
			signed_q = false;
			drawImages();
			return;
		}
		var offset = $(this).offset();
		canvas_x = e.clientX - offset.left;
		canvas_y = e.clientY - offset.top;
		canvas_width = $(this).width();
		canvas_height = $(this).height();
		if(canvas_x >= canvas_width*0.05 && canvas_x <= canvas_width*0.2 && canvas_y >= canvas_height*0.05 && canvas_y <= canvas_height*0.05 + canvas_width*1.5){
			signed_g = true;
			drawImages();
		}
		else if(canvas_x >= canvas_width*0.25 && canvas_x <= canvas_width*0.4 && canvas_y >= canvas_height*0.05 && canvas_y <= canvas_height*0.05 + canvas_width*1.5){
                        signed_q = true;
			drawImages();
                }
		else if(canvas_x >= canvas_width*0.45 && canvas_x <= canvas_width*0.6 && canvas_y >= canvas_height*0.05 && canvas_y <= canvas_height*0.05 + canvas_width*1.5){
                        var list = new Array();
			for(var i = 0;i<json["icons"].length;i++){
				var al_ind = action_icon_src.lastIndexOf("/");
				var a_filename = action_icon_src.substring(al_ind+1,action_icon_src.length);
				var pl_ind = place_icon_src.lastIndexOf("/");
				var p_filename = place_icon_src.substring(pl_ind+1,place_icon_src.length);
				var vl_ind = vehicle_icon_src.lastIndexOf("/");
				var v_filename = vehicle_icon_src.substring(vl_ind+1,vehicle_icon_src.length);
				if(json["icons"][i]["filename"] == a_filename){
					if("list" in json["icons"][i]){
						for(var j = 0;j<json["icons"][i]["list"].length;j++){
							var item = new Array();
							item["latitude"] = json["icons"][i]["list"][j]["latitude"];
							item["longitude"] = json["icons"][i]["list"][j]["longitude"];
							item["name"] = json["icons"][i]["list"][j]["name"];
							list.push(item);
						}
					}
				}
				else if(json["icons"][i]["filename"] == p_filename){
					if("list" in json["icons"][i]){
                                                for(var j = 0;j<json["icons"][i]["list"].length;j++){
                                                        var item = new Array();
                                                        item["latitude"] = json["icons"][i]["list"][j]["latitude"];
                                                        item["longitude"] = json["icons"][i]["list"][j]["longitude"];
                                                        item["name"] = json["icons"][i]["list"][j]["name"];
                                                        list.push(item);
                                                }
                                        }
				}
				else if(json["icons"][i]["filename"] == v_filename){
					if("list" in json["icons"][i]){
                                                for(var j = 0;j<json["icons"][i]["list"].length;j++){
                                                        var item = new Array();
                                                        item["latitude"] = json["icons"][i]["list"][j]["latitude"];
                                                        item["longitude"] = json["icons"][i]["list"][j]["longitude"];
                                                        item["name"] = json["icons"][i]["list"][j]["name"];
                                                        list.push(item);
                                                }
                                        }
				
				}
			}
			console.log(list);
			var html = "<div data-role=\"collapsible-set\">\n";
			for(var i = 0;i<list.length;i++){
				html+="<div data-role=\"collapsible\" data-collapsed=\"true\">";
				html+="<h3>"+list[i]["name"]+"</h3>";
				html+="<div id=\"map_"+i+"\"></div>";
				html += "</div>";
			}
			html += "</div>";
			$("div#popup_container").html(html);
			$("div#popup_container").trigger("create");
			/*for(var i = 0;i<list.length;i++){
				$("div#map_"+i).css("width",$(window).width()*0.8+"px");
				$("div#map_"+i).css("height",$(window).height()*0.8+"px");
				$("div#map_"+i).trigger("create");
				var latlng=new google.maps.LatLng(list[i]["latitude"], list[i]["longitude"]);
 			 	var myOptions = {
    					zoom: 14,
    					center: latlng,
    					mapTypeId: google.maps.MapTypeId.HYBRID
  				};
  				var map=new google.maps.Map(document.getElementById('map_'+i), myOptions);
				$("div#popup_container").trigger("create");*/
			}
			$( "div#popup_container").unbind("popupafteropen");
			$( "div#popup_container" ).bind({
   				popupafteropen: function(event, ui) {
					for(var i = 0;i<list.length;i++){
                                		$("div#map_"+i).css("width",$(window).width()*0.8+"px");
                                		$("div#map_"+i).css("height",$(window).height()*0.8+"px");
                                		$("div#map_"+i).trigger("create");
                                		var latlng=new google.maps.LatLng(list[i]["latitude"], list[i]["longitude"]);
                                		var myOptions = {
                                        		zoom: 14, /*初期のズーム レベル */
                                        		center: latlng, /* 地図の中心地点 */
                                        		mapTypeId: google.maps.MapTypeId.HYBRID /* 地図タイプ */
                                		};
                                		/* 地図オブジェクト生成 */
                                		var map=new google.maps.Map(document.getElementById('map_'+i), myOptions);
                                		$("div#popup_container").trigger("create");
                        		}
				}
			});
			$("div#popup_container").popup("open");
               } 
	}
};

function generate_action_icons(){
	var icons = action_icons;//["buy.jpeg","pray.jpeg","sleep.jpeg","trip.jpeg"];
	var html = "<table>\n";
	for(var i = 0;i<parseInt(icons.length/table_column);i++){
		html+="<tr>\n";
		for(var j = 0;j<table_column;j++){
			html+="<td>\n";
			html+="<img style=\"width:"+window_width/table_column+"px\" class=\"stamp_icon\" src=\"./stamp/"+icons[i*table_column+j]+"\" />";
			html+="</td>\n";
		}
		html+="</tr>\n";
	}
	for(var j = 0;j<icons.length % table_column;j++){
		html+="<td>\n";
		html+="<img style=\"width:"+window_width/table_column+"px\" class=\"stamp_icon\" src=\"./stamp/"+icons[icons.length - icons.length%table_column+j]+"\" />";
		html+="</td>\n";
	}
	html+="</table>\n";
	$("div#icon_container").html(html);

	$(document).trigger("create");

	$("img.stamp_icon").click(stamp_clk);

	state = 0;
};

function generate_place_icons(){
	var icons = place_icons;//["jinja.jpeg","castle.jpeg","tera.jpeg","yama.jpeg","doubutuen.jpeg","hotel.jpeg","museum.jpeg","onsen.jpeg","restaurant.jpeg"];
	var html = "<table>\n";
	for(var i = 0;i<parseInt(icons.length/table_column);i++){
		html+="<tr>\n";
		for(var j = 0;j<table_column;j++){
			html+="<td>\n";
			html+="<img style=\"width:"+window_width/table_column+"px\" class=\"stamp_icon\" src=\"./stamp/"+icons[i*table_column+j]+"\" />";
			html+="</td>\n";
		}
		html+="</tr>\n";
	}
	for(var j = 0;j<icons.length % table_column;j++){
		html+="<td>\n";
		html+="<img style=\"width:"+window_width/table_column+"px\" class=\"stamp_icon\" src=\"./stamp/"+icons[icons.length - icons.length%table_column+j]+"\" />";
		html+="</td>\n";
	}
	html+="</table>\n";
	$("div#icon_container").html(html);

	$(document).trigger("create");

	$("img.stamp_icon").click(stamp_clk);

	state = 1;
};

function generate_vehicle_icons(){
	var icons = vehicle_icons;//["bicycle.jpeg","bus.jpeg","bike.jpeg","taxi.jpeg","train.jpeg","walk.jpeg"];
	var html = "<table>\n";
	for(var i = 0;i<parseInt(icons.length/table_column);i++){
		html+="<tr>\n";
		for(var j = 0;j<table_column;j++){
			html+="<td>\n";
			html+="<img style=\"width:"+window_width/table_column+"px\" class=\"stamp_icon\" src=\"./stamp/"+icons[i*table_column+j]+"\" />";
			html+="</td>\n";
		}
		html+="</tr>\n";
	}
	for(var j = 0;j<icons.length % table_column;j++){
		html+="<td>\n";
		html+="<img style=\"width:"+window_width/table_column+"px\" class=\"stamp_icon\" src=\"./stamp/"+icons[icons.length - icons.length%table_column+j]+"\" />";
		html+="</td>\n";
	}
	html+="</table>\n";
	$("div#icon_container").html(html);

	$(document).trigger("create");

	$("img.stamp_icon").click(stamp_clk);

	state = 2;
};

$(document).ready(function(){
	window_width = $(window).width();
	init_handlers();
	init_icons_using_location();

	$("div#header img").css("height",$("div#header").height());
	$("div#header img").css("width","auto");

	$("div#popup_container").css("width",$(window).width()*0.9+"px");
	$("div#popup_container").css("height",$(window).height()*0.9+"px");
});
