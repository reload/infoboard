<!DOCTYPE html>
<html class="no-js" lang="en">
<head>
    <meta charset="utf-8">

    <title>Reload infoboard selector</title>
    <meta name="description" content="">

    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="http://reload.dk/favicon.ico">

    <link rel="stylesheet" href="css/style.css">
    <script src="js/vendor/modernizr-2.5.3.min.js"></script>

</head>
<body>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.7.2.min.js"><\/script>')</script>
  <script src="js/vendor/js-yaml.min.js"></script>
   
  <script>
	(function($){
	    var config = {};
	    var i = 0;
	    // Get data
	    $.get('config.yml', function(data) {
	        config = jsyaml.load(data);
			$.each( config.boards, function( boardname, boarddata ) {
			  $("#boards").append("<p><a href='index.php?"+i+"#"+boardname+"'>" + boardname + "</a><p>");
			  i++;
			});
	    });
	})(jQuery);
  </script>

  <h1>Select an infoboard</h1>
  <div id="boards"></div>  

</body>
</html>