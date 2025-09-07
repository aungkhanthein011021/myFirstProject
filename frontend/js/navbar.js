// Hamburger toggle
const hamburger = document.querySelector(".hamburger");
const overlay = document.querySelector(".overlay");

if (hamburger && overlay) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

// Auth buttons
const userId = localStorage.getItem("userId");
const username = localStorage.getItem("username");

const authBtn = document.getElementById("auth-btn");
const overlayAuthBtn = document.getElementById("overlay-auth-btn");

if (userId && username) {
  // Change Login → Logout
  if (authBtn) {
    authBtn.textContent = "Logout";
    authBtn.href = "#";
    authBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      window.location.href = "index.html";
    });
  }

  if (overlayAuthBtn) {
    overlayAuthBtn.textContent = "Logout";
    overlayAuthBtn.href = "#";
    overlayAuthBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("userId");
      localStorage.removeItem("username");
      window.location.href = "index.html";
    });
  }
}
