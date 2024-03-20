function getUser() {
    var userData = localStorage.getItem('user');
    console.log('Retrieved user data:', userData);
    var doc;
    if (userData) {
        var data = {
            email: userData
        };

        $.ajax({
            url: './php/profile.php',
            type: 'POST',
            data: data,
            success: function(response) {
                console.log("Response:", response);
                doc = JSON.parse(response);
                console.log("DOC:", doc);
                var user = {
                    loggedIn: doc !== null
                };
                updateNavigation(user,doc);
            },
            error: function(xhr, status, error) {
                if (xhr.status === 401) {
                } else {
                    console.error('AJAX Error:', error);
                }
            }
        });
    } else {
        var user = { loggedIn: false };
        updateNavigation(user);
    }
}

function saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function logoutUser() {
    localStorage.removeItem('user');
}

function updateNavigation(user,doc) {
    var navigation = document.querySelector('.navigation ul');
    if (navigation) {
        if (user.loggedIn) {
            var dashboardItem = document.createElement('li');
            dashboardItem.innerHTML = '<a id="dash" href="./profile.html">Dashboard</a>';
            navigation.appendChild(dashboardItem);
            var logoutItem = document.createElement('li');
            logoutItem.innerHTML = '<a id="logout" style="padding: .6rem !important; width: 100px !important; border-radius: 20px !important; color: white; background-color: #0b2727; cursor:pointer">Logout</a>';
            navigation.appendChild(logoutItem);
            var logoutButton = document.getElementById('logout');
            if (logoutButton) {
                logoutButton.addEventListener('click', function () {
                    logoutUser();
                    window.alert("Logout Successful");
                    window.location.href = './index.html'; 
                });
            }
        }
        else {
            var dashboardItem = document.querySelector('a[href="./dashboard.html"]');
            if (dashboardItem && dashboardItem.parentElement) {
                dashboardItem.parentElement.remove();
            }
            var logoutItem = document.querySelector('#logout');
            if (logoutItem && logoutItem.parentElement) {
                logoutItem.parentElement.remove();
            }
        }
        var information = document.querySelector('#userInfo');
        if (information) {
            var userDataItems = document.createElement('li');
            userDataItems.classList.add('user-data-container');
            userDataItems.innerHTML = `
                <h3>Name : ${doc.Firstname}</h3>
                <h3>Date Of Birth : ${doc.DOB}</h3>
                <h3>Phone : ${doc.Phonenumber}</h3>
            `;
            navigation.appendChild(userDataItems);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    getUser();
});
