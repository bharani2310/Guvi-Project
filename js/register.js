$(document).ready(function() {
    $('#registerForm').submit(function(e) {
        e.preventDefault();

        var formData = {
            username: $("#username").val(),
            email: $("#email").val(),
            phone: $("#phone").val(),
            password: $("#password").val(),
            date:$("#date").val()
        };

        console.log(formData);


        $.ajax({
            type: 'POST',
            url: './php/register.php',
            data: formData,
            success: function(response) {
                console.log(response);
                window.alert("Registered Successfully..");
                window.location.href="./login.html";
            },
            error: function(xhr, status, error) {
                if (xhr.status === 401) {
                    window.alert("Email Already Exists");
                } else {
                    window.alert("An error occurred: " + error);
                }
                console.error(xhr.responseText);
            }
        });
    });
});