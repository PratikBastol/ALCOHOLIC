let user = JSON.parse(localStorage.getItem("loggedInUser"));

if (!user) {
    window.location.href = "Account.html";
} else {
    document.getElementById("profileName").textContent = user.firstname + " " + user.lastname;
    document.getElementById("profileEmail").textContent = user.email;
    document.getElementById("profileAge").textContent = user.age;
    document.getElementById("profileGender").textContent = user.gender;

    // document.getElementById("profilepassword").textContent = user.password;
    let profilepassword = document.getElementById("profilepassword");
    let showpassword = document.getElementById("showpass");
    let hidepassword = document.getElementById("hidepass");
    profilepassword.textContent = "*******";

    showpassword.style.display = "none";
    hidepassword.style.display = "block";
    hidepassword.addEventListener("click", function () {
        showpassword.style.display = "block";
        profilepassword.textContent = user.password;
        hidepassword.style.display = "none";
    });
    showpassword.addEventListener("click", function () {
        showpassword.style.display = "none";
        hidepassword.style.display = "block";
        profilepassword.textContent = "*******";


    })


    document.querySelectorAll(".profileEmail").forEach(function (el) {
        el.textContent = user.email;
    });

    document.getElementById("logout").addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        alert("Logged out successfully");
        window.location.href = "Home.html";
    });


};
document.getElementById("home").addEventListener("click", function () {
    window.location.href = "Home.html";
});