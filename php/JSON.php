<?php
$time = time();

if(isset($_POST['fBackup']))
{
	$backup = $_POST['backup'];
	$string = $time.".json";
	$file= fopen("./backup/$string", "a+") or die("Error");
	fwrite($file, $backup);

	fclose($file);
}

header("Location: index.html");
?>