jQuery(function($) {
	if($.cookie('permissions') != '1'){
		window['ga-disable-GTM-NXLQ6D'] = true;
	}

	// ----------------- scroll -------------------
	$( window ).scroll(function() {
		var scTop = $( window ).scrollTop();
		if(scTop > 10){
			$('body .nav-container .absolute').addClass('fixed outOfSight');
		}
		else{
			$('body .nav-container .absolute').removeClass('fixed outOfSight');
		}
	});
	/* trigger when page is ready */
	$(document).ready(function () {    
		// easy tabs
		if($('.tab_content_container').length){
			$('.tab_container').easytabs({
				animationSpeed: 'fast'
			});
		}
		
		$('.sflanguagesDropDown').customStyle();
		
		// filter locations on map and list
		$('#filter-locations select').change(function () {
			filter_location_map($("option:selected", this).val());
		});

		$('.resetmap a').click(function () {
			filter_location_map('all');
			$('#filter-locations select').val('all');
		});
		
		/*if($.cookie('permissions') != '1' && $.cookie('permissions') != '0')
		{
			winWidth=document.all?document.body.clientWidth:window.innerWidth; 
			winHeight=document.all?document.body.clientHeight:window.innerHeight; 
			setTimeout(function(){ 
				$('body').append('<div id="evergage-tooltip-ambhJMrb" class="evergage-tooltip evergage-qtip   evergage-jgrowl evergage-middlecenter evergage-tooltip-pos-c evergage-tooltip-focus" tracking="false" role="alert" aria-live="polite" aria-atomic="false" aria-describedby="evergage-tooltip-ambhJMrb-content" aria-hidden="false" style="height: 277px; width: 491px; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(255, 255, 255); visibility: visible; box-sizing: border-box; display: block; z-index: 1000403; top: 7.5px; left: '+((winWidth/2-491/2))+'px;" is-modal-qtip="true"><a id="aclose" href="#" title="Close Message" evergage-dismissonclick="evergage-dismissonclick" evergage-closeicon="evergage-closeicon" style="text-align: center; text-decoration: none; font-weight: normal; font-size: 16px; color: initial; position: absolute; top: 0px; right: 0px; height: 28px; width: 28px; line-height: 28px; padding: 0px;">x</a><div style="height: 61px; position: absolute; text-align: center; width: 371px; top: 135px; left: 60.2656px;">    I consent to the collection and use of my personal data for the purposes in this <a href="http://www.valcomelton.com/about/privacy-statement ">"Privacy Policy"</a></div><a id="aaccept" href="javascript:;" style="position: absolute; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(45, 180, 117); color: rgb(255, 255, 255); font-weight: bold; text-align: center; top: 206.994px; left: 131.764px; width: 104px; padding: 7px; display: block; margin-top: 15px; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;" evergage-dismissonclick="evergage-dismissonclick">Accept</a><a id="adecline" href="javascript:;" style="position: absolute; background-size: initial; background-attachment: initial; background-origin: initial; background-clip: initial; background-color: rgb(45, 180, 117); color: rgb(255, 255, 255); font-weight: bold; text-align: center; top: 206.994px; left: 255.764px; width: 104px; padding: 7px; display: block; margin-top: 15px; border-radius: 5px; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px;" evergage-dismissonclick="evergage-dismissonclick">Decline</a><img src="https://cdn.evergage.com/evergage-content/valcomelton/Desktop-green_84.png" draggable="false" style="position: absolute; width: 84px; height: 84px; border: none; top: 22px; left: 203.766px;"></div>');
				$('body').append('<div id="evergage-qtip-overlay" style="display: block; height: '+winHeight+'px; width: '+winWidth+'px; left: 0px; top: 0px; opacity: 1; z-index: 1000401;" class="blurs"><div></div></div>');
				$('#aaccept').click(function(){
					$.cookie('permissions', '1' , { expires : 30, path: '/' });	
					close_popup();
				});
				$('#adecline').click(function(){
					$.cookie('permissions', '0' , { expires : 1, path: '/' });
					close_popup();
				});
				$('#aclose').click(function(){			
					close_popup();
				});
				function close_popup(){
					$('#evergage-tooltip-ambhJMrb').remove();
					$('#evergage-qtip-overlay').remove();
				}
			}, 3000);
		}*/
		
		// FUNCTIONS
		function class_list(add) {
			var suburl = location.pathname.replace('/de', '').replace('/es', '').replace('/fr', '').replace('/it', '').replace('-', '_');
			if (suburl == '') suburl = '/';
			var url_split = suburl.split("/");
			var cc = "";
			if (url_split[1] === '') {
				cc += 'home';
			}
			for (i = 1; i < url_split.length; i++) {
				if (i == 1) {
					cc += url_split[i];
				} else {
					cc += " " + url_split[i];
				}
			}
			add = typeof add !== 'undefined' ? add : "";
			return cc + " " + add;
		}

		function url_parent_child() {
			var url_split = location.pathname.replace('-', '_').split("/");
			return count = url_split.length;
		}

		function filter_location_map(location) {			
			switch (location) {
				case ("all"):
					check_item_location(location);
					change_map(location);
					break;
				case ("north_america"):
					check_item_location(location);
					change_map(location);
					break;
				case ("europe"):
					check_item_location(location);
					change_map(location);
					break;
				case ("asia"):
					check_item_location(location);
					change_map(location);
					break;
			}
		}

		function change_map(map_area) {
			$('#map-area').find('.maps').each(function() {
				if ($(this).attr('id').indexOf(map_area) >= 0) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		}

		function check_item_location(location) {
			$('#corporate-centers .map-item').each(function() {
				if ($(this).attr('class').indexOf(location) >= 0) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
			$('#manufacturing-sales-centers .map-item').each(function() {
				if ($(this).attr('class').indexOf(location) >= 0) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		}
	});

	// ---------------------- MY CUSTOM --------------------
	setTimeout("jQuery('.headermobile .myabsolute').removeClass('absolute')",100);
	setTimeout("jQuery('.ez-toc nav').removeClass('absolute')",100);
	// ---- home
	$('.home .nav-bar .logo-light').attr('src','/wp-content/themes/foundry-child/img/logo_top.png');
	$('.blog .nav-bar .logo-light').attr('src','/wp-content/themes/foundry-child/img/logo_top.png');
	$('.home .nav-bar .logo-dark').attr('src','/wp-content/themes/foundry-child/img/logo_top2.png');
	$('.blog .nav-bar .logo-dark').attr('src','/wp-content/themes/foundry-child/img/logo_top2.png');
	$('.nav-container .nav-bar .social-list .ti-email').html('<img class="imgdark" src="/wp-content/themes/foundry-child/img/icon_email2.png" height="21" alt="" style="display:block;"/><img class="imglight" src="/wp-content/themes/foundry-child/img/icon_email.png" height="21" alt="" style="display:none;"/>');
	$('.nav-container .nav-bar .social-list .ti-location-pin').html('<img class="imgdark" src="/wp-content/themes/foundry-child/img/icon_location2.png" height="21" alt="" style="display:block;"/><img class="imglight" src="/wp-content/themes/foundry-child/img/icon_location.png" height="21" alt="" style="display:none;"/>');
	$('.nav-container .nav-bar .social-list .ti-mobile').html('<img class="imgdark" src="/wp-content/themes/foundry-child/img/icon_phone2.png" height="21" alt="" style="display:block;"/><img class="imglight" src="/wp-content/themes/foundry-child/img/icon_phone.png" height="21" alt="" style="display:none;"/>');
	$('.nav-container .nav-bar .widget-handle .ti-search').html('<img class="imgdark" src="/wp-content/themes/foundry-child/img/icon_search2.png" height="21" alt="" style="display:block;"/><img class="imglight" src="/wp-content/themes/foundry-child/img/icon_search.png" height="21" alt="" style="display:none;"/>');
	//--- icon hover
	var curIconImgSrc = '';
	$('.nav-container .nav-bar .social-list .ti-email img').mouseover(function() {
		curIconImgSrc = $(this).attr('src');
		$(this).attr('src','/wp-content/themes/foundry-child/img/icon_email3.png');
 	 }).mouseout(function() {
		$(this).attr('src',curIconImgSrc);
  	});
	$('.nav-container .nav-bar .social-list .ti-location-pin img').mouseover(function() {
		curIconImgSrc = $(this).attr('src');
		$(this).attr('src','/wp-content/themes/foundry-child/img/icon_location3.png');
 	 }).mouseout(function() {
		$(this).attr('src',curIconImgSrc);
  	});
	$('.nav-container .nav-bar .social-list .ti-mobile img').mouseover(function() {
		curIconImgSrc = $(this).attr('src');
		$(this).attr('src','/wp-content/themes/foundry-child/img/icon_phone3.png');
 	 }).mouseout(function() {
		$(this).attr('src',curIconImgSrc);
  	});
	// Hover search icon
	$('.search').hover(function() { 
		var img = $(this).find('.ti-search');
		$(img).find('img').each(function(){
			if($(this).attr('style').indexOf('block') > -1){
				curIconImgSrc = $(this).attr('src');
				$(this).attr('src','/wp-content/themes/foundry-child/img/icon_search3.png');
			}
		});
	}, function() { 
		var img = $(this).find('.ti-search img');
		$(img).each(function(){
			if($(this).attr('style').indexOf('block') > -1){				
				$(this).attr('src',curIconImgSrc);
			}
		});
	}); 
	//---- blog	
	setTimeout("jQuery('.pn_widget_subscr').find('.wpcf7-list-item').removeClass('checkbox-option')",100);
	$('.single-post .post .container .widget_categories').detach().appendTo('.single-post .post .container .row .col-md-3');		
	//jQuery('body:not(.home,.home-blog) .nav-container .nav-utility').appendTo('.main-container');
	
	//Detect nearest location
	$(document).ready(function () {   
		
		var data = [{
				"latitude": "39.30227500000001",
				"longitude": "-84.48168800000002",
				"company" : "Valco Melton",
				"location": "497 Circle Freeway Drive Suite 490 Cincinnati, OH 45246",
				"tel":"+1 513-874-6550"
			}, {
				"latitude": "42.8249117",
				"longitude": "-1.6900622000000567",
				"company" : "Valco Melton, SLU (Spain)",
				"location": "Pol. Industrial Agustinos, Calle G, 34, 31160 Orcoyen, Navarra, Spain",
				"tel":"+34 948 321 580"
			}, {
				"latitude": "24.476994",
				"longitude": "118.17388099999994",
				"company" : "(Valco Melton China) Valco (Xiamen) Imp. Exp.Co. Ltd.",
				"location": "Rm 2005, GuoMao HuiJing Building 57 Qian Pu Er Li Xiamen, Fujian 361008 Peoples Republic of China",
				"tel":"+86 592-591-7854"
			}, {
				"latitude": "52.717865",
				"longitude": "-2.4663880000000518",
				"company" : "(Valco Melton UK)",				
				"location": "Valco Cincinnati, Ltd. Hortonwood 32 Telford, TF1 7YN, U.K. ",
				"tel":"+44 1952-677911"
			}, {
				"latitude": "51.1630744",
				"longitude": "6.85262750000004",
				"company" : "(Valco Melton Germany)",		
				"location": "Valco Cincinnati, GmbH Bonnerstrasse 349 40589 Dusseldorf-Benrath, Germany",
				"tel":"+49 211 984 798-0"
			}, {
				"latitude": "42.8249146",
				"longitude": "-1.6900622000000567",
				"company" : "Valco Melton, SLU (Spain)",	
				"location": "Pol. Industrial Agustinos calle G, n.34 31160 Orcoyen, Navarra, Spain ", 
				"tel":"+34 948 321 580"
			}, {
				"latitude": "12.970936",
				"longitude": "77.52515300000005",
				"company" : "Valco Melton Engineering ( I ) Pvt Ltd ",
				"location": "#20 A/2, KIADB Road, 1st Cross Peenya 1st Phase, Industrial Area Bangalore, Karnataka India 560058", 
				"tel":"+91 80 28378111"
			}, {
				"latitude": "39.30363700000003",
				"longitude": "-84.48205200000001",
				"company" : "Valco Melton USA ",
				"location": "411 Circle Freeway Drive Cincinnati, OH 45246", 
				"tel":"+1 513-874-6550 "
			}, {
				"latitude": "52.66971999999999",
				"longitude": "-2.460937000000058",
				"company" : "Valco Melton UK",
				"location":"Hortonwood 32 Telford, TF1 7YN, U.K. ", 
				"tel":"+44 1952-677911"
			}, {
				"latitude": "24.476974",
				"longitude": "118.17399899999998",
				"company" : "Valco Melton China",
				"location": "Rm 2005, GuoMao HuiJing Building 57 Qian Pu Er Li Xiamen, Fujian 361008 Peoples Republic of China", 
				"tel":"+86 592-591-7854"
			}, {
				"latitude": "46.800059",
				"longitude": "19.16015600000003",
				"company" : "Valco Melton Hungary",
				"location": "Eastern Europe Office, Budapest, Hungary ", 
				"tel":"+36 1-214-4705"
			}, {
				"latitude": "45.497331800000005",
				"longitude": "9.205263699999932",
				"company" : "Valco Melton Italy",
				"location": "Via Angelo Fava, 6, 20125 Milano MI, Italy", 
				"tel":" +39 0372-23150 "
			}, {
				"latitude": "44.91410900000002",
				"longitude": "4.916890999999964",
				"company" : "Valco Melton France",
				"location": "32, rue Jean Bertin, 26000 Valence,France ", 
				"tel":"+33 4-7578-1373"
			}, {
				"latitude": "52.266531",
				"longitude": "4.631004999999959",
				"company" : "Valco Melton Benelux",
				"location": "Venneperweg 535b, NL-2152 CB Nieuw-Vennep", 
				"tel":"+31 252-673673 "
			}, {
				"latitude": "39.30365700000003",
				"longitude": "-84.48188099999999",
				"company" : "Valco Melton USA, Building 1",
				"location": "411 Circle Fwy Dr, Cincinnati, OH 45246 ", 
				"tel":"+1 513.874.6550 "
			}, {
				"latitude": "39.303772",
				"longitude": "-84.48124100000001",
				"company" : "Valco Melton USA, Building 2",
				"location": "457 Circle Fwy Dr, Cincinnati, OH 45246  ", 
				"tel":"+1.513.874.6550"
			}, {
				"latitude": "19.3761966",
				"longitude": "-99.15311050000003",
				"company" : "Valco Melton Mexico",
				"location": "Calle Monte Albán 598, Col. Letrán Valle, Benito Juarez, 03650 Mexico DF", 
				"tel":""
			}, {
				"latitude": "38.2754952000000",
				"longitude": "-122.66488620000001",
				"company" : "Valco Melton USA West Coast",
				"location": "GMS-VansSco 1310 Redwood Way, Suite B  Petaluma, CA 94954", 
				"tel":""
			}, {
				"latitude": "38.27549520000003",
				"longitude": "-122.66488620000001",
				"company" : "Cold Glue Equipment",
				"location": "1310 Redwood Way, Suite B Petaluma, CA 94954", 
				"tel":""
			}, {
				"latitude": "51.163074400000006",
				"longitude": "6.852628500000037",
				"company" : "Valco Melton Germany",
				"location": "Bonner Str. 353, 40589 Düsseldorf, Germany", 
				"tel":"+49 211 984 798-0"
			}, {
				"latitude": "41.042753499999975",
				"longitude": "28.997778100000005",
				"company" : "Valco Melton Turkey",
				"location": "Abacı Latif Sokaği No:14, Vişnezade Mahallesi, 34357 Beşiktaş/İstanbul, Turkey", 
				"tel":""
			}, {
				"latitude": "51.021360000000016",
				"longitude": "17.161100000000033",
				"company" : "Valco Melton Poland",
				"location": "Ul. Grabskiego 22 55-011 Siechnice", 
				"tel":""
			}, {
				"latitude": "49.2657349",
				"longitude": "-123.10727910000003",
				"company" : "Valco Melton Canada | ClearVision Technologies, Inc.",
				"location": "107 W 6th Avenue Vancouver, BC V5Y 1K3 Toll Free in USA: ", 
				"tel":"+1 866 528 0212 "
			}];
			
			
		if (navigator.geolocation) {
			navigator.geolocation.watchPosition(showNearestOffice, showNearestOffice_error);
		} else { 			
				showNearestOffice_error();
		}
		
		function showNearestOffice_error(){
			$('.nav-container .ti-location-arrow').next().html(data[0].location);
			//$('.nav-container .ti-location-pin').parent().attr('href','https://www.google.com/maps/dir//'+data[0].latitude+','+data[0].longitude);
			$('.nav-container .ti-mobile').parent().attr('href','tel:'+data[0].tel);
			//$('.headermobile .iconlocation a').attr('href','https://www.google.com/maps/dir//'+data[0].latitude+','+data[0].longitude);
			$('.headermobile .iconphone a').attr('href','tel:'+data[0].tel);
		}
		
		function showNearestOffice(position) {
			
			var latitude = position.coords.latitude;			
			var longitude = position.coords.longitude;
			
			var _distance = 0;
			var location_nearest = '';
			for (var i = 0; i < data.length; i++) {
				var _temp  = distance(latitude, longitude, data[i].latitude, data[i].longitude, "K");
				if (i == 0) {
					_distance = _temp;
					loccation_code = data[i].location;
				}else{
					if(_distance > _temp) 
					{
						_distance = _temp;
						location_nearest_id = i;
					}
				}
			}			
			$('.nav-container .ti-location-arrow').next().html(data[location_nearest_id].location);
			//$('.nav-container .ti-location-pin').parent().attr('href','https://www.google.com/maps/dir//'+data[location_nearest_id].latitude+','+data[location_nearest_id].longitude);
			$('.nav-container .ti-mobile').parent().attr('href','tel:'+data[location_nearest_id].tel);
			//$('.headermobile .iconlocation a').attr('href','https://www.google.com/maps/dir//'+data[location_nearest_id].latitude+','+data[location_nearest_id].longitude);
			$('.headermobile .iconphone a').attr('href','tel:'+data[location_nearest_id].tel);
		}
		
		function distance(lat1, lon1, lat2, lon2, unit) {
			var radlat1 = Math.PI * lat1/180
			var radlat2 = Math.PI * lat2/180
			var theta = lon1-lon2
			var radtheta = Math.PI * theta/180
			var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
			if (dist > 1) {
				dist = 1;
			}
			dist = Math.acos(dist)
			dist = dist * 180/Math.PI
			dist = dist * 60 * 1.1515
			if (unit=="K") { dist = dist * 1.609344 }
			if (unit=="N") { dist = dist * 0.8684 }
			return dist
		}
		
	});
	
	//Function for events
	$(document).ready(function(){
		// ----------- page ---------------
		setTimeout("jQuery('img').each(function(){if(jQuery(this).attr('name') =='pphLoggerImage'){jQuery(this).attr('style','display:none');}});",100);
		// ----------- events ---------------
		// check list data event
		if($('.eventlistbox .jsdata').length > 0){
			$('.eventlistbox .jsshow').attr('style','display:block;');
			// add column
			$('.eventlistbox .jsshow').html(''+
			'<div class="col col1">'+
			'</div>'+
			'<div class="col col2">'+
				'<div class="line"><div class="cir"></div></div>'+
			'</div>'+
			'<div class="col col3">'+
			'</div>');
			// add column data
			var itemColTotal = 0;
			$('.eventlistbox .jsdata .item').each(function(index){
				var iObj = $(this)[0].outerHTML;
				if(index % 2){
					$('.eventlistbox .jsshow .col3').append(iObj);
				}
				else{
					$('.eventlistbox .jsshow .col1').append(iObj);
					$('.eventlistbox .col2').append('<div class="item"><div class="cir"></div></div>');
					itemColTotal++;
				}
			});
			// calculate col2 
			var lineHeight = (itemColTotal * 50) - 50;
			if(lineHeight == 0){
				lineHeight = 1;
			}
			$('.eventlistbox .jsshow .col2').attr('style','height: '+lineHeight+'px;');
			
		}
		else{
			$('.eventlistbox .col').hide();
		}
		
		$('.eventlistbox  .jsshow .item h3').click(function(){
			EventListItemClick(this);
		});
		$('.eventlistbox  .jsdata .item h3').click(function(){
			EventListItemClick(this);
		});
		function EventListItemClick(obj){
			// event avtive list
			$('.eventlistbox .jsshow .col1 .item').removeClass('active');
			$('.eventlistbox .jsshow .col3 .item').removeClass('active');
			$('.eventlistbox .jsdata .item').removeClass('active');
			$(obj).parent().addClass('active');
			// event node active
			var indexNode = 0;
			if($(obj).parent().parent().hasClass('col1')){
				indexNode= $('.eventlistbox .jsshow .col1 .item').index($(obj).parent());
			}
			else if($(obj).parent().parent().hasClass('col3')){
				indexNode = $('.eventlistbox .jsshow .col3 .item').index($(obj).parent());
			}
			$('.eventlistbox .col2 .item').removeClass('active');
			$('.eventlistbox .col2 .item').eq(indexNode).addClass('active');
			// event show description
			$('.eventlistbox .jsshow .desc').attr('style','display:none;');
			$('.eventlistbox .jsdata .desc').attr('style','display:none;');
			$(obj).parent().find('.desc').attr('style','display:block;');				
			// event node height	
			var itemColTotal = $('.eventlistbox .col1 .item').length;
			var itemColTotal3 = $('.eventlistbox .col3 .item').length;
			var nodeCurHeight = $(obj).parent().find('.desc').height();
			var lineHeight = ((itemColTotal * 50) - 40)+nodeCurHeight;
			$('.eventlistbox .col2 .item').removeAttr('style');
			if(indexNode == (itemColTotal -1)){		
				lineHeight = ((itemColTotal * 50) - 50);
				if(lineHeight == 0){
					lineHeight = 1;
				}
				$('.eventlistbox .jsshow .col2').attr('style','height: '+lineHeight+'px;');
			}
			else{
				$('.eventlistbox .jsshow .col2').attr('style','height: '+lineHeight+'px;');
				$('.eventlistbox .col2 .item').eq(indexNode).attr('style','margin-bottom:'+(nodeCurHeight+35)+'px;')
			}
		}
		
		// ----------------- login -------------------
		if($('#wpadm-login-form #lf_form_remember_cont').length){
			var loginOldRem = $('#wpadm-login-form #lf_form_remember_cont')[0].outerHTML;
			$('#wpadm-login-form #lf_form_remember_cont').remove();
			$('#wpadm-login-form  #id_button_login_form').parent().append(loginOldRem);
			if($('.jslostpass').length){
				var loginOldLost = $('.jslostpass')[0].outerHTML;
				$('.jslostpass').remove();
				$('#wpadm-login-form  #id_button_login_form').parent().append(loginOldLost);
			}else{
				$('#wpadm-login-form  #id_button_login_form').parent().append('<div class="jslostpass"></div>');
			}
		}
		
		// ----------------- contact -------------------
		setTimeout("jQuery('.contactbox .cright .rule').find('.checkbox-option').removeClass('checkbox-option')",100);
		// ----------------- Home -------------------
		$('.jsmodelvideo').click(function(){
			var obj = $(this).parent();
			ShowModalImg(obj,'mymodal');
		});

		// ----------------- product -------------------
		$('.product_media .jsShowModal').click(function(){
			ShowModalImg(this,'mymodal');
		});
		$('.mymodal .close').click(function(){
			CloseModal('mymodal');
		});		
		$('.jspiexpland').click(function(){
			console.log($('.product_info').attr('style')+'=========')
			if($('.product_info').attr('style') == undefined || $('.product_info').attr('style')== ''){
				$('.product_info').attr('style','max-height: 100%;');	
				$('.jspiexpland').html('<i class="ti-layout-column2"></i> Collapse');
			}
			else{
				$('.product_info').removeAttr('style','');	
				$('.jspiexpland').html('<i class="ti-layout-column2"></i> Expand');
			}
		});
		function ShowModalImg(obj,cls){
			// add content
			var ydata = $(obj).find('img').attr('ydata');
			var ytype = $(obj).find('img').attr('ytype');
			if(typeof ytype != 'undefined' && ytype !='' && ytype =='video'){
				$('.' + cls).find('.con').html('<iframe src="'+ydata+'" alt="" width="768" height="432" ></iframe>');
			}
			else{
				if(typeof ydata != 'undefined' && ydata !=''){
					$('.' + cls).find('.con').html('<iframe src="'+ydata+'" alt="" width="600" height="500" ></iframe>');
				}else{
					var urlImg = $(obj).find('img').attr('src');						
					$('.' + cls).find('.con').html('<img src="'+urlImg+'" alt="" />');
				}
			}
			// calculate width, height
			var eheight = $('.' + cls).height();
			var ewidth = $('.' + cls).width();
			var leftpx = window.innerWidth - ewidth;
			var toppx = window.innerHeight - eheight;
			// scroll top
			//$("html, body").animate({ scrollTop: $(window).scrollTop() }, 15);
			if (leftpx < 0)
				leftpx = 0;
			if (toppx < 0)
				toppx = 0;
			if (leftpx >= 0 && toppx >= 0) {
				leftpx = leftpx / 2;
				toppx = toppx / 2;
				$('.mymodalwrapp').attr('style', 'display:block');
				$('.' + cls).attr('style', 'display:block');
				$('.' + cls).attr('style', 'display:block;left:' + leftpx + 'px; top:' + toppx + 'px');
				$('html').attr('style', 'overflow:hidden');
			}
			else {
				$('.mymodalwrapp').attr('style', 'display:block');
				$('.' + cls).attr('style', 'display:block');
				$('html').attr('style', 'overflow:hidden');
			}
		}
		
		function CloseModal(cls) {
			$('.mymodalwrapp').attr('style', 'display:none');
			$('.' + cls).attr('style', 'display:none');
			$('html').attr('style', 'overflow:none');
		}
		
	});
		
	// ----------------- Search -------------------
	if($('.masonry .masonry-item .inner .content-cattegory').html()==''){
		$('.masonry .masonry-item .inner .content-cattegory').removeClass('content-cattegory');
	}
	
	// ----------------- Slides -------------------
	$('.SlideSlick').slick({
	  slidesToShow: 1,
	  slidesToScroll: 1,
	  dots: true,
  	  infinite: true,
	});	
	
	// ----------------- register -------------------
	if($('#signup-content .wp-signup-container').length > 0){
		$('#signup-content .wp-signup-container').parent().attr('style','min-height: 300px;margin-top: 155px;');
		$('body').removeClass('home');
	}
	
});

// ----------------- Chat -------------------
function startChat() {
	window.open('https://hostedusa3.whoson.com/newchat/chat.aspx?domain=www.valcomelton.com', 'wochatwindow', 'width=500,height=390');
	return false;
} 

// ----------------- Jump to char in location page -------------------
function jumpchar(obj, ch)
{
	jQuery(obj).parent().find('a').removeClass("activated");
	jQuery(obj).addClass("activated");
	jQuery(window).scrollTop(jQuery("h3."+ch).first().offset().top - 125);
}
