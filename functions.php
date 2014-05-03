<?php

// PHP functions
function loadConfig($config = "config.yml") {
	return file_get_contents($config);
}

function saveConfig($data) {
	// validate for yaml syntax
	$isValid = false;
	if(strip_tags($data) == $data) {
		$isValid = true;
	}

	if ($isValid) {
		return file_put_contents("config.yml", $data);
	}
	{
		return false;
	}
}

?>