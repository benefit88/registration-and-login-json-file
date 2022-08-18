<?php
session_start();

if(session_destroy()){
    setcookie("username", "");
    setcookie("password", "");
    header("location:index.php");

}