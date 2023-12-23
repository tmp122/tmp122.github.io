// Basic hashing function (not as secure as bcrypt)
const hashPassword = (password) => {
  const salt = "your_strong_secret_salt"; // Replace with a strong, unique salt
  return CryptoJS.SHA256(password + salt).toString();
};

// Compare password with hashed password
const comparePassword = (password, hashedPassword) => {
  const salt = "your_strong_secret_salt"; // Use the same salt for comparison
  const hashedAttempt = CryptoJS.SHA256(password + salt).toString();
  return hashedAttempt === hashedPassword;
};

const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const errorMessage = document.getElementById("error-message");
const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");
const signupSubmitButton = document.getElementById("signupSubmit");

// Function to store credentials (replace with your actual storage mechanism)
const storeCredentials = async (username, password) => {
  try {
    const hashedPassword = await hashPassword(password);
    // Example using localStorage for demonstration, replace with a secure storage method
    localStorage.setItem("username", username);
    localStorage.setItem("password", hashedPassword);
    console.log("Credentials stored successfully.");
  } catch (error) {
    console.error("Error storing credentials:", error);
    errorMessage.textContent = "Error storing credentials.";
  }
};

// Function to retrieve stored credentials
const retrieveCredentials = () => {
  try {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    return { username: storedUsername, password: storedPassword };
  } catch (error) {
    console.error("Error retrieving credentials:", error);
    return null;
  }
};

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (event.target === loginButton) {
    // Handle login
    const storedCredentials = await retrieveCredentials();
    if (storedCredentials) {
      if (await comparePassword(password, storedCredentials.password)) {
        // Successful login
        alert("Login successful!");
      } else {
        // Incorrect password
        errorMessage.textContent = "Incorrect username or password.";
      }
    } else {
      errorMessage.textContent = "No credentials found. Please signup first.";
    }
  }
});

signupButton.addEventListener("click", () => {
  loginForm
