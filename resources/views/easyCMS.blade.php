<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
	<meta charset="utf-8"> 
	<title>easyCMS</title>
	<link href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/css/bootstrap.min.css">
	<link rel="stylesheet" href="{{asset('/css/style.css')}}">
	<link rel="stylesheet" href="{{asset('/css/cms.css')}}">
	<script src="https://cdn.staticfile.org/jquery/2.1.1/jquery.min.js"></script>
	<script src="https://cdn.staticfile.org/twitter-bootstrap/3.3.7/js/bootstrap.min.js"></script>
	
</head>
<body>
	<div id="page-container">
		<div id="side" class="content col-md-2">
			
		</div>
		<div id="content" class="content col-md-8">
			<div id="title">
				<h2>easyCMS</h2>
			</div>
			<div class="row">
				<div class="page-content">
					<div class="cmsPage" style="max-width: 640px; margin: 0 auto;">
						<div class="cmsMainBox">
							<div class="cmsHoverCon">
								<div class="btn-group">
									<a class="btn btn-white" href="javascript:;">EDIT</a>
									<a class="btn btn-white" href="javascript:;" >SORT</a>
									<a class="btn btn-white" href="javascript:;">DELETE</a>
								</div>
							</div>
							<div class="cmsMainBoxCon" id="editable" contenteditable="true">
								<h4>University for all</h4>
								<p>We are dedicated to promoting equality. We recognise the advantages of a diverse and talented student community and the benefits that this brings to students and the University as a whole.</p>
							</div>
						</div>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</body>
</html>