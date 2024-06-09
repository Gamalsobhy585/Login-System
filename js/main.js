let firstName = document.getElementById('firstName');
let lastName = document.getElementById('lastName');
let emailInput = document.getElementById('email');
let passwordInput =document.getElementById('password');
let registerBtn= document.getElementById('registerBtn')
let usersContainer = [];


registerBtn.addEventListener('click',function(){
    if (validateUser("firstName") && validateUser("lastName") && validateUser("email") && validateUser("password") ) {
        addUser();
        window.location.href = "pages/login.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<ul>
                <li>Username  contain  3 characters or more </li>
                <li>Email  be valid</li>
                <li>Password  be at least 8 characters long</li>
                <li>Password  contain an upper case letter</li>
                <li>Password  contain a lower case letter</li>
                <li>Password  contain a number</li>
                <li>Password  contain a special character</li>
                <li>Passwords  match</li>
            </ul>`
        });
    }
});

function togglePasswordVisibility(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
}






function validateUser(field) {
    let regex = {
        firstName : /^[a-zA-Z0-9_-]{3,15}$/ ,
        lastName : /^[a-zA-Z0-9_-]{3,15}$/ ,
        email :  /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/, 
        password :/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,
    }


    let input = document.getElementById(field);
    if (regex[field].test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hex(hash);
}

function hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}
function clearForm() {
    firstName.value = '';
    lastName.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}
async function addUser() {
    let hashedPassword = await hashPassword(passwordInput.value);
    let user = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: emailInput.value,
        password: hashedPassword
    };
    usersContainer.push(user);
    localStorage.setItem('loginUsers', JSON.stringify(usersContainer));
    console.log('user is added');
    clearForm();
}


















// Facebook Login 

window.fbAsyncInit = function() {
    FB.init({
        appId      : '1607985953385639',  
        cookie     : true,
        xfbml      : true,
        version    : 'v13.0'
    });

    FB.AppEvents.logPageView();   
};

(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('Logged in and authenticated');
        setElements(true);
        testAPI();
        // Redirect to home.html upon successful login
        window.location.href = '/Login-System/pages/home.html';
    } else {
        console.log('Not authenticated');
        setElements(false);
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

function testAPI() {
    FB.api('/me?fields=name,email', function(response) {
        if (response && !response.error) {
            console.log(response);
            document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
        }
    });
}

function setElements(isLoggedIn) {
    if (isLoggedIn) {
        document.getElementById('facebookSignIn').style.display = 'none';
    } else {
        document.getElementById('facebookSignIn').style.display = 'block';
    }
}

document.getElementById('facebookSignIn').addEventListener('click', function() {
    FB.login(checkLoginState, {scope: 'public_profile,email'});
});




