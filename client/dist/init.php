<?php
    header("Access-Control-Allow-Origin: *");
    session_start();
    if (!$_SESSION['referred'])
    {
        $_SESSION['referred'] = true;
        $db = new PDO('mysql:host=mariadb101.websupport.sk;port=3312;dbname=tomaskudlac;charset=utf8', 'tomaskudlac', 'ucJ9Qg4bIM');
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        if (empty($_GET['ref']))
        {
            $_GET['ref'] = strpos($_SERVER['HTTP_HOST'], 'test') !== false ? 'test' : 'other';
        }
        $insert = $db->prepare("INSERT INTO refs (ref, ref_count) VALUES (:ref, 1) ON DUPLICATE KEY UPDATE ref_count = ref_count + 1");
        $insert->execute(array(':ref' => $_GET['ref']));
    }