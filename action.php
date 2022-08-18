<?php

if(isset($_POST['action'])&&$_POST['action']=='register') {
    $current_data = file_get_contents('data.json');
    $parser_json = json_decode($current_data, true);
    $pass = check_input($_POST['pass']);
    $cpass = check_input($_POST['cpass']);

    if ($pass != $cpass) {
        echo 'Пароли не совпадают!';
        exit();
    }
    else {
        insertUser();
    }
}

function check_input($data){
    $data=trim($data);
    $data=stripslashes($data);
    $data=htmlspecialchars($data);
    return $data;
}




function usernameExists(){

    $current_data = file_get_contents('data.json');
    $array_data = json_decode($current_data, true);
    $uname = check_input($_POST['uname']);
    $email = check_input($_POST['email']);


    foreach($array_data as $key => $value){
        if($value['uname']==$uname){
            echo 'Пользаватель с таким логином существует';

            return true;}
        elseif ($value['email']==$email){
            echo 'Пользаватель с таким email существует';
            return true;

        }

    }
    return false;
}

function insertUser(){
    if(usernameExists() == FALSE){
        $current_data = file_get_contents('data.json');
        $array_data = json_decode($current_data, true);
        $name = check_input($_POST['name']);
        $uname = check_input($_POST['uname']);
        $email = check_input($_POST['email']);
        $salt ="Jfdjdjfm74774hfbd7f8";
        $pass = check_input($_POST['pass']);
        $pass = sha1($salt.$pass);
        $extra = array(
            'name' => $name,
            'uname' => $uname,
            'email' => $email,
            'pass' => $pass

        );
        $array_data[] = $extra;
        $final_data = json_encode($array_data,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
        if(file_put_contents('data.json',$final_data)){
            echo 'Пользователь зарегистрирован';

        }
        else{
            echo 'Что-то пошло не так';
        }
    }
}
function checkLoginPass()
{
    $username = $_POST['username'];
    $pass = check_input($_POST['password']);
    $salt = "Jfdjdjfm74774hfbd7f8";
    $pass = sha1($salt . $pass);
    $current_data = file_get_contents('data.json');
    $array_data = json_decode($current_data, true);
    foreach ($array_data as $key => $value) {
        if ($value['uname'] == $username && $value['pass'] == $pass) {
            return true;
        }

    }
}

if(isset($_POST['action'])&&$_POST['action'] == 'login') {
    $username = $_POST['username'];
    $password = check_input($_POST['password']);

    checkLoginPass();
    session_start();

    if (checkLoginPass() == true) {
        $_SESSION['username'] = $username;
        echo "ok";
        if (!empty($_POST['rem'])) {
            setcookie("username", $_POST['username'], time() + (10 * 365 * 24 * 60 * 60));
            setcookie("password", $_POST['password'], time() + (10 * 365 * 24 * 60 * 60));
        } else {
            if (isset($_COOKIE['username'])) {
                setcookie("username", "");
            }
            if (isset($_COOKIE['password'])) {
                setcookie("password", "");
            }
        }

    } else {
        echo 'Не верный логил или пароль';

    }

}










