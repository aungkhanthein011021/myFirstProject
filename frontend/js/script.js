document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar").innerHTML = data;
      // Re-run navbar.js after inserting
      const script = document.createElement("script");
      script.src = "./js/navbar.js";
      document.body.appendChild(script);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const welcomeText = document.getElementById("welcome-text");
  const ctaBtn = document.getElementById("cta-btn");

  if (userId && username) {
    welcomeText.textContent = `👋 Welcome back, ${username}!`;
    ctaBtn.style.display = "none"; // hide Get Started button for logged-in users
  } else {
    welcomeText.textContent = "✨ Welcome to my project.";
    ctaBtn.style.display = "inline-block"; // show button for guests
  }
});
