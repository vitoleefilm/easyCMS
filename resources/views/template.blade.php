<script id="template_insertbox" type="text/html">
	<div class="div_element cmsInsertBox" id="<%=id_div%>">
		<div class="solid"></div>
		<div class="editButtonList">
			<div class="btn-group">
				<button class="btn btn-white xcms_insert_text"> TEXT</button>
				<a class="btn btn-white xcms_insert_image" id="<%=id_img%>" href="javascript:;"> IMAGE</a>
				<button class="btn btn-white xcms_insert_image_text" href="javascript:;" href="javascript:;"> TEXT & IMAGE</button>
				<button class="btn btn-white xcms_insert_source" href="javascript:;"> CODE</button>
				<button class="btn btn-white xcms_insert_video" href="javascript:;"> VIDEO</button>
				<button class="btn btn-white xcms_insert_gallery" href="javascript:;"> SLIDES</button>
				<button class="btn btn-white xcms_insert_split" href="javascript:;"> SPLIT</button>
			</div>
		</div>
	</div>
</script>

<script id="template_insert_editor" type="text/html">
	<div class="div_element cmsMainBox insert_text" _element id="<%=id_div%>">
		<div class="cmsHoverCon">
			<div class="btn-group">
				<a class="btn btn-white xcms_hover_edit" href="javascript:;">EDIT</a>
				<a class="btn btn-white xcms_hover_sort" href="javascript:;" >SORT</a>
				<a class="btn btn-white xcms_hover_del" href="javascript:;">DELETE</a>
			</div>
		</div>
		<div class="cmsMainBoxCon" id="<%=id_editor%>" _contenteditable contenteditable="true">
		</div>
	</div>
</script>

<script id="template_insert_image" type="text/html">
	<div class="div_element cmsMainBox insert_image" _element id="<%=id_div%>">
		<div class="cmsHoverCon">
			<div class="btn-group">
				<a class="btn btn-white xcms_image_caption" href="javascript:;"></i>Edit</a>
				<a id="<%=id_replace%>" class="btn btn-white xcms_replace_image" href="javascript:;"></i>Replace</a>
				<a class="btn btn-white xcms_hover_sort" href="javascript:;"></i>Sort</a>
				<a class="btn btn-white xcms_hover_del" href="javascript:;"></i>Delete</a>
			</div>
		</div>
		<div class="cmsMainBoxCon">
			<img id="<%=id_img%>" src="" alt="">
			<p class="caption" style="display:<%=caption.length >  0 ? 'block': 'none'%>"  _contenteditable contenteditable="true"><%:=content_html%>
			</p>
		</div>
	</div>
</script>

<script id="template_insert_source" type="text/html">
	<div class="div_element cmsMainBox insert_source" _element id="<%=id_div%>">
		<div class="cmsHoverCon">
			<div class="editButtonList">
				<div class="btn-group">
					<a class="btn btn-white xcms_hover_edit_source" href="javascript:;">Edit Code</a>
					<a class="btn btn-white xcms_hover_sort" href="javascript:;">Sort</a>
					<a class="btn btn-white xcms_hover_del" href="javascript:;">Delete</a>
				</div>
			</div>
		</div>
		<div class="htmlBox">
			<textarea></textarea>
			<p>Please insert share code in the above textarea</p>
			<button type="button" class="btn btn-primary m-r-5 m-b-5 a_save">Save</button>
			<button type="button" class="btn btn-white m-r-5 m-b-5 a_cancel">Cancel</button>
		</div>
		<div class="div_html"></div>
	</div>
</script>

<script id="template_insert_gallery" type="text/html">
	<div class="div_element cmsMainBox insert_gallery" _element id="<%=id_div%>">
		<div class="cmsHoverCon">
			<div class="btn-group">
				<a class="btn btn-white xcms_insert_gallery" href="javascript:;">Edit</a>
				<a class="btn btn-white xcms_hover_sort" href="javascript:;">Sort</a>
				<a class="btn btn-white xcms_hover_del" href="javascript:;">Delete</a>
			</div>
		</div>
		<div class="cmsMainBoxCon">
			<div class="cms-gallery">
			</div>
		</div>
	</div>
</script>

<script id="template_insert_split" type="text/html">
	<div class="div_element cmsMainBox insert_split" _element id="<%=id_div%>">
		<div class="editHr">
			<hr><span class="del"></span>
		</div>
	</div>	
</script>

<script id="template_insert_video" type="text/html">
<div class="div_element cmsMainBox insert_video" _element id="<%=id_div%>">
	<div class="cmsHoverCon">
		<div class="editButtonList">
			<div class="btn-group">
				<a class="btn btn-white xcms_hover_edit_video" href="javascript:;"></i>Edit</a>
				<a class="btn btn-white xcms_hover_sort" href="javascript:;">Sort</a>
				<a class="btn btn-white xcms_hover_del" href="javascript:;">Delete</a>
			</div>
		</div>
	</div>
	<div class="videoBox scrollbar">
		<textarea></textarea>
		<p>Please insert share code in the above textarea</p>
		<button type="button" class="btn btn-primary m-r-5 m-b-5 a_save">Save</button>
		<button type="button" class="btn btn-white m-r-5 m-b-5 a_cancel">Cancel</button>
	</div>
	<div class="div_iframe"></div>
</div>
</script>

<script id="template_insert_image_text" type="text/html">
	<div class="div_element cmsMainBox insert_image_text" _element id="<%=id_div%>">
		<div class="cmsHoverCon">
			<div class="btn-group">
				<a class="btn btn-white xcms_insert_image_text" href="javascript:;">Edit</a>
				<a class="btn btn-white xcms_hover_sort" href="javascript:;"></i>Sort</a>
				<a class="btn btn-white xcms_hover_del" href="javascript:;">Delete</a>
			</div>
		</div>
		<div class="cmsMainBoxCon">
			<div class="<%=class_name%>">
				<img src="<%=src%>" _media_url="<%=media_url%>" alt="">
				<div class="caption"><%=caption_html%></div>
				<textarea style="display: none"><%=caption%></textarea>
			</div>
			<div class="float-box div_content"><%:=content_html%></div>
			
		</div>
	</div>
</script>
<script id="template_empty_slide" type="text/html">
	<li id="<%=slide_id%>">
		<div class="tit">
			<div class="uploadImg">
				<div class="bg"><img _media_url="<%=media_url%>" src="<%=src%>"></div>
				<div class="editBtn">
					<span class="file_uploadImg" id="<%=span_id%>"></span>
					<a href="javascript:;" class="btn btn-block btn-small" onclick="$(this).closest('li').remove();"><i class="fa fa-trash-o"></i> DELETE</a>
					<i class="fa fa-arrows"></i>
				</div>
			</div>
		</div>
		<div class="info">
			<textarea><%=content%></textarea>
			<button class="btn btn-primary pull-right save saveImageGallery">Save</button>
			<button class="btn btn-danger pull-right cancel m-r-10">Cancel</button>
		</div>
	</li>
</script>
<script id="template_empty_gallery" type="text/html">
	<div class="slide">
		<div class="pic">
			<img src="<%=src%>" _media_url="<%=media_url%>" alt="">
		</div>
		<p class="caption"><%=caption_html%></p>
		<textarea style="display:none"><%=caption%></textarea>
	</div>
</script>