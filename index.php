<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" lang="en"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" lang="en"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
    <meta charset="utf-8">

    <title>Reload infoboard rotator</title>
    <meta name="description" content="">

    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="http://reload.dk/favicon.ico">

    <link rel="stylesheet" href="css/style.css">
    <script src="js/vendor/modernizr-2.5.3.min.js"></script>

</head>
<body>
    <!-- Prompt IE 6 users to install Chrome Frame. Remove this if you support IE 6.
         chromium.org/developers/how-tos/chrome-frame-getting-started -->
    <!--[if lt IE 7]><p class="chromeframe">Your browser is <em>ancient!</em> <a href="http://browsehappy.com/">Upgrade to a different browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">install Google Chrome Frame</a> to experience this site.</p><![endif]-->

  <figure id="progress"></figure>
  
  <iframe id="viewer" src="http://google.dk" scrolling="no" height="100%" width="100%"></iframe>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"></script>
  <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.7.2.min.js"><\/script>')</script>
  <script src="js/plugins.js"></script>

  <!-- Load data from YAML files -->
  <script src="js/vendor/js-yaml.min.js"></script>
  <script type="text/javascript">
  $.get('config.yml', function(data) {
    var objConfig = jsyaml.load(data);
  });
  </script>

  <script src="js/main.js"></script>

  <!-- end scripts -->    
    
</body>
</html>