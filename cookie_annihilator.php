<?php
//самый костыльный костыл, который я только делал
//directed by Guerrilla movement "Costylvania"
//хотя не, не самый

//суть в том, что в текущей реализации фронт-контроллера, когда все роуты перенаправляются на index.php куки нихуя не уничтожаются
//извините меня за мой французский
//как это исправить так и не придумал

header("Location: ".$_SERVER['SITE_ROOT']."/authorisation");
setcookie($_GET['sessName'], $_GET['sessID'], time()-60*60*24*12);