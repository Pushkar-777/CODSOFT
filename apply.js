// =============================
// Apply Job
// =============================

function applyJob() {

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const jobTitle = document.getElementById("jobTitle").value.trim();
    const skills = document.getElementById("skills").value.trim();

    if (fullName === "" || email === "" || jobTitle === "" || skills === "") {

        alert("Please fill all fields.");
        return;

    }

    const application = {
        fullName,
        email,
        jobTitle,
        skills
    };

    let applications = JSON.parse(localStorage.getItem("applications")) || [];

    applications.push(application);

    localStorage.setItem("applications", JSON.stringify(applications));

    alert("Application Submitted Successfully!");

    window.location.href = "applications.html";
}