<?php
session_start();
$user=$_SESSION['username'];
$json = file_get_contents('data.json');
$json_data = json_decode($json,true);
$uname=$_SESSION['username'];
foreach ($json_data as $key=>$value)
{
    if($value['uname']==$uname){
        $name=$value['name'];
        $email=$value['email'];

    }
}
$username=$user;
