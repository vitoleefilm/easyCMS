<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8"> 
	<title>easyCMS</title>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
	<link rel="stylesheet" href="{{asset('/css/style.css')}}">
	<link rel="stylesheet" href="{{asset('/css/style.min.css')}}">
	<link rel="stylesheet" href="{{asset('/css/cms.css')}}">
	<link rel="stylesheet" href="{{asset('/css/cmsadmin.css')}}">
	<!-- <script src="{{asset('/js/jquery-1.8.2.min.js')}}"></script> -->
	<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script src="{{asset('/js/plugins/jquery.uploadifive.js')}}"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
	<script src="{{asset('/js/common_function.js')}}"></script>
</head>
<body>
	<div id="page-container">
		<div id="side" class="content col-md-2">
			@csrf
		</div>
		<div id="content" class="content col-md-8">
			<a class="pull-right btn btn-primary preview m-r-20 m-t-0 addPageName" href="javascript:;">Add Page Title</a>
			<h1 class="page-header">New Page</h1>
			<!-- end page-header -->
			<!-- begin row -->
			<div class="row">
			    <!-- begin col-12 -->
			    <div class="col-md-12">
			        <div class="email-content">
                        <table class="table">
	                        <thead>
	                            <tr>
	                                <th style="text-align: center">Page Name</th>
	                                <th></th>
	                                <th></th>
	                                <th style="text-align: center">Operate</th>
	                            </tr>
	                        </thead>
	                        <tbody>

	                        	@foreach ($Pages as $Page)
	                            <tr _id="{{$Page->id}}" _title="{{$Page->title}}">
	                                <td>{{$Page->title}}</td>
	                                <td></td>
	                                <td></td>
	                                <td>
	                                	<button type="button" class="btn btn-primary editPageName">EDIT NAME</button>
	                                	<button type="button" class="btn btn-primary editPage">EDIT</button>
	                                	<button type="button" class="btn btn-secondary ">DELETE</button>
	                                </td>
	                            </tr>
	                            @endforeach
	                        </tbody>
	                    </table>
                        
			        </div>
			    </div>
			    <!-- end col-12 -->
			</div>
			<!-- end row -->
			</div>
		</div>
	</div>
</body>
</html>
<div class="modal fade" id="add-page" _id="">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" >Page Name</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">         
      <div class="form-group">
            <input type="text" class="form-control" id="page-name">
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary addPageSubmit">Create</button>
      </div>
    </div>
  </div>
</div>

<div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-sm">
    <div class="modal-content">
      SUCCESS
    </div>
  </div>
</div>
<script>
	$('.editPageName').click(function() {
		var id = $(this).closest('tr').attr('_id');
		$('#add-page').attr('_id',id);
		$('#add-page').find('#page-name').val($(this).closest('tr').attr('_title'));
		$('#add-page').modal('show');
	});

	$('.addPageName').click(function() {
		$('#add-page').attr('_id','');
		$('#add-page').find('#page-name').val('');
		$('#add-page').modal('show');
	});
	
	$('.addPageSubmit').click(function() {
		$.post('/add_page',{
			id:$('#add-page').attr('_id'),
			title:$('#add-page').find('#page-name').val(),
			_token:$('input[name=_token]').val()
		},function(rsp) {
			window.location.reload();
		});
	});

	$('.editPage').click(function() {
		var id = $(this).closest('tr').attr('_id');
		window.location.href = '/page/edit/'+id;
	});
</script>