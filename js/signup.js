let signupform = document.getElementById("signupForm");

signupform.addEventListener("submit", function (e) {
  e.preventDefault();
  let firstname = document.getElementById("firstname").value.trim();
  let lastname = document.getElementById("lastname").value.trim();
  let age = document.getElementById("age").value;
  let gender = document.querySelector('input[name="gender"]:checked');
  let email = document.getElementById("email").value.trim().toLowerCase();
  let password = document.getElementById("password").value.trim();
  let confirmpassword = document.getElementById("confirmPassword").value.trim();

  //for errors
  let firstnameerror = document.getElementById("firstnameError");
  let lastnameerror = document.getElementById("lastnameError");
  let ageerror = document.getElementById("ageError");
  let gendererror = document.getElementById("genderError");
  let emailerror = document.getElementById("emailError");
  let passworderror = document.getElementById("passwordError");
  let confirmpassworderror = document.getElementById("confirmpasswordError");

  //clearing all the errors
  firstnameerror.textContent = "";
  lastnameerror.textContent = "";
  ageerror.textContent = "";
  gendererror.textContent = "";
  emailerror.textContent = "";
  passworderror.textContent = "";
  confirmpassworderror.textContent = "";

  //validation check gareko
  let isValid = true;
  if (firstname === "") {
    firstnameerror.textContent = "This is not the valid firstname";
    isValid = false;
  }
  if (lastname === "") {
    lastnameerror.textContent = "This is not the valid lastname";
    isValid = false;
  }
  if (age === "" || Number(age) < 18) {
    ageerror.textContent = "Must be 18 to start drinking";
    isValid = false;
  }
  if (gender === null) {
    gendererror.textContent = "Empty Field";
    isValid = false;
  }
  if (email === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    emailerror.textContent = "Enter a valid email (e.g. name@gmail.com)";
    isValid = false;
  }
  if (password === "" || password.length < 6) {
    passworderror.textContent = "Enter Valid password ";
    isValid = false;
  }
  if (confirmpassword === "") {
    confirmpassworderror.textContent = "Enter Valid password ";
    isValid = false;
  } else if (password !== confirmpassword) {
    confirmpassworderror.textContent = "Passwords dont match";
    isValid = false;
  }

  if (isValid) {
    let usersArray = JSON.parse(localStorage.getItem("users")) || [];
    let existingUser = usersArray.find(function (user) {
      return user.email.toLowerCase() === email;
    });
    if (existingUser) {
      emailerror.textContent = "Email already exists";
      return;
    }

    usersArray.push({
      firstname: firstname,
      lastname: lastname,
      age: Number(age),
      gender: gender.value,
      email: email,
      password: password,
    });

    localStorage.setItem("users", JSON.stringify(usersArray));
    console.log(usersArray);

    let successMessage = document.getElementById("successMessage");

    successMessage.textContent = `Welcome ${firstname}! Signup Successful`;

    successMessage.style.opacity = "1";

    setTimeout(function () {
      successMessage.style.opacity = "0";
      setTimeout(function () {
        window.location.href = "Home.html";
      }, 100);
    }, 800);
  }
});
let up = document.getElementById("up");
let down = document.getElementById("down");
let ageinput = document.getElementById("age");

ageinput.value = 18;
up.addEventListener("click", function () {
  let currentValue = parseInt(ageinput.value) || 18;
  ageinput.value = currentValue + 1;
});
down.addEventListener("click", function () {
  let currentValue = parseInt(ageinput.value) || 18;
  if (currentValue > 18) {
    ageinput.value = currentValue - 1;
  }
});
