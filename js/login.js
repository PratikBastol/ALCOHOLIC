let loginform = document.getElementById("myform");

loginform.addEventListener("submit", function (e) {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let emailerror = document.getElementById("emailError");
  let passworderror = document.getElementById("passwordError");
  let loginerror = document.getElementById("loginError");

  emailerror.textContent = "";
  passworderror.textContent = "";
  loginerror.textContent = "";
  let isValid = true;
  if (email === "") {
    emailerror.textContent = "Email is required";
    isValid = false;
  }
  if (password === "") {
    passworderror.textContent = "Password is required";
    isValid = false;
  }

  if (isValid) {
    let usersArray = JSON.parse(localStorage.getItem("users")) || [];

    console.log(usersArray);

    let foundUser = usersArray.find(function (user) {
      return (
        user.email.toLowerCase() === email.toLowerCase() &&
        user.password === password
      );
    });

    console.log(foundUser);
    let successMessage = document.getElementById("LoginsuccessMessage");
    if (foundUser) {
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

      successMessage.textContent = `WELCOME BACK  ${foundUser.firstname}!!`;
      successMessage.style.opacity = "1";

      setTimeout(() => {
        successMessage.style.opacity = "0";
        setTimeout(() => (window.location.href = "Home.html"), 100);
      }, 900);
    } else {
      loginerror.textContent = " Invalid email or password";
    }
  }

  loginform.reset();
});
