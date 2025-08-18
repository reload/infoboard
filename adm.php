<?php
/*
Denne kode begrænser adgang til administrationssiden baseret på klientens IP-adresse.
*/
// Only allow from Reload HQ.
if ($_SERVER['REMOTE_ADDR'] != '109.202.128.38') {
    http_response_code(403);
    header('Content-Type: text/plain');
    die("403 Forbidden – your IP is not allowed.\n");
}

// som det plejer
include_once("functions.php");

switch ($_REQUEST["do"]) {
  case 'save':
    # write to YAML file
    if(saveConfig($_POST["config"])) {
      $message      = "Data has been saved: " . date("Ymd H:i:s");
      $messageClass = "success";
    }
    else
    {
      $message      = "Could not save the data. Check your config and file permissions.";
      $messageClass = "error";      
    }

    $formData = stripslashes($_POST["config"]);
    break;
  
  default:
    $formData = loadConfig('config.yml');
    break;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">

    <title>Reload infoboard rotator ADMINISTRATION</title>
    <meta name="description" content="">

    <meta name="viewport" content="width=device-width">
    <link rel="shortcut icon" href="http://reload.dk/favicon.ico">

    <!-- Lets add some CodeMirror support -->
    <script src="lib/codemirror-4.1/lib/codemirror.js"></script>
    <link rel="stylesheet" href="lib/codemirror-4.1/lib/codemirror.css">
    <link rel="stylesheet" href="lib/codemirror-4.1/theme/night.css">
    <script src="lib/codemirror-4.1/mode/javascript/javascript.js"></script>

    <style>
    #editor {
      width: 80%; 
      min-height: 600px;
      border: 1px solid #333;
    } 
    .error {
      background-color: red;
    }
    .success {
      background-color: green;
    }    

    </style>
</head>
<body>
  <h1>Infoboard Administration</h1>
  <p>Only for YAML ninjas!</p>

  <?php
  if(isset($message) && isset($messageClass)) {
    echo "<h2 class='".$messageClass."'>".$message."</h2>";
  }
  ?>

  <form action="?do=save" method="post">
    <textarea id="editor" name="config"><?php echo $formData; ?></textarea>

    <input type="submit" value="Gem - skriv til YAML fil" />
  </form>
  
  <script>
  var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("editor"), {
    lineNumbers: true,
    theme: "night"
  });
  </script>  
</body>
</html>
