(function($){
	window._w_m = '\\w+';
	$.get = function(url,_data,callback,dataType){
		var data = {};
		if(!callback && typeof(_data) == 'function'){
			callback = _data;
		}else{
			data = _data;
		};
		if(!dataType){
			dataType = 'html';
		};
		if(!data.hideLoading){
			$.fancybox && $.fancybox.showLoading();
		}
		$.ajax({
			url: url,
			data: data,
			type: "GET",
			dataType: dataType,
			success: function(data){
				$.fancybox && $.fancybox.hideLoading();
				window.G_hideLoading && window.G_hideLoading();
				if(data == 'NEED_LOGIN'){
					if(top.location == self.location){
						location.reload();
					}else{
						parent.location.reload();
					};
				}else{
					callback && callback(data);
				};
			}
		});
	};
	
	$.post = function(url,_data,callback){
		var data = {};
		if(!callback && typeof(_data) == 'function'){
			callback = _data;
		}else{
			data = _data;
		};
		if(!data.hideLoading){
			$.fancybox && $.fancybox.showLoading();
		}
		$.ajax({
			url: url,
			data: data,
			type: "POST",
			dataType: "html",
			success: function(data){
				$.fancybox && $.fancybox.hideLoading();
				window.G_hideLoading && window.G_hideLoading();
				if(data == 'NEED_LOGIN'){
					if(top.location == self.location){
						location.reload();
					}else{
						parent.location.reload();
					};
				}else{
					callback && callback(data);
				};
			}
		});
	};
	$.fn.xInView = function(callback,callback1,offset){
        if (typeof(callback1) == 'number') {
            offset = callback1;
        }
        offset = offset || 0;
        var _this = $(this);
        function getScrollpoint(){
            var scrollpoints = [];
            var s_top = $(document).scrollTop();
            $(_this).each(function(){
                scrollpoints.push($(this).offset().top - offset);
            });
            scrollpoints.push(s_top);
            scrollpoints.sort(function(a,b){return a - b;});
            return $.inArray(s_top, scrollpoints);
        };
        
        function loadElemenet(){
            var index = getScrollpoint();
            var ele = $(_this).get(index-1);
            if (index == 1) {
                callback && callback.call(ele);
            } else if (typeof(callback1) == 'function') {
                callback1 && callback1.call(ele);
            }
            
        };
        $(window).bind("scroll.xInView", function () {
            loadElemenet();
        });
        loadElemenet();
        return this;
    };
	$.fn.xLazyLoad = function (options) {
		var _this = $(this);
		var defaults = {
			style: "top",
			offset: 200,
			trigger_element: null,
			callback: null,
			"": ""
		};
		var settings = $.extend({}, defaults, options);
		var stime = null;

		function loadImg() {
			_this.each(function () {
				if ($(this).attr("_effect")) {
					var y = isIpad() ? window.pageYOffset + 50 : Math.max(document.documentElement.scrollTop, document.body.scrollTop);
					var x = isIpad() ? window.pageXOffset + 50 : Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
					if (settings.trigger_element) {
						y = $(settings.trigger_element).offset().top;
						x = $(settings.trigger_element).offset().left;
					}
					var test = false;
					if (settings.style == "top") {
						test = $(this).offset().top <= document.documentElement.clientHeight + y + settings.offset && $(this).offset().top >= y - settings.offset;
					} else {
						test = $(this).offset().left <= document.documentElement.clientWidth - x + settings.offset && $(this).offset().left >= x - settings.offset;
					}
					if (test) {
						$(this).removeAttr('_effect');
						var self = this;
						var img = $(self).find('img[_src]');
						if(img.size()){
							img.each(function(kk,v_img){
								var _src = $(v_img).attr("_src");
								$(v_img).removeAttr("_src");
								setTimeout(function () {
									$(v_img).load(function(){
										$(self).animate({
											opacity:1
										},500);
									}).attr("src", _src);
									settings.callback && settings.callback.call($(self));
								}, Math.random() * 1000);
							});
						}else{
							setTimeout(function () {
								$(self).animate({
									opacity:1
								},500);
								settings.callback && settings.callback.call($(self));
							}, Math.random() * 1000);
						}
					}
				}
			});
		}

		function isIpad() {
			return navigator.userAgent.match(/iPad/i) != null;
		}
		if (!settings.trigger_element) {
			$(window).bind("scroll.xLazyLoad", function () {
				if (stime) {
					clearTimeout(stime);
				}
				stime = setTimeout(function () {
					loadImg();
				}, 200);
			});
		}
		loadImg();
		return this;
	};

	$.isIpad = function() {
		return navigator.userAgent.match(/iPad/i) != null;
	};
	
	$.fn.xScroll = function(offset,callback){
		if($(this).size() == 0){
			return;
		};
		if(!offset){
			offset = 0;
		}
		var _this = this;
		$('html,body').stop(false,false).animate({
			scrollTop: $(this).offset().top+offset
		}, 1000,function(){
			callback && callback.call($(_this));
		});
	};
	
	$.fn.xShake = function(){
		return $(this).stop(true,true).effect('pulsate',{times:2},400).focus();
	};
	
	$.fn.xNumber = function(){
		var bindStr = "input.validNumber propertychange.validNumber keyup.validNumber";
		$(this).on(bindStr,function(e){
			if(/[^\d]/g.test($(this).val())){
				$(this).val($(this).val().replace(/[^\d]/g,''));
			}
        });
	};
	
	$.number_format = function(s) {
		if (/[^0-9\.]/.test(s)) return "0";
		if (s == null || s == "") return "0";
		s = s.toString().replace(/^(\d*)$/, "$1.");
		s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");  
		s = s.replace(".", ",");
		var re = /(\d)(\d{3},)/;  
		while (re.test(s))
			s = s.replace(re, "$1,$2");
		s = s.replace(/,(\d\d)$/, ".$1");
		if (true) {// 不带小数位(默认是有小数位)
			var a = s.split(".");
			if (a[1] == "00"){  
				s = a[0];
			};
		};
		return s;  
	};
	
	$.fn.outerHTML = function(){return $("<p></p>").append(this.clone()).html();};
	
	$.h = function(str){  
		str = str.replace(/&/g, '&amp;');
		str = str.replace(/</g, '&lt;');
		str = str.replace(/>/g, '&gt;');
		str = str.replace(/"/g, '&quot;');
		str = str.replace(/'/g, '&#039;');
		return str;
	};
	
	$.formatSize = function(size){
		var fileSize = Math.round(size / 1024);
		var suffix   = 'KB';
		if (fileSize > 1000) {
			fileSize = Math.round(fileSize / 1000);
			suffix   = 'MB';
		}
		var fileSizeParts = fileSize.toString().split('.');
		fileSize = fileSizeParts[0];
		if (fileSizeParts.length > 1) {
			fileSize += '.' + fileSizeParts[1].substr(0,2);
		}
		fileSize += suffix;
		
		return fileSize;
	};
	
	$.lang = function () {
		return location.pathname.split("/")[1];
	};
	$.gurl = function(url){
		return '/'+$.lang()+url;
	};
	$.isCN = function(){
		return $.lang() == 'cn';
	};
	
	$.check_email = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(ipt_txt.val())){
			ipt_txt.focus();
			return false;
		}
		return true;
	};
	$.check_mobile = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(!/^[0-9]*$/.test(ipt_txt.val())){
			ipt_txt.focus();
			return false;
		}
		if(ipt_txt.val().length != 11){
			ipt_txt.focus();
			return false;
		}		
		return true;
	};
	$.check_password = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(ipt_txt.val().length < 6 || ipt_txt.val().length > 20){
			ipt_txt.focus();
			return false;
		}
		return true;
	};
	$.check_filled = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(ipt_txt.val() == ''){
			ipt_txt.focus();
			return false;
		}
		return true;
	};
	$.check_link = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(ipt_txt.val() != ''){
			if(ipt_txt.val().indexOf('http://') == -1
			&& ipt_txt.val().indexOf('https://') == -1 && ipt_txt.val().indexOf('@') == -1){
				ipt_txt.val('http://'+ipt_txt.val());
			}
		}
		return true;
	};
	$.check_link_format = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(ipt_txt.val() != ''){
			if(ipt_txt.val().indexOf('http://') == -1
			&& ipt_txt.val().indexOf('https://') == -1 && ipt_txt.val().indexOf('@') == -1){
				ipt_txt.val('http://'+ipt_txt.val());
			}
		}
		return true;
	};
	$.check_link_title = function (ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		ipt_txt.val(ipt_txt.val().replace(/ /g,'-'));
		if(ipt_txt.val() != '' && /^[A-Za-z0-9 \-_]+$/.test(ipt_txt.val())){
			return true;
		}
		ipt_txt.focus();
		return false;
	};
	$.check_identify = function (type_id,ipt_txt){
		var ipt_txt = $(ipt_txt);
		ipt_txt.val($.trim(ipt_txt.val()));
		if(type_id == 1){
			if(ipt_txt.val().length != 15 && ipt_txt.val().length != 18){
				ipt_txt.focus();
				return false;
			}
			if(!IdentityCodeValid(ipt_txt.val())){
				ipt_txt.focus();
				return false;
			}
		}
		return true;
	};
	$.params = function(name){
		var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null){
			return unescape(r[2]);
		}
		return null;
	};
	$.fn.xLimit = function(len){
		$(this).off("input.xLimit propertychange.xLimit blur.xLimit keyup.xLimit").on("input.xLimit propertychange.xLimit blur.xLimit keyup.xLimit", function(){
			if ($(this).val().length > parseInt(len)) {
				$(this).val($(this).val().substring(0, len));
				$(this).siblings('.num').addClass('warning');
			} else {
				$(this).siblings('.num').removeClass('warning');
			}
			$(this).siblings('.num').html($(this).val().length+'/'+len);
		});
		$(this).trigger('blur.xLimit');
		return $(this);
	};
	
	
	
	var CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	Math.uuid = function (len, radix) {
		len = 20;
		var chars = CHARS, uuid = [], i;
		radix = radix || chars.length;
	
		if (len) {
			// Compact form
			for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random()*radix];
		} else {
			// rfc4122, version 4 form
			var r;
	
		// 	rfc4122 requires these characters 
			uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
			uuid[14] = '4';
		
		// Fill in random data.  At i==19 set the high bits of clock sequence as
		// per rfc4122, sec. 4.1.5
			for (i = 0; i < 36; i++) {
				if (!uuid[i]) {
					r = 0 | Math.random()*16;
					uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
				}
			}
		}
		return uuid.join('');
	};
	$.getPhotoUrl = function(media_url,size){
		var host = 'http://'+location.host+'/';
		if(media_url == '' || media_url == undefined){
			return host+'files/blank.gif';
		}
		var photo_path = media_url+'?'+Math.random();
		return host + photo_path;
	};
	$.getFileType = function(file){
		var rtn = '';
		if(file != ''){
			rtn = file.substr(file.lastIndexOf('.')+1).toUpperCase();
			
		}
		return rtn;
	};
})(jQuery);

