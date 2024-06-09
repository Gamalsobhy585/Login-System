

loginBtn.addEventListener('click', async function() {
    loginEmail = document.getElementById('loginEmail').value;
    loginPassword = document.getElementById('loginPassword').value;
    loginBtn = document.getElementById('loginBtn');
    let usersContainer = JSON.parse(localStorage.getItem('loginUsers')) || [];

    let user = usersContainer.find(user => user.email === loginEmail);

    if (user) {
        let hashedPassword = await hashPassword(loginPassword);
        console.log(hashedPassword);
        if (user.password === hashedPassword) {
            // Save logged-in user's information in localStorage
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            window.location.href = '/pages/home.html';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid password!'
            });
            console.log('Invalid Password');
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'User not found!'
        });
        console.log('User not found');
    }
});

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











// 310905991491-417rqe0fd5atlbf7jijksu8efha27k5r.apps.googleusercontent.com

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
  }
  function onFailure(error) {
    console.log(error);
  }
  function renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSuccess,
      'onfailure': onFailure
    });
  }






