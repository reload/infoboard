<?php
/*
Denne kode begrænser adgang til administrationssiden baseret på klientens IP-adresse.
Da applikationen kører bag en Caddy reverse proxy, kommer REMOTE_ADDR typisk fra selve proxyen.
Derfor tjekkes først om requestet stammer fra en betroet proxy (fx 127.0.0.1).
Hvis ja, aflæses den oprindelige klient-IP fra X-Forwarded-For headeren.
Herefter sammenlignes klient-IP’en med en whitelist, som i dette tilfælde kun indeholder Reloads IP (109.202.128.38).
Hvis IP ikke matcher, returneres HTTP 403 Forbidden.
Dette sikrer, at kun Reloads kontor-IP kan tilgå administrationssiden – selv bag en proxy.
*/
$ALLOWED_IPS = ['109.202.128.38']; // Reloads eksterne IP
$TRUSTED_PROXIES = ['127.0.0.1', '::1']; // her skal stå Caddy’s IP

$remoteIp = $_SERVER['REMOTE_ADDR'] ?? '';

// Hvis request kommer fra Caddy, kig på X-Forwarded-For
if (in_array($remoteIp, $TRUSTED_PROXIES, true) && !empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
    // Tag første IP i XFF (klientens IP)
    $xffParts = array_map('trim', explode(',', $_SERVER['HTTP_X_FORWARDED_FOR']));
    $remoteIp = $xffParts[0];
}

// Fjern IPv6-notation som "::ffff:1.2.3.4"
if (strpos($remoteIp, '::ffff:') === 0) {
    $remoteIp = substr($remoteIp, 7);
}

if (!in_array($remoteIp, $ALLOWED_IPS, true)) {
    http_response_code(403);
    header('Content-Type: text/plain; charset=utf-8');
    echo "403 Forbidden – your IP ($remoteIp) is not allowed.\n";
    exit;
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
