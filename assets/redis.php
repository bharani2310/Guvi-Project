<?php



require_once(__DIR__ . './../assets/predis-2.x/autoload.php');

Predis\Autoloader :: register();

$redis = new Predis\Client();

?>