jQuery.validator.addMethod("lettersOnly", function(value, element)
{
    return this.optional(element) || /^[a-zA-Zа-яёА-ЯЁ]+$/i.test(value);
});

jQuery.validator.addMethod("checkPass", function(value, element)
{
    return this.optional(element) || /^(?=.*[0-9])(?=.*[a-zA-Zа-яёА-ЯЁ]).{6,30}$/g.test(value) ;
});

jQuery.validator.addMethod("checkSpace",function (value, element) {
    return this.optional(element) || /^[^\s]*$/.test(value);
});

jQuery.validator.addMethod("checkEmail",function (value, element) {
    return this.optional(element) || /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
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
            username:{<!--        логин-->
                required:true,
                checkSpace:true,
                minlength:6

            },
            password:{
                checkSpace:true,
                required:true,
                minlength:6,
                checkPass:true
            }

        },
        messages:{
            username: {
                required: "Заполните это поле",
                minlength: "Логин должен быть не менее 6 символов",
                checkSpace:"Логин не должен содержать пробелов"
            },
            password:{
                required:"Заполните это поле",
                minlength:"Пароль должен быть не менее 6 символов",
                checkPass:"Пароль должен содержать буквы и цифры",
                checkSpace:"Пароль не должен содержать пробелов"

            }
        }

    });
    $("#register-frm").validate({

    rules:{
        name:{ <!--        имя-->
            required:true,
            minlength:2,
            lettersOnly: true,
            checkSpace:true

        },
        uname:{<!--        логин-->
            required:true,
            minlength:6,
            checkSpace:true,

        },
        email:{
            required:true,
            checkSpace:true,
            checkEmail:true

        },
        pass:{
            required:true,
            minlength:6,
            checkPass:true,
            checkSpace:true

        },

        cpass:{
            required:true,
        equalTo:"#pass"
        }
    },
    messages:{
        name:{<!--        имя-->
            required: "Заполните это поле",
            minlength: "Имя должно быть не менее 2 символов",
            lettersOnly: "Только буквы",
            checkSpace:"Имя не должно содержать пробелов"

        },
        uname:{<!--        логин-->
            required: "Заполните это поле",
            minlength: "Логин должен быть не менее 6 символов",
            checkSpace:"Логин не должен содержать пробелов"

        },
        email:{

            required:"Проверьте правильность email",
            checkSpace:"Email не должен содержать пробелов",
            checkEmail:"Проверьте правильность email"

        },
        pass:{
            required:"Заполните это поле",
            minlength:"Пароль должен быть не менее 6 символов",
            checkPass: "Пароль должен содержать буквы и цифры",
            checkSpace:"Пароль не должен содержать пробелов"

        },
        cpass: {
            equalTo: "Пароли не совпадают",
            required:"Заполните это поле"

        }
    }

});

    $('#register').click(function (e){
        $("#alert").hide();
        if ($('#register-frm').valid()){
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
