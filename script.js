
const signupBtn = document.getElementById("signup-form");

signupBtn.addEventListener("submit", (event) => {
    event.preventDefault();
    // Retrieve the values of the input fields
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    // other user details

    // Create a user object with these values
    const user = {
        name,
        email,
        password,
        accessToken: generateAccessToken() // add the access token to the user object
    };

    // Validating the form.
    if(user.name === "" || user.email === "" || user.password === "") {
        document.getElementById('error-msg').style.display = "block";
        return;
    } else if(user.password !== confirmPassword) {
        document.getElementById('password-mismatch-msg').style.display = "block";
        return;
    } else {
        document.getElementById("success-msg").style.display = "block";
    }

    // Store the user's state in the local storage
    localStorage.setItem("user", JSON.stringify(user));

    // Show success message and redirect to profile page
    
    setTimeout(() => {
        window.location.href = "/profile/index.html";
    }, 1000); // redirect after 1 second
});

function generateAccessToken() {
    // Generate a random 16-byte string
    const randomBytes = new Uint8Array(16);
    window.crypto.getRandomValues(randomBytes);
    const accessToken = btoa(String.fromCharCode.apply(null, randomBytes));
    return accessToken;
}


const profile = document.getElementById('profile');
profile.addEventListener('click', () => {
    const user = JSON.parse(localStorage.getItem('user')) || false;
    if(user) {
        window.location.href = "/profile/index.html";
    } else {
        window.location.href = "/index.html";
    }
});