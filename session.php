<?php
session_start();
$user=$_SESSION['username'];
$json = file_get_contents('data.json');
$json_data = json_decode($json,true);
$username=$user;