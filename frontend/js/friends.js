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

document.addEventListener("DOMContentLoaded", async () => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    window.location.href = "login.html";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/friendships/${userId}/friends`
    );
    if (!response.ok) throw new Error("Failed to fetch friends");

    const friends = await response.json();
    const friendsList = document.getElementById("friends-list");

    friends.forEach((friend) => {
      const li = document.createElement("li");
      li.textContent = friend.name;
      li.style.cursor = "pointer";

      li.addEventListener("click", () => {
        localStorage.setItem("chatFriendId", friend.id);
        window.location.href = "chat.html";
      });

      friendsList.appendChild(li);
    });
  } catch (err) {
    console.error(err);
    alert("Could not load friends list.");
  }
});
