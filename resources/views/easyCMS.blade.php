
<?php 
			
$data->content = str_replace(array('\\n','/r/n', '/r', '/n','\n','\r'), '',$data->content);
// $data->content = json_decode($data->content);
// print_r($data->content);die;
?><!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8"> 
	<title>easyCMS</title>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="{{asset('/css/style.css')}}">
	<link rel="stylesheet" href="{{asset('/css/style.min.css')}}">
	<link rel="stylesheet" href="{{asset('/css/cms.css')}}">
	<link rel="stylesheet" href="{{asset('/css/cmsadmin.css')}}">
	<!-- <script src="{{asset('/js/jquery-1.8.2.min.js')}}"></script> -->
	<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/sortablejs@latest/Sortable.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
	<script src="{{asset('/js/plugins/baiduTemplate.js')}}"></script>
	<script src="{{asset('/js/plugins/math.js')}}"></script>
	<script src="{{asset('/js/plugins/jquery.uploadifive.js')}}"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<script src="{{asset('/js/plugins/ckeditor/ckeditor.js')}}"></script>
	<script src="{{asset('/js/common_function.js')}}"></script>
</head>
<body>
	<?php //print_r(str_replace(array('/r/n', '/r', '/n','\n','\r'), '',$data->content));die;?>
	<div id="page-container">
		<div id="side" class="content col-md-2">
			
		</div>
		<div id="content" class="content col-md-8">
			<div id="title">
				<h2>easyCMS</h2>
			</div>
			@csrf
			<div class="row">
				<div class="page-content">
					<div class="cmsPage div_cms_main" style="max-width: 640px; margin: 0 auto;">
						<button class="submitBox btn btn-white">SAVE</button>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</body>
<?die;?>
@include('template')
@include('modal')
</html>
<script src="{{asset('/js/easyCms.js')}}"></script>
<script>
	$(document).ready(function() {
		var content = '';
		@if (!empty($data->content))

			content = JSON.parse($('<div>').html("{{$data->content}}")[0].textContent);
		@endif
		window.easyCms = easyCms({
			ele_main:'.div_cms_main',
			ele_sort:'#sort-cms',
			table:'Page',
			id:{{$data->id}},
			content:content
		});
		console.log(window.easyCms);

		
	});
	
</script>