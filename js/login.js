$(document).ready(function() {
    $('#loginForm').submit(function(e) {
        e.preventDefault(); 
        var email = $('#email').val();
        var password = $('#password').val();
        var data = {
            email: email,
            password: password
        };

        console.log('Data to be sent:', data);

        $.ajax({
            url: './php/login.php',
            type: 'POST',
            data: data,
            success: function(response) {
                var json_data=JSON.parse(response);
                localStorage.setItem('user',email); 
                console.log("response : ", json_data);
                alert('Login successful!');
                window.location.reload();
                window.location.href = './profile.html'; 
            },
            error: function(xhr, status, error) {
                if (xhr.status === 401) {
                    alert('Invalid email or password. Please try again.');
                } else {
                    console.error('Error:', xhr.responseText);
                    alert('Login failed. Please try again.');
                }
            }
            
        });
    });
});