function __Year_Month_day_Check(__type,__yearId,__monthId,__dayId){
	__year = document.getElementById(__yearId);
	__month = document.getElementById(__monthId);
	__day = document.getElementById(__dayId);
	__yearValue = Number(__year.value);
	__monthValue = Number(__month.value);
	__dayValue = Number(__day.value);
	if(__type == 'year'){
		for (var i = __month.options.length;i > 1;i--){
			__month.remove(i-1);
		}
		for (var i = __day.options.length;i > 1;i--){
			__day.remove(i-1);
		}
		if (__yearValue != '0000') {
			for (var i = 0;i < 12;i++){
				var n = i<9?'0'+(i+1):(i+1);
				__month.options[i+1] = new Option(n,n);
			}
		}
	}else if(__type == 'month'){
		if (__monthValue == '00') {
			for (var i = __day.options.length;i > 1;i--){
				__day.remove(i-1);
			}
		}else{
			var __monthDays = new Array(31,29,31,30,31,30,31,31,30,31,30,31);
			__monthDays[1] = (__yearValue % 4 == 0)&&(__yearValue % 100 != 0)||(__yearValue % 400 == 0)?29:28;
			var __newDay = __monthDays[__monthValue-1];
			for (var i = __day.options.length;i > __newDay +1 ;i--){
				__day.remove(i-1);
			}
			for (var i = __day.options.length;i < __newDay +1 ;i++){
				var n = i<10?'0'+ i:i;
				__day.options[i] = new Option(n,n);
			}
		}
	}
}
