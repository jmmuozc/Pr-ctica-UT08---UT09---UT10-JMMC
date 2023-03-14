<?php
$time = time();

if(isset($_POST['JSON']))
{
	$backup = $_POST['JSON'];
	$string = $time.".json";
	$file= fopen("../backup/$string", "a+") or die("Error");
	fwrite($file, $backup);

	fclose($file);

	echo TRUE;
}

// header("Location: index.html");
?>