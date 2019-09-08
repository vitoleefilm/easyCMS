<div class="modal fade" id="sort-cms">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title">Sort Page</h4>
			</div>
			<div class="modal-body movablePlateY">
				<ul class="sort-style">
				</ul>
			</div>
			<div class="modal-footer">
				<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Cancel</a>
				<a href="javascript:;" class="btn btn-sm btn-primary saveSortCms">Confirm</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="edit-gallery">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title p-b-10">
					Edit Gallery
					<button id="addSlide" class="btn btn-primary pull-right m-r-20">Add Image</button>
				</h4>
			</div>
			<div class="modal-body">
				<ul class="sort-style sort-gallery">
				</ul>
			</div>
			<div class="modal-footer">
				<button class="btn btn-sm btn-primary pull-left" id="sort-gallery-image">Sort Image</button>
				<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Cancel</a>
				<a href="javascript:;" class="btn btn-sm btn-primary saveImageGallery">Confirm</a>
			</div>
		</div>
	</div>
</div>

<div class="modal fade" id="edit-image-text">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
				<h4 class="modal-title">Edit Image & Text</h4>
			</div>
			<div class="alert alert-danger fade in">
				<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button>
				The Title is required.
			</div>
			<form class="form-horizontal form-bordered">
				<div class="form-group has-feedback">
					<label class="control-label col-md-4">Title</label>
					<div class="col-md-7">
						<div class="uploadImg">
							<div class="bg"><img _media_url="" src=""></div>
							<div class="editBtn">
								<span id="file_upload_imageText" class="file_uploadImg"></span>
							</div>
						</div>
					</div>
				</div>
				<div class="form-group">
                    <label class="control-label col-md-4">Image Float Direction</label>
                    <div class="col-md-7">
                    	<select class="form-control">
                            <option value="fl">Left</option>
                            <option value="fr">Right</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label col-md-4">Image Description</label>
                    <div class="col-md-7">
                    	<textarea class="form-control m-b-10 ipt_caption" placeholder="Image caption" rows="3"></textarea>
                    </div>
                </div>
				<div class="form-group">
                    <label class="control-label col-md-12 align-left">Text</label>
                    <div class="tab-pane fade active in col-md-12" id="default-tab-1">
                    	<div class="panel" data-sortable-id="form-wysiwyg-2">
                    		<div class="panel-body panel-form">
								<textarea class="textarea form-control" id="img_txt_editor" placeholder="Enter text ..." rows="12"></textarea>
							</div>
						</div>
					</div>
                </div>			
                <div class="modal-footer">
				<a href="javascript:;" class="btn btn-sm btn-white" data-dismiss="modal">Cancel</a>
				<a href="javascript:;" class="btn btn-sm btn-primary saveImageText">Save</a>
			</div>
		</div>
	</div>
</div>