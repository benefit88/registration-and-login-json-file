jQuery.validator.addMethod("lettersonly", function(value, element)
{
    return this.optional(element) || /^[a-zA-Zа-яёА-ЯЁ]+$/i.test(value);
});

jQuery.validator.addMethod("checkpass", function(value, element)
{
    return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Zа-яёА-ЯЁ]).{6,30}$/g.test(value) ;
});

    $(document).ready(function (){
    $("#register-btn").click(function (){
        $("#register-box").show();
        $("#login-box").hide();
    });
    $("#login-btn").click(function () {
    $("#login-box").show();
    $("#register-box").hide();
});
    $("#login-frm").validate({
        rules: {
            username:{
                required:true,
                minlength:6
            },
            password:{
                required:true,
                minlength:6,
                checkpass:true
            }

        },
        messages:{
            username: {
                required: "Заполните это поле",
                minlength: "Имя должно быть не менее 6 символов",
            },
            password:{
                required:"Заполните это поле",
                minlength:"Пароль должен быть не менее 6 символов",
                checkpass: "Пароль должен содержать буквы и цифры"
            }
        }

    });
    $("#register-frm").validate({
    rules:{
        name:{
            required:true,
            minlength:2,
            lettersonly: true
        },
        uname:{
            required:true,
            minlength:6
        },
        email:{
            required:true
        },
        pass:{
            required:true,
            minlength:6,
            checkpass:true
        },

        cpass:{
            required:true,
        equalTo:"#pass"
        }
    },
    messages:{
        name:{
            required: "Заполните это поле",
            minlength: "Имя должно быть не менее 2 символов",
            lettersonly: "Только буквы"
        },
        uname:{
            required: "Заполните это поле",
            minlength: "Имя должно быть не менее 6 символов",
        },
        email:{
            required:"Проверьте правильность email"
        },
        pass:{
            required:"Заполните это поле",
            minlength:"Пароль должен быть не менее 6 символов",
            checkpass: "Пароль должен содержать буквы и цифры"
        },
        cpass: {
            equalTo: "Пароли не совпадают",
            required:"Заполните это поле"

        }
    }

});
    $("#register").click(function (e){
    if (document.getElementById('register-frm').checkValidity()){
    e.preventDefault();
    $.ajax({
    url:'action.php',
    method:'post',
    data:$("#register-frm").serialize()+'&action=register',
    success:function (response){
    $("#alert").show();
    $("#result").html(response);
}
});
}
    return true;
});
    $("#login").click(function (e){
    if (document.getElementById('login-frm').checkValidity()){
    e.preventDefault();
    $.ajax({
    url:'action.php',
    method:'post',
    data:$("#login-frm").serialize()+'&action=login',
    success:function (response){
        if(response==="ok"){
            window.location='profile.php';
        }
        else {
            $("#alert").show();
            $("#result").html(response);
        }
}
});
}
    return true;
});
})