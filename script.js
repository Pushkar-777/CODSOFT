window.onload = function () {

    let user = localStorage.getItem("loggedInUser");

    let login = document.querySelector('a[href="login.html"]');
    let register = document.querySelector('a[href="register.html"]');
    let logout = document.querySelector(".logoutBtn");

    if (user) {

        let heroTitle = document.querySelector(".hero h1");

        if(heroTitle){
            heroTitle.innerHTML = "Welcome, " + user + " 👋";
        }

        if(login) login.parentElement.style.display="none";
        if(register) register.parentElement.style.display="none";
        if(logout) logout.style.display="inline-block";

    }else{

        if(logout) logout.style.display="none";

    }

}

function logoutUser(){

    localStorage.clear();

    alert("Logged Out Successfully");

    window.location.href="login.html";

}