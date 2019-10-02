var easyCms = function(options){
	var opt = {
		// main container
		ele_main:'.div_cms_main', 
		// sort div
		ele_sort:'#sort-cms',
		editor_zIndex:999,
		uploadScript:'/upload_photo',
		saveScript:'/save_cms',
		table:'',
		content:'',
		fileType:['.jpg','.png','.gif'],
		module:'back',
		1:1
	};
	opt = $.extend({}, opt, options);
	opt.ele_main = opt.ele_main + ' ';
	var $this = this;


	

	/**
	 * check if have ele_main and ele_sort
	 */
	this._check_ele = function(){
		if(!$(opt.ele_main).size()){
			alert('Please configure ele_main');
			return;
		};
		if(!$(opt.ele_sort).size()){
			alert('Please configure ele_sort');
			return;
		};
	};
    /**
     * hide mask
     */
    this._hide_hovercon = function(){
        $(opt.ele_main + '.cmsInsertBox').css('visibility','hidden');
        $(opt.ele_main + '.cmsHoverCon').hide();
    },

    /**
     * show mask
     */
    this._show_hovercon = function(){
        $(opt.ele_main + '.cmsInsertBox').css('visibility','');
        $(opt.ele_main + '.cmsHoverCon').show();
        $(opt.ele_main + '.editButtonList').show();
    },
    /**
     * add element
     */
    this._add_element = function(insert_source,newEle){
        $('.cmsInsertBox').removeClass('only');
        var insert_source = $(insert_source);
        var newEle = $(newEle);
        var div_element = insert_source.closest('.div_element');
        if(div_element.hasClass('cmsInsertBox')){
            div_element.before(newEle);
        }else{
            // $(opt.ele_main).find('.submitBox').before(newEle);
        };

        if (newEle.hasClass('insert_video')) {
            newEle.find('.xcms_hover_edit_video').click();
        } else {

            if(newEle.find('textarea').size()
            && newEle.find('.xcms_hover_edit').size()){
                newEle.find('.xcms_hover_edit').click();
            };
        }
        $this._insertbox(newEle);
        $this._bind_xcms_insert_image();
    };
    /**
     * add toolbar
     */
    this._insertbox = function(newEle){
        var data_ele = {
            id_div:'div_'+Math.uuid(),
            id_img:'img_'+Math.uuid()
        };
        newEle.before(baidu.template('template_insertbox',data_ele));
    }
    /**
     * 添加编辑器
     */
    this._add_editor = function(editor_id){
       $this._hide_hovercon();
        var div_element = $('#'+editor_id).closest('.div_element');
        div_element.find('[_contenteditable]').attr('contenteditable','true');
        var editor = CKEDITOR.instances[editor_id];
        if(!editor){
            if (div_element.hasClass('insert_video') || div_element.hasClass('insert_image')) {
                editor = CKEDITOR.inline(editor_id,{toolbar:'caption'});
            } else {
                editor = CKEDITOR.inline(editor_id);
            }
            editor.on('instanceReady',function(){
                this.focus();
                $('#'+editor_id).removeAttr('title');
            });
            editor.on('blur',function(){
                $this._show_hovercon();
            });
        }
        editor.focus();
    };
    /**
     * 绑定遮罩编辑按钮
     */
    this._bind_xcms_hover_edit = function(){
        $(opt.ele_main+ '.xcms_hover_edit').off();
        $(opt.ele_main).on('click','.xcms_hover_edit',function(evt){
            $this._hide_hovercon();
            var div_element = $(evt.target).closest('.div_element');
            if(div_element.hasClass('insert_source')){//源码模式
                div_element.find('.cmsHoverCon').hide();
                div_element.find('textarea').focus();
                // div_element.find('textarea').blur(function() {
                //     $this._show_hovercon();
                // });
            } else if (div_element.hasClass('insert_video')) {
                var editor_id = div_element.find('[_contenteditable]').attr('id');
                div_element.find('[_contenteditable]').show();
                $this._add_editor(editor_id);
            } else if (div_element.hasClass('insert_image')) {
                div_element.find('.cmsHoverCon').hide();
                div_element.find('[_contenteditable]').attr('contenteditable',true).focus();
                div_element.find('[_contenteditable]').blur(function() {
                    var OriginalString = $(this).html();
                    var StrippedString = OriginalString.replace(/(<([^>]+)>)/ig,"");
                    $(this).html(StrippedString);
                    $(this).attr('contenteditable',false);
                    $this._show_hovercon();
                });
            }else if(div_element.find('[_contenteditable]').size()){//含有编辑器模式
                var editor_id = div_element.find('[_contenteditable]').attr('id');
                $this._add_editor(editor_id);
            };
        });
    };
    /**
     * 绑定遮罩删除按钮
     */
    this._bind_xcms_hover_del = function(){
        $(opt.ele_main).on('click','.xcms_hover_del,.editHr .del',function(){
            $this._show_hovercon();
            var div_element = $(this).closest('.div_element');
            var div_next = $(div_element).next();
            //检查该div_element后面是不是插入条,如果是则删除
            if(div_next.hasClass('cmsInsertBox')){
                //如果有uploadifive控件的话立即删除会报错,这里增加延时
                div_next.remove();
            };

            //销毁ckeditor
            if (div_element.find('.cke_editable').size()) {
                var cmsMainBoxCon = div_element.find('.cke_editable');
                if (cmsMainBoxCon.attr('id')) {
                    var editor = CKEDITOR.instances[cmsMainBoxCon.attr('id')];
                    editor.destroy();
                    delete editor;
                };
            };

            div_element.remove();
        });
    };

    /**
     * 绑定排序按钮
     */
    this._bind_xcms_hover_sort = function(){
        $(opt.ele_main).on('click','.xcms_hover_sort',function(){
            $this._main_sort(opt.ele_main);
        });

        $(opt.ele_sort+' ul').sortable({
            axis: 'y'
        });
    };
    /**
     * 主排序
     */
    this._main_sort = function(div){
        $(opt.ele_sort+' ul').html('');
        $(div).children('.div_element[_element]').each(function(){
            var id = $(this).attr('id');
            var li = '';
            if($(this).hasClass('insert_source')){//源码模式
                li = '<li _id="'+id+'" class="box"><div class="tit icon-code">Source Code</div></li>';
            }else if($(this).hasClass('insert_text')){//编辑器模式
                li = '<li _id="'+id+'"><div class="tit icon-cms">Text</div><div class="info">'+$(this).find('[_contenteditable]').text()+'</div></li>';
            }else if($(this).hasClass('insert_image')){//图片模式
                li = '<li _id="'+id+'"><div class="tit icon-image">Image</div><div class="info"><img style="height:100px" src="'+$(this).find('img').attr('src')+'"></div></li>';
            }else if($(this).hasClass('insert_video')){//视频模式
                li = '<li _id="'+id+'" class="box"><div class="tit icon-film">Video</div></li>';
            }else if($(this).hasClass('insert_image_text')){//图文模式
                li = '<li _id="'+id+'"><div class="tit icon-limg">Image &amp; Text</div><div class="info"><img style="height:100px" class="fl" src="'+$(this).find('img').attr('src')+'" ><p>'+$(this).find('.div_content').html()+'</p></div></li>';
            }else if($(this).hasClass('insert_split')){//分割线
                li = '<li _id="'+id+'" class="box"><div class="tit"><i class="fa fa-navicon"></i> Split</div><hr/></li>';
            }else if($(this).hasClass('insert_gallery')){
                li = '<li _id="'+id+'"><div class="tit icon-image">Gallery</div><div class="info"><img style="height:100px" src="'+$(this).find('img:first').attr('src')+'"></div></li>';
            }
            $(opt.ele_sort+' ul').append(li);
        });
        $(opt.ele_sort).attr('_div_current',div);
        $(opt.ele_sort).modal('show');

        $(opt.ele_sort +' .saveSortCms').click(function(){
            var ids = [];
            $(opt.ele_sort+' li').each(function(k,v){
                if($(v).attr('_id')){
                    ids.push($(v).attr('_id'));
                };
            });

            if ($(this).hasClass('insert_video')) {
                
            }

            var newHTML = $('<div>');
            var idx = 0;
            var div_current = $(opt.ele_sort).attr('_div_current');
            $(div_current).children().each(function(){
                if($(this).hasClass('cmsInsertBox')){
                    newHTML.append($(this));
                }else{
                    if(ids[idx]){
                        newHTML.append($('div[id="'+ids[idx]+'"]'));
                    }
                    idx++;
                }
            });
            $(div_current).html('').append(newHTML.children());
            $(opt.ele_sort).modal('hide');
        });
    };

    /**
     * 点击阴影等同于点击编辑按钮
     */
    this._cmsHoverCon_click = function(){
        $(opt.ele_main).on('click','.cmsHoverCon',function(evt){
            if($(this).find('.xcms_hover_edit,.xcms_image_caption').size()){
                if($(evt.target).hasClass('cmsHoverCon')
                    || $(evt.target).hasClass('editButtonList')
                    || $(evt.target).hasClass('btn-group')){
                    $(this).find('.xcms_hover_edit:eq(0)').click();
                }
            }else if($(this).find('.xcms_pop_source').size()){
                if($(evt.target).hasClass('cmsHoverCon')){
                    $(this).find('.xcms_pop_source:eq(0)').click();
                }
            }
        });
    };

    /**
     * 绑定添加文本
     */
    this._bind_xcms_insert_text = function(){
        $(opt.ele_main).on('click','.xcms_insert_text',function(){
            var data_ele = {
                id_div:'div_'+Math.uuid(),
                id_editor:'editor_'+Math.uuid()
            };
            var newEle = baidu.template('template_insert_editor',data_ele);
            $this._add_element($(this),newEle);
            $this._add_editor(data_ele.id_editor);
        });
    };

    /**
     * 绑定上传图片 替换图片
     */
    this._bind_xcms_insert_image = function(){
        $('.xcms_insert_image').each(function(){
            if(!$(this).attr('_uploadifive')){
                var _this = $(this);
                $(this).attr('_uploadifive',true);
                $(this).uploadifive({
                    buttonText:'IMAGE',
                    buttonClass:'btn btn-white',
                    width:'',
                    height:'',
                    fileType:opt.fileType,
                    uploadScript : opt.uploadScript,
                    formData : {
                        _token:_this.closest('#content').find('input[name="_token"]').val()
                    },
                    onUpload:function(filesToUpload){
                        if(filesToUpload == 0){
                            return;
                        }
                        var data_ele = {
                            id_div:'div_'+Math.uuid(),
                            id_img:'img_'+Math.uuid(),
                            id_editor:'editor_'+Math.uuid(),
                            id_replace:'replace_'+Math.uuid(),
                            caption:''
                        };
                        var newEle = baidu.template('template_insert_image',data_ele);
                        $this._add_element(this,newEle);
                        $(this).attr('_id_div',data_ele.id_div);

                        var div_element = $('#'+data_ele.id_div);

                        if(window.URL && window.URL.createObjectURL){
                        	console.log(5);
                            div_element.find('img').attr('src',window.URL.createObjectURL(file));
                        }

                        div_element.find('.cmsHoverCon').css({
                            // opacity:1
                        });
                        div_element.find('.editButtonList').hide();
                        div_element.find('.uploadifiveLoadingBar').show();
                    },
                    onErrorx:function(errorType, file){
                    	console.log(321);
                        var div_element = $('#'+$(this).attr('_id_div'));
                        div_element.find('.xcms_hover_del').click();
                    },
                    onProgress:function(file,event){
                        var percent = 0;
                        if (event.lengthComputable) {
                            var percent = Math.round((event.loaded / event.total) * 100);
                        }
                        var div_element = $('#'+$(this).attr('_id_div'));
                        var cmsHoverCon = div_element.children('.cmsHoverCon');
                        cmsHoverCon.find('.uploadifiveLoadingBar span').css('width', percent + '%');
                    },
                    onUploadComplete:function(file,data){
                    	console.log(33);
                        var div_element = $('#'+$(this).attr('_id_div'));
                        div_element.find('.cmsHoverCon').css({
                            opacity:''
                        });
                        div_element.find('.uploadifiveLoadingBar').hide();
                        // $this._show_hovercon();

                        var rsp = $.parseJSON(data);
                        div_element.find('img').attr('src',rsp.src).attr('_media_url',rsp.media_url);
                    },
                    1:1
                });
            }
        });

        $('.xcms_replace_image').each(function(){
            if(!$(this).attr('_uploadifive')){
                var _this = $(this);
                $(this).attr('_uploadifive',true);
                $(this).uploadifive({
                    buttonText:'Replace',
                    buttonClass:'btn btn-white',
                    width:'',
                    height:'',
                    fileType:['.jpg','.png','.gif'],
                    uploadScript : opt.uploadScript,
                    formData : {
                        _token:_this.closest('#content').find('input[name="_token"]').val()
                    },
                    onUpload:function(filesToUpload){
                        if(filesToUpload == 0){
                            return;
                        }
                        var div_element = $(this).closest('.div_element');
                        $(this).attr('_id_div',div_element.attr('id'));
                        if(window.URL && window.URL.createObjectURL){
                            div_element.find('img').attr('src',window.URL.createObjectURL(file));
                        }

                        div_element.find('.cmsHoverCon').css({
                            // opacity:1
                        });
                        div_element.find('.editButtonList').hide();
                        div_element.find('.uploadifiveLoadingBar').show();

                    },
                    onErrorx:function(errorType, file){
                        var div_element = $('#'+$(this).attr('_id_div'));
                        div_element.find('.xcms_hover_del').click();
                    },
                    onProgress:function(file,event){
                        var percent = 0;
                        if (event.lengthComputable) {
                            var percent = Math.round((event.loaded / event.total) * 100);
                        }
                        var div_element = $('#'+$(this).attr('_id_div'));
                        var cmsHoverCon = div_element.children('.cmsHoverCon');
                        cmsHoverCon.find('.uploadifiveLoadingBar span').css('width', percent + '%');
                    },
                    onUploadComplete:function(file,data){
                        var div_element = $('#'+$(this).attr('_id_div'));
                        div_element.find('.cmsHoverCon').css({
                            opacity:''
                        });
                        div_element.find('.uploadifiveLoadingBar').hide();
                        $this._show_hovercon();

                        var rsp = $.parseJSON(data);
                        div_element.find('img').attr('src',rsp.src).attr('_media_url',rsp.media_url);
                    },
                    1:1
                });
            }
        });

        $(opt.ele_main).on('click','.xcms_image_caption',function(){
            $this._hide_hovercon();
            div_element = $(this).closest('.div_element');
            div_element.find('[contenteditable]').show();
            div_element.find('[contenteditable]').focus();
        });

        $(opt.ele_main).on('blur','p.caption[contenteditable]',function() {
        	if ($(this).text().length <= 0) {
        		$(this).hide();
        	}
        	$this._show_hovercon();
        });
    }

    /**
     * 绑定插入图集
     */
    this._bind_xcms_insert_gallery = function() {
        $(opt.ele_main).on('click','.xcms_insert_gallery', function(){
            var div_element = $(this).closest('.div_element');
            var modal = $('#edit-gallery');
            modal.attr('_div_current',div_element.attr('id'));
            modal.find('li').remove();
            if(div_element.hasClass('insert_gallery')){
                //是编辑
                div_element.find('div.slide').each(function(k,v) {
                    var data_ele = {
                        src:$(v).find('img').attr('src'),
                        media_url:$(v).find('img').attr('_media_url'),
                        content:$(v).find('textarea').val(),
                        silde_id:'slide_'+Math.uuid()
                    }
                    var newEle = baidu.template('template_empty_slide',data_ele);
                    $(newEle).appendTo(modal.find('ul.sort-style'));
                });
            }
            $this._bind_upload_gallery();
            modal.find('.alert-danger').remove();
            modal.modal('show');
        });

        if ($('#addSlide').attr('_uploadifive')) {
            return;
        } else {
            $('#addSlide').attr('_uploadifive',true);
            $('#addSlide').uploadifive({
                'buttonClass'  : 'btn btn-primary pull-right m-r-20',
                'width': '',
                'height': '',
                'buttonText': 'Add Image',
                fileType:opt.fileType,
                uploadScript : opt.uploadScript,
                formData : {
                    table:'Cms_image3',
                    media_url:'',
                    size:'1440_900',
                    size_return:'1440_900',
                    _token:$('#content').find('input[name="_token"]').val()
                },
                multi:true,
                onUpload:function(filesToUpload){
                    if(filesToUpload == 0){
                        return;
                    };
                    var settings = this.data('uploadifive').settings;
                    for (var i= 0;i < filesToUpload;i++) {
                        var data_ele = {
                        	span_id: 'span_'+Math.uuid(),
                            src:'',
                            media_url:'',
                            content:'',
                            silde_id:'slide_'+Math.uuid(),
                        };
                        var newEle = baidu.template('template_empty_slide',data_ele);
                        $(newEle).addClass('uploading').appendTo($('#edit-gallery').find('ul.sort-style'));
                    }
                },
                onProgress:function(file,event){

                    var percent = 0;
                    if (event.lengthComputable) {
                        var percent = Math.round((event.loaded / event.total) * 100);
                    };
                    var div_element = $('#edit-gallery').find('ul.sort-style li.uploading').first();
                    div_element.find('.uploadifiveLoadingBar').show();
                    div_element.find('.uploadifiveLoadingBar span').css('width', percent + '%');
                },
                onErrorx:function(errorType,file){
                	console.log(333);
                    var div_element = $('#edit-gallery').find('ul.sort-style li.uploading').first();
                    div_element.find('.uploadifiveLoadingBar').hide();
                    div_element.find('.uploadifive-button').show();
                    div_element.removeClass('uploading');       
                },                      
                onUploadComplete:function(file,data,response){
                    var rsp = $.parseJSON(data);
                    console.log(rsp);
                    var div_element = $('#edit-gallery').find('ul.sort-style li.uploading').first();
                    if(rsp){
                        div_element.find('img').attr({src:rsp.src,_media_url:rsp.media_url});
                        $this._bind_upload_gallery();
                    }else{
                        alert('UPLOAD FALIED');
                    }
                    
                    div_element.find('.uploadifiveLoadingBar').hide();
                    div_element.find('.uploadifive-button').show();

                    div_element.removeClass('uploading');   
                },
                1:1
            });
        }

        $("#sort-gallery-image").click(function(){
            if($(this).hasClass("sort")){
                $("#edit-gallery").removeClass("sort");
                $(this).removeClass("sort");
                $(this).html("Sort Image");
            }
            else {
                $("#edit-gallery").addClass("sort");
                $(this).addClass("sort");
                $(this).html("Edit Image");
            }
        });

        $("#edit-gallery").on('click','.sort-style li .delSlide', function(){
            $(this).closest("li").remove();
        });

        $('#edit-gallery .saveImageGallery').click(function() {
            var modal = $('#edit-gallery');
            if (modal.find('.sort-gallery li').length <= 0) {
                App.showError(modal,'Please upload at least one image');
                return false;
            }
            var div_element = $('#'+modal.attr('_div_current'));
            if(div_element.hasClass('cmsInsertBox')){
                //如果是插入条,表示是新增
                var data_ele = {
                    id_div:'div_'+Math.uuid()
                };
                var newEle = baidu.template('template_insert_gallery',data_ele);
                $this._add_element(div_element,newEle);
                
                //重新获取真正的div_element
                div_element = $('#'+data_ele.id_div);
            }
            div_element.find('.cms-gallery').html('');
            modal.find('.sort-gallery li').each(function(k,v) {
            	console.log($(v).find('img').attr('src'));
                var data_ele = {
                    src:$(v).find('img').attr('src'),
                    media_url:$(v).find('img').attr('_media_url'),
                    caption_html:$(v).find('textarea').val().replace(/\n/g, '<br>').replace(/\s/g,'&nbsp;'),
                    caption:$(v).find('textarea').val()
                };
                var newEle = baidu.template('template_empty_gallery',data_ele);
                $(newEle).appendTo(div_element.find('.cms-gallery'));
            });
            modal.modal('hide');
        });
    };

    /**
     * 绑定上传图文
     */
    this._bind_upload_gallery = function() {
        var modal = $('#edit-gallery');
        modal.find('li').each(function(k,v) {
            var _span = $(v).find('.file_uploadImg');
            if (_span.attr('_uploadifive')) {
                return;
            } else {
                _span.attr('_uploadifive',true);
                _span.uploadifive({
                    'buttonClass'  : 'btn btn-success btn-block btn-small m-b-5',
                    'width': '',
                    'height': '',
                    'buttonText': 'UPLOAD',
                    fileType:opt.fileType,
                    uploadScript : opt.uploadScript,
                    formData : {
                        _token:$('#content').find('input[name="_token"]').val()
                    },
                    multi:true,
                    onUpload:function(filesToUpload){
                        if(filesToUpload == 0){
                            return;
                        };
                        var div_element = $(this).closest('.uploadImg');
                        div_element.find('.uploadifiveLoadingBar').show();
                        div_element.find('.uploadifive-button').hide();
                        div_element.addClass('uploading');
                    },
                    onProgress:function(file,event){
                        var percent = 0;
                        if (event.lengthComputable) {
                            var percent = Math.round((event.loaded / event.total) * 100);
                        };
                        var div_element = $(this).closest('.uploadImg');
                        div_element.find('.uploadifiveLoadingBar span').css('width', percent + '%');
                    },
                    onError:function(errorType,file){
                        var div_element = $(this).closest('.uploadImg');
                        div_element.find('.uploadifiveLoadingBar').hide();
                        div_element.find('.uploadifive-button').show();
                        div_element.removeClass('uploading');       
                    },                      
                    onUploadComplete:function(file,data,response){
                        var div_element = $(this).closest('.uploadImg');
                        var rsp = $.parseJSON(data);
                        if(rsp){
                            div_element.find('img').attr('src',rsp.src);
                            div_element.find('img').attr('_media_url',rsp.media_url);
                        }else{
                            alert('UPLOAD FALIED');
                        }
                        var div_element = $(this).closest('.uploadImg');
                        div_element.find('.uploadifiveLoadingBar').hide();
                        div_element.find('.uploadifive-button').show();
                        div_element.find('.image-crop').show();

                        div_element.removeClass('uploading');   
                    },
                    1:1
                });
            }
            if ($(v).find('img').attr('src') != '') {
                $(v).removeClass('empty');
            }
            modal.find(".sort-gallery").sortable({items:"li"});
        });
    };

    /**
     * 绑定插入视频按钮
     */
    this._bind_xcms_insert_video = function(){
        $(opt.ele_main).on('click','.xcms_insert_video',function(){
            $this._show_hovercon();
            var data_ele = {
                id_div:'div_'+Math.uuid()
            };
            var newEle = baidu.template('template_insert_video',data_ele);
            $this._add_element(this,newEle);
        });
        //视频 取消
        $(opt.ele_main).on('click','.videoBox .a_cancel',function(){
            var div_element = $(this).closest('.div_element');
			if (div_element.find('.div_iframe').html() == ''){
				div_element.find('.xcms_hover_del').click();
			}else{
				div_element.find('.cmsHoverCon,.div_iframe,.cmsMainBoxCon').show();
	            div_element.find('.videoBox').hide();
	
	            $this._show_hovercon();
			}
        });
        //视频 保存
        $(opt.ele_main).on('click','.videoBox .a_save',function(){
            var div_element = $(this).closest('.div_element');
            var iframe = div_element.find('.videoBox textarea').val();
            if (iframe.length <= 0) {
                App.alert('Please input at lease YouTube iframe code.');
                return;
            }
            if (iframe.indexOf('iframe') == -1 && iframe.indexOf('iframe') == -1){
                App.alert('iframeding code is invalid.(iframe/iframe)');
                return;
            }
            iframe = $('<div/>').append(iframe);
            iframe.find(':first-child').removeAttr('mode').removeAttr('style width height').addClass('youtube');

            div_element.find('.cmsHoverCon,.div_iframe,.cmsMainBoxCon').show();
            div_element.find('.videoBox').hide();
            div_element.find('.div_iframe').html(iframe.html());
            div_element.find("iframe, iframe").css({width:'100%',height: 640*9/16});
            div_element.find('.videoBox textarea').val(iframe.html());
        });
        
        //视频编辑
        $(opt.ele_main).on('click','.xcms_hover_edit_video',function(){      
            var div_element = $(this).closest('.div_element');
            div_element.find('.cmsHoverCon,.div_iframe,.cmsMainBoxCon').hide();
            div_element.find('.videoBox').show();
            div_element.find('textarea:first').focus();
        });
    };
    /**
     * 绑定插入源码按钮
     */
    this._bind_xcms_insert_source = function(){
        $(opt.ele_main).on('click','.xcms_insert_source',function(){
            var data_ele = {
                id_div:'div_'+Math.uuid()
            };
            var newEle = $(baidu.template('template_insert_source',data_ele));
            $this._add_element(this,newEle);
            // newEle.find('textarea').on('blur',function(){
            //     $this._show_hovercon();
            // }).focus();
        });

        //源码 保存
        $(opt.ele_main).on('click','.htmlBox .a_save',function(){
            var div_element = $(this).closest('.div_element');
            var html_code = div_element.find('.htmlBox textarea').val();
            if (html_code.length <= 0) {
                App.alert('Please input source code');
                return;
            }

            div_element.find('.cmsHoverCon,.div_html,.cmsMainBoxCon').show();
            div_element.find('.htmlBox').hide();
            div_element.find('.div_html').html(html_code);
            div_element.find('.htmlBox textarea').val(html_code);
            $this._show_hovercon();
        });


        //视频 取消
        $(opt.ele_main).on('click','.htmlBox .a_cancel',function(){
            var div_element = $(this).closest('.div_element');
			if (div_element.find('.div_html').html() == ''){
				div_element.find('.xcms_hover_del').click();
			}else{
				div_element.find('.cmsHoverCon,.div_html,.cmsMainBoxCon').show();
	            div_element.find('.htmlBox').hide();
	
	            $this._show_hovercon();
			}
        });
        
        //视频编辑
        $(opt.ele_main).on('click','.xcms_hover_edit_source',function(){      
            var div_element = $(this).closest('.div_element');
            div_element.find('.cmsHoverCon,.div_html,.cmsMainBoxCon').hide();
            div_element.find('.htmlBox').show();
            div_element.find('textarea:first').focus();
        });
    };

    /**
     * 绑定插入分割线
     */
    this._bind_xcms_insert_split = function(){
        $(opt.ele_main).on('click','.xcms_insert_split',function(){
            var data_ele = {
                id_div:'div_'+Math.uuid()
            };
            var newEle = $(baidu.template('template_insert_split',data_ele));
            $this._add_element(this,newEle);
        });
    };

    /**
     * 绑定插入图文
     */
    this._bind_xcms_insert_image_text = function() {
        $(opt.ele_main).on('click','.xcms_insert_image_text', function(){
            var div_element = $(this).closest('.div_element');
            var modal = $('#edit-image-text');
            modal.find('.alert-danger').remove();
            modal.find('img').attr('src','').attr('_media_url','');
            modal.attr('_div_current',div_element.attr('id'));
            modal.find('.image-crop').hide();
            
            modal.find('.ipt_caption').val('');
            modal.find('select').val('fl');
            modal.modal('show');
            setTimeout(function() {
                modal.find('#img_txt_editor').attr('contenteditable',true);
                CKEDITOR.inline('img_txt_editor',{toolbar:'mini'});
                if(div_element.hasClass('insert_image_text')){
                    //是编辑
                    modal.find('img').attr({'src':div_element.find('img').attr('src'),'_media_url':div_element.find('img').attr('_media_url')});
                    var content = div_element.find('.div_content').html();
                    CKEDITOR.instances.img_txt_editor.setData(content);
                    modal.find('.ipt_caption').val(div_element.find('textarea').val());
                    modal.find('select').val(div_element.find('img').closest('div').attr('class'));
                } else {
                    CKEDITOR.instances.img_txt_editor.setData('');
                }
            },500);
            
            
        });
        //上传图片
        if ($('#file_upload_imageText').attr('_uploadifive')) {
            return;
        } else {
            $('#file_upload_imageText').attr('_uploadifive',true);
            $('#file_upload_imageText').uploadifive({
                'buttonClass'  : 'btn btn-success btn-block btn-small m-b-5',
                'width': '',
                'height': '',
                'buttonText': 'UPLOAD',
                fileType:opt.fileType,
                uploadScript : opt.uploadScript,
                formData : {
                	_token:$('#content').find('input[name="_token"]').val()
                },
                onUpload:function(filesToUpload){
                    if(filesToUpload == 0){
                        return;
                    };
                    var div_element = $(this).closest('.uploadImg');
                    div_element.find('.uploadifiveLoadingBar').show();
                    div_element.find('.uploadifive-button').hide();
                    div_element.addClass('uploading');
                },
                onProgress:function(file,event){
                    var percent = 0;
                    if (event.lengthComputable) {
                        var percent = Math.round((event.loaded / event.total) * 100);
                    };
                    var div_element = $(this).closest('.uploadImg');
                    div_element.find('.uploadifiveLoadingBar span').css('width', percent + '%');
                },
                onError:function(errorType,file){
                    var div_element = $(this).closest('.uploadImg');
                    div_element.find('.uploadifiveLoadingBar').hide();
                    div_element.find('.uploadifive-button').show();
                    div_element.removeClass('uploading');       
                },                      
                onUploadComplete:function(file,data,response){
                    var div_element = $(this).closest('.uploadImg');
                    var rsp = $.parseJSON(data);
                    if(rsp){
                        div_element.find('img').attr('src',rsp.src);
                        div_element.find('img').attr('_media_url',rsp.media_url);
                    }else{
                        alert('UPLOAD FALIED');
                    }
                    var div_element = $(this).closest('.uploadImg');
                    div_element.find('.uploadifiveLoadingBar').hide();
                    div_element.find('.uploadifive-button').show();
                    div_element.find('.image-crop').show();

                    div_element.removeClass('uploading');   
                },
                1:1
            });
        }

        $('#edit-image-text').on('hide.bs.modal',function() {
            var editor_imgtxt = CKEDITOR.instances['img_txt_editor'];
            editor_imgtxt.destroy();
            delete editor_imgtxt;
        });

        $('#edit-image-text').find('.saveImageText').click(function() {
            var modal = $('#edit-image-text');
            var src = modal.find('img').attr('src');
            var _media_url = modal.find('img').attr('_media_url');
            var class_name = modal.find('select').val();
            var caption = modal.find('textarea.ipt_caption').val();
            var content = CKEDITOR.instances.img_txt_editor.getData();
            console.log(content);
            content = content.replace("<br>","");
            content = content.replace("<br/>","");
            content = content.replace("<br />","");
            content = content.replace("\\n","");
            console.log(content);
            if (_media_url == '' || _media_url == undefined) {
                App.showError(modal,'Please upload image');
                return false;
            } else if (content == '') {
                App.showError(modal,'Please enter text');
                return false;
            }
            var div_element = $('#'+modal.attr('_div_current'));
            if(div_element.hasClass('cmsInsertBox')){
                //如果是插入条,表示是新增
                var data_ele = {
                    id_div:'div_'+Math.uuid(),
                    src:src,
                    media_url:_media_url,
                    class_name:class_name,
                    content_html:content,
                    caption_html:caption.replace(/\n/g, '<br>'),
                    caption:caption,
                };
                var newEle = baidu.template('template_insert_image_text',data_ele);
                $this._add_element(div_element,newEle);
                
                //重新获取真正的div_element
                div_element = $('#'+data_ele.id_div);
            } else {
                div_element.find('img').closest('div').removeClass().addClass(class_name);
                div_element.find('img').attr({src:src,_media_url:_media_url});
                div_element.find('.div_content').html(content);
                div_element.find('.div_caption').html(caption.replace(/\n/g, '<br>'));
                div_element.find('textarea').val(caption);
            }
            if (caption == '') {
                div_element.find('.div_caption').hide();
            }
            modal.modal('hide');
        });
    }

    this._bind_xms_save = function() {
    	$(opt.ele_main + ' .submitBox').click(function() {
    		var content = $this.get_content();
    		$.post(opt.saveScript,{
    			table: opt.table,
    			id: opt.id,
    			content:content,
    			_token:$('#content').find('input[name="_token"]').val()
    		},function() {
    			alert('SUCCESS!');
    		});
    	});
    }

    this._init_content = function(){
        $this._insertbox($(opt.ele_main+ '.submitBox'));
        if(opt.content == ''){
            $('.cmsInsertBox').addClass('only');
        }else{
            $.each(opt.content,function(k,v_widget){
                var newEle = '';
                if(v_widget.type == 'editor'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid(),
                        id_editor:'editor_'+Math.uuid(),
                        content_html:v_widget.value
                    };
                    newEle = baidu.template('template_insert_editor',data_ele);
                    newEle = $(newEle);
                    newEle.find('[_contenteditable]').html(v_widget.value);
                }else if(v_widget.type == 'image'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid(),
                        id_editor:'',
                        caption:v_widget.caption
                    };
                    newEle = baidu.template('template_insert_image',data_ele);
                    newEle = $(newEle);
                    newEle.find('img').attr('src',$.getPhotoUrl(v_widget.media_url));
                    newEle.find('img').attr('_media_url',v_widget.media_url);
                    newEle.find('[_contenteditable]').html(v_widget.caption);
                    newEle.find('.edit-link').html(v_widget.link);
                }else if(v_widget.type == 'image_text'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid(),
                        src:$.getPhotoUrl(v_widget.media_url),
                        media_url:v_widget.media_url,
                        class_name:v_widget.class_name,
                        content_html:v_widget.content,
                        content:v_widget.content,
                        caption_html:v_widget.caption.replace(/\n/g, '<br>'),
                        caption:v_widget.caption
                    };
                    newEle = baidu.template('template_insert_image_text',data_ele);
                    newEle = $(newEle);
                }else if(v_widget.type == 'video'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid(),
                        id_editor:'editor_'+Math.uuid()
                    };
                    newEle = baidu.template('template_insert_video',data_ele);
                    newEle = $(newEle);
                    newEle.find('.div_iframe').html(decodeURIComponent(v_widget.value));
                    newEle.find("iframe,embed").css({width:'100%'});
                    newEle.find("iframe,embed").css({height: 640*9/16+41});
                    newEle.find('textarea:first').html(decodeURIComponent(v_widget.value));
                    if (v_widget.caption != '') {
                        newEle.find('[_contenteditable]').show();
                    }
                }else if(v_widget.type == 'source'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid()
                    };
                    newEle = baidu.template('template_insert_source',data_ele);
                    newEle = $(newEle);
                    newEle.find('textarea,.div_html').html(v_widget.value);
                    newEle.find('.cmsHoverCon,.div_html,.cmsMainBoxCon').show();
            		newEle.find('.htmlBox').hide();
                    // newEle.find('textarea').on('blur',function(){
                    //     $this._show_hovercon();
                    // }).focus();
                }else if(v_widget.type == 'split'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid()
                    };
                    newEle = baidu.template('template_insert_split',data_ele);
                    newEle = $(newEle);
                }else if(v_widget.type == 'gallery'){
                    var data_ele = {
                        id_div:'div_'+Math.uuid()
                    };
                    newEle = baidu.template('template_insert_gallery',data_ele);
                    newEle = $(newEle);
                    for (i in v_widget.gallery) {
                        var obj = v_widget.gallery[i];
                        var data_ele = {
                            src:$.getPhotoUrl(obj.media_url),
                            media_url:obj.media_url,
                            caption_html:obj.caption.replace(/\n/g, '<br>').replace(/\s/g,' '),
                            caption:obj.caption
                        };
                        newSlide = baidu.template('template_empty_gallery',data_ele);
                        if (opt.module == 'back') {
                        	$(newSlide).appendTo(newEle.find('.cms-gallery'));
                        } else {
                        	$(newSlide).appendTo(newEle.find('.swiper-wrapper'));
                        }
                        
                    }
                };
                $(opt.ele_main+ '.submitBox').before(newEle);
                $this._insertbox($(opt.ele_main+ '.submitBox'));
            });
        };
    };

    /**
	 * 初始化
	 */
	this._init = function(){
		$this._check_ele();
		$this._init_content();

        $(opt.ele_main+' .videoBox').hide();

        $this._cmsHoverCon_click();
        $this._bind_xcms_hover_del();
        $this._bind_xcms_hover_sort();
        $this._bind_xcms_hover_edit();

        $this._bind_xcms_insert_text();
        $this._bind_xcms_insert_image();      
        $this._bind_xcms_insert_source();
        $this._bind_xcms_insert_split();
        $this._bind_xcms_insert_video();
        $this._bind_xcms_insert_gallery();
        $this._bind_xcms_insert_image_text();
        $this._bind_xms_save();
        
        
	};

	/**
     * 返回cms的值
     */
    this.get_content = function(callback){
        $(opt.ele_main+ '.insert_video .videoBox .a_save').click();
        var data = [];
        $(opt.ele_main+' div.div_element').each(function(){
            var ele = get_element(this);
            if(ele != ''){
                data.push(ele);
            }
        });
        function get_element(div){
            var ele = '';
            if($(div).hasClass('insert_source')){//源码模式
                ele = {type:'source',value:$(div).find('textarea').val()};
            }else if($(div).hasClass('insert_text')){//编辑器模式
                ele = {type:'editor',value:$(div).find('[_contenteditable]').size()?$(div).find('[_contenteditable]').html():''};
            }else if($(div).hasClass('insert_image')){//图片模式
                ele = {type:'image',caption:$(div).find('[_contenteditable]').size()?$(div).find('[_contenteditable]').html():'',media_url:$(div).find('img').attr('_media_url')};
            }else if($(div).hasClass('insert_image_text')){
                ele = {type:'image_text',caption:$(div).find('div.caption').size()?$(div).find('div.caption').html():'', media_url:$(div).find('img').attr('_media_url'),class_name:$(div).find('img').closest('div').attr('class'),content:$(div).find('.div_content').html(),caption:$(div).find('textarea:last').val()};
            }else if($(div).hasClass('insert_video')){//视频模式
                ele = {type:'video',value:encodeURIComponent($(div).find('textarea:first').val()),caption:$(div).find('[_contenteditable]').size()?$(div).find('[_contenteditable]').html():''};
            }else if($(div).hasClass('insert_split')){//分割条
                ele = {type:'split'};
            }else if($(div).hasClass('insert_gallery')){
                gallery = [];
                $(div).find('.slide').each(function(k,v) {
                    var slide = {media_url:$(v).find('img').attr('_media_url'),caption:$(v).find('textarea').val()};
                    gallery.push(slide);
                });
                ele = {type:'gallery',gallery:gallery};
            }else if($(div).hasClass('insert_link')){
                link = [];
                $(div).find('.link-group a').each(function(k,v) {
                    var a = {class_name:$(v).attr('class'),name:$(v).text(),href:$(v).attr('href')};
                    link.push(a);
                });
                ele = {type:'link',link:link};
            };
            return ele;
        };
        if(data.length == 0){
            data = '';
        }else{
            data = JSON.stringify(data);
        }
        return data;
    };

	this._init();
    
};
