// script.js
function toggleForm() {
  var loginForm = document.getElementById("login-form");
  var signupForm = document.getElementById("signup-form");

  loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
  signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
}

function login() {
  var username = document.getElementById("login-username").value;
  var password = document.getElementById("login-password").value;

  // Dummy login logic with AJAX (replace with actual API call)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/login", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert(xhr.responseText);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      alert("Login failed. Please try again.");
    }
  };

  var data = JSON.stringify({ username: username, password: password });
  xhr.send(data);
}

function signup() {
  var username = document.getElementById("signup-username").value;
  var password = document.getElementById("signup-password").value;

  // Dummy signup logic with AJAX (replace with actual API call)
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:3000/api/signup", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert(xhr.responseText);
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      alert("Sign-up failed. Please try again.");
    }
  };

  var data = JSON.stringify({ username: username, password: password });
  xhr.send(data);
}
