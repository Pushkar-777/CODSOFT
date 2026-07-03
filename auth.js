// ===============================
// Register User
// ===============================

function registerUser() {

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    if (name === "" || email === "" || password === "") {
        alert("Please fill all fields.");
        return;
    }

    let user = {
        name: name,
        email: email,
        password: password
    };

    localStorage.setItem("jobPortalUser", JSON.stringify(user));

    alert("Registration Successful!");

    window.location.href = "login.html";
}


// ===============================
// Login User
// ===============================

function loginUser() {

    let email = document.getElementById("loginEmail").value.trim();
    let password = document.getElementById("loginPassword").value.trim();

    let savedUser = JSON.parse(localStorage.getItem("jobPortalUser"));

    if (!savedUser) {
        alert("No account found. Please register first.");
        return;
    }

    if (email === savedUser.email && password === savedUser.password) {

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInUser", savedUser.name);

        alert("Login Successful!");

        window.location.href = "index.html";

    } else {

        alert("Invalid Email or Password");

    }

}


// ===============================
// Logout
// ===============================

function logoutUser() {

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");

    alert("Logged Out Successfully!");

    window.location.href = "login.html";

}