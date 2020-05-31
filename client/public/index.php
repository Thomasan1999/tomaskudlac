<?php
    $ua = htmlentities($_SERVER['HTTP_USER_AGENT'], ENT_QUOTES, 'UTF-8');
    if (preg_match('~MSIE|Internet Explorer~i', $ua) || (strpos($ua, 'Trident/7.0; rv:11.0') !== false))
    {
        require_once "ie/index_{$_GET['lang']}.html";
        exit;
    }
    include_once 'init.php';
    require_once 'index.html';