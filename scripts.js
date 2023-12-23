const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("error-message");

// Function to securely hash a password using bcrypt
const hashPassword = async (password) => {
  const saltRounds = 3; // Adjust for desired security level
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Function to check if a password matches a hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Function to store credentials securely (replace with your actual storage mechanism)
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

  // Check for existing credentials (e.g., during login)
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
    // Store new credentials (e.g., during registration)
    await storeCredentials(username, password);
    errorMessage.textContent = "Credentials stored successfully.";
  }
});
