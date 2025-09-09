document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".signup-form form");
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirm-password");

  const BASE_API = "https://two-connect-backend.onrender.com";

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // prevent form submission

    // Trim values
    const usernameVal = username.value.trim();
    const emailVal = email.value.trim();
    const passwordVal = password.value.trim();
    const confirmPasswordVal = confirmPassword.value.trim();

    // Basic validation
    if (!usernameVal || !emailVal || !passwordVal || !confirmPasswordVal) {
      alert("⚠️ Please fill in all fields.");
      return;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailVal)) {
      alert("⚠️ Please enter a valid email address.");
      return;
    }

    // Password length check
    if (passwordVal.length < 8) {
      alert("⚠️ Password must be at least 8 characters long.");
      return;
    }

    // Password match check
    if (passwordVal !== confirmPasswordVal) {
      alert("⚠️ Passwords do not match.");
      return;
    }

    try {
      // Send data to backend API (adjust path if different)
      const response = await fetch(BASE_API + "/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: usernameVal,
          email: emailVal,
          password: passwordVal,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.error || "Signup failed."}`);
        return;
      }

      // ✅ Store Prisma-generated userId (id)
      if (data.id) {
        localStorage.setItem("userId", data.id);
        localStorage.setItem("username", data.name);
      }

      alert(`✅ Account created successfully!`);
      window.location.href = "index.html"; // redirect to main page
    } catch (error) {
      console.error("Error during signup:", error);
      alert("❌ Something went wrong. Please try again later.");
    }
  });
});
